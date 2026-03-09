const stats = [
  {
    value: "4.9",
    label: "Average Rating",
    suffix: "/5",
    stars: true,
  },
  {
    value: "3,000+",
    label: "Satisfied Customers",
    suffix: "",
    stars: false,
  },
  {
    value: "7,200+",
    label: "Orders Completed",
    suffix: "",
    stars: false,
  },
];

const reviews = [
  {
    username: "xX_ProGamer_Xx",
    platform: "PS5",
    quote:
      "Ordered 2M coins at midnight and had them in my club by 1am. Absolutely insane speed. No issues with my account whatsoever.",
    rating: 5,
    date: "February 2026",
  },
  {
    username: "FUT_Legend99",
    platform: "PC",
    quote:
      "Been buying here for 6 months. Every single order was delivered fast and my account has never been touched. Cheapest prices I've found anywhere.",
    rating: 5,
    date: "January 2026",
  },
  {
    username: "CoinsKing2026",
    platform: "Xbox",
    quote:
      "Was skeptical at first but after my first order I became a regular. The bank transfer option is super convenient and they confirm fast.",
    rating: 5,
    date: "March 2026",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-brand">
          <path d="M8 1.5l1.77 3.59 3.96.57-2.87 2.8.68 3.94L8 10.35l-3.54 1.85.68-3.94L2.27 5.66l3.96-.57L8 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">
            Trusted by Thousands
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            What Our Customers Say
          </h2>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-1 gap-6 rounded-2xl border border-border bg-surface p-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-2 ${
                i < stats.length - 1
                  ? "border-b border-border pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6"
                  : ""
              }`}
            >
              {stat.stars && (
                <div className="mb-1">
                  <Stars count={5} />
                </div>
              )}
              <div className="font-heading text-4xl font-bold text-foreground">
                {stat.value}
                {stat.suffix && (
                  <span className="text-2xl text-foreground-muted">{stat.suffix}</span>
                )}
              </div>
              <p className="text-sm text-foreground-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {reviews.map((review, i) => (
            <div
              key={review.username}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-brand/30 hover:bg-surface-hover"
              style={{
                animation: "fadeUp 0.5s ease both",
                animationDelay: `${i * 120}ms`,
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-heading text-sm font-bold text-foreground">
                    {review.username}
                  </p>
                  <p className="text-xs text-foreground-muted">{review.platform}</p>
                </div>
                <span className="shrink-0 rounded-full border border-border bg-surface-hover px-2 py-0.5 text-xs text-foreground-muted">
                  {review.date}
                </span>
              </div>

              {/* Stars */}
              <Stars count={review.rating} />

              {/* Quote */}
              <p className="text-sm leading-relaxed text-foreground-muted">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Verified badge */}
              <div className="flex items-center gap-1.5 text-xs text-brand">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                  <path d="M6 8l2 2 3-3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 1.5l1.18 2.39 2.64.38-1.91 1.87.45 2.63L8 7.6 5.64 8.77l.45-2.63L4.18 4.27l2.64-.38L8 1.5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Purchase
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
