import CreatableComboboxDemo from "@/examples/creatable-combobox-demo";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">Flowkit UI</h1>
      <p className="my-2">
        A collection of accessible, simple drop-in components built with
        shadcn/ui and Base UI.
        <br />
        The catalog is still small, it will grow over time.
      </p>
      <div className="mx-auto mt-8 w-full max-w-2xl text-start">
        <h2 className="text-lg font-bold mb-2">Creatable Combobox</h2>
        <p className="text-sm text-muted-foreground mb-4">
          A flexible input control with multiselect, autocomplete, and creatable
          support.
        </p>
        <div className="mx-auto mt-8 w-full max-w-64 text-start">
          <CreatableComboboxDemo />
        </div>
      </div>
    </div>
  );
}
