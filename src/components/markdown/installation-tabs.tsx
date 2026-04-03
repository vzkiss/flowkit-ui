import { highlight } from "fumadocs-core/highlight";
import { Pre } from "fumadocs-ui/components/codeblock";
import { InstallationTabsClient } from "./installation-tabs-client";

const MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;

function shadcnAddCommand(
  manager: (typeof MANAGERS)[number],
  target: string,
): string {
  const t = target.trim();
  switch (manager) {
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${t}`;
    case "npm":
      return `npx shadcn@latest add ${t}`;
    case "yarn":
      return `yarn shadcn@latest add ${t}`;
    case "bun":
      return `bunx --bun shadcn@latest add ${t}`;
    default:
      return `npx shadcn@latest add ${t}`;
  }
}

export type InstallationTabsProps = {
  /** Argument to `shadcn add` — package id or registry JSON URL. */
  target: string;
  /** Matches `remarkNpmOptions.persist.id` in source.config.ts. */
  groupId?: string;
};

/**
 * Package-manager tabs with the same Shiki + `Pre` output as fenced code blocks
 * (`fumadocs-core/highlight` + `rehype-code` defaults), without MDX boilerplate.
 */
export async function InstallationTabs({
  target,
  groupId = "package-manager",
}: InstallationTabsProps) {
  const panels = await Promise.all(
    MANAGERS.map(async (m) => ({
      value: m,
      label: m,
      content: await highlight(shadcnAddCommand(m, target), {
        lang: "bash",
        components: { pre: Pre },
      }),
    })),
  );

  return (
    <InstallationTabsClient
      groupId={groupId}
      defaultValue="pnpm"
      panels={panels}
    />
  );
}
