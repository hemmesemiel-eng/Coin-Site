-- ============================================================
-- Coinfactory — Supabase schema
-- Voer uit in de Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Helper: update updated_at automatisch bij elke UPDATE
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Tabel: profiles
-- Wordt aangemaakt na auth.users registratie via trigger of server-side code
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         text NOT NULL,
  discount_pct  numeric(5, 2) NOT NULL DEFAULT 0,
  referral_code text NOT NULL UNIQUE,
  referred_by   uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- Tabel: orders
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid REFERENCES profiles(id) ON DELETE SET NULL,
  guest_email             text,
  platform                text NOT NULL CHECK (platform IN ('ps4', 'ps5', 'xbox', 'pc')),
  coin_amount             bigint NOT NULL,
  price_paid              numeric(10, 2) NOT NULL,
  discount_applied        numeric(5, 2) NOT NULL DEFAULT 0,
  ea_email                text NOT NULL,
  ea_password_encrypted   text NOT NULL,
  backup_codes_encrypted  text NOT NULL,
  payment_method          text NOT NULL CHECK (payment_method IN ('crypto', 'bank_transfer', 'paysafecard', 'skrill')),
  payment_status          text NOT NULL DEFAULT 'pending'
                            CHECK (payment_status IN ('pending', 'paid', 'failed', 'expired', 'awaiting_payment')),
  order_status            text NOT NULL DEFAULT 'queued'
                            CHECK (order_status IN ('queued', 'transferring', 'completed')),
  nowpayments_id          text,
  bank_reference          text,           -- Formaat: CF-XXXXXX
  expires_at              timestamptz,    -- Vervaltijd crypto-betaling (~20 min)
  created_at              timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- Tabel: prices
-- Platform als primary key — één rij per platform
-- ============================================================
CREATE TABLE IF NOT EXISTS prices (
  platform          text PRIMARY KEY CHECK (platform IN ('ps4', 'ps5', 'xbox', 'pc')),
  price_per_million numeric(10, 2) NOT NULL DEFAULT 10.00,
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- Trigger: prices.updated_at automatisch bijwerken
CREATE TRIGGER prices_updated_at
  BEFORE UPDATE ON prices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders   ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices   ENABLE ROW LEVEL SECURITY;

-- profiles: gebruiker leest/wijzigt alleen zijn eigen rij
CREATE POLICY "profiles: own row read"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles: own row update"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- orders: gebruiker ziet alleen eigen orders (via user_id)
CREATE POLICY "orders: own orders read"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- orders: admin (service role) mag alles — service role omzeilt RLS automatisch
-- Gastorders (user_id IS NULL) zijn alleen via service role leesbaar

-- prices: iedereen mag lezen (ook niet-ingelogd)
CREATE POLICY "prices: public read"
  ON prices FOR SELECT
  USING (true);

-- prices: alleen admin (service role) mag schrijven — RLS blokkeert authenticated users
-- Service role omzeilt RLS, dus geen aparte admin policy nodig
