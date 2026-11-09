#!/usr/bin/env bash
# APK derleme (Gradle'sız): Ubuntu paketleri android-sdk-platform-23, aapt, dalvik-exchange, zipalign, apksigner gerekir.
#   sudo apt-get install -y android-sdk-platform-23 aapt dalvik-exchange zipalign apksigner
# İmza anahtarı: KEYSTORE (varsayılan android/koli-kontrol.keystore) yoksa oluşturulur. Güncellemeleri
# aynı anahtarla imzalamak için bu dosyayı saklayın; anahtar değişirse telefonda önce eski uygulama silinmeli.
set -euo pipefail
cd "$(dirname "$0")"
ROOT=..
SDK=/usr/lib/android-sdk
ANDROID_JAR=$SDK/platforms/android-23/android.jar
BT=$SDK/build-tools/debian
KEYSTORE=${KEYSTORE:-koli-kontrol.keystore}
KS_PASS=${KS_PASS:-kolikontrol}
OUT=${OUT:-$ROOT/release/KoliKontrol.apk}

(cd $ROOT && npm run build >/dev/null)

rm -rf build && mkdir -p build/gen build/obj build/assets/www
cp -r $ROOT/dist/. build/assets/www/
rm -f build/assets/www/artifact.html build/assets/www/sw.js

$BT/aapt package -f -m -J build/gen -M AndroidManifest.xml -S res -A build/assets -I "$ANDROID_JAR" \
  -0 wasm -0 gz -F build/unsigned.apk

javac -nowarn -Xlint:-options -source 8 -target 8 -encoding UTF-8 -bootclasspath "$ANDROID_JAR" \
  -d build/obj $(find src build/gen -name '*.java')

$BT/dx --dex --min-sdk-version=23 --output=build/classes.dex build/obj
(cd build && $BT/aapt add -f unsigned.apk classes.dex >/dev/null)

zipalign -f -p 4 build/unsigned.apk build/aligned.apk

if [ ! -f "$KEYSTORE" ]; then
  keytool -genkeypair -keystore "$KEYSTORE" -storepass "$KS_PASS" -keypass "$KS_PASS" -alias kolikontrol \
    -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Koli Kontrol, O=gffrokuyan, C=TR" 2>/dev/null
fi
mkdir -p "$(dirname "$OUT")"
apksigner sign --ks "$KEYSTORE" --ks-pass pass:"$KS_PASS" --ks-key-alias kolikontrol --out "$OUT" build/aligned.apk
apksigner verify "$OUT"
echo "APK hazır: $OUT ($(du -h "$OUT" | cut -f1))"
