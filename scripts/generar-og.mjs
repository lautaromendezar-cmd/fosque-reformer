// Imagen Open Graph (1200×630) para WhatsApp y redes → public/og.jpg
// El sol del salón como fondo, oscurecido abajo, y el lockup del manual en hueso.
// Sin texto tipográfico: no hay Baloo instalada en el sistema y el lockup ya es la marca.
//
//   node scripts/generar-og.mjs

import sharp from "sharp";
import { readFileSync } from "node:fs";

const W = 1200, H = 630;
const lockup = readFileSync("public/logo-lockup.svg", "utf8");
const paths = lockup.match(/<path[^>]*\/>/g).join("");
const [vx, vy, vw, vh] = lockup.match(/viewBox="([^"]+)"/)[1].split(" ").map(Number);

// El lockup ocupa 380 px de ancho, abajo a la izquierda
const ancho = 380, esc = ancho / vw, alto = vh * esc;
const x = 72, y = H - 72 - alto;

const capa = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.35" stop-color="#1c1310" stop-opacity="0"/>
      <stop offset="1" stop-color="#1c1310" stop-opacity="0.82"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g transform="translate(${x} ${y}) scale(${esc}) translate(${-vx} ${-vy})" fill="#efe7dd">${paths}</g>
</svg>`);

await sharp("assets/source/renders/salon-sol-reformers-negros.jpg")
  .resize(W, H, { fit: "cover", position: "centre" })
  .modulate({ brightness: 0.96 })
  .composite([{ input: capa }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/og.jpg");

const meta = await sharp("public/og.jpg").metadata();
console.log(`public/og.jpg ${meta.width}×${meta.height}, ${Math.round(meta.size / 1024)} KB`);
