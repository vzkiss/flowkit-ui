"use client";

import * as React from "react";
import { useState } from "react";
import {
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import {
  CreatableCombobox,
  ComboboxItemCreatable,
  isCreatableItem,
} from "@/flowkit/creatable-combobox/creatable-combobox";

const initialFrameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

export default function CreatableComboboxMultiple() {
  const anchor = useComboboxAnchor();

  const [frameworks, setFrameworks] = useState(initialFrameworks);

  const handleCreateValue = (value: string) => {
    setFrameworks((prev) => [...prev, value]);
  };

  return (
    <CreatableCombobox
      multiple
      autoHighlight
      items={frameworks}
      defaultValue={[frameworks[0]]}
      onCreateValue={handleCreateValue}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) =>
            isCreatableItem(item) ? (
              <ComboboxItemCreatable key="__create__" value={item}>
                {item.label}
              </ComboboxItemCreatable>
            ) : (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )
          }
        </ComboboxList>
      </ComboboxContent>
    </CreatableCombobox>
  );
}
