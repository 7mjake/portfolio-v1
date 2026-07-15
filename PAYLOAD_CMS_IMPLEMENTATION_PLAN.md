# Payload CMS Implementation Plan

## Status and purpose

This is the canonical, standalone implementation plan for adding Payload CMS to this repository. It is intended to be sufficient context for a new Codex thread without access to the conversation that produced it.

Planning is complete. No Payload implementation has been started as of July 15, 2026. Before editing, confirm the worktree state and re-inspect any repository files that have changed since this plan was written.

The work is a CMS migration, not a redesign. Preserve the existing portfolio UI and behavior while replacing hardcoded project and case-study content with Payload-managed content.

## Required outcome

Embed Payload in the existing Next.js application and deploy the combined frontend, Payload Admin, and Payload API on Vercel.

Use:

- The existing Next.js portfolio application.
- Payload embedded in the same application.
- Vercel for the frontend, Payload Admin, and API.
- Neon provisioned through Vercel Marketplace.
- Two persistent Neon branches: `staging` and `production`.
- The persistent `staging` branch for local development, the persistent staging deployment, and ordinary Vercel Preview deployments.
- The persistent `production` branch only for production.
- `@payloadcms/db-postgres`, using standard PostgreSQL connections.
- A pooled `DATABASE_URL` for Payload and application traffic.
- A direct `DATABASE_URL_UNPOOLED` for migrations, dumps, restores, and administrative tools.
- `@payloadcms/storage-vercel-blob` for CMS-managed production and hosted staging media.
- One nonproduction Blob store and one production Blob store.

Do not use:

- `@payloadcms/db-vercel-postgres`.
- Automatic Neon branch-per-Preview behavior.
- A separate Projects and Case Studies collection.
- GraphQL unless a concrete consumer is identified later.
- Cache Components as a phase-one dependency.
- Automatic schema push against the shared staging branch.
- Custom anonymous Users access for first-admin creation.
- A new `/work` listing page.
- A general-purpose page builder or unrelated redesign.

## Repository findings

At the time of planning:

- The worktree was clean on branch `stage`.
- The app uses the Next.js App Router.
- Content is hardcoded in:
  - `app/data/projects.ts`
  - `app/data/caseStudies.ts`
- Seven project cards render on `/`; navigation labels `/` as Work.
- There is no `/work` index page.
- Datadog is the first project and must remain first.
- Only Dairy Queen has a full case study at `/work/dairy-queen`.
- Other projects are currently non-linking cards.
- Card behavior is represented by `access: 'private' | 'in-progress'` and an optional `href`.
- The existing renderer supports:
  - Rich text.
  - Standalone media.
  - Content plus media.
  - Metrics.
  - Quotes.
  - Ordered related projects.
- Dairy Queen details currently include role, team, timeframe, project phase, platform, and project type. There is no distinct client-organization field.
- Existing project covers are 1080 by 1080 pixels.
- Case-study images are no larger than approximately 2240 by 2265 pixels and 4 MiB.
- `rewards.mp4` is approximately 15.4 MiB and requires a direct client upload path on Vercel.
- The app currently has no Payload, Postgres, Blob, environment-example, migration, test, CI, or Vercel configuration.
- Existing lint and build passed before this migration.
- The existing build statically embeds the hardcoded content and pre-generates Dairy Queen.
- `package.json` declares Next.js 15.5.9, while the previously installed modules contained 15.5.2 and the lockfile resolved 15.5.9. Begin dependency work from a clean install state.
- Payload needs an App Router layout separate from the portfolio layout. Move public routes under `(frontend)` and add Payload under `(payload)` without changing URLs.
- `siteSettings` is not justified in phase one. Navigation, footer, hero copy, and other general site content remain code-managed.

The current project order is:

1. Datadog
2. Fleetio
3. Dairy Queen
4. Domino's
5. BiteClub
6. Ascensus
7. Dexcom

## Dependency strategy

Before installation, check current stable package metadata and select a mutually compatible set. Pin all explicit `payload` and `@payloadcms/*` dependencies to exactly the same version. Do not use version ranges for them.

The compatible set selected during planning was:

| Package | Planned version |
|---|---:|
| `next` | `16.2.10` |
| `react` | `19.2.7` |
| `react-dom` | `19.2.7` |
| `payload` | `3.86.0` |
| `@payloadcms/next` | `3.86.0` |
| `@payloadcms/db-postgres` | `3.86.0` |
| `@payloadcms/richtext-lexical` | `3.86.0` |
| `@payloadcms/storage-vercel-blob` | `3.86.0` |
| `@payloadcms/live-preview-react` | `3.86.0` |
| `sharp` | `0.34.5` |
| `tsx` | `4.23.1` |
| `vitest` | `4.1.10` |
| `@playwright/test` | `1.61.1` |

Also align:

- `eslint-config-next` with Next.js.
- `@types/react` and `@types/react-dom` with React 19.2.
- `engines.node` to `>=20.9.0`.

Revalidate these versions when implementation starts because package releases can change. Record the installed versions and any relevant breaking changes in the completed implementation documentation.

Keep TypeScript, ESLint, Tailwind, PostCSS, Motion, Three.js, and other existing dependencies unchanged unless integration requires a change.

Do not add:

- `@payloadcms/graphql`.
- A direct `graphql` dependency unless the selected Payload packages require it as a peer dependency. If package resolution requires it, install it only as an internal dependency while keeping the GraphQL API disabled.
- A direct `pg` or `cross-env` dependency unless the final migration implementation genuinely needs one.

Validate all existing visual and Three.js packages after the React and Next.js upgrade.

## Target repository structure

### Runtime and configuration

- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `tsconfig.json`
- `eslint.config.mjs`
- `.gitignore`
- `.env.example`
- `vercel.json`
- `payload.config.ts`
- `cms/env.ts`
- `cms/payload-types.ts`

### App Router

Move the public application into:

- `app/(frontend)/layout.tsx`
- `app/(frontend)/page.tsx`
- `app/(frontend)/about/page.tsx`
- `app/(frontend)/fun/page.tsx`
- `app/(frontend)/resume/page.tsx`
- `app/(frontend)/work/[slug]/page.tsx`

Keep shared components under `app/components`.

Add Payload's supported Next.js App Router files under `app/(payload)`, including:

- The Payload-specific layout.
- Admin catch-all routes.
- REST API catch-all routes.
- The generated import map.

Do not add GraphQL or GraphQL playground routes.

### CMS configuration

- `cms/collections/Users.ts`
- `cms/collections/Media.ts`
- `cms/collections/Projects.ts`
- `cms/globals/Homepage.ts`
- `cms/blocks/RichText.ts`
- `cms/blocks/Media.ts`
- `cms/blocks/ContentMedia.ts`
- `cms/blocks/Metrics.ts`
- `cms/blocks/Quote.ts`
- `cms/access/*`
- `cms/payload-types.ts`, generated and committed

### Frontend content layer

- `app/lib/content/public.ts`
- `app/lib/content/preview.ts`
- `app/lib/content/normalizeProject.ts`
- `app/types/content.ts`

Update the existing project and case-study components to consume generated Payload data through stable UI-facing view models. Do not spread raw Payload relationship unions throughout the component tree.

### Operations and migration

- `scripts/validate-environment.mjs`
- `scripts/run-payload-migrations.mjs`
- `scripts/import-content.ts`
- `scripts/import/sourceContent.ts`
- `scripts/import/convertRichText.ts`
- `migrations/*`
- `tests/unit/*`
- `tests/integration/*`
- `tests/e2e/*`
- `vitest.config.*`
- `playwright.config.*`
- `docs/cms-operations.md`

## Payload configuration

Configure Payload with:

- The provider-neutral `postgresAdapter` from `@payloadcms/db-postgres`.
- `DATABASE_URL` only in the main configuration.
- A small application-side pool:

```ts
postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URL,
    max: 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
  },
  push: false,
})
```

- Payload secrets from server-only environment variables.
- Lexical as the rich-text editor.
- Sharp for image handling.
- Drafts, versions, autosave, authenticated preview, and responsive live-preview breakpoints.
- Generated TypeScript output at `cms/payload-types.ts`.
- GraphQL disabled at the root configuration using the exact supported setting for the installed Payload version.
- REST and Local API support.
- CORS and CSRF origins derived from validated environment URLs.

The main Payload configuration must never read `DATABASE_URL_UNPOOLED`, contain a migration flag, or silently switch connection strings.

## Content model

### `users` collection

- Enable Payload authentication.
- Use email and password only.
- One administrator role is sufficient; do not add a roles field in phase one.
- Require authentication for ordinary reads, creates, updates, and deletes.
- Use Payload's supported `/admin/create-first-user` initialization when the collection is empty.
- Do not implement custom anonymous create access.
- After initialization, all user data and mutations remain protected.

### `media` collection

Fields:

- `alt`: required.
- `caption`: optional.
- `poster`: optional relationship to another Media record; required for video.
- `sourcePath`: hidden, unique, and indexed for imports.
- `sourceChecksum`: hidden and indexed SHA-256 checksum.

Payload upload metadata provides filename, URL, MIME type, dimensions, and size.

Allowed content:

- Images: JPEG, PNG, WebP, AVIF, GIF, and SVG.
- Video: pre-encoded MP4 and WebM.
- Documents: PDF.

Validation:

- Images: maximum 8 MiB.
- Videos: maximum 25 MiB.
- PDFs: maximum 10 MiB.
- Raster images: maximum 8000 by 8000 pixels.
- Project-card images must be square raster images.
- Video records require poster images.
- Normalize filenames to lowercase kebab-case while preserving collision safety.
- Enable direct client uploads for files above Vercel's server upload limit.

Vercel Blob is suitable for portfolio images, documents, posters, and modest pre-encoded clips. Do not implement transcoding, adaptive bitrate streaming, multiple codecs, automatic poster generation, large source-video storage, or video analytics.

Public Blob URLs are accessible even when the corresponding record is attached only to a draft.

> Do not upload confidential, private, or NDA-restricted assets unless private media delivery is implemented.

Sensitive material stays outside Payload in phase one.

### `projects` collection

Use one collection for project cards and optional case studies. Enable drafts, autosave, and version history. A project card and its case study share one publication state.

Use tabs or groups to keep the Admin form manageable.

#### Project Card tab

- `title`: required.
- `slug`: required, unique, and indexed.
- `shortDescription`: required.
- `tags`: ordered text array.
- `accessStatus`: `none`, `private`, or `in-progress`.
- `externalURL`: optional validated URL; allowed only when the case study is disabled.

#### Case Study tab

Conditionally show these fields when `caseStudyEnabled` is true:

- `summary`
- `role`
- `team`
- `timeline`
- `projectPhase`
- `platform`
- `projectType`
- `clientOrganization`, optional
- `blocks`
- `relatedProjects`, an ordered self-referential relationship that excludes the current project

Leave `clientOrganization` blank during the initial import because the existing content has no distinct value.

#### Media tab

- `cardImage`: required image relationship.
- `heroMedia`: required when a case study is enabled.
- Block media is selected within individual blocks.

#### SEO tab

- `metaTitle`
- `metaDescription`
- `socialImage`

Fallbacks are project title, short description, and card image. Import Dairy Queen's explicit existing title and description unchanged.

#### Publishing tab

- `caseStudyEnabled`
- `sortOrder`: required nonnegative integer and indexed
- Payload `_status` remains the authoritative draft/published state

Validation:

- Enabling a case study requires summary, hero media, explicit SEO fields, and at least one content block.
- `caseStudyEnabled` and `externalURL` are mutually exclusive.
- Related projects cannot include the current project.

Link resolution:

1. Published project with enabled case study: `/work/[slug]`.
2. Disabled case study with external URL: external link.
3. Otherwise: non-linking card with its existing chip behavior.

`accessStatus` is presentation only. It does not implement password protection.

Initial `sortOrder` values are 10, 20, 30, 40, 50, 60, and 70 in the existing order.

### Blocks

Implement the existing structured content only:

- `richText`: eyebrow, heading, and Lexical body.
- `media`: media relationship and contained, wide, or full width.
- `contentMedia`: eyebrow, heading, Lexical body, media, optional metrics, and stacked or split layout.
- `metrics`: heading and ordered value/label items.
- `quote`: quote, attribution, relationship, and optional logo image.

Do not add a general-purpose page builder.

### `homepage` Global

- Add an ordered, required `featuredProjects` relationship array.
- Enable drafts, autosave, and versions.
- The published homepage uses relationship order and omits projects that are no longer published.
- Populate all seven initial projects in the current order, with Datadog first.
- If the Global is missing or empty, fall back to published projects sorted by `sortOrder`.
- Treat the fallback as availability protection, not the normal curation mechanism.

## Access control

### Users

- Anonymous users cannot read Users.
- Ordinary user mutations require authentication.
- Payload's built-in first-user flow handles initial administration setup.
- Versions and authentication-sensitive endpoints remain protected.

### Projects

- Anonymous users may read published records only.
- Authenticated administrators may create, edit, preview, publish, unpublish, delete, and access versions.

### Media

- Anonymous reads are allowed for public portfolio assets.
- Uploads, updates, and deletes require authentication.
- Draft-only media is unlisted, not private.

### Homepage

- Anonymous users may read the published version.
- Authenticated administrators may edit, preview, publish, unpublish, and access versions.

### Public Local API helpers

Every public project query must explicitly include the equivalent of:

```ts
overrideAccess: false,
draft: false,
where: {
  _status: {
    equals: 'published',
  },
},
```

Verify the exact API shape against the installed Payload version.

Also:

- Do not pass an administrator user to public helpers.
- Keep public helpers separate from authenticated preview helpers.
- Prefer shallow queries and resolve media and relationships intentionally.
- Never expose drafts, versions, users, or mutations anonymously.

### Preview helpers

- Require a valid Payload session and preview secret.
- Pass the authenticated user with `overrideAccess: false` and `draft: true`.
- Never call a public cached helper.
- Return unauthorized or 404 when authentication fails.
- Use the current environment's database and media configuration.

## Environment architecture

### Persistent Neon branches

Create exactly two durable branches:

- `staging`
- `production`

Do not configure Neon deployment actions that create a branch per Vercel Preview.

### Production

- Persistent production Neon branch.
- Pooled `DATABASE_URL`.
- Direct `DATABASE_URL_UNPOOLED`.
- Production Blob store and token.
- Production Payload and preview secrets.
- `APP_ENV=production`.
- No schema push.

### Persistent staging deployment

- Persistent staging Neon branch.
- Pooled and direct staging URLs.
- Shared nonproduction Blob store and token.
- Staging-only Payload and preview secrets.
- `APP_ENV=staging`.
- No schema push.

The repository's `stage` branch should be the only Preview branch authorized to run staging migrations.

### Ordinary Vercel Preview deployments

- Use the persistent staging Neon branch.
- Use the shared nonproduction Blob store.
- Use staging-only secrets.
- Never receive production credentials.
- Never run migrations automatically.
- Never create or delete Neon branches.

These deployments share staging content. Destructive CMS testing in arbitrary Preview deployments is out of scope.

### Local development

- Use the same persistent staging Neon branch.
- Use pooled and direct staging URLs.
- Default to gitignored local filesystem media.
- Allow explicit opt-in to the shared nonproduction Blob store for Blob-specific testing.
- Never receive production credentials.
- Never use schema push.

Because staging is shared, all schema changes must be represented by committed migrations rather than local Drizzle push behavior.

## Environment variables

Required server/runtime variables:

```text
APP_ENV
DATABASE_URL
DATABASE_URL_UNPOOLED
PAYLOAD_SECRET
PREVIEW_SECRET
NEXT_PUBLIC_SERVER_URL
STAGING_NEON_HOST
PRODUCTION_NEON_HOST
BLOB_PUBLIC_HOSTNAME
PRODUCTION_BLOB_HOSTNAME
```

Hosted environments using Vercel Blob also require:

```text
BLOB_READ_WRITE_TOKEN
```

Optional local-only controls may include an explicit flag to enable the nonproduction Blob adapter. Do not expose any server secret through `NEXT_PUBLIC_*`.

Environment scoping:

- Production variables contain only production database, Blob, and secrets.
- The persistent `stage` branch and ordinary Preview deployments contain only staging database, nonproduction Blob, and staging secrets.
- Local `.env.local` contains staging database credentials and local-only secrets. It does not contain production credentials.
- Use branch-specific Vercel Preview variables for `stage` where required.
- Derive Preview deployment origins from Vercel's deployment URL when a fixed `NEXT_PUBLIC_SERVER_URL` would incorrectly point to production.

Add startup and build validation that fails without printing credential values.

## Migration design

### Main rule

Payload runtime uses `DATABASE_URL`. Migrations and administration use `DATABASE_URL_UNPOOLED`.

Never make the main Payload configuration select between URLs.

### Migration wrapper

Implement `scripts/run-payload-migrations.mjs` with Node built-ins where possible.

It must:

1. Require `APP_ENV` to be exactly `staging` or `production`.
2. Require both database URLs; never fall back if the direct URL is missing.
3. Parse both URLs without logging credentials.
4. Verify that the runtime URL uses a Neon pooled hostname.
5. Verify that the migration URL uses the direct hostname.
6. Verify that the normalized endpoint, database, and user match.
7. Require the direct hostname to equal `STAGING_NEON_HOST` or `PRODUCTION_NEON_HOST` according to `APP_ENV`.
8. Spawn the Payload CLI in a child process with `DATABASE_URL` explicitly replaced by `DATABASE_URL_UNPOOLED`.
9. Propagate nonzero exit codes.

Keep the validation small and deterministic. Do not infer environment from vague substrings or add a Payload migration flag.

### Concurrency

- Only the persistent staging deployment runs staging migrations.
- Ordinary Preview deployments never migrate.
- Only the production deployment pipeline runs production migrations.
- Configure deployment or CI concurrency so only one migration job per environment can run at a time.
- If the actual deployment system cannot guarantee serialization, add a small Postgres advisory lock to the wrapper at that point. Do not add it preemptively.

### Migration scripts

Add scripts equivalent to:

```text
payload generate:types
payload migrate:create
payload migrate
payload migrate:status
```

Route migrate and migrate-status commands through the direct-URL wrapper.

Generate and commit:

- Payload types.
- The initial database migration.
- All future migration files.
- Import tooling.
- Seed tooling only where it provides repeatable test setup.

Never use automatic schema push in production, staging, Preview, or local development under this shared-staging design.

## Deployment flow

### Persistent staging deployment

```text
install dependencies
generate and verify Payload types
lint
typecheck
run committed migrations against staging with the direct URL
build
deploy the persistent stage branch
```

Migration failure must fail the deployment.

### Ordinary Preview deployment

```text
install dependencies
generate and verify Payload types
lint
typecheck
build against the existing staging schema
deploy
```

Ordinary Preview deployments do not run migrations. Code that requires a new schema must wait until its reviewed migration is applied through the persistent staging deployment.

### Production deployment

```text
install dependencies
generate and verify Payload types
lint
typecheck
run committed migrations against production with the direct URL
build
deploy
```

Migration and build are not one atomic transaction. Therefore:

- Prefer backward-compatible migrations.
- Use expand-and-contract for destructive schema changes.
- Add schema first.
- Deploy compatible readers and writers.
- Backfill.
- Remove obsolete schema in a later reviewed release.
- Do not drop or rename a field required by the currently deployed app in the same release.
- Review every production migration file.

## Public querying and phase-one caching

Cache Components are an optional compatibility spike, not a phase-one architectural dependency.

### Phase-one baseline

- Query Payload dynamically from server components.
- Remove `generateStaticParams` and `dynamicParams = false` from the case-study route.
- Do not embed the CMS dataset during `next build`.
- Use explicitly published-only Local API queries for public routes.
- Use request-level memoization where helpful to deduplicate metadata and page queries within one request.
- Do not introduce shared cross-request content caching initially.
- Draft preview remains authenticated and uncached.
- Static assets and Blob media may use normal browser, CDN, and image caching.

This baseline ensures:

- A newly published project works without a rebuild.
- Unpublishing removes it without stale tagged content.
- Public routes cannot receive draft records from a shared cache.
- Preview responses cannot leak into public caching.

### Optional Cache Components spike

After the uncached CMS migration passes acceptance tests, run a bounded spike for:

- `use cache` compatibility with the installed Next.js and Payload versions.
- Cache tags for homepage, project listing, individual project, and related projects.
- Correct publish, update, slug-change, unpublish, delete, and homepage-order invalidation.
- Draft/public cache isolation.
- Vercel build and runtime behavior.

Adopt Cache Components only if the spike passes. If adopted, centralize tag naming and add Payload revalidation hooks. Do not block phase one on it.

## Draft and preview workflow

Enable:

- Drafts.
- Autosave.
- Version history.
- Authenticated preview.
- Responsive live-preview breakpoints.

Preview must:

- Require a Payload-authenticated administrator.
- Validate `PREVIEW_SECRET`.
- Read drafts using the authenticated preview helper.
- Bypass public helper caching.
- Use staging resources on local, staging, and ordinary Preview deployments.
- Use production resources only on production.
- Never expose draft content through public queries or shared caches.

Because card and case-study content share one record, they share one draft and publication state. This is acceptable for phase one.

## Frontend preservation requirements

Replace hardcoded imports with server-only Payload queries and generated types while preserving:

- `/` as the existing work/project listing.
- `/work/[slug]` for enabled case studies.
- Existing project-card markup and layout.
- Current responsive behavior.
- Status and access chips.
- Existing internal, external, and non-linking card behavior.
- Metadata fallbacks and Dairy Queen's explicit metadata.
- Related-project ordering and rendering.
- Missing-page and 404 behavior.
- Existing content block rendering.
- Existing image sizing.
- Existing video playback, controls, autoplay behavior, and poster behavior.
- Datadog as the first project.

Projects without enabled case studies must retain their current behavior. Do not create `/work` as a new listing route.

After migration acceptance, frontend code must no longer import local CMS content modules or reference migrated local asset paths. Keep the old static assets in the repository as rollback and import inputs until migration acceptance.

## Import utility

Create an idempotent importer supporting:

- `--dry-run`.
- An explicit environment selection.
- A production confirmation flag.
- Structured JSON or machine-readable reporting.

### Import phases

1. Compute SHA-256 checksums for source assets.
2. Upsert Media by unique `sourcePath`.
3. Skip identical path/checksum matches.
4. Update a stable path whose checksum changed.
5. Stop and report ambiguous matches.
6. Upload all seven current project covers to the active media environment.
7. Upload Dairy Queen case-study images, logos, poster images, and video.
8. Upsert all seven Projects by unique slug.
9. Preserve the current order using `sortOrder` 10 through 70.
10. Publish all seven cards because all are publicly visible today.
11. Enable a case study only for Dairy Queen.
12. Import Dairy Queen details, SEO, media, and blocks.
13. Convert the existing custom rich-text structure to deterministic Payload Lexical JSON.
14. Restore ordered related-project relationships after all primary records exist.
15. Populate and publish Homepage `featuredProjects` in the exact current order.
16. Report created, updated, skipped, and failed records and identifiers.

The Lexical converter must cover every existing custom structure:

- Paragraphs.
- Heading levels currently used.
- Ordered lists.
- Unordered lists.
- Plain spans.
- Bold spans.
- Italic spans.
- Links.

Import the two existing Dairy Queen lorem-ipsum blocks verbatim. Editorial rewriting is outside this migration.

### Idempotency acceptance

Running the importer twice must produce:

- No duplicate projects.
- No duplicate media.
- No duplicate relationships.
- No ordering changes.
- No duplicate Homepage references.

Blob writes cannot share the Postgres transaction. If a database operation fails after an upload, report the unreferenced Blob object for cleanup.

Before production import:

1. Run `pg_dump` through `DATABASE_URL_UNPOOLED`.
2. Verify that the dump can be inspected and restored.
3. Confirm the production database and Blob destinations.
4. Preserve all local source assets.

## Test plan

### Build and database

- Clean dependency installation succeeds.
- Payload type generation succeeds.
- Generated types match the committed file.
- Lint succeeds.
- Typecheck succeeds.
- Production build succeeds.
- Migration status is clean.
- Payload starts successfully.
- Runtime validation confirms the pooled endpoint.
- Migration validation confirms the direct endpoint.
- Schema push is disabled in every environment.

### Environment isolation

- Local uses the staging Neon branch.
- Persistent staging uses the staging Neon branch.
- Ordinary Preview uses the staging Neon branch.
- Production uses the production Neon branch.
- No deployment creates automatic Neon branches.
- Preview and local reject the production Neon host.
- Preview and local reject the production Blob host.
- Production credentials are unavailable outside production.
- Ordinary Preview builds cannot run migrations.
- Only the persistent staging pipeline can migrate staging.

### Migration safeguards

- Missing `DATABASE_URL_UNPOOLED` fails without fallback.
- A pooled migration URL is rejected.
- Mismatched pooled/direct endpoints are rejected.
- Staging commands reject the production host.
- Production commands reject the staging host.
- Child-process URL substitution uses the direct URL.
- Migration failures propagate as deployment failures.
- Per-environment migration jobs are serialized or the lack of platform support is documented and an advisory lock is added.

### Access control

- Payload's supported first-admin initialization works on an empty database.
- Anonymous users cannot ordinarily create Users.
- Anonymous users cannot read Users.
- Anonymous users cannot read drafts or versions.
- Anonymous users cannot mutate Projects, Media, or Homepage.
- Anonymous project queries return published records only.
- Authenticated preview can read drafts.
- Public helpers pass `overrideAccess: false`, `draft: false`, and published-status filtering.
- Preview helpers require authentication and do not call public helpers.

### Content migration

- All seven project cards render.
- Existing order is preserved.
- Datadog appears first.
- Dairy Queen's full case study renders.
- Every existing block type renders correctly.
- Every rich-text node type converts correctly.
- Images and video load.
- Video poster and playback behavior are preserved.
- Related projects resolve in order.
- Metadata is preserved.
- Missing and disabled case studies return the correct result.
- Projects without case studies retain their current behavior.

### Publishing and preview

- Drafts appear only in authenticated preview.
- Publishing makes a new project available without a rebuild.
- Unpublishing removes it from public routes and homepage output.
- Homepage ordering updates correctly.
- Preview responses cannot leak into public responses.

### Import idempotency

Run the import twice and confirm:

- No duplicate projects.
- No duplicate media.
- No duplicate relationships.
- No changed ordering.
- No duplicate Homepage references.
- The report correctly distinguishes created, updated, skipped, and failed records.

### Deployment safety

- Failed staging migrations stop the staging deployment.
- Failed production migrations stop the production deployment.
- Ordinary Preview deployments do not mutate schema.
- A failed build after an additive successful migration leaves the currently deployed application functional.
- Production and staging migration concurrency is prevented or protected with a documented advisory lock.

### Optional cache spike

Only if Cache Components are evaluated:

- Public cache entries contain published content only.
- Draft preview bypasses the public cache.
- Publish invalidates relevant entries.
- Slug changes invalidate old and new entries.
- Unpublish and delete expire content immediately.
- Homepage reordering invalidates homepage output.
- Vercel build does not embed the CMS dataset.

## Documentation plan

Update `README.md` and add `docs/cms-operations.md` covering:

- Neon provisioning through Vercel Marketplace.
- Creating the persistent staging and production branches.
- Disabling automatic Preview branch creation.
- Pooled runtime and direct administrative URLs.
- Vercel environment and branch-specific variable configuration.
- Pulling staging variables for local development.
- Shared-staging consequences and coordination rules.
- Creating the first Payload administrator through Payload's supported flow.
- Payload type generation.
- Creating, reviewing, and applying migrations.
- Why schema push is disabled.
- Why ordinary Preview deployments do not migrate.
- Staging and production migration concurrency.
- `pg_dump` and `pg_restore` using direct URLs only.
- Import dry-run, production confirmation, reruns, and reports.
- Production and nonproduction Blob configuration.
- Local filesystem uploads.
- Media MIME, size, dimension, privacy, and video limitations.
- Draft, preview, publish, unpublish, and Homepage ordering workflows.
- Dynamic phase-one querying.
- The optional Cache Components spike and adoption criteria.
- Adding or updating a project and enabling its case study.
- Database restore and code rollback.
- Orphaned Blob cleanup.

## Phase-one scope

Implement:

- Projects.
- Optional case-study content inside Projects.
- Media.
- Homepage featured-project ordering.
- Project SEO.
- Drafts, versions, and authenticated preview.
- Idempotent import tooling.
- Reviewed migrations and environment safeguards.
- Persistent staging and production environments.

Defer:

- General-purpose page builder.
- Blog.
- Localization.
- Scheduled publishing.
- Password-protected case studies.
- Private media.
- Multiple CMS roles.
- Complex approvals.
- Full video processing.
- GraphQL.
- Cache Components unless the optional spike succeeds.
- Automatic branch-per-Preview databases.

## Risks and accepted tradeoffs

### Shared staging state

Local, staging, and ordinary Preview deployments share one database. Local content changes can immediately affect staging, and schema changes require coordination. This is accepted for simplicity.

### Preview/schema compatibility

Preview code may require a schema not yet applied to staging. Apply reviewed migrations through the persistent staging deployment before relying on such a Preview.

### No local schema push

Requiring committed migrations for all environments is more deliberate than Payload's common local push workflow, but it prevents an individual developer from silently changing the shared staging database.

### Public Blob media

Draft attachment does not make a Blob object private. Sensitive assets remain outside Payload.

### Dynamic database reads

The uncached phase-one baseline produces more database reads than tagged caching. The dataset is small, and Neon pooling plus correctness-first behavior makes this acceptable initially.

### Migration concurrency

External deployment serialization is simpler than a custom database lock. If it cannot be guaranteed in the actual Vercel or CI configuration, add the advisory lock before production deployment.

### GraphQL dependency resolution

GraphQL is disabled as a feature. A `graphql` package may still appear transitively or as a required peer dependency; that does not authorize exposing a GraphQL endpoint.

## Implementation sequence

Execute in this order:

1. Reconfirm repository state and current stable package compatibility.
2. Upgrade and pin dependencies; complete a clean install.
3. Add Payload and Next.js configuration without changing frontend behavior.
4. Move routes into `(frontend)` and add supported `(payload)` Admin and REST routes.
5. Add environment validation and confirm staging/production resource mapping.
6. Implement Users, Media, Projects, blocks, and Homepage schemas.
7. Generate and commit Payload types.
8. Generate and review the initial additive migration.
9. Implement the direct-URL migration wrapper and deployment gates.
10. Implement public and preview query helpers.
11. Normalize Payload records into stable frontend view models.
12. Convert existing components and routes away from hardcoded data while preserving UI behavior.
13. Implement authenticated draft and live preview.
14. Implement the deterministic rich-text converter and idempotent importer.
15. Import and validate staging content twice.
16. Complete automated and browser tests.
17. Write operational documentation.
18. Back up production, migrate production, run the production import, and validate acceptance.
19. Keep rollback assets until the CMS migration is formally accepted.
20. Run the optional Cache Components spike separately; adopt it only if all isolation and invalidation tests pass.

## Definition of done

Phase one is complete when:

- Payload Admin, REST, and the existing portfolio run in the same Vercel application.
- GraphQL is not exposed.
- Runtime traffic uses pooled Neon URLs and migrations use direct URLs.
- Local, staging, and Preview use the persistent staging branch and cannot use production credentials.
- Production uses only the persistent production branch.
- No automatic Preview database branches are created.
- All schema changes are represented by committed migrations.
- The standard Payload first-user flow creates the first administrator.
- All seven projects render in their existing order with Datadog first.
- Dairy Queen's full case study renders with its existing metadata, blocks, media, video, and related projects.
- Non-case-study projects preserve their current card behavior.
- Public queries cannot return drafts, versions, Users, or mutations.
- Authenticated preview can read drafts without leaking them publicly.
- Publishing and unpublishing work without a full rebuild.
- The importer is idempotent and produces actionable reports.
- Staging and production migration paths fail safely.
- Lint, typecheck, build, migrations, access tests, content tests, and browser acceptance tests pass.
- Operations, restore, rollback, import, publishing, media privacy, and environment setup are documented.

