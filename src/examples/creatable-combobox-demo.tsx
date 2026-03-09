"use client";

import { useState } from "react";
import {
  Combobox,
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
  isDefault: boolean;
};

const initialTemplates: Template[] = [
  { id: 1, value: "sablon1", label: "Sablon 1", isDefault: false },
  { id: 2, value: "sablon2", label: "Sablon 2", isDefault: true },
  { id: 3, value: "sablon3", label: "Sablon 3", isDefault: false },
  { id: 4, value: "sablon4", label: "Sablon 4", isDefault: false },
  { id: 5, value: "sablon5", label: "Sablon 5", isDefault: false },
  { id: 6, value: "sablon6", label: "Sablon 6", isDefault: false },
  { id: 7, value: "sablon7", label: "Sablon 7", isDefault: false },
];

export default function CreatableComboboxDemo() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [selected, setSelected] = useState<Template | null>(null);

  return (
    <>
      <ComboboxBasic />

      <CreatableCombobox
        items={templates}
        // value={selected}
        // onValueChange={(value) => setSelected(value as Template | null)}
        onCreateValue={(value) => {
          // TODO
          const newItem = {
            id: Math.floor(Math.random() * 1000000),
            value,
            label: value,
            isDefault: false,
          };

          // TODO: handled internally
          // add save
          setTemplates((prev) => [...prev, newItem]);
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
    </>
  );
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

function ComboboxBasic() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
