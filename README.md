# Jake Martin Portfolio

A Next.js portfolio for Jake Martin, built with the App Router, Tailwind CSS, and a small reusable component system.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```

## Structure

- `app/components/global`: shared layout, navigation, typography, links, status, and placeholder-page primitives.
- `app/components/work`: Work-page sections and project-card composition.
- `app/data`: content models for navigation and projects.

Unfinished navigation destinations intentionally render a branded “Page in progress” view instead of a 404.
