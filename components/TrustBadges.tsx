const badges = [
  {
    title: "100% Secure",
    description:
      "Your EA account credentials are never stored. We use safe coin delivery methods that protect your account.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path
          d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6l-8-4z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Instant Delivery",
    description:
      "Orders are processed within minutes. Most customers receive their coins in under 2 hours — often faster.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path
          d="M13 2L4.5 13.5H12L11 22l8.5-11.5H12L13 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Best Prices",
    description:
      "We guarantee the lowest prices for FC 26 coins. If you find it cheaper elsewhere, we'll match it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path
          d="M12 2a10 10 0 100 20A10 10 0 0012 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6v2m0 8v2M9.5 9.5c0-1.1.9-1.5 2.5-1.5s2.5.9 2.5 2c0 2-5 2-5 4 0 1.1.9 2 2.5 2s2.5-.9 2.5-2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function TrustBadges() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {badges.map((badge, i) => (
            <div
              key={badge.title}
              className="group relative rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-brand/40 hover:bg-surface-hover hover:shadow-[0_0_30px_rgba(0,255,135,0.06)]"
              style={{
                animation: "fadeUp 0.5s ease both",
                animationDelay: `${i * 120}ms`,
              }}
            >
              {/* Subtiele glow op hover via pseudo-element simulatie */}
              <div className="mb-5 inline-flex rounded-xl border border-brand/20 bg-brand/10 p-3 text-brand transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand/20">
                {badge.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                {badge.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {badge.description}
              </p>
            </div>
          ))}
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
