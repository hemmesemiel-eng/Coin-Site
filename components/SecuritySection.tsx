const features = [
  {
    title: "SSL Encrypted",
    description: "All data is transmitted over 256-bit SSL encryption. Your info is never exposed.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Account Protection",
    description: "Our transfer methods are tested to keep your EA account safe. Zero bans in 3+ years.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path
          d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6l-8-4z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Simple Process",
    description: "Configure, pay, and receive. No complicated steps. Most orders done in under 2 hours.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="9" y="3" width="6" height="4" rx="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description: "Questions or concerns? Our support team is available around the clock via our contact page.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function SecuritySection() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">
            Security First
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Your Security Is Our Priority
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-foreground-muted">
            We&apos;ve handled over 100,000 orders. Every system is built to keep your account and your money safe.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/30 hover:bg-surface-hover"
              style={{
                animation: "fadeUp 0.5s ease both",
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="mb-4 inline-flex rounded-lg border border-accent/20 bg-accent/10 p-2.5 text-accent">
                {feature.icon}
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantee banner */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-brand/30 bg-brand/10 px-8 py-6 sm:flex-row"
          style={{
            boxShadow: "0 0 40px rgba(0,255,135,0.08)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-heading text-lg font-bold text-brand">
                100% Safe Trading Guarantee
              </p>
              <p className="text-sm text-foreground-muted">
                If anything goes wrong, we make it right — full refund or redeliver.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-heading text-2xl font-bold text-brand">0</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">
              Bans Ever
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
