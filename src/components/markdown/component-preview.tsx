import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import { highlight } from "fumadocs-core/highlight";
import { Pre } from "fumadocs-ui/components/codeblock";
import ComponentPreviewInternal from "./component-preview-internal";

const SAFE_EXAMPLE_NAME = /^[a-zA-Z0-9_-]+$/;

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

  const codeContent = await highlight(source, {
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
