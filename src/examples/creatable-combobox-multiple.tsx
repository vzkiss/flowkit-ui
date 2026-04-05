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

type IssueLabel = {
  id: number;
  value: string;
};

const initialLabels: IssueLabel[] = [
  { id: 1, value: "Bug" },
  { id: 2, value: "Regression" },
  { id: 3, value: "Breaking change" },
  { id: 4, value: "Tech Debt" },
  { id: 5, value: "Works on my machine" },
];

export default function CreatableComboboxMultiple() {
  const anchor = useComboboxAnchor();

  const [issueLabels, setIssueLabels] = useState(initialLabels);
  const [selected, setSelected] = useState<IssueLabel[]>([issueLabels[0]]);

  const handleCreateValue = (value: string) => {
    const trimmed = value.trim();
    let created: IssueLabel;
    setIssueLabels((prev: IssueLabel[]) => {
      created = {
        id: Math.max(0, ...prev.map((l) => l.id)) + 1,
        value: trimmed,
      };
      return [...prev, created].sort((a, b) => a.value.localeCompare(b.value));
    });
    setSelected((prev: IssueLabel[]) => [...prev, created!]);
  };

  return (
    <CreatableCombobox
      multiple
      autoHighlight
      items={issueLabels}
      value={selected}
      onValueChange={(value) => {
        setSelected(value as IssueLabel[]);
      }}
      onCreateValue={handleCreateValue}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values: IssueLabel[]) => (
            <React.Fragment>
              {values.map((value: IssueLabel) => (
                <ComboboxChip key={value.id}>{value.value}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Create or select a tag..." />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No labels match.</ComboboxEmpty>
        <ComboboxList>
          {(item: IssueLabel | CreatableItem) =>
            isCreatableItem(item as CreatableItem) ? (
              <ComboboxItemCreatable
                key="__create__"
                value={item as CreatableItem}
              />
            ) : (
              <ComboboxItem
                key={(item as IssueLabel).id}
                value={item as IssueLabel}
              >
                {(item as IssueLabel).value}
              </ComboboxItem>
            )
          }
        </ComboboxList>
      </ComboboxContent>
    </CreatableCombobox>
  );
}
