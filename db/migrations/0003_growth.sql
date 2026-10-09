CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  market_id TEXT,
  product_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS providers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  provider_type TEXT NOT NULL,
  markets TEXT NOT NULL,
  specialties TEXT NOT NULL,
  website TEXT NOT NULL,
  description TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'editorial',
  last_verified_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_providers_type ON providers(provider_type, verification_status);
