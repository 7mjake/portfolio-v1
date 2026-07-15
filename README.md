# Jake Martin Portfolio

A Next.js portfolio with Payload CMS embedded in the same App Router application. The public site, Payload Admin, and REST API deploy together; project and case-study content is stored in Postgres and hosted media can use Vercel Blob.

## Development

1. Copy `.env.example` to `.env.local` and fill it with staging-only credentials.
2. Install and validate:

   ```bash
   npm install
   npm run cms:validate-env
   npm run payload:generate-types
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).
Payload Admin is at [http://localhost:3000/admin](http://localhost:3000/admin). On an empty database, use Payload's built-in first-user screen.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Structure

- `app/(frontend)`: public routes with unchanged URLs.
- `app/(payload)`: Payload Admin and REST routes. GraphQL routes are intentionally absent.
- `cms`: collections, blocks, access rules, environment validation, and generated Payload types.
- `migrations`: reviewed Payload/Postgres migrations.
- `scripts`: guarded migrations and idempotent content import tooling.
- `app/components/global`: shared layout, navigation, typography, links, status, and placeholder-page primitives.
- `app/components/work`: Work-page sections and project-card composition.
- `app/data`: rollback/import source content; frontend routes do not read CMS content from these modules.

Unfinished navigation destinations intentionally render a branded “Page in progress” view instead of a 404.

See [docs/cms-operations.md](docs/cms-operations.md) for Neon, Vercel, Blob, migration, import, publishing, restore, and rollback procedures.
