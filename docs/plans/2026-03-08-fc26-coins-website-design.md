# FC 26 Coins Website — Design Document

**Date:** 2026-03-08
**Status:** Approved

---

## Overview

A conversion-optimized, English-language website for selling FC 26 (FIFA) coins to PS4/PS5 players. The site is designed around trust, speed, and ease of purchase. Order fulfillment is semi-automated: the system notifies the owner per order, the owner executes the transfer manually and updates the status.

---

## Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | Next.js (React) | Fast, SEO-friendly, modern |
| Database + Auth | Supabase | Real-time updates, built-in auth, free tier |
| Hosting | Vercel | Free, one-click deployment, fast CDN |
| Payments | NOWPayments API | Crypto, no ban risk |

**Fallback hosting:** Railway or DigitalOcean if Vercel becomes an issue.

---

## Order Flow (End-to-End)

1. Customer configures order (platform → coin amount → account details)
2. Customer selects payment method and pays via NOWPayments (crypto) or manual bank transfer
3. NOWPayments webhook confirms payment → order status set to "Queued" in Supabase
4. Owner receives email notification with full order details
5. Owner executes coin transfer manually
6. Owner updates order status to "Transferring" → "Completed" via admin panel
7. Customer sees live status update in their dashboard

---

## Pages & Features

### Home (Conversion Frontline)

- **Navigation:** Logo + Home / How It Works / Bulk Orders / Support + "Order Now" CTA button (green)
- **Hero section:**
  - Bold headline: "BUY FC 26 COINS"
  - Subheadline in green: "INSTANT DELIVERY"
  - Trust ticker: "0% ban promise · 100% Secure · Delivery within 2 hours"
  - Primary CTA button: "Get Coins Now"
- **Trust badges (3 blocks):**
  - 100% Secure — 256-bit SSL Encryption
  - Super Quick Delivery — Usually within 2 hours
  - Best Prices — Zero hidden fees
- **Order configurator (step-by-step, progressive reveal):**
  1. Platform selection: PS4 / PS5 toggle buttons
  2. Coin amount: preset buttons (250K, 500K, 1M, 2.5M, 5M, 10M) + slider for custom amount
  3. Live order summary (always visible): amount + real-time price
  4. Account details form (appears after amount selected):
     - EA Account Email
     - Password
     - 6x Backup Codes + "How do I find these?" link → inline YouTube video (closable)
  5. Payment method selection (appears after form is filled):
     - Crypto (NOWPayments)
     - Manual bank transfer
  6. Checkout / payment
- **"Your Security is Our Priority" section:**
  - Icon cards: 256-bit SSL / Account Protection / Clear & Simple Process / Support on Standby
  - "100% Safe Trading Guarantee" banner
- **Social proof section:**
  - Stats: star rating (4.9/5) + Happy Customers count + Orders Completed count
  - 3 customer review cards with quotes
- **Recent Activity Feed:** Pop-ups bottom-left, e.g. "Someone from UK just bought 2.5M Coins"
- **Trustpilot widget:** Floating, always visible
- **Cookie/privacy banner:** GDPR-compliant, shown on first visit

### How It Works

- Visual step-by-step explanation of the transfer process:
  Site → Encryption → Farm → Account
- Reassurance copy focused on safety and speed

### Bulk Orders / VIP

- Landing page targeting high-volume buyers (10M+ coins)
- Short pitch: exclusivity, priority handling, best rates
- Contact form for custom quote

### Account Dashboard (logged-in customers)

- Registration and login via email (Supabase Auth)
- Order history with live status per order: Queued → Transferring → Completed
- Personalized loyalty discount displayed prominently:
  - e.g. "Special deal for you: 5% discount active"
  - Green "Order Now" button → leads to order configurator with discount pre-applied
- Discount tiers increase with repeat purchases (logic defined by owner)

### Admin Panel (owner only, not public)

- Update coin prices per platform (PS4 / PS5)
- Update order status (Queued / Transferring / Completed)
- Set loyalty discount percentages per customer or customer tier

---

## Design Guidelines

**Color palette:**
- Background: `#0a0a0f` (near-black)
- Primary accent: `#00ff87` (electric green)
- Secondary accent: `#6c63ff` (blue-purple, hover states & gradients)
- Text: White / light grey

**Typography:**
- Headlines: Space Grotesk (bold, modern, sharp)
- Body: Inter (readable, professional)

**Aesthetic:** Dark, clean, premium gaming. No neon chaos. Signals trust and speed.

**Reference site:** Coinfactory — adopt their layout structure (hero → trust badges → configurator → security section → social proof → reviews) and exceed it in polish.

**Principles:**
- Conversion-optimized at every step
- Trust signals visible throughout the entire page
- Mobile-first, fully responsive
- Progressive reveal in order configurator (next step only appears when current step is complete)

---

## Open Items (to resolve before or during build)

- [ ] YouTube tutorial link for "How do I find my backup codes?"
- [ ] Loyalty discount tier logic (e.g. after 1st order = 3%, after 3rd = 5%, etc.)
- [ ] Exact initial coin prices (PS4 / PS5)
- [ ] Crypto wallet addresses for NOWPayments setup
- [ ] Manual bank transfer details to show customers
- [ ] Brand name / logo
