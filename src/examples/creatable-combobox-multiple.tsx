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
  CreatableItem,
} from "@/flowkit/creatable-combobox/creatable-combobox";

type Framework = {
  id: number;
  value: string;
};

const initialFrameworks: Framework[] = [
  { id: 1, value: "Next.js" },
  { id: 2, value: "SvelteKit" },
  { id: 3, value: "Nuxt.js" },
  { id: 4, value: "Remix" },
  { id: 5, value: "Astro" },
];

export default function CreatableComboboxMultiple() {
  const anchor = useComboboxAnchor();

  const [frameworks, setFrameworks] = useState(initialFrameworks);
  const [selected, setSelected] = useState<Framework[]>([frameworks[0]]);

  const handleCreateValue = (value: string) => {
    const newItem = { id: frameworks.length + 1, value };
    setFrameworks((prev: Framework[]) => [...prev, newItem]);
    setSelected((prev: Framework[]) => [...prev, newItem]);
  };

  return (
    <CreatableCombobox
      multiple
      autoHighlight
      items={frameworks}
      value={selected}
      onValueChange={(value) => {
        console.log("multiple value", value);
        setSelected(value as Framework[]);
      }}
      onCreateValue={handleCreateValue}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values: Framework[]) => (
            <React.Fragment>
              {values.map((value: Framework) => (
                <ComboboxChip key={value.id}>{value.value}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Framework | CreatableItem) =>
            isCreatableItem(item as CreatableItem) ? (
              <ComboboxItemCreatable
                key="__create__"
                value={item as CreatableItem}
              />
            ) : (
              <ComboboxItem
                key={(item as Framework).id}
                value={item as Framework}
              >
                {(item as Framework).value}
              </ComboboxItem>
            )
          }
        </ComboboxList>
      </ComboboxContent>
    </CreatableCombobox>
  );
}
