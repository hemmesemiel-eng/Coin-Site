import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Coinfactory",
  description: "Coinfactory Terms of Service. Read before placing an order.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-foreground-muted">
            Legal
          </p>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-foreground-muted">
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-border bg-surface p-8 sm:p-10">
            <div className="flex flex-col gap-10 text-sm text-foreground-muted leading-relaxed">

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  1. Introduction
                </h2>
                <p>
                  Coinfactory ("we", "us", "our") provides FC 26 coin transfer
                  services to customers ("you", "the buyer"). By placing an
                  order on this website, you agree to these Terms of Service in
                  full. If you do not agree, do not place an order.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  2. EA Terms of Service Disclaimer
                </h2>
                <p>
                  By purchasing coins from Coinfactory, you acknowledge that
                  coin trading may violate EA's Terms of Service. Coinfactory
                  cannot be held responsible for any account actions taken by
                  EA, including but not limited to: temporary bans, permanent
                  bans, coin removal, or account suspension. You purchase at
                  your own risk.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  3. Payments and Refunds
                </h2>
                <p className="mb-3">
                  All payments are final. We do not accept chargebacks or
                  payment reversals. Initiating a chargeback constitutes fraud
                  and may be reported to the relevant authorities.
                </p>
                <p>
                  If a transfer fails due to an error on our side — for example,
                  a technical issue during delivery — we will offer a retry or a
                  full refund at your discretion. Refund requests must be made
                  within 24 hours of the original order.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  4. No Guarantee of Account Safety
                </h2>
                <p>
                  We take every precaution to deliver coins safely. However, we
                  cannot guarantee that your EA account will not be subject to
                  action by EA. Coinfactory bears no liability for account
                  penalties imposed by EA or any affiliated party.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  5. Age Requirement
                </h2>
                <p>
                  You must be at least 18 years old to place an order on
                  Coinfactory. By submitting an order, you confirm that you
                  meet this age requirement. We reserve the right to cancel
                  orders if this requirement is not met.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  6. EA Account Credentials
                </h2>
                <p className="mb-3">
                  To deliver coins, we require temporary access to your EA
                  account. By providing your credentials, you authorise
                  Coinfactory to log in solely for the purpose of completing the
                  coin transfer.
                </p>
                <p>
                  Your credentials are encrypted with AES-256 immediately upon
                  submission and are never stored in plain text. They are
                  deleted within 90 days of order completion. We do not share
                  your credentials with any third party.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  7. Privacy
                </h2>
                <p>
                  We collect and store only the data necessary to fulfil your
                  order. For details on how we handle your data, see our{" "}
                  <a
                    href="/privacy"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  8. Changes to These Terms
                </h2>
                <p>
                  We reserve the right to update these Terms of Service at any
                  time. The date at the top of this page reflects the most
                  recent revision. Continued use of our service after changes
                  constitutes acceptance of the revised terms.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  9. Contact
                </h2>
                <p>
                  Questions about these terms? Contact us at{" "}
                  <a
                    href="mailto:support@coinfactory.gg"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    support@coinfactory.gg
                  </a>{" "}
                  or via the{" "}
                  <a
                    href="/contact"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    contact page
                  </a>
                  .
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
