import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Registry JSON filenames from `shadcn build` (e.g. creatable-combobox.json). */
const REGISTRY_JSON_RE = /^[a-z0-9][a-z0-9-]*\.json$/;

let redis: Redis | null | undefined;

/** REST URL + write-capable token (read-only tokens cannot run INCR). */
function getRedisRestEnv(): { url: string; token: string } | null {
  const pairs: ReadonlyArray<
    readonly [string | undefined, string | undefined]
  > = [
    [process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN],
    [
      process.env["flowkit_KV_REST_API_URL"],
      process.env["flowkit_KV_REST_API_TOKEN"],
    ],
  ];
  for (const [url, token] of pairs) {
    if (url && token) return { url, token };
  }
  return null;
}

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const env = getRedisRestEnv();
  if (!env) {
    redis = null;
    return null;
  }
  redis = new Redis({ url: env.url, token: env.token });
  return redis;
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
