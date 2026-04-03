import { gitConfig } from "@/lib/layout.shared";

/**
 * Canonical site origin. Set `NEXT_PUBLIC_SITE_URL` in production (e.g. `https://flowkit.example.com`).
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
    "Opinionated, accessible React components for production apps—built on shadcn/ui and Base UI.",
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
