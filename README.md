# The World in One Day — 17 November 2026

[![news-image-20261117](https://make.fun/badge/news-image-20261117.svg)](https://make.fun/bounty/news-image-20261117)
[![rank](https://make.fun/badge/news-image-20261117/mochhidayah/news-image-20261117/rank.svg)](https://make.fun/bounty/news-image-20261117)
[![reward](https://make.fun/badge/news-image-20261117/mochhidayah/news-image-20261117/reward.svg)](https://make.fun/bounty/news-image-20261117)

One image summing up the world's news of **Tuesday 17 November 2026** — a
newspaper front page drawn in HTML/CSS and rendered to `entry.png`.

**Lead stories:** Ukraine brings down part of Putin's Kerch Bridge; the US
and Iran trade fire as Washington strikes Qeshm Island. Plus Nvidia's record
$115bn quarter, 146,000 marching across France, Trump's trip to Shenzhen for
APEC talks with Xi and Putin, the US losing measles-free status, and six more
stories from the day — all reported on 17 November 2026
(BBC, Reuters, Al Jazeera, Le Monde, The Guardian).

## How it works

- `poster.html` — the front page: masthead with the date, lead story with a
  hand-drawn bridge illustration, second story, a four-story grid, and an
  "Also on 17 November" strip. 1024×1024, all text and art inline.
- `scripts/render.mjs` — renders `poster.html` to `entry.png` with headless
  Chrome and checks the gate limits (PNG, ≤1024×1024, ≤1 MiB).
- `main.ts` — the entrypoint: copies `entry.png` to `/output/entry.png`
  (deterministic — the same bytes every run).

```sh
node scripts/render.mjs            # rebuild entry.png from poster.html
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # run the entrypoint
```

## Entry

- Competition: [news-image-20261117](https://make.fun/bounty/news-image-20261117) — $250, free entry
- Deadline: 19 November 2026, 07:00 WIB (19 Nov 00:00 UTC)
