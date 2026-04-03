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

const initialIssueLabels = [
  "Bug",
  "Regression",
  "Breaking change",
  "Tech Debt",
  "Works on my machine",
];

export default function ComboboxBasic() {
  const [labels, setLabels] = useState(initialIssueLabels);

  const handleCreateValue = (value: string) => {
    setLabels((prev) => [...prev, value].sort((a, b) => a.localeCompare(b)));
  };

  return (
    <CreatableCombobox items={labels} onCreateValue={handleCreateValue}>
      <ComboboxInput placeholder="Select or create an issue label…" />
      <ComboboxContent>
        <ComboboxEmpty>No labels match.</ComboboxEmpty>
        <ComboboxList>
          {(item) =>
            isCreatableItem(item) ? (
              <ComboboxItemCreatable key="__create__" value={item} />
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
