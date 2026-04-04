import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import { highlight } from "fumadocs-core/highlight";
import { Pre } from "fumadocs-ui/components/codeblock";
import ComponentPreviewInternal from "./component-preview-internal";

const SAFE_EXAMPLE_NAME = /^[a-zA-Z0-9_-]+$/;

/**
 * Map internal `@/flowkit/…` imports to `@/components/…` for the Code tab.
 *
 * - `@/flowkit/creatable-combobox/creatable-combobox` → `@/components/creatable-combobox`
 *   (drops the registry folder segment; keeps the file/module path after it)
 * - `@/flowkit/custom-component` → `@/components/custom-component` (no nested folder)
 */
function rewriteFlowkitPathsForDocsPreview(source: string): string {
  let s = source;
  // Multi-segment: @/flowkit/<folder>/<rest> → @/components/<rest>
  s = s.replace(/@\/flowkit\/[^/]+\/(.+)/g, "@/components/$1");
  // Single-segment: @/flowkit/<module> → @/components/<module>
  s = s.replace(/@\/flowkit\/([^/"'\s]+)/g, "@/components/$1");
  return s;
}

export type ComponentPreviewProps = {
  /** Basename of `src/examples/{name}.tsx` (no path segments). */
  name: string;
  children: ReactNode;
  previewClassName?: string;
  /** Reserved for future themed previews (e.g. registry style packs). */
  styleName?: string;
};

export default async function ComponentPreview({
  name,
  children,
  previewClassName,
  styleName,
}: ComponentPreviewProps) {
  if (!SAFE_EXAMPLE_NAME.test(name)) {
    throw new Error(
      `ComponentPreview: invalid name "${name}". Use only letters, numbers, hyphens, and underscores.`,
    );
  }

  const filePath = path.join(process.cwd(), "src", "examples", `${name}.tsx`);
  const source = await readFile(filePath, "utf-8");
  const displaySource = rewriteFlowkitPathsForDocsPreview(source);

  const codeContent = await highlight(displaySource, {
    lang: "tsx",
    components: { pre: Pre },
  });

  return (
    <ComponentPreviewInternal
      previewClassName={previewClassName}
      styleName={styleName}
      codeContent={codeContent}
    >
      {children}
    </ComponentPreviewInternal>
  );
}
