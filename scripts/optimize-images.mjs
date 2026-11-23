// Converts the source photos in raw/ into optimised WebP files in src/assets.
// Run with: npm run images   (only needed when you add or replace a photo)
//
// To use a real product photo: put a JPG/PNG in raw/products/<product-id>.jpg
// and run `npm run images`. It overrides the stock photo for that product.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const raw = (...p) => path.join(root, "raw", ...p);
const out = (...p) => path.join(root, "src", "assets", ...p);

// Unsplash photo ids (free licence, https://unsplash.com/license)
const P1 = "photos";
const P2 = "p2";
const productSources = {
  "oh-potato-french-fries": [P1, "1762303441992-ab59156602a4"],
  "breaded-chicken-tenders": [P1, "1647724394693-2c93af726785"],
  "mixed-vegetables": [P1, "1792338933626-171e25d17b90"],
  "vanilla-ice-cream": [P1, "1628815870980-f416105d89b3"],
  "strawberry-yogurt": [P2, "1488477181946-6428a0291777"],
  "schreiber-cheese-sauce": [P2, "1612773843298-44dcdd45d865"],
  "schreiber-cheese-slices": [P2, "1683314573422-649a3c6ad784"],
  "habit-panko": [P2, "1750680229991-726754d4d58b"],
  "habit-penne-rigate": [P1, "1646953568310-8def6eb5a317"],
  "habit-sliced-jalapenos": [P1, "1770353361865-608a07f03ef8"],
  "habit-black-olives": [P1, "1596099477998-880bc06e09f9"],
  "habit-green-olives": [P2, "1622341357129-c460d41da93d"],
  "habit-tomato-puree": [P2, "1472476443507-c7a5948772fc"],
  "habit-olive-pomace-oil": [P2, "1474979266404-7eaacbcd87c5"],
  "nutalia-hazelnut-paste": [P1, "1693858326799-3299d7317f69"],
  "monin-syrups": [P2, "1654074518423-750767f571a9"],
  "chefs-magical-seasoning": [P2, "1591272216626-b09e38519371"],
};

const sceneSources = {
  "hero-main": [P1, "1768204039907-77a974159ef0", 1100, 1300],
  "hero-fries": [P1, "1630384060421-cb20d0e0649d", 560, 560],
  "about-pantry": [P1, "1592178036182-5400889dfc74", 1100, 1300],
  "about-spices": [P2, "1506368249639-73a05d6f6488", 560, 560],
  "banner": [P1, "1623653387945-2fd25214f8fc", 1920, 1080],
};

fs.mkdirSync(out("products"), { recursive: true });
fs.mkdirSync(out("images"), { recursive: true });
fs.mkdirSync(out("instagram"), { recursive: true });

const webp = { quality: 74, effort: 6 };

for (const [id, [dir, file]] of Object.entries(productSources)) {
  const override = ["jpg", "jpeg", "png", "webp"].map((e) => raw("products", `${id}.${e}`)).find(fs.existsSync);
  const src = override ?? raw(dir, `${file}.jpg`);
  for (const w of [480, 800]) {
    await sharp(src).resize(w, Math.round((w * 3) / 4), { fit: "cover", position: "attention" }).webp(webp).toFile(out("products", `${id}-${w}.webp`));
  }
}

for (const [name, [dir, file, w, h]] of Object.entries(sceneSources)) {
  const src = raw(dir, `${file}.jpg`);
  await sharp(src).resize(w, h, { fit: "cover", position: "attention" }).webp(webp).toFile(out("images", `${name}.webp`));
  const sw = Math.round(w / 2);
  await sharp(src).resize(sw, Math.round(h / 2), { fit: "cover", position: "attention" }).webp(webp).toFile(out("images", `${name}-sm.webp`));
}

for (const f of fs.readdirSync(raw("ig")).filter((f) => f.endsWith(".jpg"))) {
  await sharp(raw("ig", f)).resize(560, 700, { fit: "cover" }).webp({ quality: 80 }).toFile(out("instagram", f.replace(".jpg", ".webp")));
}

// Open Graph share image
await sharp(raw(P1, "1768204039907-77a974159ef0.jpg")).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 78 }).toFile(path.join(root, "public", "og-image.jpg"));

console.log("Images optimised.");
