import type { Metadata } from "next";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Coinfactory",
  description:
    "Get in touch with Coinfactory support. We typically respond within 2-4 hours.",
};

const contactFAQ = [
  {
    question: "How fast do you respond to messages?",
    answer:
      "Usually within 2-4 hours. We're available every day from 10:00 to 22:00 CET. For urgent order issues, mention 'URGENT' in your subject line.",
  },
  {
    question: "My payment went through but I haven't received my coins yet. What do I do?",
    answer:
      "Check your dashboard first — if it says 'Queued' or 'Transferring', it's in progress. If it's been over 3 hours with no update, send us a message with your order ID and we'll check it immediately.",
  },
  {
    question: "I made a mistake in my order (wrong platform, wrong EA details). Can I change it?",
    answer:
      "Contact us as soon as possible — before the transfer starts, we can usually fix it. Once a transfer is in progress, changes aren't possible.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
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
            <ContactForm />
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

      <FAQ items={contactFAQ} />
    </div>
  );
}
