import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "How It Works — Coinfactory",
  description:
    "Learn how Coinfactory delivers FC 26 coins safely to your account. Simple, fast, secure.",
};

const steps = [
  {
    number: "01",
    title: "Place Your Order",
    description:
      "Choose your platform (PS4, PS5, Xbox, or PC), select the amount of coins you want, and fill in your EA account credentials. Then pick a payment method and complete checkout.",
    detail: "Takes less than 3 minutes.",
  },
  {
    number: "02",
    title: "Secure Processing",
    description:
      "Your EA credentials are encrypted with AES-256 and stored securely. Your order enters our queue and you receive an order confirmation. We never store plain-text passwords.",
    detail: "Encryption happens immediately.",
  },
  {
    number: "03",
    title: "Coin Transfer",
    description:
      "We log into your EA account and transfer the coins via a standard in-game method. This is the same process used by every professional coin supplier. No third-party tools involved.",
    detail: "Usually completed within 2 hours.",
  },
  {
    number: "04",
    title: "Done",
    description:
      "Your coins are in your account. You receive a confirmation and can verify the balance in-game. Your stored credentials are scheduled for deletion within 90 days.",
    detail: "Check your inbox for the confirmation.",
  },
];

const howItWorksFAQ = [
  {
    question: "Why do you need my EA password?",
    answer:
      "To transfer coins, we log into your account and send them from a 'mule' account using the in-game transfer method. It's the same method everyone in this space uses — it's why we can guarantee no bans.",
  },
  {
    question: "What are backup codes and where do I find them?",
    answer:
      "Backup codes are one-time login codes from EA's two-factor authentication. We need them in case EA asks for verification during the login. You can find them in your EA security settings — there's a video guide in the order form that shows you exactly where.",
  },
  {
    question: "Will EA ban my account?",
    answer:
      "We've processed thousands of orders and have a 0% ban rate. The transfer method we use is discreet and doesn't trigger EA's detection systems. That said, coin trading technically violates EA's ToS, so there's always a theoretical risk — we just make it as small as possible.",
  },
  {
    question: "What happens after I place my order?",
    answer:
      "Once your payment is confirmed, we get to work immediately. The whole transfer usually takes under 2 hours.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 text-center sm:px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,255,135,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-brand">
            The Process
          </p>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            How It Works
          </h1>
          <p className="mt-4 text-lg text-foreground-muted">
            From order to coins in your account — four straightforward steps.
            No hidden steps, no surprises.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="relative flex flex-col gap-0">
            {/* Vertical connector line */}
            <div className="absolute left-8 top-12 hidden h-[calc(100%-6rem)] w-px bg-border sm:block" />

            {steps.map((step, index) => (
              <div key={step.number} className="relative flex gap-6 pb-12 last:pb-0">
                {/* Step number circle */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-brand bg-background">
                  <span className="font-heading text-sm font-bold text-brand">
                    {step.number}
                  </span>
                </div>

                {/* Content card */}
                <div className="flex-1 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-brand/30 hover:bg-surface-hover">
                  <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-heading text-xl font-semibold text-foreground">
                      {step.title}
                    </h2>
                    <span className="text-sm text-brand">{step.detail}</span>
                  </div>
                  <p className="text-foreground-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we need your credentials */}
      <section className="border-t border-border px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Why We Need Your EA Credentials
          </h2>
          <p className="mb-6 text-foreground-muted leading-relaxed">
            The only way to transfer coins in FC 26 is to log into the
            recipient account and complete an in-game trade. There is no
            external API or alternative — this is how every coin service
            operates.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "AES-256 Encryption",
                body: "Your password and backup codes are encrypted before they touch our database. Our staff never see your plain-text credentials.",
              },
              {
                title: "Limited Access Window",
                body: "We only access your account during the transfer. Once complete, your credentials are flagged for deletion within 90 days.",
              },
              {
                title: "No Stored Sessions",
                body: "We do not save login sessions or cookies. Each transfer starts fresh and leaves no persistent access.",
              },
              {
                title: "Backup Codes as Safety Net",
                body: "We ask for backup codes so you can regain account access at any time, even if a login attempt triggers EA's security checks.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={howItWorksFAQ} />

      {/* CTA */}
      <section className="border-t border-border px-4 py-20 text-center sm:px-6">
        <div className="mx-auto max-w-xl">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Ready to get your coins?
          </h2>
          <p className="mt-3 text-foreground-muted">
            Takes less than 3 minutes. No account required.
          </p>
          <Link
            href="/#order"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 font-heading text-base font-bold text-background transition-opacity hover:opacity-90"
          >
            Order Now
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
