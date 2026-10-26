import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");

/** @type {{ file: string; maxWidth: number; quality: number }[]} */
const rasterTargets = [
  { file: "images/team-image.webp", maxWidth: 1000, quality: 78 },
  { file: "images/alex-and-dog.webp", maxWidth: 960, quality: 78 },
  { file: "images/happy-people.webp", maxWidth: 1080, quality: 78 },
  { file: "images/hero-desktop.webp", maxWidth: 1280, quality: 88 },
  { file: "images/hero-mobile.webp", maxWidth: 768, quality: 88 },
  { file: "images/alex-and-monica.webp", maxWidth: 960, quality: 78 },
  { file: "images/woman.webp", maxWidth: 960, quality: 78 },
  { file: "images/hero-image-desktop.webp", maxWidth: 1000, quality: 80 },
  { file: "images/horizontal-logo.png", maxWidth: 480, quality: 85 },
  { file: "images/logotipo-branco-azul.png", maxWidth: 480, quality: 85 },
];

async function writePublicFile(relativePath, buffer) {
  const dest = path.join(publicDir, relativePath);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buffer);
  return { relativePath, kb: Math.round(buffer.length / 1024) };
}

async function optimizeRaster({ file, maxWidth, quality }) {
  const inputPath = path.join(publicDir, file);
  const meta = await sharp(inputPath).metadata();
  const width = meta.width ?? maxWidth;

  let pipeline = sharp(inputPath);
  if (width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  if (file.endsWith(".webp")) {
    pipeline = pipeline.webp({ quality, effort: 6 });
  } else if (file.endsWith(".png")) {
    pipeline = pipeline.png({ quality, compressionLevel: 9, palette: true });
  }

  return writePublicFile(file, await pipeline.toBuffer());
}

async function rasterFromEmbeddedSvg(svgRelativePath, outputRelativePath, size) {
  const svgPath = path.join(publicDir, svgRelativePath);
  const svg = await fs.readFile(svgPath, "utf8");
  const match = svg.match(/xlink:href="data:image\/png;base64,([^"]+)"/);
  if (!match) {
    throw new Error(`No embedded PNG in ${svgRelativePath}`);
  }

  const pngBuffer = Buffer.from(match[1], "base64");
  const webpBuffer = await sharp(pngBuffer)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

  return writePublicFile(outputRelativePath, webpBuffer);
}

async function main() {
  console.log("Optimizing assets in public/images and public/icons...\n");

  for (const target of rasterTargets) {
    const result = await optimizeRaster(target);
    console.log(`  ${result.relativePath}: ${result.kb} KB`);
  }

  const svgSources = [
    ["icons/psychologist-blue.svg", "icons/psychologist-blue.webp", 96],
    ["images/schedule-1.svg", "images/schedule-1.webp", 180],
    ["images/schedule-2.svg", "images/schedule-2.webp", 80],
  ];

  for (const [svg, webp, size] of svgSources) {
    const svgPath = path.join(publicDir, svg);
    try {
      await fs.access(svgPath);
    } catch {
      console.log(`  skip ${webp} (source ${svg} not found)`);
      continue;
    }
    const result = await rasterFromEmbeddedSvg(svg, webp, size);
    console.log(`  ${result.relativePath}: ${result.kb} KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
