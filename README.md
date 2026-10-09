# HT Fluo Market Access

Production-oriented Cloudflare Workers application for global product compliance and market-access intelligence.

## Included

- 3 markets, 3 product categories and all 9 market/product pathways
- 62 sourced requirement records with verification dates
- 30 in-depth English briefings with independent indexable pages, related requirements and pathway links
- 20 editorial service-provider directory entries
- Requirements finder, landed-cost estimator and labeling checklist
- Persistent D1 subscriptions with optional Turnstile and Resend integration
- Dynamic market, product, requirement, article and directory pages plus market, product and briefing hubs
- `robots.txt`, dynamic `sitemap.xml`, canonical URLs, Open Graph metadata and page-specific JSON-LD
- D1 migrations, operational source tables, audit logs and scheduled Worker support

## Local development

```powershell
$env:PATH = "C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;" + $env:PATH
pnpm install
pnpm run db:setup
pnpm exec wrangler dev --config ./wrangler.toml --local --port 8791
```

Open `http://127.0.0.1:8791`.

Run the read-only route smoke test against the local server (or set `BASE_URL` for another deployment):

```powershell
pnpm run test:smoke
$env:BASE_URL = "https://htfluo-market-access.9072867.workers.dev"
pnpm run test:smoke
```

Run the production SEO audit to crawl every sitemap URL and verify titles, descriptions, canonicals, H1 usage, JSON-LD, internal links, `lastmod`, 404 indexing and redirects:

```powershell
$env:BASE_URL = "https://htfluo.com"
pnpm run audit:seo
```

## Cloudflare deployment

The production D1 database is already created and configured. For a new account or environment, authenticate and create another database:

```powershell
pnpm exec wrangler login
pnpm exec wrangler d1 create htfluo-db
```

Replace the D1 id in `wrangler.toml` only when deploying to a different database, then initialize it:

```powershell
pnpm exec wrangler d1 migrations apply htfluo-db --remote
pnpm exec wrangler d1 execute htfluo-db --remote --file=./db/seed.sql
pnpm exec wrangler d1 execute htfluo-db --remote --file=./db/production_seed.sql
pnpm exec wrangler d1 execute htfluo-db --remote --file=./db/article_seed.sql
pnpm exec wrangler d1 execute htfluo-db --remote --file=./db/operations_seed.sql
```

Optional outbound email integration:

```powershell
pnpm exec wrangler secret put RESEND_API_KEY
```

Turnstile is already provisioned for `htfluo.com` and the current Workers domain. Its secret is stored in Cloudflare and is not committed to the repository.

Source monitoring currently stores content hashes, excerpts, HTTP diagnostics and change events in D1. R2 document snapshots are optional because R2 is not enabled on the current Cloudflare account. Welcome email delivery is also optional and activates when `RESEND_API_KEY` is configured.

Run the deployment check and deploy:

```powershell
pnpm run check
pnpm run deploy
```

Production site: `https://htfluo.com`.

The Worker is attached to both `htfluo.com/*` and `www.htfluo.com/*`; `www` requests are permanently redirected to the canonical apex domain. The Workers development URL remains enabled at `https://htfluo-market-access.9072867.workers.dev` for operational fallback.

## Important content policy

The database links to primary regulatory sources and records a verification date. It is decision support, not legal advice or a binding customs classification. Duty rates in the MVP are explicitly indicative; production tariff coverage should use a licensed or official tariff feed.

## Project map

- `src/worker.js`: APIs, subscriptions, SEO pages, directory and sitemap
- `public/`: home page, client tools and responsive styles
- `db/migrations/`: versioned D1 schema
- `db/seed.sql`: core markets, products and starter content
- `db/production_seed.sql`: launch requirements and provider directory
- `db/article_seed.sql`: launch briefing library
- `db/operations_seed.sql`: agencies, certifications, tariffs, source records and audit logs
