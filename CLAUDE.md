# Coinfactory

**Merknaam:** Coinfactory
Een conversion-geoptimaliseerde website voor het verkopen van FC 26 coins.
Gebouwd met Next.js + Supabase + Vercel.

## Project Status

**Fase 1+2 voltooid.** Fase 3 is het volgende (homepage hero, trust, social proof).

**Al gebouwd:**
- `app/layout.tsx` — root layout met Navbar + Footer + fonts + metadata
- `app/globals.css` — design tokens (kleuren, fonts) via Tailwind v4 `@theme inline`
- `components/Navbar.tsx` — sticky navbar met hamburger-menu (mobile), "Order Now" CTA
- `components/Footer.tsx` — 4-koloms footer met navigatie, legal, betaalmethoden
- `.env.local` — placeholders voor Supabase, NOWPayments, encryptiesleutel, Resend

Zie `docs/plans/plan.md` voor het volledige implementatieplan (14 fasen).

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
