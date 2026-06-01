import fs from "node:fs";
import sharp from "sharp";

function extractPngs(svgPath) {
  const text = fs.readFileSync(svgPath, "utf8");
  const re =
    /<image id="([^"]+)"[^>]*xlink:href="data:image\/png;base64,([^"]*)"/g;
  const out = {};
  let match;
  while ((match = re.exec(text))) {
    out[match[1]] = Buffer.from(match[2], "base64");
  }
  return out;
}

const pngs = extractPngs(new URL("../public/hero-eco.svg", import.meta.url));
if (!pngs.image0_2007_22 || !pngs.image1_2007_22) {
  throw new Error("Missing embedded PNG layers in hero-eco.svg");
}

const W = 720;
const H = 738;
const bg = "#d5ece7";

const layer0 = await sharp(pngs.image0_2007_22)
  .resize(Math.round(720.004), Math.round(718.195), { fit: "fill" })
  .ensureAlpha()
  .png()
  .toBuffer();

const layer0Half = await sharp(layer0)
  .composite([
    {
      input: Buffer.from([255, 255, 255, 128]),
      raw: { width: 1, height: 1, channels: 4 },
      tile: true,
      blend: "dest-in"
    }
  ])
  .toBuffer();

const layer1 = await sharp(pngs.image1_2007_22)
  .resize(Math.round(601.788), Math.round(730.05), { fit: "fill" })
  .png()
  .toBuffer();

const composed = await sharp({
  create: {
    width: W,
    height: H,
    channels: 4,
    background: bg
  }
})
  .composite([
    { input: layer0Half, left: 0, top: 0 },
    {
      input: layer1,
      left: Math.round(70.9069),
      top: Math.round(7.68579)
    }
  ])
  .webp({ quality: 88, effort: 4 })
  .toBuffer();

const outPath = new URL("../public/hero-eco.webp", import.meta.url);
fs.writeFileSync(outPath, composed);

const meta = await sharp(composed).metadata();
console.log(
  `hero-eco.webp: ${meta.width}x${meta.height}, ${composed.length} bytes`
);
