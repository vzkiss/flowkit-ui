"use client";

import * as React from "react";
import {
  Combobox as ComboboxPrimitive,
  ComboboxRootChangeEventDetails,
} from "@base-ui/react";

import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";
import { CheckIcon, Plus } from "lucide-react";

// TODO: rename inputValue to query

// ─── Creatable ────────────────────────────────────────────────────────

export type CreatableItem = {
  creatable: true; // literal true, not boolean
  label: string;
  value: string;
};

const isCreatableItem = (item: unknown): item is CreatableItem => {
  return (
    typeof item === "object" &&
    item !== null &&
    (item as CreatableItem).creatable === true
  );
};

const itemToStringLabel = (item: unknown): string => {
  if (isCreatableItem(item)) return item.value;
  // base-ui default itemToStringLabel behavior
  if (typeof item === "string") return item;
  if (item && typeof item === "object" && "label" in item) {
    return String((item as { label: unknown }).label);
  }
  return String(item);
};

// might need it
const itemToString = (item: unknown): string => {
  if (typeof item === "string") return item;
  if (item && typeof item === "object" && "label" in item)
    return String((item as { label: unknown }).label);
  return String(item);
};

// ─── CreatableCombobox ────────────────────────────────────────────────────────

type ComboboxRootProps = React.ComponentProps<typeof ComboboxPrimitive.Root>;

export type CreatableComboboxProps = ComboboxRootProps & {
  /**
   * Called when the user confirms a new value that doesn't exist in the list.
   * Receives the raw typed string value.
   */
  onCreateValue: (value: string) => void;

  /** Label for the "Create" option. Defaults to `Create "${value}"`. */
  createLabel?: (value: string) => string;

  /** Where the create option appears in the list. Defaults to "first". */
  createOptionPosition?: "first" | "last";
};

/**
 * A combobox that allows the user to create new values.
 * @param props - The props for the creatable combobox.
 * @returns The creatable combobox.
 */
function CreatableCombobox({
  children,
  items = [],
  onCreateValue,
  createLabel = (v) => `Create "${v}"`,
  createOptionPosition = "first",
  ...props
}: CreatableComboboxProps & { className?: string }) {
  // setup state

  const [query, setQuery] = React.useState<string>("");

  const baseItems = items;

  const augmentedItems = (() => {
    if (!query.trim()) return baseItems;

    // mignt need: itemToString

    const trimmed = query.trim();
    const lowered = trimmed.toLocaleLowerCase();
    const exactMatch = baseItems.some(
      (item) => item.label.toLocaleLowerCase() === lowered,
    );

    if (exactMatch) return baseItems;

    // Show the creatable item alongside matches if there's no exact match

    const createItem: CreatableItem = {
      creatable: true,
      label: createLabel(trimmed),
      value: trimmed,
    };

    return createOptionPosition === "first"
      ? [createItem, ...baseItems]
      : [...baseItems, createItem];
  })();

  // event handlers
  const handleValueChange: ComboboxRootProps["onValueChange"] = (
    next: unknown,
    details: ComboboxRootChangeEventDetails,
  ) => {
    console.log("onValueChange", next);

    setQuery("");

    if (isCreatableItem(next)) {
      onCreateValue(next.value);

      return;
    }

    // call the original onValueChange
    props.onValueChange?.(next, details);
  };

  return (
    <Combobox
      {...props}
      items={augmentedItems}
      inputValue={query}
      itemToStringLabel={(item: unknown): string => {
        if (isCreatableItem(item)) return item.value;
        // base-ui default itemToStringLabel behavior
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "label" in item) {
          return String((item as { label: unknown }).label);
        }
        return String(item);
      }}
      onInputValueChange={setQuery}
      onValueChange={handleValueChange}
    >
      {children}
    </Combobox>
  );
}

// Pre-styled item for the "Create …" option.
// function ComboboxItemCreatable({
//   className,
//   children,
//   value,
//   showPlus = true,
//   ...props
// }: Omit<ComboboxPrimitive.Item.Props, "value"> & {
//   value: CreatableItem;
//   showPlus?: boolean;
// }) {
//   return (
//     <ComboboxPrimitive.Item
//       data-creatable
//       data-slot="combobox-item"
//       value={value}
//       className={cn(
//         "relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pl-2 pr-2 text-sm italic text-primary outline-hidden select-none",
//         "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
//         "data-disabled:pointer-events-none data-disabled:opacity-50",
//         "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
//         className,
//       )}
//       {...props}
//     >
//       {showPlus && <Plus className="size-3.5 shrink-0 opacity-60" />}
//       {children ?? value.label}
//     </ComboboxPrimitive.Item>
//   );
// }

function ComboboxItemCreatable({
  className,
  children,
  value,
  showPlus = true,
  ...props
}: Omit<ComboboxPrimitive.Item.Props, "value"> & {
  value: CreatableItem;
  showPlus?: boolean;
}) {
  return (
    <ComboboxPrimitive.Item
      data-creatable
      data-slot="combobox-item"
      value={value}
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {showPlus && <Plus className="size-3.5 shrink-0 opacity-60" />}
      {children ?? value.label}
    </ComboboxPrimitive.Item>
  );
}

export { CreatableCombobox, ComboboxItemCreatable, isCreatableItem };
