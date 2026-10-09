CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL,
  market_id TEXT REFERENCES markets(id),
  product_id TEXT REFERENCES products(id),
  published_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  source_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published'
);

CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(status, published_at DESC);
