# CMS operations

## Architecture and environments

Payload is embedded in the Next.js app. `/admin` serves Payload Admin, `/api` serves its REST API, and no GraphQL route is mounted. Runtime code always uses the pooled `DATABASE_URL`; migrations, dumps, restores, and administrative tools use `DATABASE_URL_UNPOOLED`.

The implementation baseline is Next `16.2.10`, React/React DOM `19.2.7`, Payload and every explicit `@payloadcms/*` package `3.86.0`, Sharp `0.35.3`, tsx `4.23.1`, Vitest `4.1.10`, and Playwright `1.61.1`. Payload's supported Next range includes 16.2.6 and newer within Next 16. The original plan named Sharp 0.34.5; implementation revalidated package metadata and selected the current 0.35.3 release. React 19's stricter lint rules required hydration/menu state cleanup in the existing theme and navigation components; visual behavior is unchanged.

Provision Neon through Vercel Marketplace, then keep exactly two durable branches:

- `staging`: local development, the persistent `stage` deployment, and all ordinary Preview deployments.
- `production`: the Production deployment only.

Disable Neon's branch-per-Preview integration. Preview variables must never contain production database, Blob, Payload, or preview secrets. Use one nonproduction Blob store and one production Blob store.

Configure all variables documented in `.env.example`. Vercel-hosted environments also require `BLOB_READ_WRITE_TOKEN`. Set `APP_ENV=staging` on Preview/stage and `APP_ENV=production` on Production. Vercel's deployment URL takes precedence for the active origin, so preview links do not point at production.

Local development uses staging credentials but defaults to the gitignored `media/` directory. Set `USE_VERCEL_BLOB=true` only when deliberately testing the nonproduction Blob store. Pull only staging-scoped variables into `.env.local`.

## Administrator and editorial workflow

On an empty database, open `/admin/create-first-user` and use Payload's supported first-user flow. There is no anonymous user-create override. After initialization, Users reads and all mutations require authentication.

Projects combine cards and optional case studies in one draft/publication state. To enable a case study, provide its summary, hero media, explicit SEO title and description, and at least one block. A case study and external URL are mutually exclusive. Homepage ordering is curated in the `homepage` Global; if it is empty, the frontend falls back to published projects sorted by `sortOrder`.

Draft preview requires both an authenticated Payload session and the environment's preview secret. Public helpers explicitly disable drafts, preserve access control, and filter for `_status=published`. Public reads are dynamic and uncached across requests, so publish/unpublish changes do not require a rebuild. Cache Components remain deferred.

## Types and migrations

Schema push is disabled everywhere because local, stage, and Preview share staging. Every schema change requires a committed migration.

```bash
npm run payload:generate-types
npm run payload:migrate-create -- descriptive_name
npm run payload:migrate-status
npm run payload:migrate
```

Review generated SQL before committing. `payload:migrate` and `payload:migrate-status` validate that the pooled and direct URLs target the same Neon endpoint, database, and user; reject cross-environment hosts; replace `DATABASE_URL` only in the child migration process; and serialize by environment with a Postgres advisory lock.

`npm run vercel-build` validates configuration, then migrates only when `VERCEL_ENV=production` or when a Preview is built from the `stage` branch. Ordinary Preview builds never migrate. Any failed validation, migration, lint, typecheck, or build stops deployment. Prefer additive, backward-compatible migrations and expand-and-contract for destructive changes.

## Importing existing content

The importer supports dry runs, explicit environment selection, production confirmation, media checksums, slug/path upserts, ordered relationships, and JSON reporting.

```bash
npm run cms:import -- --environment=staging --dry-run
npm run cms:import -- --environment=staging
npm run cms:import -- --environment=production --confirm-production
```

Run it twice in staging and confirm the second report contains no duplicate records or relationships. It preserves sort orders 10–70 and Homepage order with Datadog first. A database failure after a Blob upload can leave an unreferenced object; use the reported source path/checksum to identify and delete the orphan in the Vercel Blob dashboard.

Before production import, back up through the direct URL and inspect the archive:

```bash
pg_dump "$DATABASE_URL_UNPOOLED" --format=custom --file=payload-production.dump
pg_restore --list payload-production.dump
```

Restore to a fresh database or confirmed maintenance target with `pg_restore --clean --if-exists --no-owner --dbname "$DATABASE_URL_UNPOOLED" payload-production.dump`. Never run dump/restore through the pooled URL.

## Media policy

Allowed uploads are JPEG, PNG, WebP, AVIF, GIF, SVG, MP4, WebM, and PDF. Images are capped at 8 MiB and 8000×8000; videos at 25 MiB; PDFs at 10 MiB. Card raster images must be square, videos require a poster, and hosted uploads use direct client upload. Payload does not transcode video, create adaptive streams, generate posters, or provide analytics.

Blob objects are public even if attached only to a draft. Do not upload confidential, private, or NDA-restricted media. Keep such assets outside Payload until private delivery exists.

## Rollback and recovery

For code rollback, redeploy the prior compatible commit. Do not roll back an additive database migration merely because a later build failed. For destructive changes, restore the verified dump to a fresh Neon branch, validate it, then deliberately change the environment binding. The original local assets and source content remain in `public/` and `app/data/` as rollback/import inputs until migration acceptance.
