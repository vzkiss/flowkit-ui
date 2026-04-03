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
  value: string;
  label: string;
};

const initialLabels: Label[] = [
  { id: 1, value: "bug", label: "Bug" },
  { id: 2, value: "regression", label: "Regression" },
  { id: 3, value: "breaking-change", label: "Breaking change" },
  { id: 4, value: "tech-debt", label: "Tech Debt" },
  { id: 5, value: "works-on-my-machine", label: "Works on my machine" },
];

export default function CreatableComboboxDemo() {
  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [selected, setSelected] = useState<Label | null>(null);

  return (
    <CreatableCombobox
      items={labels}
      value={selected}
      onValueChange={(value) => {
        console.log("value", value);
        setSelected(value as Label | null);
      }}
      onCreateValue={(value) => {
        const trimmed = value.trim();
        let created: Label;
        setLabels((prev: Label[]) => {
          created = {
            id: Math.max(0, ...prev.map((l) => l.id)) + 1,
            value: trimmed.toLowerCase().replace(/\s+/g, "-"),
            label: trimmed,
          };
          return [...prev, created].sort((a, b) =>
            a.label.localeCompare(b.label),
          );
        });
        setSelected(created!);
      }}
    >
      <ComboboxInput placeholder="Select or create an issue label…" showClear />
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
