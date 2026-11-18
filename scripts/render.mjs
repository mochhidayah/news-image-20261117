// Render poster.html to entry.png with headless Chrome, then verify the
// gate limits: PNG (or JPEG), at most 1024x1024 px, at most 1 MiB.
// Run from the repo root:  node scripts/render.mjs
// Requires a headless Chrome/Chromium binary (CHROME env var or the
// usual install paths). Exits non-zero if the image breaks a limit.

import { execFileSync } from 'node:child_process';
import { existsSync, statSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTER = join(ROOT, 'poster.html');
const OUT = join(ROOT, 'entry.png');
const SIZE = 1024;
const MAX_BYTES = 1048576;

const CHROME_CANDIDATES = [
  process.env.CHROME,
  process.env.HOME + '/.cache/ms-playwright/chromium-1255/chrome-linux/chrome',
  '/opt/meta-chromium/chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error('no headless Chrome found; set CHROME to its path');
  process.exit(1);
}

execFileSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    `--window-size=${SIZE},${SIZE}`,
    `--screenshot=${OUT}`,
    `file://${POSTER}`,
  ],
  { stdio: 'inherit' },
);

const bytes = statSync(OUT).size;
const png = readFileSync(OUT);
const isPng = png[0] === 0x89 && png[1] === 0x50 && png[2] === 0x4e && png[3] === 0x47;
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);

console.log(`entry.png: ${bytes} bytes, ${width}x${height}, PNG=${isPng}`);
if (!isPng) throw new Error('output is not a PNG');
if (width > SIZE || height > SIZE) throw new Error(`image is ${width}x${height}, over ${SIZE}x${SIZE}`);
if (bytes > MAX_BYTES) throw new Error(`image is ${bytes} bytes, over the 1 MiB cap`);
console.log('OK: within the gate limits');
