CREATE TABLE IF NOT EXISTS markets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  summary TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS requirements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  market_id TEXT NOT NULL REFERENCES markets(id),
  product_id TEXT NOT NULL REFERENCES products(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  mandatory INTEGER NOT NULL DEFAULT 1,
  legal_basis TEXT,
  official_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  effective_from TEXT,
  last_verified_at TEXT NOT NULL,
  UNIQUE(market_id, product_id, title)
);

CREATE INDEX IF NOT EXISTS idx_requirements_lookup
  ON requirements(market_id, product_id, status);
