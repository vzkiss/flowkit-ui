import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "public", "r");

/**
 * `shadcn build` emits JSON under `public/r/`, which duplicates the App Router
 * handlers under `src/app/r/` and triggers Next.js "conflicting public file and page".
 * Registry responses are served by those routes instead.
 */
if (existsSync(dir)) {
  rmSync(dir, { recursive: true, force: true });
}
