"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";

// ─── Creatable marker ─────────────────────────────────────────────────────────
//
// Following the base-ui creatable example pattern:
// https://base-ui.com/react/components/combobox#creatable
//
// Instead of a boolean flag, `creatable` holds the raw typed string.
// This means isCreatableItem doubles as a type guard AND gives you the original
// query back without any extra state — `item.creatable` is the value to create.

export type WithCreatable<T> = T & { creatable: string };

export function isCreatableItem<T>(item: T): item is WithCreatable<T> {
  return (
    typeof item === "object" &&
    item !== null &&
    "creatable" in (item as object) &&
    typeof (item as WithCreatable<T>).creatable === "string"
  );
}

// ─── CreatableCombobox ────────────────────────────────────────────────────────

type ComboboxRootProps = React.ComponentProps<typeof ComboboxPrimitive.Root>;

export type CreatableComboboxProps = ComboboxRootProps & {
  /** Called when the user selects the synthetic create option. Receives the raw typed string. */
  onCreateValue: (value: string) => void;
  /** Label for the create option. Defaults to `Create "${value}"`. */
  createLabel?: (value: string) => string;
  /** Where the create option appears. Defaults to "first". */
  createOptionPosition?: "first" | "last";
};

export function CreatableCombobox({
  children,
  items = [],
  onCreateValue,
  onValueChange,
  onInputValueChange,
  createLabel = (v) => `Create "${v}"`,
  createOptionPosition = "first",
  ...props
}: CreatableComboboxProps) {
  const [query, setQuery] = React.useState("");

  const augmentedItems = React.useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return items;

    const lowered = trimmed.toLocaleLowerCase();
    const exactMatch = (items as { label?: string; value?: string }[]).some(
      (item) =>
        (item.label ?? item.value ?? String(item)).toLocaleLowerCase() ===
        lowered,
    );
    if (exactMatch) return items;

    // `creatable` holds the raw query — consistent with the base-ui example.
    // The label is separately rendered by ComboboxItemCreatable.
    const createItem = {
      ...({} as (typeof items)[number]),
      creatable: trimmed,
    };

    return createOptionPosition === "first"
      ? [createItem, ...items]
      : [...items, createItem];
  }, [query, items, createOptionPosition]);

  const handleInputValueChange: ComboboxRootProps["onInputValueChange"] = (
    value,
    details,
  ) => {
    // Sync query for augmentation. base-ui handles the input display itself —
    // we do NOT pass inputValue back to the root, so there's no echo loop.
    setQuery(value);
    onInputValueChange?.(value, details);
  };

  const handleValueChange: ComboboxRootProps["onValueChange"] = (
    next,
    details,
  ) => {
    if (isCreatableItem(next)) {
      onCreateValue(next.value);
      setQuery("");
      return;
    }
    onValueChange?.(next, details);
    setQuery("");
  };

  return (
    <Combobox
      {...props}
      items={augmentedItems}
      onInputValueChange={handleInputValueChange}
      onValueChange={handleValueChange}
    >
      {children}
    </Combobox>
  );
}

// ─── ComboboxItemCreatable ────────────────────────────────────────────────────

export function ComboboxItemCreatable<T>({
  className,
  children,
  item,
  createLabel = (v) => `Create "${v}"`,
  ...props
}: Omit<ComboboxPrimitive.Item.Props, "value"> & {
  item: WithCreatable<T>;
  createLabel?: (value: string) => string;
}) {
  return (
    <ComboboxPrimitive.Item
      data-creatable
      data-slot="combobox-item"
      value={item}
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pl-2 pr-2 text-sm italic text-primary outline-hidden select-none",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <Plus className="size-3.5 shrink-0 opacity-60" />
      {children ?? createLabel(item.creatable)}
    </ComboboxPrimitive.Item>
  );
}
