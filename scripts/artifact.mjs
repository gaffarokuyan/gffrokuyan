// Turns dist/index.html into a head-less fragment (dist/artifact.html) for hosts that wrap the page themselves.
import { readFileSync, writeFileSync } from 'node:fs';
const html = readFileSync('dist/index.html', 'utf8');
const grab = (re) => (html.match(re) || [''])[0];
const head = html.slice(0, html.indexOf('</head>'));
const parts = [
  grab(/<title>[\s\S]*?<\/title>/),
  '<meta name="claude:viewport-fit-sides" content="cover">',
  grab(/<link rel="stylesheet"[^>]*>/),
  ...(head.match(/<style[\s\S]*?<\/style>/g) || []),
  html.slice(html.indexOf('<body>') + 6, html.indexOf('</body>')).replace(/<script type="module"[^>]*src=[^>]*><\/script>/, ''),
  ...(head.match(/<script[\s\S]*?<\/script>/g) || []),
];
writeFileSync('dist/artifact.html', parts.join('\n'));
console.log('dist/artifact.html', (parts.join('\n').length / 1024).toFixed(0) + ' kB');
