import Link from "next/link";
import { Check } from "lucide-react";
import CreatableComboboxDemo from "@/examples/creatable-combobox-demo";
import { gitConfig } from "@/lib/layout.shared";

const bullets = [
  {
    title: "Fits your stack",
    body: "Follows shadcn/ui conventions. No second design system to learn.",
  },
  {
    title: "Accessible by default",
    body: "Built on Base UI primitives. Keyboard navigation and ARIA included.",
  },
  {
    title: "Fills the gaps",
    body: "Patterns teams rebuild on every project, done once.",
  },
] as const;

export default function HomePage() {
  const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16 md:py-24">
      <section className="text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
          shadcn/ui components for the patterns shadcn doesn{"'"}t cover
        </h1>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Documentation
          </Link>
          <a
            href={githubUrl}
            className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-5 text-sm font-medium shadow-xs hover:bg-muted"
          >
            GitHub
          </a>
        </div>
      </section>

      <section className="mt-20 w-[85%] mx-auto rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Creatable Combobox
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Multiselect, autocomplete, and creatable items in one control.
              When users should pick from a list or type something new without a
              separate flow.
            </p>
          </div>
          <Link
            href="/docs/components/creatable-combobox"
            className="shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            docs
          </Link>
        </div>
        <div className="mx-auto mt-8 flex w-full max-w-2xl justify-center">
          <CreatableComboboxDemo />
        </div>
      </section>

      <ul className="mt-16 space-y-5 w-[85%] mx-auto">
        {bullets.map((item) => (
          <li key={item.title} className="flex gap-3 text-left">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="size-3.5" aria-hidden />
            </span>
            <div>
              <p className="font-medium leading-snug">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-center max-w-2xl text-sm text-muted-foreground">
        The catalog is small today and will grow over time.
      </p>
    </div>
  );
}
