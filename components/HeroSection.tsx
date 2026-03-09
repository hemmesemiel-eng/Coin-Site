import Link from "next/link";

const tickerItems = [
  "0% Ban Promise",
  "100% Secure",
  "Delivery Within 2 Hours",
  "50,000+ Happy Customers",
  "All Platforms Supported",
  "24/7 Support",
];

export default function HeroSection() {
  const repeated = [...tickerItems, ...tickerItems];

  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Safety badge */}
      <div
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground-muted backdrop-blur-sm"
        style={{ animation: "fadeUp 0.5s ease both" }}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 text-brand">
          <path d="M8 1L2 4v4c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V4L8 1z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 8l1.5 1.5 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        100% Safe &middot; 24/7 Support
      </div>

      {/* Headline */}
      <h1
        className="font-heading text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        style={{ animation: "fadeUp 0.5s ease both", animationDelay: "80ms" }}
      >
        BUY FC 26 COINS
      </h1>

      {/* Subheadline */}
      <p
        className="mt-3 font-heading text-2xl font-bold uppercase tracking-[0.15em] text-brand sm:text-3xl md:text-4xl"
        style={{ animation: "fadeUp 0.5s ease both", animationDelay: "160ms" }}
      >
        INSTANT DELIVERY
      </p>

      {/* Beschrijvende tekst */}
      <p
        className="mt-6 max-w-lg text-base leading-relaxed text-foreground-muted sm:text-lg"
        style={{ animation: "fadeUp 0.5s ease both", animationDelay: "240ms" }}
      >
        Fast, secure, and reliable FC 26 coin delivery. Get your coins in minutes with our automated system.
      </p>

      {/* CTA */}
      <div
        style={{ animation: "fadeUp 0.5s ease both", animationDelay: "320ms" }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        <Link
          href="/#order"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-background transition-opacity hover:opacity-90"
        >
          Buy Coins Now
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <p className="text-xs text-foreground-muted/70 tracking-wide">
          Trusted by 3,000+ players &nbsp;&middot;&nbsp; No account required
        </p>
      </div>

      {/* Trust ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/5 bg-white/[0.03] py-3 backdrop-blur-sm">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "ticker 22s linear infinite" }}
        >
          {repeated.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-sm font-medium text-foreground-muted"
            >
              <span className="inline-block h-1 w-1 rounded-full bg-brand" />
              {item}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
