package com.sterkarena.game;

import android.content.pm.ApplicationInfo;
import androidx.annotation.NonNull;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeParams;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

/** Gem packs are one-time consumable products: each purchase is consumed right away so it can be bought again. */
@CapacitorPlugin(name = "Billing")
public class BillingPlugin extends Plugin implements PurchasesUpdatedListener {
    private BillingClient client;
    private final Map<String, ProductDetails> products = new HashMap<>();
    private PluginCall pendingPurchase;

    @Override
    public void load() {
        client = BillingClient.newBuilder(getContext())
            .setListener(this)
            .enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build())
            .build();
    }

    private void connect(PluginCall call, Runnable ready) {
        if (client.isReady()) { ready.run(); return; }
        client.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(@NonNull BillingResult result) {
                if (result.getResponseCode() == BillingClient.BillingResponseCode.OK) ready.run();
                else call.reject("billing_unavailable");
            }

            @Override
            public void onBillingServiceDisconnected() {}
        });
    }

    @PluginMethod
    public void info(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("debug", (getContext().getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0);
        call.resolve(ret);
    }

    @PluginMethod
    public void getProducts(PluginCall call) {
        JSArray ids = call.getArray("ids", new JSArray());
        List<QueryProductDetailsParams.Product> wanted = new ArrayList<>();
        try {
            for (Object id : ids.toList()) {
                wanted.add(QueryProductDetailsParams.Product.newBuilder().setProductId(String.valueOf(id)).setProductType(BillingClient.ProductType.INAPP).build());
            }
        } catch (Exception e) { call.reject("bad_ids"); return; }
        if (wanted.isEmpty()) { call.reject("bad_ids"); return; }
        connect(call, () -> client.queryProductDetailsAsync(
            QueryProductDetailsParams.newBuilder().setProductList(wanted).build(),
            (result, list) -> {
                JSArray out = new JSArray();
                if (result.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    for (ProductDetails d : list) {
                        products.put(d.getProductId(), d);
                        JSObject o = new JSObject();
                        o.put("id", d.getProductId());
                        ProductDetails.OneTimePurchaseOfferDetails offer = d.getOneTimePurchaseOfferDetails();
                        o.put("price", offer != null ? offer.getFormattedPrice() : "");
                        out.put(o);
                    }
                }
                JSObject ret = new JSObject();
                ret.put("products", out);
                call.resolve(ret);
            }));
    }

    @PluginMethod
    public void purchase(PluginCall call) {
        ProductDetails details = products.get(call.getString("id", ""));
        if (details == null) { call.reject("unknown_product"); return; }
        connect(call, () -> {
            pendingPurchase = call;
            BillingFlowParams params = BillingFlowParams.newBuilder()
                .setProductDetailsParamsList(Collections.singletonList(
                    BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(details).build()))
                .build();
            BillingResult r = client.launchBillingFlow(getActivity(), params);
            if (r.getResponseCode() != BillingClient.BillingResponseCode.OK) { pendingPurchase = null; call.reject("billing_error_" + r.getResponseCode()); }
        });
    }

    @Override
    public void onPurchasesUpdated(@NonNull BillingResult result, List<Purchase> purchases) {
        PluginCall call = pendingPurchase;
        pendingPurchase = null;
        int code = result.getResponseCode();
        if (code != BillingClient.BillingResponseCode.OK || purchases == null) {
            if (call != null) call.reject(code == BillingClient.BillingResponseCode.USER_CANCELED ? "cancelled" : "billing_error_" + code);
            return;
        }
        for (Purchase p : purchases) {
            // a pending payment (cash, bank transfer) is delivered later through restore()
            if (p.getPurchaseState() != Purchase.PurchaseState.PURCHASED) { if (call != null) call.reject("pending"); continue; }
            client.consumeAsync(ConsumeParams.newBuilder().setPurchaseToken(p.getPurchaseToken()).build(), (r, token) -> {
                if (call == null) return;
                if (r.getResponseCode() == BillingClient.BillingResponseCode.OK && !p.getProducts().isEmpty()) {
                    JSObject ret = new JSObject();
                    ret.put("id", p.getProducts().get(0));
                    call.resolve(ret);
                } else call.reject("consume_failed");
            });
        }
    }

    /** Consume purchases that were paid for but never handed over, and report their product ids. */
    @PluginMethod
    public void restore(PluginCall call) {
        connect(call, () -> client.queryPurchasesAsync(
            QueryPurchasesParams.newBuilder().setProductType(BillingClient.ProductType.INAPP).build(),
            (result, purchases) -> {
                JSArray ids = new JSArray();
                List<Purchase> paid = new ArrayList<>();
                for (Purchase p : purchases) if (p.getPurchaseState() == Purchase.PurchaseState.PURCHASED) paid.add(p);
                if (paid.isEmpty()) { JSObject ret = new JSObject(); ret.put("ids", ids); call.resolve(ret); return; }
                AtomicInteger left = new AtomicInteger(paid.size());
                for (Purchase p : paid) {
                    client.consumeAsync(ConsumeParams.newBuilder().setPurchaseToken(p.getPurchaseToken()).build(), (r, token) -> {
                        synchronized (ids) {
                            if (r.getResponseCode() == BillingClient.BillingResponseCode.OK && !p.getProducts().isEmpty()) ids.put(p.getProducts().get(0));
                        }
                        if (left.decrementAndGet() == 0) { JSObject ret = new JSObject(); ret.put("ids", ids); call.resolve(ret); }
                    });
                }
            }));
    }
}
