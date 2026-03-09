// import { OpenInV0Button } from "@/components/open-in-v0-button";

import { Card } from "@/components/ui/card";

interface ComponentPreviewProps {
  title: string;
  name: string;
  children: React.ReactNode;
}

export default function ComponentPreview({
  title,
  name,
  children,
}: ComponentPreviewProps) {
  return (
    // <div className="relative flex min-h-[450px] flex-col gap-4 rounded-xl border p-4">
    <Card
      data-slot="component-preview"
      className="group relative flex flex-col gap-4 rounded-xl border p-4 bg-transparent"
    >
      {/* <div className="flex items-center justify-between">
        <h2 className="text-muted-foreground text-sm sm:pl-3">{title}</h2>
         <div className="flex items-center gap-2">
          <OpenInV0Button className="w-fit" name={name} />
        </div> 
      </div> */}
      <div className="preview relative flex h-72 items-center justify-center p-10">
        {children}
      </div>
    </Card>
  );
}
