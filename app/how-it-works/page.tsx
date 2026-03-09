import type { Metadata } from "next";

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

const faq = [
  {
    question: "Is my account safe?",
    answer:
      "We use the same transfer method as every professional coin service. Your credentials are encrypted end-to-end and never shared. That said, coin trading does carry a small inherent risk with EA — we are transparent about this in our Terms of Service.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are completed within 2 hours of payment confirmation. During peak hours (evenings CET) it can take up to 4 hours. Bulk orders may take longer.",
  },
  {
    question: "What is the transfer method?",
    answer:
      "We use the standard in-game transfer method: we log into your account and complete the trade. No bots, no third-party software. This is the safest method available.",
  },
  {
    question: "What if something goes wrong?",
    answer:
      "Contact us via the support page. We respond within 2-4 hours. If a transfer fails due to an error on our side, we will retry or issue a refund — your choice.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
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

      {/* FAQ */}
      <section className="border-t border-border px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-6">
            {faq.map((item) => (
              <div key={item.question} className="rounded-xl border border-border bg-surface p-6">
                <h3 className="mb-3 font-heading text-base font-semibold text-foreground">
                  {item.question}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
