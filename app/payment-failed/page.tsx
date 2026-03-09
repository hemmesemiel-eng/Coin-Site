import Link from "next/link";

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12"
      aria-hidden
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

const options = [
  {
    title: "Try Again",
    description: "Retry with the same payment method.",
    href: "/#order",
    label: "Retry Payment",
    variant: "brand" as const,
  },
  {
    title: "Choose Different Method",
    description: "Select another payment option.",
    href: "/#order",
    label: "Change Method",
    variant: "surface" as const,
  },
  {
    title: "Contact Support",
    description: "Get help from our team.",
    href: "/contact",
    label: "Get Help",
    variant: "surface" as const,
  },
];

export default function PaymentFailedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      {/* Icon + heading */}
      <div className="flex max-w-lg flex-col items-center text-center">
        <div className="mb-6 text-orange-400">
          <AlertIcon />
        </div>

        <h1 className="font-heading text-4xl font-bold text-foreground">
          Payment Failed
        </h1>

        <p className="mt-4 max-w-sm text-foreground-muted">
          Your payment could not be processed. This happens if a payment
          expires&nbsp;
          <span className="text-foreground">(20 min limit for crypto)</span>.
        </p>
      </div>

      {/* Option cards */}
      <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {options.map((opt) => (
          <div
            key={opt.title}
            className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6"
          >
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                {opt.title}
              </h2>
              <p className="mt-2 text-sm text-foreground-muted">
                {opt.description}
              </p>
            </div>
            <Link
              href={opt.href}
              className={`mt-6 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-opacity hover:opacity-90 ${
                opt.variant === "brand"
                  ? "bg-brand text-background"
                  : "border border-border text-foreground hover:bg-surface-hover"
              }`}
            >
              {opt.label}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
