# Coinfactory

**Merknaam:** Coinfactory
Een conversion-geoptimaliseerde website voor het verkopen van FC 26 coins.
Gebouwd met Next.js + Supabase + Vercel.

## Project Status

**Fase 1–13 voltooid (code-kant).** Alleen Fase 14 (testen + deployment) resteert.
Supabase project nog niet aangemaakt — alle Supabase calls staan als `// TODO: Supabase`.

**Al gebouwd — volledige bestandslijst:**

### Layout & Design
- `app/layout.tsx` — root layout (Navbar + Footer + WelcomeBanner + CookieBanner)
- `app/globals.css` — design tokens via Tailwind v4 `@theme inline`
- `components/Navbar.tsx` — sticky navbar, hamburger menu, "Order Now" CTA
- `components/Footer.tsx` — 4-koloms footer
- `components/WelcomeBanner.tsx` — groene 5% korting banner bovenaan (fixed)
- `components/CookieBanner.tsx` — GDPR cookie consent, localStorage

### Homepage
- `app/page.tsx` — composer: Hero → TrustBadges → Configurator → Security → SocialProof → FAQ
- `components/HeroSection.tsx` — headline, ticker animatie, safety badge, CTA
- `components/TrustBadges.tsx` — 3 kaarten (Secure / Delivery / Prices)
- `components/SecuritySection.tsx` — 4 kaartjes + "100% Safe" banner
- `components/SocialProof.tsx` — stats + 3 review kaarten
- `components/RecentActivity.tsx` — fixed bottom-left, gesimuleerde aankopen
- `components/FAQ.tsx` — herbruikbaar accordion (CSS grid animatie)
- `components/ReferralBanner.tsx` — paarse banner bij `?ref=CODE` in URL

### Order Configurator
- `components/OrderConfigurator.tsx` — 5-staps progressive reveal, 5% welkomstkorting, YouTube modal

### Pagina's
- `app/how-it-works/page.tsx` — 4-stappen uitleg + FAQ
- `app/bulk-orders/page.tsx` — VIP pagina + contactformulier + FAQ
- `app/contact/page.tsx` — contactformulier + FAQ
- `app/terms/page.tsx` — Terms of Service
- `app/privacy/page.tsx` — Privacy Policy (GDPR)
- `app/login/page.tsx` — login formulier
- `app/register/page.tsx` — registratie met `?email=` pre-fill
- `app/dashboard/page.tsx` — order overzicht + referral sectie (mock data)
- `app/thank-you/page.tsx` — bedanktpagina + guest-to-account conversie
- `app/payment-failed/page.tsx` — 3 opties: retry / andere methode / contact
- `app/admin/page.tsx` — orders beheren, status doorstappen, EA credentials
- `app/admin/prices/page.tsx` — inline bewerkbare prijzen per platform
- `app/admin/customers/page.tsx` — klantenbeheer + kortingsbeheer

### Backend / API
- `lib/supabase.ts` — browser + server Supabase client
- `lib/crypto.ts` — AES-256-CBC encryptie voor EA gegevens
- `lib/discount.ts` — `WELCOME_DISCOUNT_PCT = 5`
- `lib/nowpayments.ts` — NOWPayments API wrapper + webhook verificatie
- `lib/bank-transfer.ts` — referentienummer generator (CF-XXXXXX) + bankgegevens
- `lib/resend.ts` — Resend e-mail wrapper (native fetch)
- `lib/email-templates.ts` — HTML e-mailtemplates (owner + klant)
- `lib/email-service.ts` — combineert templates + verzending
- `lib/referral.ts` — referral code generator, URL builder, 5% korting constante
- `types/database.ts` — volledige TypeScript types voor alle Supabase tabellen
- `supabase/schema.sql` — SQL schema met RLS policies + triggers
- `supabase/seed.sql` — standaard prijzen ($10 per 1M coins)
- `proxy.ts` — route bescherming voor `/admin/*` (klaar voor Supabase auth)
- `app/api/orders/create/route.ts` — order aanmaken endpoint
- `app/api/nowpayments/webhook/route.ts` — IPN webhook handler
- `app/api/admin/orders/[id]/status/route.ts` — status update endpoint
- `app/api/referral/validate/route.ts` — referral code validatie

### Referral & Components
- `components/ReferralSection.tsx` — dashboard sectie met referral link + clipboard copy

Zie `docs/plans/plan.md` voor het volledige implementatieplan (14 fasen).

## Admin Panel Beveiliging (update)

- Beveiligd via Next.js `proxy.ts` (in Next.js 16 vervangt dit `middleware.ts`)
- Supabase auth check staat klaar als commentaar — activeer na Supabase setup

## Hoe Claude moet communiceren

- Wees beknopt. Korte zinnen, geen onnodige uitleg.
- Geen AI-slop ("Zeker!", "Geweldig!", "Absoluut!"). Gewoon doen.
- Geen emojis.
- De gebruiker is een beginner — neem de rol van mentor aan:
  - Leg kort uit WAT je doet en WAAROM bij elke stap.
  - Verklaar nieuwe concepten kort als ze voorbijkomen.
  - Waarschuw als iets complex wordt en stel een simpeler alternatief voor.
  - Stel af en toe een korte reflectievraag als dat nuttig is.
- Communiceer in het Nederlands.

## Tech Stack

- **Frontend:** Next.js (React)
- **Database + Auth:** Supabase (real-time, ingebouwde auth)
- **Hosting:** Vercel (fallback: Railway of DigitalOcean)
- **Betalingen:** NOWPayments (crypto) + bank transfer + Paysafecard + Skrill
- **Taal van de site:** Engels

## Architectuur

- `app/` — Next.js App Router pagina's
- `components/` — Herbruikbare UI-componenten
- `lib/` — Supabase client, NOWPayments integratie, helpers
- `docs/plans/` — Design- en implementatiedocumenten

## Pagina's

| Route | Doel |
|-------|------|
| `/` | Home — hero, order configurator, trust-sectie, reviews |
| `/how-it-works` | Visuele uitleg van het overdrachtsproces |
| `/bulk-orders` | VIP-pagina voor orders van 10M+ coins |
| `/dashboard` | Klantendashboard — orderstatus + loyaliteitskorting |
| `/contact` | Contactformulier voor vragen en support |
| `/admin` | Owner-only — server-side beveiligd via Next.js middleware + Supabase app_metadata role |
| `/thank-you` | Bedanktpagina + guest-to-account conversie prompt |
| `/payment-failed` | Betaalmislukking — 3 opties: retry / andere methode / contact |
| `/terms` | Terms of Service — alleen via footer bereikbaar, niet in navigatie |

## Guest Checkout & Account Flow

- Klanten bestellen zonder account (guest checkout)
- Na betaling op `/thank-you`: prompt om account aan te maken
  - Copy: "Create a free account to track your order, earn loyalty discounts, and get exclusive deals"
  - Email is al pre-filled (ingevuld tijdens bestelling)
  - Niet verplicht — duidelijke "Maybe later" optie

## Admin Panel Beveiliging

- Beveiligd via Next.js `middleware.ts` (server-side, niet client-side)
- Controleert Supabase sessie + owner-rol via `app_metadata` (niet `user_metadata`)
- Zonder geldige owner-sessie: redirect naar `/login`

## Betaalmislukking Fallback

- `/payment-failed` pagina met 3 opties:
  1. "Try again" → nieuwe NOWPayments betaling aanmaken
  2. "Choose different payment method" → terug naar betaalmethode stap
  3. "Contact us" → `/contact`
- NOWPayments betalingen verlopen na ~20 min → duidelijke melding + retry knop

## Order Configurator (homepage — progressive reveal)

Elk stap verschijnt pas als de vorige is voltooid:

```
[1] Platform kiezen       PS4 / PS5 / Xbox / PC  (grote knoppen)
[2] Coins kiezen          Preset knoppen + slider + live prijs
[3] Live Order Summary    "500.000 coins — €12,50" (altijd zichtbaar)
     ↓ verschijnt pas na stap 1+2
[4] Gegevens invullen     EA Email + wachtwoord + 6x backup codes
                          Naast het backup codes veld: kleine knop "Where do I find these?"
                          → opent inline YouTube-video: https://www.youtube.com/watch?v=nvIH96pXx-c
     ↓ verschijnt pas als alles ingevuld
[5] Betaalmethode         Crypto (NOWPayments) / Bank Transfer / Paysafecard / Skrill
[6] Betalen               → Redirect naar /thank-you
```

Ingelogde klant met actieve korting ziet bovenaan de configurator:
`"Special deal for you: 5% discount active"` + groene "Order Now" knop
→ opent configurator met korting al toegepast.

## Order Flow (backend)

1. Klant voltooit configurator en betaalt
2. NOWPayments webhook → orderstatus "Queued" in Supabase
3. Owner ontvangt e-mailnotificatie met orderdetails
4. Owner voert transfer handmatig uit
5. Owner zet status op "Transferring" → "Completed" via admin panel
6. Klant ziet live statusupdate in dashboard

## Design

- Achtergrond: `#0a0a0f` | Accent: `#00ff87` | Secundair: `#6c63ff`
- Fonts: Space Grotesk (headlines) + Inter (body)
- Stijl: donker, strak, premium gaming
- Mobile-first, volledig responsive
- Referentie voor stijl: structuur van Coinfactory overnemen, design overtreffen

## Prijzen

- $10 per 1.000.000 coins — geldt voor alle platforms (PS4 / PS5 / Xbox / PC)
- Instelbaar via admin panel, aanpasbaar per platform

## Betaalmethoden

| Methode | Integratie | Opmerking |
|---------|-----------|-----------|
| Crypto (BTC/ETH/USDT/LTC) | NOWPayments API | Automatisch, geen chargebacks |
| Bank Transfer | Handmatig | Uniek referentienummer per order, bevestiging via admin |
| Paysafecard | Paysafecard API | Prepaid, populair bij gamers, anoniem |
| Skrill | Skrill API | Digitale wallet, minder streng dan PayPal |

**Bank Transfer flow:**
1. Klant kiest bank transfer → ziet IBAN + referentienummer (formaat: `CF-XXXXXX`)
2. Order status: "Awaiting Payment"
3. Klant heeft 24 uur om over te maken
4. Owner ziet in admin: verwacht bedrag + referentie per openstaande order
5. Owner klikt "Confirm Payment Received" → order naar "Queued"

## Openstaande Punten (voor launch, niet voor coderen)

- [ ] Kortingstiers definiëren (bv. na 1e order = 3%, na 3e = 5%)
- [ ] Crypto wallet-adressen voor NOWPayments
- [ ] IBAN + banknaam voor handmatige overboekingen
- [ ] Paysafecard merchant account aanmaken
- [ ] Skrill merchant account aanmaken
- [ ] Logo ontwerpen

## Besloten Features

- Referral systeem — klant deelt persoonlijke link, krijgt korting bij doorverwijzing
- FAQ — per pagina een eigen FAQ-sectie met vragen die passen bij die pagina
- Order-bevestigingsmail naar klant na succesvolle betaling
- Geen live chat
- Geen affiliate-programma
- Alleen Engels
