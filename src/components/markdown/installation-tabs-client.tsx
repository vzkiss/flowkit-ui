"use client";

import type { ReactNode } from "react";
import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
} from "fumadocs-ui/components/codeblock";

export type InstallationTabPanel = {
  value: string;
  label: string;
  content: ReactNode;
};

export type InstallationTabsClientProps = {
  panels: InstallationTabPanel[];
  groupId?: string;
  defaultValue?: string;
};

export function InstallationTabsClient({
  panels,
  groupId = "package-manager",
  defaultValue = "pnpm",
}: InstallationTabsClientProps) {
  return (
    <CodeBlockTabs defaultValue={defaultValue} groupId={groupId} persist>
      <CodeBlockTabsList>
        {panels.map((p) => (
          <CodeBlockTabsTrigger key={p.value} value={p.value}>
            {p.label}
          </CodeBlockTabsTrigger>
        ))}
      </CodeBlockTabsList>
      {panels.map((p) => (
        <CodeBlockTab key={p.value} value={p.value}>
          <CodeBlock>{p.content}</CodeBlock>
        </CodeBlockTab>
      ))}
    </CodeBlockTabs>
  );
}
