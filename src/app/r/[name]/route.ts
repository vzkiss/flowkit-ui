import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Registry JSON filenames from `shadcn build` (e.g. creatable-combobox.json). */
const REGISTRY_JSON_RE = /^[a-z0-9][a-z0-9-]*\.json$/;

let redis: Redis | null | undefined;

/**
 * Prefer `Redis.fromEnv()` (Upstash docs / Vercel integration): reads
 * `UPSTASH_REDIS_REST_*`, or `KV_REST_API_URL` + `KV_REST_API_TOKEN`.
 * Vercel may instead expose prefixed `flowkit_KV_REST_API_*` — handle those explicitly.
 */
function getRedis(): Redis | null {
  if (redis !== undefined) return redis;

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (url && token) {
    redis = Redis.fromEnv();
    return redis;
  }

  const flowkitUrl = process.env["flowkit_KV_REST_API_URL"];
  const flowkitToken = process.env["flowkit_KV_REST_API_TOKEN"];
  if (flowkitUrl && flowkitToken) {
    redis = new Redis({ url: flowkitUrl, token: flowkitToken });
    return redis;
  }

  redis = null;
  return null;
}

async function recordInstall(component: string) {
  const client = getRedis();
  if (!client) return;
  try {
    await Promise.all([
      client.incr(`registry:installs:${component}`),
      client.incr("registry:installs:_total"),
    ]);
  } catch {
    // Do not fail the registry response if Redis is unavailable.
  }
}

export async function GET(
  _req: Request,
  { params }: RouteContext<"/r/[name]">,
) {
  const { name } = await params;
  if (!REGISTRY_JSON_RE.test(name)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const filePath = join(process.cwd(), "public", "r", name);
  let body: Buffer;
  try {
    body = await readFile(filePath);
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }

  const component = name.replace(/\.json$/i, "");
  await recordInstall(component);

  return new NextResponse(new Uint8Array(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
