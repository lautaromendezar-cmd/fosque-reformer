// Optimiza los renders de assets/source/renders → public/img
// Genera AVIF + WebP en varios anchos y un blur placeholder (base64) por imagen.
// Salida: public/img/<nombre>-<ancho>.{avif,webp} y lib/imagenes.generado.json
//
// Correr:  npm run imagenes
// Volver a correr cuando lleguen los renders originales: pisa todo.

import sharp from "sharp";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ORIGEN = "assets/source/renders";
const DESTINO = "public/img";
const ANCHOS = [480, 960, 1440, 1920];
const manifiesto = {};

await mkdir(DESTINO, { recursive: true });
const archivos = (await readdir(ORIGEN)).filter((f) => /\.(png|jpe?g)$/i.test(f));

for (const archivo of archivos) {
  const nombre = archivo.replace(/\.[^.]+$/, "");
  const entrada = sharp(path.join(ORIGEN, archivo));
  const meta = await entrada.metadata();
  // anchos menores al original, más el original (no se escala hacia arriba)
  const anchos = ANCHOS.filter((w) => w < meta.width).concat([meta.width]);
  const unicos = [...new Set(anchos)].sort((a, b) => a - b);

  for (const w of unicos) {
    const base = path.join(DESTINO, `${nombre}-${w}`);
    await entrada.clone().resize({ width: w }).avif({ quality: 55, effort: 6 }).toFile(`${base}.avif`);
    await entrada.clone().resize({ width: w }).webp({ quality: 78, effort: 5 }).toFile(`${base}.webp`);
  }

  // blur placeholder: 24px de ancho, webp, base64
  const blur = await entrada.clone().resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  manifiesto[nombre] = {
    width: meta.width,
    height: meta.height,
    anchos: unicos,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
    // Hash del render de origen: va en la URL (?v=) porque /img se sirve con cache immutable
    // de un año y los nombres no cambian. Sin esto, quien ya entró ve la imagen vieja.
    v: createHash("md5").update(await readFile(path.join(ORIGEN, archivo))).digest("hex").slice(0, 8),
  };
  console.log(`✓ ${nombre} ${meta.width}×${meta.height} → ${unicos.join(", ")}`);
}

await mkdir("lib", { recursive: true });
await writeFile("lib/imagenes.generado.json", JSON.stringify(manifiesto, null, 2));
console.log(`\n${archivos.length} imágenes → ${DESTINO}/ + lib/imagenes.generado.json`);
