#!/usr/bin/env node
// Convert all JPG/PNG files in public/images/gallery to WebP and delete the originals.
// Run once with `node scripts/convert-gallery.mjs`. Code references in
// src/data/*.ts are updated separately (see commit) to point to .webp.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GALLERY_DIR = path.resolve(__dirname, '../public/images/gallery');

const QUALITY = 82;
const MAX_WIDTH = 2000;

async function listConvertible(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((n) => /\.(jpe?g|png)$/i.test(n));
}

async function convertOne(name) {
  const inPath = path.join(GALLERY_DIR, name);
  const outName = name.replace(/\.(jpe?g|png)$/i, '.webp');
  const outPath = path.join(GALLERY_DIR, outName);

  const inputBytes = (await fs.stat(inPath)).size;

  const img = sharp(inPath, { failOn: 'none' }).rotate();
  const meta = await img.metadata();
  const needsResize = (meta.width ?? 0) > MAX_WIDTH;
  const pipeline = needsResize ? img.resize({ width: MAX_WIDTH, withoutEnlargement: true }) : img;

  await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(outPath);

  const outputBytes = (await fs.stat(outPath)).size;
  await fs.unlink(inPath);
  return { name, outName, inputBytes, outputBytes };
}

async function main() {
  const names = await listConvertible(GALLERY_DIR);
  if (names.length === 0) {
    console.log('No JPG/PNG files left to convert.');
    return;
  }
  console.log(`Converting ${names.length} files...`);

  let totalIn = 0;
  let totalOut = 0;
  const results = [];
  for (const name of names) {
    try {
      const r = await convertOne(name);
      totalIn += r.inputBytes;
      totalOut += r.outputBytes;
      results.push(r);
      const ratio = ((1 - r.outputBytes / r.inputBytes) * 100).toFixed(1);
      console.log(`  ${name} -> ${r.outName}  ${(r.inputBytes / 1024).toFixed(0)} KB -> ${(r.outputBytes / 1024).toFixed(0)} KB (-${ratio}%)`);
    } catch (err) {
      console.error(`  FAILED ${name}: ${err.message}`);
    }
  }

  const totalRatio = ((1 - totalOut / totalIn) * 100).toFixed(1);
  console.log(`\nDone: ${results.length} files. ${(totalIn / 1024 / 1024).toFixed(1)} MB -> ${(totalOut / 1024 / 1024).toFixed(1)} MB (-${totalRatio}%)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
