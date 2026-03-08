# FC 26 Coins Website

Conversion-optimized website for selling FC 26 coins to PS4, PS5, Xbox and PC players.

## Tech Stack

- **Frontend:** Next.js (App Router)
- **Database + Auth:** Supabase
- **Hosting:** Vercel
- **Payments:** NOWPayments (crypto) + manual bank transfer

## Local Setup

1. Clone the repository
   ```bash
   git clone https://github.com/hemmesemiel-eng/Coin-Site.git
   cd Coin-Site
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Fill in the values in `.env.local` (see Environment Variables below).

4. Run the development server
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `NOWPAYMENTS_API_KEY` | NOWPayments API key |
| `NOWPAYMENTS_IPN_SECRET` | NOWPayments webhook secret |
| `RESEND_API_KEY` | Resend API key for transactional emails |
| `OWNER_EMAIL` | Email address to receive order notifications |
| `NEXT_PUBLIC_SITE_URL` | Base URL of the site |

## Project Structure

```
app/              # Next.js pages (App Router)
components/       # Reusable UI components
lib/              # Supabase client, NOWPayments, helpers
docs/plans/       # Design and implementation documents
```

## Documentation

- [Design document](docs/plans/2026-03-08-fc26-coins-website-design.md)
- [Implementation plan](docs/plans/plan.md)

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — what's live on Vercel |
| `dev` | Active development — build here |

Always work on `dev`. Merge to `main` only when a phase is complete and tested.
