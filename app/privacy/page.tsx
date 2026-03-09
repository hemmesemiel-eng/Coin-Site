import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Coinfactory",
  description:
    "Coinfactory Privacy Policy. How we collect, use, and protect your data. GDPR compliant.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-foreground-muted">
            Legal
          </p>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-foreground-muted">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-border bg-surface p-8 sm:p-10">
            <div className="flex flex-col gap-10 text-sm text-foreground-muted leading-relaxed">

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  1. Who We Are
                </h2>
                <p>
                  Coinfactory operates this website and processes data solely to
                  deliver FC 26 coin transfer services. This policy explains
                  what data we collect, why, and how we protect it.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  2. Data We Collect
                </h2>
                <p className="mb-4">We collect the following data when you place an order:</p>
                <ul className="flex flex-col gap-2 pl-4">
                  {[
                    "Email address — to send order confirmations and updates",
                    "EA account email — to identify the destination account (stored encrypted)",
                    "EA account password — required to complete the coin transfer (AES-256 encrypted)",
                    "EA backup codes — as a security fallback (AES-256 encrypted)",
                    "Order details — platform, coin amount, payment method, timestamps",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  3. Why We Collect It
                </h2>
                <p>
                  We collect this data exclusively to fulfil your order. Your
                  EA credentials are required to log into your account and
                  complete the coin transfer. We have no other use for this
                  data.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  4. How We Secure Your Data
                </h2>
                <p className="mb-3">
                  EA credentials (password and backup codes) are encrypted with
                  AES-256 before being stored in our database. Plain-text
                  credentials are never written to disk or stored in logs.
                </p>
                <p>
                  Our database access is restricted to authorised personnel only.
                  All connections use TLS in transit.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  5. How Long We Keep Your Data
                </h2>
                <p>
                  EA credentials are scheduled for deletion within{" "}
                  <span className="text-foreground font-medium">
                    90 days of order completion
                  </span>
                  . Order records (email, platform, amount) are retained for up
                  to 12 months for accounting and dispute resolution purposes,
                  then permanently deleted.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  6. Third Parties
                </h2>
                <p className="mb-3">
                  We do not sell or share your personal data with third parties.
                </p>
                <p>
                  We use the following sub-processors to operate the service:
                </p>
                <ul className="mt-3 flex flex-col gap-2 pl-4">
                  {[
                    "Supabase — database and authentication (EU region)",
                    "Vercel — website hosting",
                    "NOWPayments — cryptocurrency payment processing",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground-muted" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3">
                  Each sub-processor has their own privacy policy and is bound
                  by data processing agreements where required by GDPR.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  7. Cookies
                </h2>
                <p>
                  We use only functional cookies — strictly necessary for
                  authentication and session management. We do not use tracking
                  cookies, analytics cookies, or any form of third-party
                  advertising cookies.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  8. Your GDPR Rights
                </h2>
                <p className="mb-4">
                  If you are located in the EU or EEA, you have the following
                  rights regarding your personal data:
                </p>
                <ul className="flex flex-col gap-2 pl-4">
                  {[
                    "Right of access — request a copy of the data we hold about you",
                    "Right to rectification — request correction of inaccurate data",
                    "Right to erasure — request deletion of your data",
                    "Right to restriction — request that we limit how we use your data",
                    "Right to portability — receive your data in a portable format",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, email{" "}
                  <a
                    href="mailto:privacy@coinfactory.gg"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    privacy@coinfactory.gg
                  </a>
                  . We will respond within 30 days.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  9. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy as the service evolves. The
                  date at the top reflects the latest revision. We will notify
                  registered users of material changes via email.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  10. Contact
                </h2>
                <p>
                  Privacy questions or requests:{" "}
                  <a
                    href="mailto:privacy@coinfactory.gg"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    privacy@coinfactory.gg
                  </a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
