import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Coinfactory",
  description:
    "Get in touch with Coinfactory support. We typically respond within 2-4 hours.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 text-center sm:px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,255,135,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl">
          <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-brand">
            Support
          </p>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-foreground-muted">
            A question about your order, or anything else? We are here.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-5">
          {/* Contact form — wider column */}
          <div className="lg:col-span-3">
            <form className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-medium text-foreground"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="e.g. Order not received, Question about payment..."
                  className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Describe your issue or question in detail..."
                  className="resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-brand px-6 py-3 font-heading font-semibold text-background transition-opacity hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Info block */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
                Response Time
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed">
                We typically respond within{" "}
                <span className="text-foreground font-medium">2-4 hours</span>.
                During peak times it may take slightly longer.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
                Support Hours
              </h2>
              <p className="text-sm text-foreground-muted">
                Available{" "}
                <span className="text-foreground font-medium">Mon–Sun</span>
              </p>
              <p className="text-sm text-foreground-muted">
                <span className="text-foreground font-medium">
                  10:00–22:00 CET
                </span>
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
                Order Issues
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed">
                If your order is delayed or not arrived, include your order
                number in the subject line. We will prioritise it.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
                Email
              </h2>
              <p className="text-sm text-foreground-muted">
                support@coinfactory.gg
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
