import type { Metadata } from "next";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Bulk Orders — Coinfactory",
  description:
    "Buy 10M+ FC 26 coins in bulk. Custom pricing, priority delivery, dedicated support for serious players and traders.",
};

const benefits = [
  {
    label: "Lower Price Per Coin",
    description:
      "Bulk orders get custom pricing below our standard rate. The more you buy, the better the deal.",
  },
  {
    label: "Priority Delivery",
    description:
      "Your order jumps the queue. Most bulk orders are handled within 4 hours of payment.",
  },
  {
    label: "Dedicated Support",
    description:
      "A real person handles your order from start to finish. Direct communication throughout.",
  },
  {
    label: "Flexible Payment",
    description:
      "All standard payment methods available. For very large orders, custom payment arrangements are possible.",
  },
];

const platforms = ["PS4", "PS5", "Xbox", "PC"];

const bulkFAQ = [
  {
    question: "What's the minimum for a bulk order?",
    answer:
      "Bulk orders start at 10 million coins. Below that, just use the regular order form on the homepage — it's instant.",
  },
  {
    question: "Do I get a better price for bulk orders?",
    answer:
      "Yes. Bulk orders get custom pricing that's lower than our standard rate. Fill in the contact form and we'll come back to you with a quote within a few hours.",
  },
  {
    question: "How long does a bulk order take to deliver?",
    answer:
      "Larger orders take a bit more time — usually between 4-12 hours depending on the amount. We'll give you an estimated delivery time when we confirm your order.",
  },
  {
    question: "Can I split the coins across multiple accounts?",
    answer:
      "Yes, that's possible. Just mention it in your message and we'll arrange it. We'll need the EA credentials for each account.",
  },
];

export default function BulkOrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 text-center sm:px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(108,99,255,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-accent">
            VIP Service
          </p>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Bulk Orders
          </h1>
          <p className="mt-4 text-lg text-foreground-muted">
            For serious players and traders. Minimum 10M coins.
            Custom pricing, priority delivery, personal handling.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/30 hover:bg-surface-hover"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {item.label}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-surface px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-12">
          <span className="text-sm text-foreground-muted">
            All bulk orders handled personally
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="text-sm text-foreground-muted">
            Custom pricing available
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="text-sm text-foreground-muted">
            Minimum order: 10,000,000 coins
          </span>
        </div>
      </section>

      {/* Contact form */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Request a Bulk Order
          </h2>
          <p className="mb-8 text-foreground-muted">
            Fill in the form below and we will get back to you within 2 hours
            with a custom quote.
          </p>

          <form className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="bulk-name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="bulk-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="bulk-email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="bulk-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="bulk-amount"
                  className="text-sm font-medium text-foreground"
                >
                  Desired Amount (coins)
                </label>
                <input
                  id="bulk-amount"
                  type="text"
                  name="amount"
                  placeholder="e.g. 50,000,000"
                  className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="bulk-platform"
                  className="text-sm font-medium text-foreground"
                >
                  Platform
                </label>
                <select
                  id="bulk-platform"
                  name="platform"
                  defaultValue=""
                  className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="" disabled>
                    Select platform
                  </option>
                  {platforms.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="bulk-message"
                className="text-sm font-medium text-foreground"
              >
                Message{" "}
                <span className="text-foreground-muted font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                id="bulk-message"
                name="message"
                rows={4}
                placeholder="Any additional info — preferred payment method, timeline, etc."
                className="resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-lg bg-accent px-6 py-3 font-heading font-semibold text-white transition-opacity hover:opacity-90"
            >
              Send Request
            </button>
          </form>
        </div>
      </section>

      <FAQ items={bulkFAQ} />
    </div>
  );
}
