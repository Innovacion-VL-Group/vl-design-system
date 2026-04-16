#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ASSETS_DIR = join(__dirname, '..', 'assets');
const OUTPUT_FILE = join(__dirname, '..', 'assets-base64.json');

const ASSETS = [
  'bg-dark-1.webp',
  'bg-dark-2.webp',
  'bg-dark-3.webp',
  'bg-dark-4.webp',
  'bg-dark-5.webp',
  'bg-dark-6.webp',
  'bg-dark-7.webp',
  'bg-dark-8.webp',
  'bg-light-1.webp',
  'bg-light-2.webp',
  'bg-light-3.webp'
];

function convertAssetToBase64(assetName) {
  const filePath = join(ASSETS_DIR, assetName);
  
  if (!existsSync(filePath)) {
    throw new Error(`Asset file not found: ${filePath}`);
  }

  const fileBuffer = readFileSync(filePath);
  const base64 = fileBuffer.toString('base64');
  return `data:image/webp;base64,${base64}`;
}

function generateAssetsBase64() {
  const assetsBase64 = {};
  let successCount = 0;
  let errorCount = 0;

  ASSETS.forEach((asset) => {
    try {
      assetsBase64[asset] = convertAssetToBase64(asset);
      console.info(`✅ Converted: ${asset}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error converting ${asset}:`, error.message);
      errorCount++;
    }
  });

  writeFileSync(OUTPUT_FILE, JSON.stringify(assetsBase64, null, 2));
  console.info(`\n✅ ${successCount} assets converted successfully`);
  
  if (errorCount > 0) {
    console.warn(`⚠️  ${errorCount} assets failed to convert`);
    process.exit(1);
  }
}

generateAssetsBase64();
