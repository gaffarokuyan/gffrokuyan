package com.gffrokuyan.kolikontrol;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ClipData;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.Parcelable;
import android.provider.MediaStore;
import android.provider.OpenableColumns;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Koli Baskı Kontrol web uygulamasını (assets/www) bir WebView içinde çalıştırır.
 * - Dosyalar sahte bir https kökeninden (https://appassets.local/) sunulur; böylece
 *   ES modülleri, Web Worker ve WebAssembly sorunsuz çalışır.
 * - <input type="file"> için kamera / galeri / PDF seçici açılır.
 * - Diğer uygulamalardan "Paylaş" ile gelen görsel ve PDF'ler sayfaya aktarılır.
 */
public class MainActivity extends Activity {

    private static final String HOST = "appassets.local";
    private static final String ORIGIN = "https://" + HOST + "/";
    private static final int REQ_FILE = 1;

    private WebView web;
    private ValueCallback<Uri[]> pendingChooser;
    private Uri cameraUri;
    private File cameraFile;
    private final List<Uri> sharedUris = new ArrayList<>();
    private final List<String> sharedNames = new ArrayList<>();
    private boolean pageReady = false;
    private int delivered = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        web = new WebView(this);
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(true);
        s.setMediaPlaybackRequiresUserGesture(false);

        web.addJavascriptInterface(new Bridge(), "AndroidApp");
        web.setWebViewClient(new AppClient());
        web.setWebChromeClient(new AppChrome());

        handleIncoming(getIntent());
        web.loadUrl(ORIGIN + "index.html");
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleIncoming(intent);
        if (pageReady) deliverShared();
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }

    // ---------- Paylaşımla gelen dosyalar ----------

    private void handleIncoming(Intent intent) {
        if (intent == null) return;
        String action = intent.getAction();
        List<Uri> uris = new ArrayList<>();
        if (Intent.ACTION_SEND.equals(action)) {
            Parcelable p = intent.getParcelableExtra(Intent.EXTRA_STREAM);
            if (p instanceof Uri) uris.add((Uri) p);
        } else if (Intent.ACTION_SEND_MULTIPLE.equals(action)) {
            ArrayList<Parcelable> list = intent.getParcelableArrayListExtra(Intent.EXTRA_STREAM);
            if (list != null) for (Parcelable p : list) if (p instanceof Uri) uris.add((Uri) p);
        } else if (Intent.ACTION_VIEW.equals(action) && intent.getData() != null) {
            uris.add(intent.getData());
        }
        if (uris.isEmpty() && intent.getClipData() != null && !Intent.ACTION_MAIN.equals(action)) {
            ClipData cd = intent.getClipData();
            for (int i = 0; i < cd.getItemCount(); i++) if (cd.getItemAt(i).getUri() != null) uris.add(cd.getItemAt(i).getUri());
        }
        for (Uri u : uris) {
            sharedUris.add(u);
            sharedNames.add(displayName(u));
        }
        intent.setAction(Intent.ACTION_MAIN); // aynı paylaşım tekrar işlenmesin
    }

    private String displayName(Uri u) {
        String name = null;
        try (Cursor c = getContentResolver().query(u, new String[] {OpenableColumns.DISPLAY_NAME}, null, null, null)) {
            if (c != null && c.moveToFirst()) name = c.getString(0);
        } catch (Exception ignored) {
        }
        if (name == null) name = u.getLastPathSegment();
        return name == null ? "paylasilan" : name;
    }

    private void deliverShared() {
        if (delivered >= sharedUris.size()) return;
        StringBuilder js = new StringBuilder("window.__receiveShared && window.__receiveShared([");
        for (int i = delivered; i < sharedUris.size(); i++) {
            if (i > delivered) js.append(',');
            String type = getContentResolver().getType(sharedUris.get(i));
            js.append("{url:").append(jsString(ORIGIN + "__shared/" + i))
              .append(",name:").append(jsString(sharedNames.get(i)))
              .append(",type:").append(jsString(type == null ? "" : type)).append('}');
        }
        js.append("])");
        delivered = sharedUris.size();
        web.evaluateJavascript(js.toString(), null);
    }

    private static String jsString(String s) {
        StringBuilder b = new StringBuilder("\"");
        for (char c : s.toCharArray()) {
            if (c == '"' || c == '\\') b.append('\\').append(c);
            else if (c < 0x20 || c == 0x2028 || c == 0x2029) b.append(String.format("\\u%04x", (int) c));
            else b.append(c);
        }
        return b.append('"').toString();
    }

    // ---------- WebView: dosyaları sun ----------

    private class AppClient extends WebViewClient {
        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest req) {
            Uri u = req.getUrl();
            if (!HOST.equals(u.getHost())) return null;
            String path = u.getPath();
            if (path == null || path.equals("/") || path.isEmpty()) path = "/index.html";
            Map<String, String> headers = new HashMap<>();
            headers.put("Access-Control-Allow-Origin", "*");
            headers.put("Cache-Control", "no-cache");
            try {
                if (path.startsWith("/__shared/")) {
                    int idx = Integer.parseInt(path.substring("/__shared/".length()));
                    Uri src = sharedUris.get(idx);
                    String type = getContentResolver().getType(src);
                    InputStream in = getContentResolver().openInputStream(src);
                    return new WebResourceResponse(type == null ? "application/octet-stream" : type, null, 200, "OK", headers, in);
                }
                if (path.contains("..")) throw new IOException("bad path");
                InputStream in;
                try {
                    in = getAssets().open("www" + path);
                } catch (IOException notFound) {
                    // aapt .gz dosyalarını açıp uzantıyı siler; Tesseract içeriği kendisi tanır.
                    if (!path.endsWith(".gz")) throw notFound;
                    in = getAssets().open("www" + path.substring(0, path.length() - 3));
                }
                String mime = mimeFor(path);
                String enc = mime.startsWith("text/") || mime.endsWith("javascript") || mime.endsWith("json") || mime.endsWith("manifest+json") ? "utf-8" : null;
                return new WebResourceResponse(mime, enc, 200, "OK", headers, in);
            } catch (Exception e) {
                return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found", headers,
                        new ByteArrayInputStream(new byte[0]));
            }
        }

        // API 24+ sürümü (android-23 ile derlendiği için @Override yok; çalışma anında geçerli)
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
            return openExternal(req.getUrl());
        }

        @Override
        @SuppressWarnings("deprecation")
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            return openExternal(Uri.parse(url));
        }

        private boolean openExternal(Uri u) {
            if (HOST.equals(u.getHost())) return false;
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, u));
            } catch (ActivityNotFoundException ignored) {
            }
            return true;
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            pageReady = true;
            deliverShared();
        }
    }

    private static String mimeFor(String path) {
        String p = path.toLowerCase();
        if (p.endsWith(".html")) return "text/html";
        if (p.endsWith(".js") || p.endsWith(".mjs")) return "text/javascript";
        if (p.endsWith(".css")) return "text/css";
        if (p.endsWith(".json")) return "application/json";
        if (p.endsWith(".webmanifest")) return "application/manifest+json";
        if (p.endsWith(".svg")) return "image/svg+xml";
        if (p.endsWith(".png")) return "image/png";
        if (p.endsWith(".wasm")) return "application/wasm";
        return "application/octet-stream";
    }

    // ---------- Kamera / galeri / PDF seçici ----------

    private class AppChrome extends WebChromeClient {
        @Override
        public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
            if (pendingChooser != null) pendingChooser.onReceiveValue(null);
            pendingChooser = callback;

            Intent camera = cameraIntent();
            Intent toLaunch;
            if (params.isCaptureEnabled() && camera != null) {
                toLaunch = camera;
            } else {
                Intent pick = new Intent(Intent.ACTION_GET_CONTENT);
                pick.addCategory(Intent.CATEGORY_OPENABLE);
                pick.setType("*/*");
                pick.putExtra(Intent.EXTRA_MIME_TYPES, mimeTypes(params.getAcceptTypes()));
                if (params.getMode() == FileChooserParams.MODE_OPEN_MULTIPLE) {
                    pick.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                }
                toLaunch = Intent.createChooser(pick, "Fotoğraf veya dosya seçin");
                if (camera != null) toLaunch.putExtra(Intent.EXTRA_INITIAL_INTENTS, new Intent[] {camera});
            }
            try {
                startActivityForResult(toLaunch, REQ_FILE);
                return true;
            } catch (ActivityNotFoundException e) {
                pendingChooser = null;
                Toast.makeText(MainActivity.this, "Kamera veya dosya seçici bulunamadı", Toast.LENGTH_LONG).show();
                return false;
            }
        }
    }

    private static String[] mimeTypes(String[] accept) {
        List<String> out = new ArrayList<>();
        if (accept != null) {
            for (String a : accept) {
                for (String part : a.split(",")) {
                    String t = part.trim();
                    if (t.isEmpty()) continue;
                    if (t.equals(".pdf")) t = "application/pdf";
                    if (t.contains("/") && !out.contains(t)) out.add(t);
                }
            }
        }
        if (out.isEmpty()) out.add("*/*");
        return out.toArray(new String[0]);
    }

    private Intent cameraIntent() {
        try {
            File dir = new File(getCacheDir(), "camera");
            dir.mkdirs();
            File[] old = dir.listFiles();
            if (old != null) for (File f : old) if (System.currentTimeMillis() - f.lastModified() > 24 * 3600 * 1000L) f.delete();
            cameraFile = new File(dir, "IMG_" + System.currentTimeMillis() + ".jpg");
            cameraUri = Uri.parse("content://" + getPackageName() + ".files/camera/" + cameraFile.getName());
            Intent i = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            i.putExtra(MediaStore.EXTRA_OUTPUT, cameraUri);
            i.setClipData(ClipData.newRawUri("", cameraUri));
            i.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION);
            return i;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode != REQ_FILE) {
            super.onActivityResult(requestCode, resultCode, data);
            return;
        }
        Uri[] result = null;
        if (resultCode == RESULT_OK) {
            List<Uri> uris = new ArrayList<>();
            if (data != null && data.getClipData() != null) {
                ClipData cd = data.getClipData();
                for (int i = 0; i < cd.getItemCount(); i++) {
                    Uri u = cd.getItemAt(i).getUri();
                    if (u != null && !u.equals(cameraUri)) uris.add(u);
                }
            }
            if (uris.isEmpty() && data != null && data.getData() != null && !data.getData().equals(cameraUri)) {
                uris.add(data.getData());
            }
            if (uris.isEmpty() && cameraFile != null && cameraFile.exists() && cameraFile.length() > 0) {
                uris.add(cameraUri);
            }
            if (!uris.isEmpty()) result = uris.toArray(new Uri[0]);
        }
        if (pendingChooser != null) pendingChooser.onReceiveValue(result);
        pendingChooser = null;
    }

    // ---------- Sayfadan çağrılan yardımcılar ----------

    private class Bridge {
        @JavascriptInterface
        public void shareText(final String text) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Intent send = new Intent(Intent.ACTION_SEND);
                    send.setType("text/plain");
                    send.putExtra(Intent.EXTRA_TEXT, text);
                    try {
                        startActivity(Intent.createChooser(send, "Raporu paylaş"));
                    } catch (ActivityNotFoundException ignored) {
                    }
                }
            });
        }

    }
}
