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

type Label = {
  id: number;
  label: string;
};

const initialLabels: Label[] = [
  { id: 1, label: "Bug" },
  { id: 2, label: "Regression" },
  { id: 3, label: "Breaking change" },
  { id: 4, label: "Tech Debt" },
  { id: 5, label: "Works on my machine" },
];

export default function CreatableComboboxDemo() {
  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [selected, setSelected] = useState<Label | null>(null);

  return (
    <CreatableCombobox
      items={labels}
      value={selected}
      onValueChange={(value) => {
        setSelected(value as Label | null);
      }}
      onCreateValue={(value) => {
        const trimmed = value.trim();
        let created: Label;
        setLabels((prev: Label[]) => {
          created = {
            id: Math.max(0, ...prev.map((l) => l.id)) + 1,
            label: trimmed,
          };
          return [...prev, created].sort((a, b) =>
            a.label.localeCompare(b.label),
          );
        });
        setSelected(created!);
      }}
    >
      <ComboboxInput placeholder="Create a tag..." showClear />
      <ComboboxContent>
        <ComboboxEmpty>No labels match.</ComboboxEmpty>
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
