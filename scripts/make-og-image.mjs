// Builds public/og-frozzy.jpg — the 1200×630 link-preview image (WhatsApp,
// Facebook, X). Logo centred so square crops still show the whole badge.
// Run: node scripts/make-og-image.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const favicon = readFileSync(new URL("../public/favicon.svg", import.meta.url), "utf8");
const seal = favicon.match(/<path d="([^"]+)"/)[1];

const FOREST = "#005541";
const CREAM = "#FFF7E8";
const GOLD = "#D8B979";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${FOREST}"/>
  <circle cx="600" cy="-160" r="520" fill="#004B3D"/>
  <circle cx="600" cy="790" r="300" fill="#004B3D"/>
  <g transform="translate(470 40) scale(2.6)">
    <path d="${seal}" fill="${CREAM}"/>
    <path d="M40 34h21v7.5H48.5v6H59V55H48.5v12H40z" fill="${FOREST}"/>
    <path d="M52.5 31.5c4-7 11.5-9 16-8.5-1 5.5-5.5 11-13.5 12z" fill="${FOREST}"/>
  </g>
  <text x="600" y="425" text-anchor="middle" fill="${CREAM}"
        font-family="Georgia, 'Times New Roman', serif" font-size="92" letter-spacing="10">FROZZY</text>
  <text x="600" y="477" text-anchor="middle" fill="${GOLD}"
        font-family="'Segoe UI', Arial, sans-serif" font-weight="600" font-size="30" letter-spacing="12">FROZEN FOODS</text>
  <text x="600" y="552" text-anchor="middle" fill="${CREAM}" fill-opacity="0.8"
        font-family="'Segoe UI', Arial, sans-serif" font-size="27" letter-spacing="3">Wholesale &amp; Retail · Taliparamba, Kannur</text>
</svg>`;

await sharp(Buffer.from(svg))
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(fileURLToPath(new URL("../public/og-frozzy.jpg", import.meta.url)));
console.log("wrote public/og-frozzy.jpg");
