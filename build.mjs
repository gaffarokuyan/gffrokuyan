// Derleme: src/ → dist/ (statik site; Netlify, GitHub Pages veya herhangi bir sunucuda çalışır)
import { build } from "esbuild";
import { cpSync, mkdirSync, rmSync, copyFileSync } from "node:fs";

const out = "dist";
rmSync(out, { recursive: true, force: true });
mkdirSync(`${out}/vendor/core`, { recursive: true });
mkdirSync(`${out}/vendor/lang`, { recursive: true });

await build({
  entryPoints: ["src/app.js"],
  bundle: true,
  format: "esm",
  minify: true,
  target: ["es2020", "safari15"],
  outfile: `${out}/app.js`,
});

for (const f of ["index.html", "styles.css", "sw.js", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png"]) {
  copyFileSync(`src/${f}`, `${out}/${f}`);
}

const nm = "node_modules";
copyFileSync(`${nm}/tesseract.js/dist/tesseract.min.js`, `${out}/vendor/tesseract.min.js`);
copyFileSync(`${nm}/tesseract.js/dist/worker.min.js`, `${out}/vendor/worker.min.js`);
for (const f of ["tesseract-core-lstm", "tesseract-core-simd-lstm"]) {
  copyFileSync(`${nm}/tesseract.js-core/${f}.wasm.js`, `${out}/vendor/core/${f}.wasm.js`);
}
copyFileSync(`${nm}/pdfjs-dist/build/pdf.worker.min.mjs`, `${out}/vendor/pdf.worker.min.mjs`);
cpSync(`${nm}/@tesseract.js-data/tur/4.0.0_best_int/tur.traineddata.gz`, `${out}/vendor/lang/tur.traineddata.gz`);
cpSync(`${nm}/@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz`, `${out}/vendor/lang/eng.traineddata.gz`);

console.log("dist/ hazır");
