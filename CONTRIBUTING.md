# Contributing

1. Install dependencies with `pnpm install`. If you change dependencies in `package.json`, commit the updated `pnpm-lock.yaml` (CI uses `pnpm install --frozen-lockfile`).
2. Before opening a pull request, run:
   - `pnpm lint`
   - `pnpm types:check`
   - `pnpm registry:validate` (runs `shadcn build` locally, then removes generated `public/r` so it does not conflict with App Router `/r/*`)
   - `pnpm build`
3. Documentation pages live under `content/docs/` (MDX). Component source for the public registry is listed in `registry.json`.
4. **Registry download metrics** (Upstash, `recordRegistryDownload` in `src/lib/upstash-redis.ts`): counters increase once per **successful** `/r/*.json` response. A single `shadcn add` run may trigger **multiple** GETs to the same URL, so totals are **fetch counts**, not unique installs.

Please keep changes focused and consistent with existing patterns in the repo.
