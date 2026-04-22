import defaultMdxComponents from "fumadocs-ui/mdx";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { InstallationTabs } from "@/components/markdown/installation-tabs";
import { PropsTable } from "@/components/markdown/props-table";
import { MdxTable } from "@/components/markdown/mdx-table";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    InstallationTabs,
    PropsTable,
    table: MdxTable,
    ...components,
  };
}
