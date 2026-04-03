"use client";

import { useState } from "react";
import {
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  CreatableCombobox,
  ComboboxItemCreatable,
  isCreatableItem,
} from "@/flowkit/creatable-combobox/creatable-combobox";

type Template = {
  id: number;
  value: string;
  label: string;
};

const initialTemplates: Template[] = [
  { id: 1, value: "sablon1", label: "Sablon 1" },
  { id: 2, value: "sablon2", label: "Sablon 2" },
  { id: 3, value: "sablon3", label: "Sablon 3" },
  { id: 4, value: "sablon4", label: "Sablon 4" },
  { id: 5, value: "sablon5", label: "Sablon 5" },
];

export default function CreatableComboboxDemo() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [selected, setSelected] = useState<Template | null>(null);

  return (
    <CreatableCombobox
      items={templates}
      value={selected}
      onValueChange={(value) => {
        console.log("value", value);
        setSelected(value as Template | null);
      }}
      onCreateValue={(value) => {
        const newItem = {
          id: templates.length + 1,
          value: value.trim().toLowerCase(),
          label: value,
        };

        setTemplates((prev: Template[]) => {
          const newTemplates = [...prev, newItem].sort((a, b) =>
            a.label.localeCompare(b.label),
          );
          return newTemplates;
        });
        setSelected(newItem);
      }}
    >
      <ComboboxInput placeholder="Select or create a template…" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No templates found.</ComboboxEmpty>
        <ComboboxList>
          {(item) =>
            isCreatableItem(item) ? (
              <ComboboxItemCreatable key="__create__" value={item}>
                {item.label}
              </ComboboxItemCreatable>
            ) : (
              <ComboboxItem key={item.id} value={item}>
                {item.label}
              </ComboboxItem>
            )
          }
        </ComboboxList>
      </ComboboxContent>
    </CreatableCombobox>
  );
}
