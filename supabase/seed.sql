-- ============================================================
-- Coinfactory — Seed data
-- Voer uit NA schema.sql in de Supabase SQL Editor
-- ============================================================

-- Standaard prijs: $10 per 1.000.000 coins voor alle platforms
INSERT INTO prices (platform, price_per_million) VALUES
  ('ps4',  10.00),
  ('ps5',  10.00),
  ('xbox', 10.00),
  ('pc',   10.00)
ON CONFLICT (platform) DO NOTHING;
