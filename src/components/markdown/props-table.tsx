import type { ReactNode } from "react";
import { MinusIcon } from "lucide-react";

export type PropDef = {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description?: ReactNode;
};

export type PropsTableProps = {
  props: PropDef[];
};

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto ">
      <table className="w-full m-0!">
        <thead className="text-sm">
          <tr className="border-b border-fd-border bg-fd-muted/40">
            <th className="p-3 text-left font-medium text-fd-muted-foreground">
              Prop
            </th>
            <th className="p-3 text-left font-medium text-fd-muted-foreground">
              Default
            </th>
            <th className="p-3 text-left font-medium text-fd-muted-foreground">
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={
                i < props.length - 1 ? "border-b border-fd-border" : undefined
              }
            >
              <td className="p-3 align-top">
                <code className="rounded  bg-red-500/10 px-1.5 py-0.5 font-mono text-xs  text-red-400">
                  {prop.name}
                </code>
                {prop.required && (
                  <span className="ml-1.5 align-middle text-xs  text-red-400">
                    *
                  </span>
                )}
              </td>
              <td className="p-3 align-top text-fd-muted-foreground">
                {prop.default ? (
                  <code className="font-mono text-xs">{prop.default}</code>
                ) : (
                  <span>
                    <MinusIcon className="size-3.5" />
                  </span>
                )}
              </td>
              <td className="p-3 align-top">
                <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-xs text-fd-foreground">
                  {prop.type}
                </code>
                {prop.description && (
                  <p className="mt-1.5 mb-0 text-sm leading-relaxed text-fd-muted-foreground">
                    {prop.description}
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
