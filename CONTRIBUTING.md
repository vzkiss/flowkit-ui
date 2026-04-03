# Contributing

1. Install dependencies with `pnpm install`. If you change dependencies in `package.json`, commit the updated `pnpm-lock.yaml` (CI uses `pnpm install --frozen-lockfile`).
2. Before opening a pull request, run:
   - `pnpm lint`
   - `pnpm types:check`
   - `pnpm build`
3. Documentation pages live under `content/docs/` (MDX). Component source for the public registry is listed in `registry.json`.

Please keep changes focused and consistent with existing patterns in the repo.
