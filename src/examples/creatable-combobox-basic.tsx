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

// Waku
const initialFrameworks = ["Next.js", "SvelteKit", "Remix", "Waku"] as string[];

export default function ComboboxBasic() {
  const [frameworks, setFrameworks] = useState(initialFrameworks);

  const handleCreateValue = (value: string) => {
    console.log("create value", value);
    setFrameworks((prev) => [...prev, value]);
  };

  return (
    <CreatableCombobox items={frameworks} onCreateValue={handleCreateValue}>
      <ComboboxInput placeholder="Type to add a new framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
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
