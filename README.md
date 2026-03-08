# Coinfactory

Conversion-optimized website for selling FC 26 coins to PS4, PS5, Xbox and PC players.

## Tech Stack

- **Frontend:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database + Auth:** Supabase
- **Hosting:** Vercel
- **Payments:** NOWPayments (crypto) + Bank Transfer + Paysafecard + Skrill

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
   Fill in the values in `.env.local`.

4. Run the development server
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `NOWPAYMENTS_API_KEY` | NOWPayments API key |
| `NOWPAYMENTS_IPN_SECRET` | NOWPayments webhook secret |
| `RESEND_API_KEY` | Resend API key for transactional emails |
| `OWNER_EMAIL` | Email address for order notifications |
| `ENCRYPTION_KEY` | AES-256 key — generate with: `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | Base URL of the site |

## Project Structure

```
app/              # Next.js pages (App Router)
components/       # Reusable UI components
lib/              # Supabase client, payment helpers
docs/plans/       # Design and implementation documents
```

## Documentation

- [Design document](docs/plans/2026-03-08-fc26-coins-website-design.md)
- [Implementation plan](docs/plans/plan.md)

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production |
| `dev` | Active development |
