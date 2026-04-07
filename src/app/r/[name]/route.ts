import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Public registry URL is still `/r/{name}.json` (e.g. components.json → flowkit-ui.vzkiss.com/r/…).
 * JSON is built to `.registry/r` (not `public/r`) so Next runs this handler instead of serving static files.
 */
const REGISTRY_JSON_RE = /^[a-z0-9][a-z0-9-]*\.json$/;

let redis: Redis | null | undefined;

function statsEnv(): string {
  const o = process.env.REGISTRY_STATS_ENV?.trim();
  if (o && /^[\w-]+$/i.test(o)) return o.slice(0, 64);
  const v = process.env.VERCEL_ENV;
  if (v === "production" || v === "preview" || v === "development") return v;
  return process.env.NODE_ENV === "production" ? "production" : "development";
}

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const u = process.env["flowkit_KV_REST_API_URL"];
  const t = process.env["flowkit_KV_REST_API_TOKEN"];
  if (u && t) {
    redis = new Redis({ url: u, token: t });
    return redis;
  }
  const u2 = process.env.UPSTASH_REDIS_REST_URL;
  const t2 = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (u2 && t2) {
    redis = new Redis({ url: u2, token: t2 });
    return redis;
  }
  redis = null;
  return null;
}

export async function GET(
  _req: Request,
  { params }: RouteContext<"/r/[name]">,
) {
  const { name } = await params;
  if (!REGISTRY_JSON_RE.test(name)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const filePath = join(process.cwd(), ".registry", "r", name);
  let body: Buffer;
  try {
    body = await readFile(filePath);
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }

  const component = name.replace(/\.json$/i, "");
  const env = statsEnv();
  const r = getRedis();
  if (r) {
    const p = `registry:installs:${env}`;
    try {
      await Promise.all([r.incr(`${p}:${component}`), r.incr(`${p}:_total`)]);
    } catch {
      /* Redis optional */
    }
  }

  return new NextResponse(new Uint8Array(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Registry-Stats-Env": env,
    },
  });
}
