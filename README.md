# Flowkit UI

Documentation site and [shadcn](https://ui.shadcn.com/) registry for Flowkit components—React primitives built on [Base UI](https://base-ui.com/) and Tailwind CSS.

## Requirements

- [Node.js](https://nodejs.org/) 22+ (see [`.nvmrc`](.nvmrc))
- [pnpm](https://pnpm.io/)

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Content lives under [`content/docs/`](content/docs/).

### Checks

```bash
pnpm lint
pnpm types:check
pnpm build
```

## shadcn registry

This repo publishes a registry consumed with the shadcn CLI. Registry source is [`registry.json`](registry.json). Built JSON is emitted to `public/r/` when you run:

```bash
pnpm registry:build
```

The app build runs this automatically (`pnpm build`).

### Use components in another project

1. Deploy this app (or run it locally) so `https://<origin>/r/<item>.json` is reachable.
2. In that project’s `components.json`, add a registry entry whose URL includes the `{name}` placeholder (required by the CLI):

```json
{
  "registries": {
    "@flowkit": "https://<your-docs-origin>/r/{name}.json"
  }
}
```

3. Install dependencies your components need (see each item in [`registry.json`](registry.json)), then add a component:

```bash
pnpm dlx shadcn@latest add @flowkit/creatable-combobox
```

For local testing against `pnpm dev`:

```json
"@flowkit": "http://localhost:3000/r/{name}.json"
```

## Deployment

- **Vercel (recommended):** Connect the GitHub repository, use install command `pnpm install`, build command `pnpm build`, output Next.js default. Set the Node version to match [`.nvmrc`](.nvmrc).
- After deploy, point registry consumers at `https://<your-deployment>/r/{name}.json` and update the `homepage` field in [`registry.json`](registry.json) if you want it to match your public docs URL.

## License

[MIT](LICENSE)
