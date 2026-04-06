import { gitConfig } from "@/lib/layout.shared";

/**
 * Canonical site origin for metadata, sitemap, and OG URLs.
 *
 * Uses `NEXT_PUBLIC_SITE_URL` when set (e.g. `https://flowkit-ui.vzkiss.com` in Vercel
 * project env or `.env.local`). Otherwise `VERCEL_URL` on Vercel, else localhost.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Flowkit UI",
  titleTemplate: "%s | Flowkit UI",
  description:
    "Patterns teams rebuild on every project, done once. Each one targets a concrete problem. Built on shadcn/ui and Base UI.",
  keywords: [
    "React",
    "components",
    "shadcn",
    "Base UI",
    "Tailwind CSS",
    "accessible",
    "Flowkit",
    "UI",
  ],
  /** Default Open Graph / Twitter image (docs index). */
  defaultOgImagePath: "/og/docs/image.webp",
} as const;

export const siteAuthor = {
  name: gitConfig.user,
  url: gitConfig.userWebsite,
} as const;
