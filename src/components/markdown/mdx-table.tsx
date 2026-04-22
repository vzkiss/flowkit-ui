import { PropsTable } from "@/components/markdown/props-table";
import {
  Children,
  isValidElement,
  type ReactNode,
  type ReactElement,
  type ComponentPropsWithRef,
} from "react";

// ─── Markdown table → PropsTable conversion ────────────────────────────────
//
// When a markdown table's first column header is "Prop", this component
// converts it into a <PropsTable> — so the MDX source stays as plain markdown
// (readable on GitHub) while the docs site renders the styled prop table.

function getNodeText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (isValidElement(node))
    return getNodeText((node as ReactElement<{ children?: ReactNode }>).props.children);
  return "";
}

function findByTag(children: ReactNode, tag: string): ReactElement | undefined {
  return Children.toArray(children).find(
    (c) => isValidElement(c) && (c as ReactElement).type === tag,
  ) as ReactElement | undefined;
}

function filterByTag(children: ReactNode, tag: string): ReactElement[] {
  return Children.toArray(children).filter(
    (c) => isValidElement(c) && (c as ReactElement).type === tag,
  ) as ReactElement[];
}

function getCellChildren(cell: ReactElement): ReactNode {
  return (cell as ReactElement<{ children?: ReactNode }>).props.children;
}

export function MdxTable({ children, ...props }: ComponentPropsWithRef<"table">) {
  const thead = findByTag(children, "thead");
  const tbody = findByTag(children, "tbody");

  if (!thead || !tbody) return <table {...props}>{children}</table>;

  const headerRow = findByTag(getCellChildren(thead), "tr");
  if (!headerRow) return <table {...props}>{children}</table>;

  const headers = filterByTag(getCellChildren(headerRow), "th").map((th) =>
    getNodeText(getCellChildren(th)).toLowerCase().trim(),
  );

  if (headers[0] !== "prop") return <table {...props}>{children}</table>;

  const bodyRows = filterByTag(getCellChildren(tbody), "tr");

  const propDefs = bodyRows.map((row) => {
    const cells = filterByTag(getCellChildren(row), "td");
    const cell = (col: string) => cells[headers.indexOf(col)];

    const nameText = getNodeText(getCellChildren(cell("prop"))).trim();
    const typeText = getNodeText(getCellChildren(cell("type"))).trim();

    const rawDefault = cell("default")
      ? getNodeText(getCellChildren(cell("default"))).trim()
      : undefined;
    const defaultVal =
      !rawDefault || rawDefault === "—" || rawDefault === "-"
        ? undefined
        : rawDefault;

    const descCell = cell("description");
    const description = descCell ? getCellChildren(descCell) : undefined;

    return { name: nameText, type: typeText, default: defaultVal, description };
  });

  return <PropsTable props={propDefs} />;
}
