# Code Review — FC 26 Coins Website (Planning Phase)

**Reviewer:** Senior Full-Stack Developer + Conversion Expert
**Date:** 2026-03-08
**Scope:** Planning phase only — no code exists yet. Review covers design document, implementation plan, architecture decisions, and business strategy.
**Files reviewed:**
- `CLAUDE.md`
- `SPEC.md`
- `docs/plans/2026-03-08-fc26-coins-website-design.md`
- `docs/plans/plan.md`
- `README.md`
- `CHANGELOG.md`
- `.env.example`
- `.gitignore`
- `.git/hooks/post-commit`

---

## Overall Assessment

The planning work is solid for a first iteration. The tech stack is appropriate, the order flow is logical, and the conversion thinking is present. However, several critical gaps exist — primarily around security (storing plaintext credentials in the database is a serious problem), missing payment failure handling, and the absence of a guest checkout flow. These must be resolved before writing any code, not after.

---

## 1. Technical Architecture

### CRITICAL — EA credentials stored in plaintext in the database

The `orders` table schema stores `ea_password` and `backup_codes` as plain text columns in Supabase:

```
ea_password  | text
backup_codes | text[]
```

This is the single biggest risk in the entire plan. A database breach, misconfigured RLS policy, or compromised Supabase service role key would expose every customer's EA account credentials in full. This is not a theoretical risk — Supabase RLS misconfigurations are a common real-world failure mode.

**Fix required before Phase 5:**
- Encrypt `ea_password` and `backup_codes` at the application layer before writing to the database, using a server-side encryption key (AES-256, stored only in environment variables, never in the database or client-side code).
- Add a `ENCRYPTION_KEY` variable to `.env.example`.
- Decrypt only in the admin panel server action, never in client-side code.
- Add a note to the plan that these fields must never be returned via a public API route.

This is non-negotiable. Even for a small operation, storing plaintext gaming passwords is a liability.

---

### CRITICAL — No guest checkout in the plan

The current plan requires account creation to place an order. The dashboard requires login. The order configurator does not mention guest support explicitly.

In coin-selling markets, a large percentage of buyers — especially first-time buyers — will not create an account. Forcing registration before purchase is a well-documented conversion killer.

**Fix required:**
- The `orders` table already has `user_id` as nullable — that's correct. But the order flow and pages section must explicitly describe a guest path: customer fills out the configurator, pays, and receives a confirmation email with their order details, without needing to create an account.
- Add a post-purchase prompt: "Create an account to track your order live and unlock loyalty discounts."
- Guest orders without an account can only be tracked via the confirmation email link — that is acceptable.

---

### CRITICAL — No payment failure or timeout handling

The plan describes the happy path only: customer pays → webhook fires → order is queued. There is no plan for:

- Payment timeout (customer starts NOWPayments checkout but never pays)
- Webhook delivery failure (NOWPayments retries, but what if all retries fail?)
- Manual bank transfer that never arrives
- Customer pays but webhook is lost — who detects this?

**Fix required:**
- Add an `orders.payment_expires_at` timestamp column for crypto orders.
- Add a note in Phase 8 to implement a Supabase scheduled function (or a simple Vercel cron job) that marks expired pending crypto orders as `expired` after 1 hour.
- Add a section in the admin panel to manually mark a manual transfer as paid.
- Add a note in Phase 9 to send the customer a reminder email if their manual transfer is not confirmed within 24 hours.

---

### Important — Admin role enforcement must be server-side

Phase 7 mentions: "Supabase Auth role check." This is under-specified and a security risk if implemented incorrectly.

Supabase Auth does not have built-in role columns. The common approach is to add a `role` column to the `profiles` table, then check it in RLS policies. However, if the admin panel is a Next.js page that only hides itself client-side based on the user's role, a determined attacker can still reach the underlying API routes.

**Fix required before Phase 7:**
- Add `role` column to `profiles` table (Phase 5 schema).
- All admin API routes must check the role server-side using the Supabase service role key, not client-side.
- Document this explicitly in the plan — "admin check happens in the Next.js Server Action / Route Handler using `SUPABASE_SERVICE_ROLE_KEY`, not via client-side auth state."

---

### Important — NOWPayments webhook signature verification is mentioned but under-specified

Phase 8 says "Verifieert handtekening" (verifies signature). Good. But the plan does not specify how — NOWPayments uses an HMAC-SHA512 signature over the request body with the IPN secret. If this is implemented incorrectly or skipped, any party can forge a webhook and mark orders as paid.

**Fix required:**
- Add an explicit checklist item in Phase 8: "Verify NOWPayments IPN signature using HMAC-SHA512 with `NOWPAYMENTS_IPN_SECRET` before processing the webhook. Return 400 if verification fails."

---

### Minor — Supabase free tier limits are not acknowledged

The plan notes "free tier" as a reason to choose Supabase. The free tier has a 500MB database limit, a 50,000 monthly active user limit, and — critically — the project **pauses after 1 week of inactivity**. A paused project means the site goes down.

**Fix required:**
- Add a note in Phase 14 (or the open items list) to upgrade Supabase to the Pro plan ($25/month) before going live.

---

### Minor — Vercel free tier has function timeout limits

NOWPayments webhook processing on the free Vercel plan has a 10-second function execution limit. If Supabase is slow, the webhook handler could time out, and NOWPayments will retry — potentially processing an order twice.

**Fix:** Add idempotency handling in the webhook handler. Check if an order with the given NOWPayments payment ID already exists before creating a new one.

---

## 2. Conversion Optimization

### Important — No urgency or scarcity mechanics

The plan has social proof (reviews, activity feed, Trustpilot) but no urgency or scarcity signals. Competitors in this market commonly use:

- A live "X orders in the queue" counter on the order configurator
- A "Stock limited — order now to secure your coins" message
- A countdown timer on the checkout step ("Your price is locked for 10 minutes")

**Recommendation:** Add at least one urgency element to the order configurator — the simplest is a "X buyers viewing this right now" or "Last 3 orders delivered in under 1 hour" line near the CTA.

---

### Important — No abandoned checkout recovery plan

A customer who fills in the configurator and drops off at the payment step is a warm lead. There is no plan to recover these.

**Recommendation:** If the customer is logged in and abandons at the payment step, send them one follow-up email 30 minutes later ("You left your order incomplete — here is what you had configured"). This requires storing a draft order in Supabase before payment is confirmed.

---

### Important — The "How do I find my backup codes?" friction point is not minimized enough

The plan has a "Where do I find these?" link that opens a YouTube video. This is good. However, asking a customer for their EA password + 6 backup codes is the highest-friction step in the flow, and it is also the step most likely to cause abandonment due to distrust.

**Recommendation:**
- Add explicit copy next to the password field: "Your credentials are encrypted and only used for the coin transfer. They are deleted from our system within 48 hours of order completion."
- Whether this is strictly true or not, the promise must be genuine — and the plan must include a mechanism to actually delete or nullify credentials after order completion (currently absent from the plan).
- Add a Phase 7 admin panel task: "Mark credentials as cleared after order completion."

---

### Minor — No price anchoring on the configurator

The plan shows a live price ("500,000 Coins — €12.50") but does not compare it to anything. A simple "vs. EA Store: N/A (unavailable)" or showing a crossed-out "market rate" makes the price feel like a deal.

---

### Minor — Thank-you page is planned but underdeveloped

The `/thank-you` page is mentioned but has no planned content beyond being a landing point. This page has 100% of buyers viewing it — it is prime real estate for:

- A referral prompt ("Get 5% off your next order — share your referral link now")
- An upsell ("Want more coins next week? Save your account for faster reorders.")
- A Trustpilot review request ("Leave us a review — it takes 30 seconds.")

Add these to Phase 6.

---

## 3. Trust Signals

### Important — The "100% Safe Trading Guarantee" is legally and operationally hollow

The plan includes a "100% Safe Trading Guarantee" banner and "0% ban promise" ticker. If a customer's account gets banned after buying coins (which does happen — EA enforces its ToS), and the site promised zero ban risk, the site owner is exposed to refund demands and potential legal complaints.

**Recommendation:**
- Change "0% ban promise" to "Low-risk transfer method" or "Trusted by X+ buyers with no reported bans."
- Add a Terms of Service page to the plan. This page should include: disclaimer that buying coins violates EA's ToS, the buyer assumes the risk, and the seller's refund policy. This is not optional — it is legally protective.
- Add `/terms` and `/privacy` to the sitemap. Currently absent from the plan.

---

### Important — Trustpilot widget is mentioned but setting it up requires real reviews

The plan shows a "4.8+ star rating" Trustpilot widget and "4.9/5" social proof stats. At launch, there are zero real reviews. Using fake numbers or a Trustpilot widget before any reviews exist will appear broken or dishonest.

**Recommendation:**
- Plan for a pre-launch "soft launch" phase where the owner does 10-20 manual test orders with real customers to generate authentic Trustpilot reviews before advertising.
- In the meantime, replace the Trustpilot widget with a simple "New — zero-risk launch offer" badge or a manual quote section.
- Add a post-launch task to Phase 14: "Request Trustpilot reviews from first 20 customers."

---

### Important — No Terms of Service or Privacy Policy page in the sitemap

The GDPR cookie banner is planned (Phase 13), but there is no `/privacy` or `/terms` page anywhere in the sitemap. GDPR requires a privacy policy. Without it, the cookie banner is also non-compliant.

**Fix:** Add `/terms` and `/privacy` to the sitemap. Add them as Phase 11 deliverables. They can be simple static pages.

---

### Minor — "Support on Standby" icon card implies live support

One of the four security icon cards says "Support on Standby." There is no live chat planned. If a customer clicks that card expecting fast support and finds only a contact form, trust erodes.

**Recommendation:** Change the copy to "Email Support" or "We respond within 4 hours" to set accurate expectations.

---

## 4. Missing Features Competitors Likely Have

### Important — No order status email updates to customer

Phase 9 plans an order confirmation email, but no status-change notifications. Competitors send emails when the order moves from Queued to Transferring, and again when Completed.

The dashboard has real-time updates, but many customers will not stay logged in. An email when their coins have been delivered is a significant trust and satisfaction driver.

**Fix:** Add two more email triggers in Phase 9:
- Email when status changes to "Transferring": "Your coins are on their way."
- Email when status changes to "Completed": "Your X coins have been delivered — check your account."

---

### Important — No pricing comparison or "why us" differentiator

The plan has trust badges but nothing that differentiates this site from competitors. Buyers do comparison shop. Without a clear reason to choose this site over others, price becomes the only differentiator.

**Recommendation:** Add a comparison section or bullet list on the homepage: "Why players choose us" — e.g., delivery speed, manual transfer method (lower ban risk than bots), customer support, loyalty discounts.

---

### Minor — No Discord or community link

Many coin sellers in the gaming market use Discord as a trust signal and support channel. Even a public Discord with 50 members signals legitimacy. This is not in the plan and is a missed opportunity.

---

### Minor — No reorder flow from the dashboard

The dashboard shows order history, but there is no "Reorder" button per order line. A returning customer who wants the same amount on the same platform should be able to reorder with one click. This is a standard e-commerce feature that directly increases repeat purchase rate.

---

## 5. Risks and Blind Spots

### Critical — EA ToS and account ban risk is entirely unaddressed in the plan

Buying and selling FIFA coins violates EA's Terms of Service. EA actively detects and bans accounts involved in coin trading. This is the fundamental business risk of this entire venture. The plan does not acknowledge this risk once.

The plan must address:
- How coin transfers are performed (player trading, auction house method, etc.) — this determines ban risk level.
- What the refund policy is if a customer's account is banned after a transfer.
- The legal disclaimer that must appear in Terms of Service.
- Whether there are jurisdictions where this business model is legally problematic.

This is not a technical issue — it is a business survival issue.

---

### Important — Semi-manual fulfillment will not scale

The plan describes the owner manually executing every coin transfer. At low volume (1-5 orders/day) this is fine. At 20+ orders/day this becomes a bottleneck, especially given the "delivery within 2 hours" guarantee.

**Recommendation:** The plan should acknowledge this ceiling and include a Phase 15 (post-launch) item: "Evaluate automated transfer tooling or outsource fulfillment when order volume exceeds X/day."

---

### Important — No rate limiting or bot protection on the order form

The order configurator collects EA account credentials. Without rate limiting and CAPTCHA, the form is vulnerable to:
- Automated scraping of the form
- Abuse by competitors or bad actors

**Fix:** Add to Phase 4 or Phase 8: "Add rate limiting on the order submission API route (e.g., max 5 submissions per IP per hour). Add hCaptcha or Cloudflare Turnstile to the checkout step."

---

### Minor — Single payment provider is a single point of failure

NOWPayments is the only crypto payment processor. If NOWPayments has downtime or bans the account, all crypto payments fail. Manual bank transfer is an option, but it is slower and less convenient.

**Recommendation:** Note in the plan that a backup payment processor (e.g., CoinGate or direct USDT wallet) should be added in a post-launch phase.

---

### Minor — The post-commit hook amends CHANGELOG.md but does not stage it

The post-commit hook writes to CHANGELOG.md after a commit completes, but does not `git add` and `git commit` the updated changelog. This means CHANGELOG.md is always one commit behind — the entry for commit N appears in the working tree but is only committed with commit N+1 (if the next commit picks it up). This also means the hook silently modifies a tracked file without committing it, which can confuse `git status`.

Fix the hook to either:
- Stage and commit the changelog update as a follow-up commit (careful: must avoid infinite loop — the existing grep guard handles this, so it is safe to do `git add CHANGELOG.md && git commit -m "docs: update changelog"`), or
- Acknowledge this behavior and accept that CHANGELOG.md is manually committed after review.

---

## 6. Implementation Plan — Phase Order Assessment

The 14-phase order is mostly logical. Issues noted:

### Important — Phase 4 (Order Configurator) depends on Phase 5 (Supabase), not Phase 3

Phase 4 builds the order configurator, which needs live prices from Supabase. But Phase 5 (Supabase) is listed as depending only on Phase 1, and Phase 4 is listed as depending on Phase 3. This means the configurator will be built before the database exists.

**Fix:** The configurator should use hardcoded placeholder prices during Phase 4 and connect to Supabase prices in Phase 5. Add a note to Phase 4: "Use static placeholder prices; connect to Supabase `prices` table in Phase 5."

---

### Important — Phase 8 (NOWPayments) should include manual transfer handling in the same phase

The plan splits NOWPayments integration (Phase 8) and mentions manual bank transfer handling there too, but the thank-you page and confirmation email (Phases 6 and 9) should not be built before the payment trigger exists. The current phase order means you build the thank-you page (Phase 6) before you have the payment trigger (Phase 8).

**Recommendation:** Reorder so that Phase 8 (payments) comes before Phase 6 (dashboard), or ensure Phase 6 uses a stub payment status and wires up real triggers in Phase 8.

---

### Important — Phase 13 (GDPR cookie banner) should be Phase 3 or 4

GDPR compliance is not optional. If the site deploys at any point during development with analytics or third-party scripts (Trustpilot widget, activity feed), it must have a cookie banner from day one. Building it last (Phase 13) risks launching phases to production without compliance.

**Fix:** Move Phase 13 to after Phase 2 (layout), so the banner is present in every subsequent phase's deployment.

---

### Minor — Phase 14 has no rollback plan

The deployment phase lists what to set up but has no procedure for rolling back a failed deployment. Vercel makes this easy (instant rollback to previous deployment), but it should be noted.

---

### Minor — Testing is only in Phase 14

There is no testing mentioned in any earlier phase. At minimum, add a checklist item to Phase 8 ("Test webhook locally via ngrok") and Phase 5 ("Verify RLS policies with a test user account before proceeding").

---

## 7. SEO Considerations

### Important — No SEO strategy in the plan

The plan mentions Next.js is "SEO-friendly" as a justification, but there is no SEO plan. Coin-selling sites compete for terms like "buy FC 26 coins," "FC 26 coins PS5," and "cheap FC 26 coins." Without a deliberate SEO strategy, organic traffic will be near zero at launch.

**Fix — add to Phase 3 or Phase 11:**
- Define target keywords (e.g., "buy FC 26 coins", "FC 26 coins PS4 cheap", "FC 26 coins fast delivery").
- Add `metadata` exports to each Next.js page (title, description, OG tags).
- Add a `sitemap.xml` and `robots.txt` (Next.js can generate these automatically).
- Write the homepage hero copy around the primary keyword.
- The `/how-it-works` page is strong SEO content — optimize its title and structure for "how to buy FC 26 coins safely."

---

### Minor — No structured data planned

Adding JSON-LD structured data (Product schema, FAQPage schema) to the homepage and FAQ sections would improve search result appearance (rich snippets). This is a low-effort, high-impact addition.

---

## 8. Mobile Experience

### Important — The 6-step progressive reveal configurator may be difficult on small screens

The order configurator has 6 steps of progressive reveal. On a 375px wide screen, this could feel cluttered or confusing if each new step pushes content down below the fold.

**Recommendation:** Design the configurator mobile-first. Each step should be a full-width card. Consider whether a sticky "Order Summary" bar at the bottom of the screen (always visible on mobile) would help instead of the inline summary.

---

### Minor — The Trustpilot floating widget + Recent Activity Feed popups = two floating elements simultaneously

On mobile, two floating elements (Trustpilot bottom-right, activity feed bottom-left) compete for screen space and can overlap content. On small screens this is particularly bad.

**Recommendation:** On mobile, collapse the activity feed to a non-floating banner above the fold, and keep only the Trustpilot widget floating.

---

### Minor — Password field with 6 backup codes on mobile

Entering a password and 6 separate backup codes on mobile is the highest-friction step. The UX plan does not address how the 6 backup codes are entered — are they 6 separate input fields, or one text area?

**Recommendation:** Use 6 separate short input fields for the backup codes (similar to 2FA code entry). This is cleaner and less error-prone than a single text area. Document this in the Phase 4 spec.

---

## 9. Post-Launch Growth Strategies

### The current plan ends at deployment. A post-launch growth section is entirely missing.

**Recommendations to add as Phase 15 (Post-Launch):**

**Paid traffic:**
- Google Ads targeting "buy FC 26 coins [platform]" — this is the fastest way to get buyers in the first month.
- Reddit ads targeting r/FIFA, r/fut subreddits.
- TikTok/YouTube short demonstrating a coin transfer (builds trust and gets organic reach).

**Content SEO:**
- Blog posts or guides: "How to get more FC 26 coins fast," "FC 26 transfer market tips" — these rank for long-tail keywords and bring in players who then convert.

**Retention:**
- Monthly email to past customers: "Prices just dropped — restock your coins."
- Seasonal promotions around FIFA Ultimate Team promo events (TOTY, TOTW, etc.) — these are peak demand periods when coin prices spike and buyers are most active.

**Partnerships:**
- Contact small FC 26 YouTube/TikTok creators for affiliate deals — commission per referred sale.

---

## Summary Table

| # | Finding | Severity | Phase Affected |
|---|---------|----------|----------------|
| 1 | EA credentials stored in plaintext | Critical | Phase 5 |
| 2 | No guest checkout path | Critical | Phase 4, 6 |
| 3 | No payment failure / timeout handling | Critical | Phase 8 |
| 4 | Admin role check must be server-side | Critical | Phase 5, 7 |
| 5 | EA ToS / ban risk not addressed in plan | Critical | Business risk |
| 6 | NOWPayments webhook signature under-specified | Important | Phase 8 |
| 7 | No abandoned checkout recovery | Important | Phase 6, 9 |
| 8 | Credential friction not mitigated with copy/deletion promise | Important | Phase 4 |
| 9 | "0% ban promise" is legally risky | Important | Phase 3 |
| 10 | No Terms of Service or Privacy Policy pages | Important | Phase 11 |
| 11 | Trustpilot widget requires real reviews to function | Important | Phase 3, 14 |
| 12 | No order status emails on transfer/completion | Important | Phase 9 |
| 13 | Phase 4 configurator built before Supabase (prices) | Important | Phase 4, 5 |
| 14 | Phase 13 (GDPR) should come earlier | Important | Phase 2 |
| 15 | No SEO strategy | Important | Phase 3, 11 |
| 16 | Mobile configurator UX under-specified | Important | Phase 4 |
| 17 | Semi-manual fulfillment will not scale | Important | Post-launch |
| 18 | Rate limiting / CAPTCHA not planned | Important | Phase 4, 8 |
| 19 | Supabase free tier pauses after inactivity | Minor | Phase 14 |
| 20 | Vercel webhook timeout / idempotency | Minor | Phase 8 |
| 21 | Post-commit hook does not commit changelog | Minor | Now |
| 22 | No urgency mechanics on configurator | Minor | Phase 3, 4 |
| 23 | Thank-you page underdeveloped | Minor | Phase 6 |
| 24 | No reorder button in dashboard | Minor | Phase 6 |
| 25 | Two floating elements clash on mobile | Minor | Phase 3 |
| 26 | Backup codes UX under-specified | Minor | Phase 4 |
| 27 | No post-launch growth plan | Minor | Post-launch |

---

## Recommended Actions Before Writing Code

1. Add `role` column to the `profiles` schema.
2. Add `ENCRYPTION_KEY` to `.env.example` and plan for application-layer encryption of credentials.
3. Add `/terms` and `/privacy` to the sitemap and Phase 11.
4. Define guest checkout path explicitly in Phase 4 and Phase 6.
5. Add payment timeout handling and expired order status to Phase 8.
6. Move Phase 13 (cookie banner) to after Phase 2.
7. Rewrite "0% ban promise" copy to something defensible.
8. Add status-change emails to Phase 9.
9. Add rate limiting and CAPTCHA note to Phase 4 or 8.
10. Add SEO metadata tasks to Phase 3.
