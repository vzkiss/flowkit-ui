import { gitConfig } from "@/lib/layout.shared";

/** Shown under prev/next in DocsPage footer — reads better than the sidebar slot. */
export function DocsAttribution() {
  return (
    <div className="mt-6 border-t border-fd-border pt-6">
      <p className="text-center text-xs leading-relaxed text-fd-muted-foreground sm:text-start">
        Built by{" "}
        <a
          href={gitConfig.userWebsite}
          className="font-medium text-fd-foreground underline underline-offset-2 hover:text-fd-accent-foreground"
          rel="noreferrer"
          target="_blank"
        >
          {gitConfig.user}
        </a>{" "}
        for use with{" "}
        <a
          href="https://ui.shadcn.com"
          className="font-medium text-fd-foreground underline underline-offset-2 hover:text-fd-accent-foreground"
          rel="noreferrer"
          target="_blank"
        >
          shadcn/ui
        </a>
        . The source code is available on{" "}
        <a
          href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
          className="font-medium text-fd-foreground underline underline-offset-2 hover:text-fd-accent-foreground"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
}
