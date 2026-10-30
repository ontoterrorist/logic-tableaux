/* Une src/ en un solo archivo: index.html, el juego (también para GitHub Pages)
   (fuentes, fondos y dibujos de Minerva incrustados: funciona sin internet). */
const fs = require('fs'), path = require('path');
const src = f => fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');
const b64 = f => fs.readFileSync(f).toString('base64');

const FONTS = [['Jersey 20', 'jersey20.woff2'], ['VT323', 'vt323.woff2'], ['Press Start 2P', 'pressstart2p.woff2']];
const fontCss = FONTS.map(([name, file]) =>
  `@font-face { font-family: '${name}'; font-style: normal; font-weight: 400; font-display: block; src: url(data:font/woff2;base64,${b64(path.join(__dirname, 'src', 'fonts', file))}) format('woff2'); }`).join('\n');

/* fondos de los mundos (los de Logic Advance): src/bg/w<k>.png pasa a la variable --img-w<k> */
const bgDir = path.join(__dirname, 'src', 'bg');
const bgs = fs.existsSync(bgDir) ? fs.readdirSync(bgDir).filter(f => /^(w\d+|title)\.png$/.test(f)).sort() : [];
const bgCss = bgs.length ? ':root {\n' + bgs.map(f => `  --img-${f.slice(0, -4)}: url(data:image/png;base64,${b64(path.join(bgDir, f))});`).join('\n') + '\n}' : '';

/* Minerva: src/minerva/<expresión>.png y, si existen, <expresión>-blink.png y <expresión>-talk.png */
const MOODS = ['neutral', 'happy', 'sad', 'think', 'brave'];
const pDir = path.join(__dirname, 'src', 'minerva');
const uri = f => (fs.existsSync(path.join(pDir, f)) ? 'data:image/png;base64,' + b64(path.join(pDir, f)) : undefined);
const minerva = {};
MOODS.forEach(m => { const base = uri(m + '.png'); if (base) minerva[m] = { base, blink: uri(m + '-blink.png'), talk: uri(m + '-talk.png') }; });

/* contenido: content.js (piezas comunes) y un archivo por mundo en src/worlds/ */
const wDir = path.join(__dirname, 'src', 'worlds');
const worlds = fs.readdirSync(wDir).filter(f => /^w\w+\.js$/.test(f)).sort().map(f => fs.readFileSync(path.join(wDir, f), 'utf8'));
const js = [src('logic.js'), src('tableau.js'), src('sem.js'), src('content.js'), ...worlds, 'window.CONTENT.finish();', src('ui.js')].join('\n');
if (/<\/script/i.test(js)) throw new Error('el código contiene </script> y rompería la página');

const html = src('index.template.html')
  .replace('/*CSS*/', () => fontCss + '\n' + bgCss + '\n' + src('style.css'))
  .replace('/*COMMON*/', () => src('music.js') + `\nwindow.LA_PULPO = ${JSON.stringify(minerva)};`)
  .replace('/*MAIN*/', () => js);
const out = path.join(__dirname, 'index.html');   // GitHub Pages
fs.writeFileSync(out, html);
console.log(`${out} ${Math.round(html.length / 1024)} KB · ${bgs.length} fondos · ${Object.keys(minerva).length} expresiones de Minerva`);
module.exports = { html };
