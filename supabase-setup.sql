-- Run this once in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS kv (
  user_id text NOT NULL,
  key text NOT NULL,
  value jsonb,
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, key)
);

ALTER TABLE kv ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all" ON kv FOR ALL USING (true) WITH CHECK (true);
