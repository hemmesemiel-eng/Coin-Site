# Coinfactory — Implementation Plan

**Merknaam:** Coinfactory
**Prijs:** $10 per 1.000.000 coins (alle platforms)
**YouTube backup codes:** https://www.youtube.com/watch?v=nvIH96pXx-c
**Datum:** 2026-03-08
**Design doc:** `docs/plans/2026-03-08-fc26-coins-website-design.md`
**Status:** Gereed voor implementatie

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

## Fase 1 — Project Setup

**Doel:** Werkende Next.js-applicatie met alle dependencies.

- [ ] Initialiseer Next.js project met App Router (`npx create-next-app@latest`)
- [ ] Installeer dependencies: `@supabase/supabase-js`, `tailwindcss`, Shadcn/ui, `nowpayments-api`
- [ ] Configureer Tailwind met custom kleuren (`#0a0a0f`, `#00ff87`, `#6c63ff`)
- [ ] Voeg Space Grotesk en Inter toe via Google Fonts
- [ ] Maak `.env.local` aan met placeholders voor Supabase URL/key en NOWPayments API key
- [ ] Hosting via Vercel — eigenaar regelt dit zelf via vercel.com

**Resultaat:** Site draait lokaal op `localhost:3000`.

---

## Fase 2 — Layout, Navigatie & Design-systeem

**Doel:** Globale shell waar alle pagina's in passen.

- [ ] Maak `app/layout.tsx` — root layout met font, achtergrondkleur, metadata
- [ ] Bouw `components/Navbar.tsx`:
  - Logo (placeholder) + links: Home / How It Works / Bulk Orders / Contact
  - Rechtsboven: "Order Now" CTA-knop (groen)
  - Op mobiel: hamburger-menu
- [ ] Bouw `components/Footer.tsx` met 4-koloms layout:
  ```
  [Logo + tagline + social]  [Navigation]      [Legal]        [Betaalmethoden]
                              Home              Terms          Crypto (BTC/ETH/USDT)
                              How It Works      Privacy Policy Handmatige overboeking
                              Bulk Orders       Contact
                              Support
  ─────────────────────────────────────────────────────────────────────────
  © 2026 [Merknaam]. All rights reserved.  |  "Fast · Safe · Trusted"
  ```
- [ ] Maak basis design tokens (kleuren, spacing) als Tailwind config
- [ ] Stel globale CSS in (scroll-gedrag, selectiekleur, etc.)

**Resultaat:** Elke pagina heeft navigatie en footer.

---

## Fase 3 — Homepage: Hero, Trust & Social Proof

**Doel:** De conversiegerichte bovenkant van de homepage.

- [ ] **Hero sectie:**
  - Grote headline "BUY FC 26 COINS" + groene subheadline "INSTANT DELIVERY"
  - Trust-ticker animatie: "0% ban promise · 100% Secure · Delivery within 2 hours"
  - CTA-knop "Get Coins Now" → scrollt naar order configurator
- [ ] **3 Trust badges** (icoon + titel + tekst):
  - 100% Secure / Super Quick Delivery / Best Prices
- [ ] **"Your Security is Our Priority" sectie:**
  - 4 icoon-kaartjes: SSL / Account Protection / Simple Process / Support
  - "100% Safe Trading Guarantee" banner
- [ ] **Social proof sectie:**
  - Statistieken: sterren (4.9/5) + klantenaantal + orders voltooid
  - 3 review-kaartjes met quotes
- [ ] **Recent Activity Feed** (linksonder, pop-up animatie):
  - Toont gesimuleerde recente aankopen
- [ ] **Trustpilot widget** (zwevend, rechtsonder)

**Resultaat:** Volledige homepage boven de order configurator, visueel klaar.

---

## Fase 4 — Order Configurator

**Doel:** Het hart van de site — de stap-voor-stap bestelflow op de homepage.

- [ ] Bouw `components/OrderConfigurator.tsx` met progressive reveal-logica
- [ ] **Stap 1 — Platform:**
  - Grote knoppen: PS4 / PS5 / Xbox / PC
- [ ] **Stap 2 — Coins (verschijnt na stap 1):**
  - Preset knoppen: 250K / 500K / 1M / 2.5M / 5M / 10M
  - Slider voor custom hoeveelheid
- [ ] **Live Order Summary (altijd zichtbaar na stap 1+2):**
  - Formaat: "500,000 Coins — €12.50"
  - Prijs berekend op basis van huidige prijstabel uit Supabase
- [ ] **Stap 3 — Gegevens (verschijnt na stap 1+2):**
  - Velden: EA Account Email / Password / 6x Backup Codes
  - Knop naast backup codes: "Where do I find these?" → opent inline YouTube-video modal
- [ ] **Stap 4 — Betaalmethode (verschijnt als alle velden ingevuld zijn):**
  - Opties: Crypto (NOWPayments) / Handmatige overboeking
- [ ] **Stap 5 — Betalen:**
  - Crypto: redirect naar NOWPayments betaalpagina
  - Handmatig: toon bankgegevens + instructies
- [ ] Ingelogde klant met korting: toon "Special deal for you: X% discount active" banner + "Order Now" knop bovenaan configurator
- [ ] **Betaalmislukking fallback** — `/payment-failed` pagina met 3 opties:
  1. "Try again" → maakt nieuwe NOWPayments betaling aan
  2. "Choose different payment method" → terug naar stap 4 (betaalmethode)
  3. "Contact us" → link naar `/contact`
  - NOWPayments betalingen verlopen na ~20 minuten → toon duidelijke melding + "Try again" knop
  - Voeg `expires_at` kolom toe aan orders tabel voor timeout-tracking

**Resultaat:** Volledige bestelflow werkt end-to-end inclusief foutafhandeling.

---

## Fase 5 — Supabase: Database & Auth

**Doel:** Backend-fundament voor orders, gebruikers en prijzen.

- [ ] Maak Supabase project aan
- [ ] Definieer database-tabellen:

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

- [ ] Stel Row Level Security (RLS) in:
  - Klant ziet alleen eigen orders
  - Admin ziet alle orders
  - Prijzen zijn publiek leesbaar
- [ ] Configureer Supabase Auth (email/password)
- [ ] Maak `lib/supabase.ts` — client helper voor gebruik in de app

**Resultaat:** Database klaar, auth werkt, RLS beveiligt de data.

---

## Fase 6 — Klantendashboard

**Doel:** Ingelogde klanten kunnen orders volgen en korting zien.

- [ ] Bescherm `/dashboard` route — redirect naar login als niet ingelogd
- [ ] Bouw login- en registratiepagina (`/login`, `/register`)
- [ ] Dashboard toont:
  - Lijst van alle orders van de klant
  - Per order: platform, hoeveelheid, prijs, datum, live status (Queued / Transferring / Completed)
  - Real-time statusupdates via Supabase Realtime
- [ ] Als klant een actieve korting heeft:
  - Prominente banner: "Special deal for you: X% discount active"
  - Groene "Order Now" knop → gaat naar configurator met korting toegepast
- [ ] **`/thank-you` pagina** na succesvolle betaling:
  - Toont orderoverzicht
  - **Guest-to-account conversie**: als klant als gast betaalde, toon aanmeldknop:
    `"Create an account to track your order and get loyalty discounts →"`
  - Email is al bekend (ingevuld in configurator) → pre-fill het registratieformulier
- [ ] **`/payment-failed` pagina**:
  - Duidelijke foutmelding zonder technisch jargon
  - 3 opties: Try again / Choose different method / Contact us

**Resultaat:** Klant kan inloggen, orders volgen en korting gebruiken. Gasten worden na betaling zacht naar registratie geleid.

---

## Fase 7 — Admin Panel

**Doel:** Jij kunt prijzen aanpassen en orderstatus bijwerken.

- [ ] **Server-side beveiliging via Next.js middleware** (`middleware.ts`):
  - Controleert Supabase sessie server-side vóór de pagina laadt
  - Als geen geldige owner-sessie → redirect naar `/login`
  - Niet client-side (dat is onveilig — iemand met de URL zou anders API's kunnen aanroepen)
- [ ] Stel owner-rol in via Supabase `app_metadata` (niet via `user_metadata` — die is client-aanpasbaar)
- [ ] Prijsbeheer:
  - Tabel met huidige prijs per platform
  - Inline bewerkbaar, opslaan met één klik
- [ ] Orderbeheer:
  - Lijst van alle openstaande orders
  - Per order: alle klantgegevens zichtbaar (EA email, wachtwoord, backup codes)
  - Statusknopjes: Queued → Transferring → Completed
- [ ] Kortingsbeheer:
  - Zoek klant op e-mail
  - Stel kortingspercentage in

**Resultaat:** Jij kunt de operatie volledig beheren zonder in de database te duiken.

---

## Fase 8 — Betaalintegraties

**Doel:** Alle betaalmethoden verwerken en orderstatus bijwerken.

### Crypto — NOWPayments
- [ ] Maak NOWPayments account aan en genereer API key
- [ ] Bouw `lib/nowpayments.ts` — API-wrapper
- [ ] Bij checkout: maak betaling aan via NOWPayments API → redirect klant
- [ ] Bouw webhook `app/api/nowpayments/webhook/route.ts`:
  - Ontvangt bevestiging, verifieert handtekening, zet status op "Queued"
  - Afhandeling: betaling verlopen → status "expired", underpaid → notificatie

### Bank Transfer
- [ ] Genereer uniek referentienummer per order: `CF-` + 6 random tekens
- [ ] Toon IBAN, naam, bedrag en referentie na checkout
- [ ] Order status: "Awaiting Payment" (24 uur geldig)
- [ ] Admin toont lijst van openstaande bankoverschrijvingen
- [ ] "Confirm Payment Received" knop → order naar "Queued"

### Paysafecard
- [ ] Maak Paysafecard merchant account aan
- [ ] Integreer Paysafecard Payments API
- [ ] Klant voert PIN-code in → directe verificatie via API → "Queued"

### Skrill
- [ ] Maak Skrill merchant account aan
- [ ] Integreer Skrill Quick Checkout
- [ ] Webhook bevestigt betaling → "Queued"

### Betaalmislukking (alle methoden)
- [ ] Bij mislukking: redirect naar `/payment-failed`
- [ ] Order status: "failed" in Supabase
- [ ] "Try again" maakt nieuwe betaalpoging aan voor dezelfde order

**Resultaat:** Alle 4 betaalmethoden werken end-to-end.

---

## Fase 9 — E-mailnotificaties

**Doel:** Jij en de klant ontvangen relevante e-mails.

- [ ] Kies e-maildienst: Resend (aanbevolen — gratis tier, eenvoudige API)
- [ ] E-mail aan owner na nieuwe betaalde order:
  - Platform, coins, EA email, wachtwoord, backup codes
- [ ] Orderbevestigingsmail aan klant:
  - Overzicht van bestelling
  - Link naar dashboard voor live status

**Resultaat:** Jij wordt direct genotificeerd bij elke order.

---

## Fase 10 — Referral Systeem

**Doel:** Klanten kunnen andere klanten doorverwijzen voor korting.

- [ ] Elke klant krijgt een unieke referral-link bij registratie
- [ ] Bezoeker via referral-link → `?ref=CODE` opgeslagen in cookie
- [ ] Na eerste aankoop via referral: zowel nieuwe klant als referrer krijgt korting
- [ ] Kortingslogica instelbaar via admin panel

**Resultaat:** Organische groei via doorverwijzingen.

---

## Fase 11 — Overige Pagina's

- [ ] `/how-it-works` — visuele 4-stappen uitleg (Site → Encryption → Farm → Account)
- [ ] `/bulk-orders` — VIP-landingspagina met contactformulier
- [ ] `/contact` — contactformulier (naam, e-mail, bericht) → stuurt e-mail naar owner
- [ ] `/terms` — Terms of Service (alleen via footer):
  - Betalingen zijn definitief, geen chargebacks
  - EA ToS-disclaimer: klant is zelf verantwoordelijk voor accountrisico's
- [ ] `/privacy` — Privacy Policy (alleen via footer):
  - Welke data wordt verzameld (email, EA-gegevens)
  - Hoe data wordt opgeslagen en beveiligd
  - GDPR-rechten van de klant

---

## Fase 12 — FAQ per Pagina

- [ ] Bouw herbruikbaar `components/FAQ.tsx` accordion-component
- [ ] Voeg relevante FAQ toe aan elke pagina:
  - Homepage: veiligheid, levertijd, wat zijn coins
  - How It Works: hoe werkt de transfer
  - Bulk Orders: minimum, levertijd, contact
  - Dashboard: hoe order volgen, hoe korting gebruiken

---

## Fase 13 — Cookie & Privacy Banner

- [ ] Simpele GDPR-banner bij eerste bezoek
- [ ] Keuze: accepteren of weigeren
- [ ] Voorkeur opslaan in localStorage

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
