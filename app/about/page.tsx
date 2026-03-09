import Link from "next/link";

export const metadata = {
  title: "About Us — Coinfactory",
  description: "Why Coinfactory exists — and why thousands of FC 26 players trust us to deliver.",
};

export default function AboutPage() {
  return (
    <main className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* WHY — the hook */}
        <div className="mb-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">Why we exist</p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            FC should be about<br />
            <span className="text-brand">your dream squad.</span><br />
            Not about grinding.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
            You open a pack. You get nothing. You play 40 games to save up enough for a player you'll replace in two weeks. Meanwhile someone else is already running a full red squad — not because they're better, but because they spent more time grinding.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
            That's the part of FC we wanted to fix. Not the game itself — the grind that gets between you and actually enjoying it.
          </p>
        </div>

        {/* HOW — the approach */}
        <div className="mb-20 rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">How we do it</p>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Personal. Safe. Fast.</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M8 1L2 4v4c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V4L8 1z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.5 8l1.5 1.5 3-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">Every transfer is handled personally</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                  No bots. A real person handles your order. That's why we can guarantee safety — we know exactly what we're doing, every single time.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M2 8l4-4 2 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="1" y="1" width="14" height="14" rx="2" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">Your data never leaves securely</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                  Your EA credentials are encrypted with AES-256 the moment you enter them. After the transfer is done, they're deleted. We can't even look them up after the fact.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M8 1.5l1.18 2.39 2.64.38-1.91 1.87.45 2.63L8 7.6 5.64 8.77l.45-2.63-1.91-1.87 2.64-.38L8 1.5z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 14l2-4M13 14l-2-4M8 10v4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">Honest pricing, no surprises</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                  Our prices are competitive and always clearly shown before you pay — no hidden fees, no surprises.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT — the result */}
        <div className="mb-20">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">What that means for you</p>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Your dream squad. Today.
          </h2>
          <p className="text-foreground-muted leading-relaxed mb-6">
            Order before midnight and you'll have your coins by morning. Most players have them in under 2 hours. Pick your platform, choose your amount, and get back to actually playing.
          </p>

          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-surface p-6 text-center">
            {[
              { value: "3,000+", label: "Players served" },
              { value: "< 2h", label: "Average delivery" },
              { value: "0", label: "Bans on record" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-2xl font-bold text-brand sm:text-3xl">{stat.value}</div>
                <p className="mt-1 text-xs text-foreground-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The promise */}
        <div className="mb-20 rounded-2xl border border-brand/20 bg-brand/5 p-8">
          <p className="font-heading text-lg font-bold text-foreground mb-3">Our promise</p>
          <p className="text-foreground-muted leading-relaxed">
            If something goes wrong with your order — wrong amount, delay, anything — we fix it. No scripts, no automated replies. A real person will sort it out. We'd rather lose money on an order than lose your trust.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/#order"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-background transition-opacity hover:opacity-90"
          >
            Build your squad now
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p className="mt-3 text-xs text-foreground-muted">No account required · Coins within 2 hours</p>
        </div>

      </div>
    </main>
  );
}
