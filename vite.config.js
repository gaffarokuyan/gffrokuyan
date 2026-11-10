import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
// Single self-contained index.html: easy to host anywhere and to wrap with Capacitor for Android later.
export default defineConfig({ base: './', plugins: [viteSingleFile()], build: { target: 'es2020', chunkSizeWarningLimit: 2000 } });
