import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/bulk-orders", label: "Bulk Orders" },
  { href: "/contact", label: "Support" },
];

const legal = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

const paymentMethods = [
  "Crypto (BTC / ETH / USDT / LTC)",
  "Bank Transfer",
  "Paysafecard",
  "Skrill",
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span className="font-heading text-xl font-bold text-brand">
              Coinfactory
            </span>
            <p className="text-sm text-foreground-muted leading-relaxed">
              The fastest and safest way to buy FC 26 coins. Instant delivery,
              zero ban risk.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground-muted">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground-muted">
              Legal
            </h3>
            <ul className="flex flex-col gap-2">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment methods */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground-muted">
              Payment Methods
            </h3>
            <ul className="flex flex-col gap-2">
              {paymentMethods.map((method) => (
                <li key={method} className="text-sm text-foreground-muted">
                  {method}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-foreground-muted sm:flex-row">
          <span>© 2026 Coinfactory. All rights reserved.</span>
          <span className="font-medium tracking-wide text-foreground-muted">
            Fast · Safe · Trusted
          </span>
        </div>
      </div>
    </footer>
  );
}
