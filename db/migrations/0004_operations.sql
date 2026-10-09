CREATE TABLE IF NOT EXISTS agencies (
  id TEXT PRIMARY KEY,
  market_id TEXT NOT NULL REFERENCES markets(id),
  name TEXT NOT NULL,
  website TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS certifications (
  id TEXT PRIMARY KEY,
  market_id TEXT NOT NULL REFERENCES markets(id),
  name TEXT NOT NULL,
  summary TEXT NOT NULL,
  official_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tariffs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  market_id TEXT NOT NULL REFERENCES markets(id),
  hs_prefix TEXT NOT NULL,
  description TEXT NOT NULL,
  indicative_duty_rate REAL NOT NULL,
  source_url TEXT NOT NULL,
  last_verified_at TEXT NOT NULL,
  UNIQUE(market_id, hs_prefix)
);

CREATE TABLE IF NOT EXISTS source_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  requirement_id INTEGER REFERENCES requirements(id),
  title TEXT NOT NULL,
  source_url TEXT NOT NULL,
  content_hash TEXT,
  checked_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS change_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  requirement_id INTEGER NOT NULL REFERENCES requirements(id),
  change_type TEXT NOT NULL,
  summary TEXT NOT NULL,
  detected_at TEXT NOT NULL,
  reviewed_at TEXT
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
