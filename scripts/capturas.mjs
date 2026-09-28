// Capturas de cada escena en mobile y escritorio → reports/screens/
// Usa el Chrome instalado por CDP (puppeteer-core). No forma parte del sitio.
//
//   node scripts/capturas.mjs [url]     (por defecto http://localhost:3123)
//
// Requiere puppeteer-core resoluble desde donde se corre (está en el scratchpad de
// la sesión; si no, `npm i -D puppeteer-core` en el proyecto).

import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";

const require = createRequire(process.env.PUPPETEER_DIR ? process.env.PUPPETEER_DIR + "/" : import.meta.url);
const puppeteer = require("puppeteer-core");

const URL = process.argv[2] || "http://localhost:3123";
const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = "reports/screens";
await mkdir(OUT, { recursive: true });

const escenas = ["inicio", "experiencia", "niveles", "metodo", "membresias", "sedes", "contacto"];
const dispositivos = [
  { nombre: "mobile", width: 390, height: 844, dpr: 2, mobile: true },
  { nombre: "desktop", width: 1440, height: 900, dpr: 1, mobile: false },
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"] });
const errores = [];

for (const d of dispositivos) {
  const page = await browser.newPage();
  await page.setViewport({ width: d.width, height: d.height, deviceScaleFactor: d.dpr, isMobile: d.mobile, hasTouch: d.mobile });
  page.on("console", (m) => { if (m.type() === "error") errores.push(`[${d.nombre}] ${m.text()}`); });
  page.on("pageerror", (e) => errores.push(`[${d.nombre}] pageerror: ${e.message}`));
  page.on("requestfailed", (r) => { if (!/\/video\//.test(r.url())) errores.push(`[${d.nombre}] request failed: ${r.url()}`); });

  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${OUT}/${d.nombre}-00-portada.png` });

  // Escritorio: la película se scrubbea; capturo el pico del sol al 95% de la sección
  if (!d.mobile) {
    const alto = await page.evaluate(() => document.getElementById("inicio").offsetHeight);
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(alto * 0.5));
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: `${OUT}/${d.nombre}-01-recorrido.png` });
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(alto - 900));
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: `${OUT}/${d.nombre}-02-sol.png` });
  } else {
    await new Promise((r) => setTimeout(r, 4500));
    await page.screenshot({ path: `${OUT}/${d.nombre}-02-sol.png` });
  }

  let i = 3;
  for (const id of escenas.slice(1)) {
    await page.evaluate((id) => document.getElementById(id).scrollIntoView({ block: "start" }), id);
    await new Promise((r) => setTimeout(r, 1400));
    await page.screenshot({ path: `${OUT}/${d.nombre}-0${i}-${id}.png` });
    i++;
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: `${OUT}/${d.nombre}-0${i}-footer.png` });

  // Foco visible: tabulo tres veces y capturo
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await page.keyboard.press("Tab");
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: `${OUT}/${d.nombre}-foco.png` });
  await page.close();
}

await browser.close();
console.log(errores.length ? "Errores de consola:\n" + errores.join("\n") : "Sin errores de consola.");
