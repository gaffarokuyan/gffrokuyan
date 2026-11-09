// Derleme: src/ → dist/ (statik site; Netlify, GitHub Pages veya herhangi bir sunucuda çalışır)
import { build } from "esbuild";
import { cpSync, mkdirSync, rmSync, copyFileSync, readFileSync, writeFileSync } from "node:fs";

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

for (const f of ["_headers", "index.html", "styles.css", "sw.js", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png"]) {
  copyFileSync(`src/${f}`, `${out}/${f}`);
}

const nm = "node_modules";
copyFileSync(`${nm}/tesseract.js/dist/tesseract.min.js`, `${out}/vendor/tesseract.min.js`);
copyFileSync(`${nm}/tesseract.js/dist/worker.min.js`, `${out}/vendor/worker.min.js`);
for (const f of ["tesseract-core-lstm", "tesseract-core-simd-lstm"]) {
  copyFileSync(`${nm}/tesseract.js-core/${f}.wasm.js`, `${out}/vendor/core/${f}.wasm.js`);
}
// Ham ESC karakterini kaçış dizisine çevir (bazı barındırıcılar ham kontrol karakterini reddediyor)
writeFileSync(`${out}/vendor/pdf.worker.min.mjs`, readFileSync(`${nm}/pdfjs-dist/build/pdf.worker.min.mjs`, "utf8").replaceAll("\x1b", "\\x1b"));
cpSync(`${nm}/@tesseract.js-data/tur/4.0.0_best_int/tur.traineddata.gz`, `${out}/vendor/lang/tur.traineddata.gz`);
cpSync(`${nm}/@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz`, `${out}/vendor/lang/eng.traineddata.gz`);

console.log("dist/ hazır");

// ---- Claude içinde açılan sürüm (artifact): CSS ve uygulama kodu sayfaya gömülü ----
const html = readFileSync("src/index.html", "utf8");
const css = readFileSync("src/styles.css", "utf8");
const js = readFileSync(`${out}/app.js`, "utf8").replace(/<\/script/gi, "<\\/script");
const body = html.slice(html.indexOf("<body>") + 6, html.indexOf("</body>"))
  .replace('<script src="vendor/tesseract.min.js"></script>', "")
  .replace('<script type="module" src="app.js"></script>', () => `<script type="module">${js}</script>`);
const page = `<title>Koli Baskı Kontrol</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>${css}</style>
${body}`;
writeFileSync(`${out}/artifact.html`, page);
console.log("dist/artifact.html hazır", (page.length / 1024 | 0) + " KB");
