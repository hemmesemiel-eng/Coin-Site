"use client";

import { useState } from "react";
import { WELCOME_DISCOUNT_PCT, PRICE_PER_MILLION } from "@/lib/discount";

type Platform = "ps4" | "ps5" | "xbox" | "pc";
type PaymentMethod = "crypto" | "bank_transfer" | "paysafecard" | "skrill";

function formatCoins(amount: number): string {
  if (amount >= 1_000_000 && amount % 1_000_000 === 0) return `${amount / 1_000_000}M`;
  if (amount >= 1_000_000) return `${parseFloat((amount / 1_000_000).toFixed(2))}M`;
  return `${amount / 1_000}K`;
}

function formatUSD(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

const COIN_PRESETS = [100_000, 250_000, 500_000, 750_000, 1_000_000, 1_500_000, 2_000_000];
const COIN_MIN = 100_000;
const COIN_MAX = 10_000_000;
const COIN_STEP = 50_000;

const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "ps4", label: "PS4" },
  { id: "ps5", label: "PS5" },
  { id: "xbox", label: "Xbox" },
  { id: "pc", label: "PC" },
];

const PAYMENT_METHODS: { id: PaymentMethod; label: string; sub: string }[] = [
  { id: "crypto", label: "Crypto", sub: "BTC / ETH / USDT / LTC — Instant, anonymous" },
  { id: "bank_transfer", label: "Bank Transfer", sub: "Manual, 24h processing" },
  { id: "paysafecard", label: "Paysafecard", sub: "Prepaid voucher" },
  { id: "skrill", label: "Skrill", sub: "Digital wallet" },
];

function StepLabel({ number, title, done }: { number: string; title: string; done: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className={`inline-flex h-6 w-7 items-center justify-center rounded-md text-xs font-bold transition-colors ${done ? "bg-brand/20 text-brand" : "bg-brand/10 text-brand"}`}>
        {done ? (
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : number}
      </span>
      <span className="font-heading text-sm font-semibold text-foreground">{title}</span>
    </div>
  );
}

function VideoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-9 right-0 text-sm text-foreground-muted hover:text-foreground transition-colors">
          Close ✕
        </button>
        <div className="relative w-full overflow-hidden rounded-xl border border-border" style={{ paddingTop: "56.25%" }}>
          <iframe
            src="https://www.youtube.com/embed/nvIH96pXx-c"
            title="Where to find EA backup codes"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function OrderConfigurator() {
  const [coinAmount, setCoinAmount] = useState<number>(500_000);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [backupCodes, setBackupCodes] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const showDetails = platform !== null;
  const detailsFilled = email.trim() !== "" && password.trim() !== "" && backupCodes.trim() !== "";
  const showPayment = showDetails && detailsFilled;
  const showPayBtn = showPayment && paymentMethod !== null;

  const basePrice = (coinAmount / 1_000_000) * PRICE_PER_MILLION;
  const discount = basePrice * (WELCOME_DISCOUNT_PCT / 100);
  const total = basePrice - discount;

  return (
    <>
      {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}

      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Configure Your Order</h2>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-foreground-muted">
          <span className="flex items-center gap-1.5">
            <span className="text-brand">$</span> Lowest Prices
          </span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand">⚡</span> Lightning Fast
          </span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand">🔒</span> Zero Bans Guaranteed
          </span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">

        {/* Left — form */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex flex-col gap-8">

            {/* Step 1: Coins — always visible */}
            <div>
              <StepLabel number="01" title="Select coin amount" done={true} />
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {COIN_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setCoinAmount(preset)}
                    className={`rounded-lg border px-2 py-2.5 text-xs font-bold transition-all duration-150 ${
                      coinAmount === preset
                        ? "border-brand bg-brand text-background shadow-[0_0_12px_rgba(0,255,135,0.2)]"
                        : "border-border bg-surface text-foreground hover:border-brand/40"
                    }`}
                  >
                    {formatCoins(preset)}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between text-xs text-foreground-muted">
                  <span>{formatCoins(COIN_MIN)}</span>
                  <span className="font-bold text-brand text-sm">{formatCoins(coinAmount)} Coins</span>
                  <span>{formatCoins(COIN_MAX)}</span>
                </div>
                <input
                  type="range"
                  min={COIN_MIN}
                  max={COIN_MAX}
                  step={COIN_STEP}
                  value={coinAmount}
                  onChange={(e) => setCoinAmount(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
              </div>
            </div>

            {/* Step 2: Platform — always visible */}
            <div>
              <StepLabel number="02" title="Gaming platform" done={platform !== null} />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PLATFORMS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setPlatform(id)}
                    className={`rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-150 ${
                      platform === id
                        ? "border-brand bg-brand text-background shadow-[0_0_16px_rgba(0,255,135,0.25)]"
                        : "border-border bg-surface text-foreground hover:border-brand/40"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: EA details */}
            {showDetails && (
              <div style={{ animation: "fadeIn 0.3s ease both" }}>
                <StepLabel number="03" title="EA account details" done={detailsFilled} />
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">EA Account Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-brand/60 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">EA Account Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-brand/60 focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M2 8s2.5-4.5 6-4.5S14 8 14 8s-2.5 4.5-6 4.5S2 8 2 8z" />
                            <circle cx="8" cy="8" r="1.5" />
                            <path d="M2 2l12 12" strokeLinecap="round" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M2 8s2.5-4.5 6-4.5S14 8 14 8s-2.5 4.5-6 4.5S2 8 2 8z" />
                            <circle cx="8" cy="8" r="1.5" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">6x Backup Codes</label>
                      <button
                        type="button"
                        onClick={() => setShowVideo(true)}
                        className="text-xs text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
                      >
                        Where do I find these?
                      </button>
                    </div>
                    <textarea
                      required
                      value={backupCodes}
                      onChange={(e) => setBackupCodes(e.target.value)}
                      placeholder="Enter each code on a new line"
                      rows={4}
                      className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-brand/60 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment method */}
            {showPayment && (
              <div style={{ animation: "fadeIn 0.3s ease both" }}>
                <StepLabel number="04" title="Payment method" done={paymentMethod !== null} />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {PAYMENT_METHODS.map(({ id, label, sub }) => (
                    <button
                      key={id}
                      onClick={() => setPaymentMethod(id)}
                      className={`flex flex-col items-start rounded-xl border px-4 py-3 text-left transition-all duration-150 ${
                        paymentMethod === id
                          ? "border-brand bg-brand/5 shadow-[0_0_16px_rgba(0,255,135,0.12)]"
                          : "border-border bg-surface hover:border-brand/40"
                      }`}
                    >
                      <span className="text-sm font-bold text-foreground">{label}</span>
                      <span className="mt-0.5 text-xs text-foreground-muted">{sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pay button */}
            {showPayBtn && (
              <div style={{ animation: "fadeIn 0.3s ease both" }}>
                {submitted ? (
                  <p className="rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-center text-sm font-semibold text-brand">
                    Redirecting to payment...
                  </p>
                ) : (
                  <button
                    onClick={() => setSubmitted(true)}
                    className="w-full rounded-xl bg-brand px-6 py-4 text-base font-bold text-background transition-opacity hover:opacity-90 shadow-[0_0_24px_rgba(0,255,135,0.3)]"
                  >
                    Pay {formatUSD(total)}
                  </button>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Right — sticky order summary */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:h-fit">

          {/* Order summary */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="mb-4 font-heading text-xs font-bold uppercase tracking-widest text-brand">Your Order</p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground-muted">Coins</span>
                <span className="font-bold text-brand">{formatCoins(coinAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-muted">Platform</span>
                <span className={`font-semibold ${platform ? "text-foreground uppercase" : "text-foreground-muted/50"}`}>
                  {platform ?? "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-muted">Base price</span>
                <span className="font-semibold text-foreground">{formatUSD(basePrice)}</span>
              </div>
              <div className="flex justify-between text-brand">
                <span>{WELCOME_DISCOUNT_PCT}% welcome discount</span>
                <span className="font-semibold">-{formatUSD(discount)}</span>
              </div>
              <div className="mt-1 flex justify-between border-t border-border pt-3">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-bold text-foreground text-lg">{formatUSD(total)}</span>
              </div>
            </div>
          </div>

          {/* Trust card */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M8 1L2 4v4c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V4L8 1z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.5 8l1.5 1.5 3-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Direct Delivery</p>
                <p className="mt-0.5 text-xs font-medium text-brand">Safe &amp; Instant Transfer</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
                  Your credentials are encrypted and deleted after delivery.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {[
                "256-bit SSL Encryption",
                "Coins within 2 hours",
                "0% ban rate guaranteed",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-foreground-muted">
                  <svg className="h-3.5 w-3.5 shrink-0 text-brand" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </>
  );
}
