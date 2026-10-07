// Prepara las imágenes de la web de RIFCLIMA a partir de raw/ia (fotos reales mejoradas con ChatGPT e imágenes
// de marca hechas con ChatGPT; las de pantalla completa, ampliadas ×4 con Real-ESRGAN en raw/ia/x4).
// node tools/images.mjs
import { join, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const sharp = createRequire(import.meta.url)('/Users/silvestrejuanmbantutumoobama/Desktop/miproyecto/basile-travel/node_modules/sharp');

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IA = join(ROOT, 'raw/ia'), OUT = join(ROOT, 'assets/img');
const src = (n) => {
  const x4 = join(IA, 'x4', n + '.png');
  return sharp(existsSync(x4) ? x4 : join(IA, n + '.png')).toColourspace('srgb');
};

// pantalla completa (WebP 2400 y 1600) · [nombre, proporción, punto de interés]
const wide = [['hero', 3 / 2, 'attention'], ['furgoneta', 16 / 9, 'centre']];
for (const [n, ratio, pos] of wide) {
  if (!existsSync(join(IA, n + '.png'))) { console.log('falta', n); continue; }
  for (const w of [2400, 1600]) {
    await src(n).resize(w, Math.round(w / ratio), { fit: 'cover', position: pos, kernel: 'lanczos3' })
      .webp({ quality: 80, smartSubsample: true }).toFile(join(OUT, `${n}-${w}.webp`));
  }
}
if (existsSync(join(IA, 'hero.png'))) await src('hero').resize(1600, 1067, { fit: 'cover' }).jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, 'hero-1600.jpg'));

// azotea real: grande para el mosaico y el fondo de «Por qué»
if (existsSync(join(IA, 'real-azotea.png'))) await src('real-azotea').resize(1600, 1200, { fit: 'cover' }).webp({ quality: 80 }).toFile(join(OUT, 'real-azotea-1600.webp'));

// tarjetas 4:5
const pos = { local: 'north', tecnico: 'centre', 'real-termostato': 'centre', 'real-split': 'centre', 'real-fachada': 'centre', 'real-balcon': 'centre', 'real-esquina': 'centre' };
for (const n of Object.keys(pos)) {
  if (!existsSync(join(IA, n + '.png'))) { console.log('falta', n); continue; }
  await src(n).resize(900, 1125, { fit: 'cover', position: pos[n], kernel: 'lanczos3' })
    .sharpen({ sigma: .5 }).webp({ quality: 82 }).toFile(join(OUT, `${n}-900.webp`));
}
console.log('imágenes listas');
