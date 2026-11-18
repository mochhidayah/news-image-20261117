// News-image entrypoint (Node 22, standard library only).
//
// The image is built ahead of time by scripts/render.mjs from poster.html
// (a hand-drawn newspaper front page of 17 November 2026) and shipped as
// entry.png beside this file. The grader runs this program with no network,
// so all this does is place the finished image at /output/entry.png —
// deterministic by construction: the same bytes in, the same bytes out.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, 'entry.png'), join(outDir, 'entry.png'));
