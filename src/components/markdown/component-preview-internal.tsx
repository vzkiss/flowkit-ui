"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CodeBlock } from "fumadocs-ui/components/codeblock";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "fumadocs-ui/components/ui/tabs";

export type ComponentPreviewInternalProps = {
  children: ReactNode;
  /** Shiki output from `fumadocs-core/highlight` + `Pre`. */
  codeContent: ReactNode;
  previewClassName?: string;
  /** Reserved for future themed previews (e.g. registry style packs). */
  styleName?: string;
};

export default function ComponentPreviewInternal({
  children,
  codeContent,
  previewClassName,
  styleName,
}: ComponentPreviewInternalProps) {
  return (
    <Card
      data-slot="component-preview"
      data-style={styleName}
      className={cn(
        "not-prose group relative flex flex-col gap-0 overflow-hidden rounded-xl bg-transparent p-0 shadow-xs ring-1 ring-foreground/10 ",
      )}
    >
      <Tabs defaultValue="preview" className="gap-0">
        <TabsList className="flex  h-auto w-full justify-start gap-4 rounded-none border-b border-foreground/10 bg-transparent px-3 py-2">
          <TabsTrigger
            value="preview"
            className="text-muted-foreground data-[state=active]:text-foreground"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="text-muted-foreground data-[state=active]:text-foreground"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="preview"
          className={cn(
            "preview relative flex min-h-44 items-center justify-center p-10 outline-none",
            previewClassName,
          )}
        >
          {children}
        </TabsContent>
        <TabsContent value="code" className="mt-0 outline-none">
          <CodeBlock
            className="my-0 rounded-none border-x-0 border-b-0 border-t shadow-none"
            viewportProps={{ className: "max-h-[450px]" }}
          >
            {codeContent}
          </CodeBlock>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
