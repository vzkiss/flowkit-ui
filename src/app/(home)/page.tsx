import Link from "next/link";
import { Check } from "lucide-react";
import CreatableComboboxDemo from "@/examples/creatable-combobox-demo";
import { gitConfig } from "@/lib/layout.shared";

const bullets = [
  {
    title: "Fits your stack",
    body: "Follows shadcn/ui conventions so your theme and tooling stay familiar. No second design system to learn.",
  },
  {
    title: "Accessible by default",
    body: "Built on Base UI primitives: focus management, keyboard navigation, and ARIA patterns you can rely on in production.",
  },
  {
    title: "Solves real UI work",
    body: "Each piece targets a concrete problem. Starting with a creatable combobox pattern teams often rebuild from scratch.",
  },
] as const;

export default function HomePage() {
  const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16 md:py-24">
      <section className="text-center">
        {/* <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Flowkit UI
        </h1> 
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Opinionated, accessible React components for production apps, layered
          on shadcn/ui and Base UI. The catalog is small today and will grow
          over time.
        </p>*/}
        <h1 className="text-2xl font-bold tracking-tight sm:text-5xl">
          Opinionated, accessible React components for production apps
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Layered on shadcn/ui and Base UI. The catalog is small today and will
          grow over time.
        </p>
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

      <ul className="mt-16 space-y-5">
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

      <section className="mt-20 rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
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
            Full documentation
          </Link>
        </div>
        <div className="mx-auto mt-8 flex w-full max-w-2xl justify-center">
          <CreatableComboboxDemo />
        </div>
      </section>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        Ready to install?{" "}
        <Link
          href="/docs"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Get started
        </Link>
      </p>
    </div>
  );
}
