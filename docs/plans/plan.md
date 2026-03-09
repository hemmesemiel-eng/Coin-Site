# Coinfactory — Implementation Plan

**Merknaam:** Coinfactory
**Prijs:** $10 per 1.000.000 coins (alle platforms)
**YouTube backup codes:** https://www.youtube.com/watch?v=nvIH96pXx-c
**Datum:** 2026-03-08
**Design doc:** `docs/plans/2026-03-08-fc26-coins-website-design.md`
**Status:** Fase 1–13 voltooid (code). Fase 14 = testen + deployment (wacht op Supabase setup).

---

## Fasenoverzicht

| Fase | Inhoud | Afhankelijkheid |
|------|--------|----------------|
| 1 | Project setup | — |
| 2 | Layout, navigatie, footer, design-systeem | Fase 1 |
| 3 | Homepage — hero, trust, social proof | Fase 2 |
| 4 | Order configurator + betaalflow + fallback | Fase 3 |
| 5 | Supabase database + auth | Fase 1 |
| 6 | Klantendashboard + guest-to-account flow | Fase 5 |
| 7 | Admin panel (server-side beveiligd) | Fase 5 |
| 8 | NOWPayments integratie + failure handling | Fase 5 |
| 9 | E-mailnotificaties | Fase 8 |
| 10 | Referral systeem | Fase 6 |
| 11 | Overige pagina's (incl. Terms of Service) | Fase 2 |
| 12 | FAQ per pagina | Fase 11 |
| 13 | Cookie/privacy banner | Fase 2 |
| 14 | Testen & deployment | Alle fasen |

---

## Fase 1 — Project Setup ✓ VOLTOOID

**Doel:** Werkende Next.js-applicatie met alle dependencies.

- [x] Initialiseer Next.js project met App Router (`npx create-next-app@latest`)
- [x] Installeer dependencies: `@supabase/supabase-js`, `tailwindcss`, `nowpayments-api`
- [x] Configureer Tailwind met custom kleuren (`#0a0a0f`, `#00ff87`, `#6c63ff`)
- [x] Voeg Space Grotesk en Inter toe via Google Fonts
- [x] Maak `.env.local` aan met placeholders voor Supabase URL/key en NOWPayments API key
- [ ] Hosting via Vercel — eigenaar regelt dit zelf via vercel.com

**Resultaat:** Site draait lokaal op `localhost:3000`.

---

## Fase 2 — Layout, Navigatie & Design-systeem ✓ VOLTOOID

**Doel:** Globale shell waar alle pagina's in passen.

- [x] Maak `app/layout.tsx` — root layout met font, achtergrondkleur, metadata
- [x] Bouw `components/Navbar.tsx`:
  - Logo (placeholder) + links: Home / How It Works / Bulk Orders / Contact
  - Rechtsboven: "Order Now" CTA-knop (groen)
  - Op mobiel: hamburger-menu
- [x] Bouw `components/Footer.tsx` met 4-koloms layout:
  ```
  [Logo + tagline + social]  [Navigation]      [Legal]        [Betaalmethoden]
                              Home              Terms          Crypto (BTC/ETH/USDT)
                              How It Works      Privacy Policy Handmatige overboeking
                              Bulk Orders       Contact
                              Support
  ─────────────────────────────────────────────────────────────────────────
  © 2026 [Merknaam]. All rights reserved.  |  "Fast · Safe · Trusted"
  ```
- [x] Maak basis design tokens (kleuren, spacing) via Tailwind v4 `@theme inline` in `globals.css`
- [x] Stel globale CSS in

**Resultaat:** Elke pagina heeft navigatie en footer.

---

## Fase 3 — Homepage: Hero, Trust & Social Proof ✓ VOLTOOID

**Doel:** De conversiegerichte bovenkant van de homepage.

- [x] **Hero sectie:** headline, ticker animatie, safety badge, CTA
- [x] **3 Trust badges:** Secure / Instant Delivery / Best Prices
- [x] **"Your Security is Our Priority" sectie:** 4 kaartjes + banner
- [x] **Social proof sectie:** stats + 3 review kaarten
- [x] **Recent Activity Feed:** fixed bottom-left, wisselt elke 4s
- [x] **WelcomeBanner:** 5% korting banner bovenaan (fixed, boven navbar)
- [ ] Trustpilot widget (uitgesteld — geen account)

**Resultaat:** Volledige homepage boven de order configurator, visueel klaar.

---

## Fase 4 — Order Configurator ✓ VOLTOOID

**Doel:** Het hart van de site — de stap-voor-stap bestelflow op de homepage.

- [x] `components/OrderConfigurator.tsx` met progressive reveal-logica
- [x] Stap 1 — Platform (PS4 / PS5 / Xbox / PC)
- [x] Stap 2 — Coins (presets + slider, formatCoins helper)
- [x] Live Order Summary met 5% welkomstkorting automatisch toegepast
- [x] Stap 3 — EA gegevens (email + wachtwoord + backup codes + YouTube modal)
- [x] Stap 4 — Betaalmethode (Crypto / Bank Transfer / Paysafecard / Skrill)
- [x] Stap 5 — Betalen (placeholder, koppeling Fase 8)
- [x] `/payment-failed` pagina met 3 opties
- [ ] Echte betaalkoppeling (wacht op Supabase + betaalaccounts)

**Resultaat:** UI volledig klaar, backend koppeling wacht op Supabase.

---

## Fase 5 — Supabase: Database & Auth ✓ CODE KLAAR (project nog aanmaken)

**Doel:** Backend-fundament voor orders, gebruikers en prijzen.

- [ ] Maak Supabase project aan op supabase.com → vul `.env.local` in
- [ ] Voer `supabase/schema.sql` uit in Supabase SQL Editor
- [ ] Voer `supabase/seed.sql` uit (standaard prijzen)
- [x] Definieer database-tabellen:

  **`profiles`** (uitbreiding op Supabase auth.users)
  | kolom | type |
  |-------|------|
  | id | uuid (FK naar auth.users) |
  | email | text |
  | discount_pct | integer (default 0) |
  | referral_code | text (uniek) |
  | referred_by | uuid (nullable) |
  | created_at | timestamp |

  **`orders`**
  | kolom | type | Opmerking |
  |-------|------|-----------|
  | id | uuid | |
  | user_id | uuid (FK, nullable) | Null = gastbestelling |
  | guest_email | text (nullable) | Voor gasten zonder account |
  | platform | text (ps4/ps5/xbox/pc) | |
  | coin_amount | integer | |
  | price_paid | numeric | |
  | discount_applied | integer | |
  | ea_email | text | |
  | ea_password_encrypted | text | AES-256 versleuteld |
  | backup_codes_encrypted | text | AES-256 versleuteld |
  | payment_method | text | |
  | payment_status | text (pending/paid/failed/expired) | |
  | nowpayments_id | text (nullable) | Referentie naar NOWPayments |
  | expires_at | timestamp (nullable) | Vervaltijd crypto-betaling |
  | status | text (queued/transferring/completed) | |
  | created_at | timestamp | |

  **`prices`**
  | kolom | type |
  |-------|------|
  | platform | text (PK) |
  | price_per_1k | numeric |
  | updated_at | timestamp |

- [x] RLS policies in schema.sql (klant eigen orders, admin alles, prijzen publiek)
- [ ] Configureer Supabase Auth in dashboard (email/password aanzetten)
- [x] `lib/supabase.ts` — browser + server client
- [x] `types/database.ts` — volledige TypeScript types
- [x] `lib/crypto.ts` — AES-256-CBC encryptie

**Resultaat:** Code klaar. Wacht op Supabase project aanmaken.

---

## Fase 6 — Klantendashboard ✓ VOLTOOID (UI — wacht op Supabase)

- [x] `/login` en `/register` pagina's (register met `?email=` pre-fill)
- [x] `/dashboard` — order overzicht met status badges, referral sectie
- [x] `/thank-you` — bedanktpagina + guest-to-account conversie kaart
- [x] `/payment-failed` — 3 opties: retry / andere methode / contact
- [ ] Route bescherming dashboard (wacht op Supabase auth)
- [ ] Real-time status updates via Supabase Realtime

**Resultaat:** UI klaar met mock data. Supabase koppeling volgt in Fase 14.

---

## Fase 7 — Admin Panel ✓ VOLTOOID (UI — wacht op Supabase)

- [x] `proxy.ts` — route bescherming `/admin/*` (Next.js 16 vervangt middleware.ts)
- [x] `/admin` — orders beheren, status doorstappen, EA credentials show/hide
- [x] `/admin/prices` — inline bewerkbare prijzen per platform
- [x] `/admin/customers` — klantenbeheer + kortingsbeheer
- [x] `app/api/admin/orders/[id]/status` — PATCH endpoint voor statusupdates
- [ ] Owner-rol instellen via Supabase `app_metadata` (na Supabase setup)
- [ ] Supabase auth check activeren in proxy.ts

**Resultaat:** Admin UI klaar met mock data. Auth koppeling volgt na Supabase setup.

---

## Fase 8 — Betaalintegraties ✓ CODE KLAAR (accounts nog aanmaken)

### Crypto — NOWPayments
- [ ] NOWPayments account aanmaken + API key in `.env.local`
- [x] `lib/nowpayments.ts` — API-wrapper (createPayment, getPayment, verifyWebhookSignature)
- [x] `app/api/nowpayments/webhook/route.ts` — IPN handler (finished/expired/underpaid)

### Bank Transfer
- [x] `lib/bank-transfer.ts` — CF-XXXXXX referentie generator + bankgegevens uit env
- [ ] IBAN + banknaam invullen in `.env.local`

### Paysafecard
- [ ] Paysafecard merchant account aanmaken
- [ ] API integratie (nog niet gebouwd)

### Skrill
- [ ] Skrill merchant account aanmaken
- [ ] API integratie (nog niet gebouwd)

### Order API
- [x] `app/api/orders/create/route.ts` — order aanmaken, prijsberekening, encryptie

**Resultaat:** Crypto + bank transfer code klaar. Paysafecard + Skrill volgen na accounts.

---

## Fase 9 — E-mailnotificaties ✓ CODE KLAAR

- [x] `lib/resend.ts` — Resend API wrapper (native fetch, geen SDK)
- [x] `lib/email-templates.ts` — HTML templates met inline CSS (owner + klant)
- [x] `lib/email-service.ts` — notifyOwnerNewOrder + sendOrderConfirmation
- [ ] Resend account aanmaken + API key in `.env.local`
- [ ] E-mails activeren in `app/api/orders/create/route.ts` (TODO-blokken uncommentariëren)

**Resultaat:** Code klaar. Activeer na Resend account aanmaken.

---

## Fase 10 — Referral Systeem ✓ VOLTOOID (UI — wacht op Supabase)

- [x] `lib/referral.ts` — code generator, URL builder, REFERRAL_DISCOUNT_PCT = 5
- [x] `components/ReferralBanner.tsx` — banner bij `?ref=CODE`, opslaat in localStorage
- [x] `components/ReferralSection.tsx` — dashboard sectie met copy-to-clipboard
- [x] `app/api/referral/validate/route.ts` — validatie endpoint (mock)
- [ ] Referral korting toepassen bij order aanmaken (wacht op Supabase)
- [ ] Referral code genereren bij registratie (wacht op Supabase)

**Resultaat:** UI klaar. Korting koppeling volgt na Supabase setup.

---

## Fase 11 — Overige Pagina's ✓ VOLTOOID

- [x] `/how-it-works` — 4-stappen uitleg + FAQ accordion
- [x] `/bulk-orders` — VIP pagina + contactformulier + FAQ
- [x] `/contact` — contactformulier + info blok + FAQ
- [x] `/terms` — Terms of Service (9 secties, EA disclaimer)
- [x] `/privacy` — Privacy Policy (GDPR-compliant, 10 secties)

---

## Fase 12 — FAQ per Pagina ✓ VOLTOOID

- [x] `components/FAQ.tsx` — accordion met CSS grid animatie, one-at-a-time
- [x] Homepage FAQ (5 vragen: veiligheid, levertijd, platforms, betaalmethoden, support)
- [x] How It Works FAQ (5 vragen: EA wachtwoord, backup codes, ban risico, flow, tracking)
- [x] Bulk Orders FAQ (4 vragen: minimum, prijs, levertijd, meerdere accounts)
- [x] Contact FAQ (3 vragen: responstijd, coins niet ontvangen, fout in order)

---

## Fase 13 — Cookie & Privacy Banner ✓ VOLTOOID

- [x] `components/CookieBanner.tsx` — GDPR banner, Accept/Decline, localStorage
- [x] Toegevoegd aan `app/layout.tsx`

---

## Fase 14 — Testen & Deployment

- [ ] Test volledige orderflow (van configurator tot Completed status)
- [ ] Test NOWPayments webhook lokaal via ngrok
- [ ] Test auth: registreren, inloggen, dashboard, admin-beveiliging
- [ ] Mobiele weergave controleren op alle pagina's
- [ ] Stel custom domein in op Vercel
- [ ] Stel environment variables in op Vercel (Supabase keys, NOWPayments key)
- [ ] Stel Supabase productie-database in

---

## Openstaande Punten (nodig voor implementatie)

| Item | Wanneer nodig |
|------|--------------|
| Kortingstiers (na X orders = Y%) | Fase 6 |
| Crypto wallet / NOWPayments API key | Fase 8 |
| IBAN + banknaam voor bank transfer | Fase 8 |
| Paysafecard merchant account | Fase 8 |
| Skrill merchant account | Fase 8 |
| Logo ontwerpen | Fase 2 |
