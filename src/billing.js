// Google Play Billing bridge. On the web (and in debug builds without Play products) the store stays a demo.
import { Capacitor, registerPlugin } from '@capacitor/core';

const native = Capacitor.isNativePlatform();
const Billing = native ? registerPlugin('Billing') : null;

// Play Console product ids (one-time, consumable) for each gem pack
export const PRODUCT = { g1: 'gems_80', g2: 'gems_450', g3: 'gems_1000', g4: 'gems_2800' };

// mode: 'demo' = simulated purchases, 'live' = real Play purchases, 'off' = release build but Play has no products
export const shop = { native, mode: 'demo', prices: {} };

export async function initBilling(onGrant) {
  if (!native) return;
  let debug = false;
  try {
    debug = (await Billing.info()).debug;
    const r = await Billing.getProducts({ ids: Object.values(PRODUCT) });
    for (const p of r.products) shop.prices[p.id] = p.price;
    shop.mode = r.products.length ? 'live' : debug ? 'demo' : 'off';
    // deliver anything paid for but not yet handed over (app closed mid-purchase, pending payment cleared)
    if (shop.mode === 'live') for (const id of (await Billing.restore()).ids) onGrant(id);
  } catch (e) {
    shop.mode = debug ? 'demo' : 'off';
  }
}

export async function buy(productId) {
  return (await Billing.purchase({ id: productId })).id;
}
