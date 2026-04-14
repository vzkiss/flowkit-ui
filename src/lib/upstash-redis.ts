import { Redis } from "@upstash/redis";

let client: Redis | null | undefined;

function getRedis(): Redis | null {
  if (client !== undefined) return client;

  const url = process.env["flowkit_KV_REST_API_URL"];
  const token = process.env["flowkit_KV_REST_API_TOKEN"];

  if (!url || !token) {
    client = null;
    return null;
  }

  client = new Redis({ url, token });
  return client;
}

const KEY_PREFIX = "flowkit:registry:downloads";

function shouldRecordDownload(): boolean {
  if (process.env.NODE_ENV === "production") return true;
  return process.env.UPSTASH_RECORD_IN_DEV === "1";
}

/**
 * Increments a per-component download counter in Upstash Redis (REST).
 * Keys: `flowkit:registry:downloads:<component>` (e.g. `creatable-combobox`, `registry`).
 *
 * **Semantics:** This counts successful registry **responses** (one `INCR` per successful
 * `getPackage` / registry JSON read). The shadcn CLI often performs **multiple GETs** to the
 * same component URL during one `shadcn add` (resolve, re-read, etc.), so totals reflect
 * **HTTP fetches**, not “one increment per human install.” Do not treat the number as
 * unique installers without additional deduping.
 *
 * Env: `flowkit_KV_REST_API_URL` and `flowkit_KV_REST_API_TOKEN` (Upstash REST).
 * Local Redis testing: set `UPSTASH_RECORD_IN_DEV=1`.
 */
export async function recordRegistryDownload(component: string): Promise<void> {
  if (!shouldRecordDownload()) return;

  const redis = getRedis();
  if (!redis) return;

  const safe =
    component.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 128) || "unknown";
  const key = `${KEY_PREFIX}:${safe}`;

  try {
    await redis.incr(key);
  } catch (error) {
    console.error("[registry analytics] Upstash incr failed", error);
  }
}
