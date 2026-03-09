"use client";

import { useState } from "react";
import { WELCOME_DISCOUNT_PCT } from "@/lib/discount";

type Platform = "ps4" | "ps5" | "xbox" | "pc";
type PaymentMethod = "crypto" | "bank_transfer" | "paysafecard" | "skrill";

// --- Helpers ---

function formatCoins(amount: number): string {
  if (amount >= 1_000_000 && amount % 1_000_000 === 0) {
    return `${amount / 1_000_000}M`;
  }
  if (amount >= 1_000_000) {
    const val = amount / 1_000_000;
    return `${parseFloat(val.toFixed(2))}M`;
  }
  return `${amount / 1_000}K`;
}

function formatUSD(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

const PRICE_PER_MILLION = 10;
const COIN_PRESETS = [250_000, 500_000, 1_000_000, 2_500_000, 5_000_000, 10_000_000];
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

// --- Sub-components ---

function StepBadge({ number }: { number: string }) {
  return (
    <span className="inline-flex h-6 w-8 items-center justify-center rounded-md bg-brand/15 text-xs font-bold text-brand">
      {number}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-brand" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepHeader({
  number,
  title,
  done,
}: {
  number: string;
  title: string;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <StepBadge number={number} />
      <span className="font-heading text-sm font-semibold text-foreground">{title}</span>
      {done && <CheckIcon />}
    </div>
  );
}

// YouTube modal
function VideoModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sluitknop */}
        <button
          onClick={onClose}
          className="absolute -top-9 right-0 text-sm text-foreground-muted hover:text-foreground transition-colors"
        >
          Close ✕
        </button>
        {/* 16:9 wrapper */}
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

// --- Main component ---

export default function OrderConfigurator() {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [coinAmount, setCoinAmount] = useState<number>(500_000);
  const [coinsConfirmed, setCoinsConfirmed] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [backupCodes, setBackupCodes] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Stap 2 verschijnt zodra platform gekozen is
  const showStep2 = platform !== null;
  // Order summary + stap 3 verschijnen zodra platform én coins bevestigd zijn
  const showSummary = platform !== null && coinsConfirmed;
  const showStep3 = showSummary;
  // Stap 4 verschijnt als alle velden ingevuld zijn
  const detailsFilled = email.trim() !== "" && password.trim() !== "" && backupCodes.trim() !== "";
  const showStep4 = showStep3 && detailsFilled;
  // Stap 5 verschijnt als betaalmethode gekozen is
  const showStep5 = showStep4 && paymentMethod !== null;

  // Prijsberekening
  const basePrice = (coinAmount / 1_000_000) * PRICE_PER_MILLION;
  const discount = basePrice * (WELCOME_DISCOUNT_PCT / 100);
  const total = basePrice - discount;

  function handlePreset(amount: number) {
    setCoinAmount(amount);
    setCoinsConfirmed(true);
  }

  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    setCoinAmount(Number(e.target.value));
    setCoinsConfirmed(true);
  }

  function handlePay() {
    console.log("Order:", { platform, coinAmount, total, paymentMethod });
    setSubmitted(true);
  }

  return (
    <>
      {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}

      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-foreground">Configure Your Order</h2>
          <p className="mt-1 text-sm text-brand font-medium">
            5% welcome discount applied automatically
          </p>
        </div>

        <div className="flex flex-col gap-6">

          {/* --- Stap 1: Platform --- */}
          <div className="flex flex-col gap-4">
            <StepHeader number="01" title="Choose your platform" done={platform !== null} />
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

          {/* --- Stap 2: Coins kiezen --- */}
          {showStep2 && (
            <div className="flex flex-col gap-4" style={{ animation: "fadeIn 0.3s ease both" }}>
              <StepHeader number="02" title="Choose coin amount" done={coinsConfirmed} />

              {/* Presets */}
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {COIN_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePreset(preset)}
                    className={`rounded-lg border px-2 py-2 text-xs font-bold transition-all duration-150 ${
                      coinsConfirmed && coinAmount === preset
                        ? "border-brand bg-brand text-background shadow-[0_0_12px_rgba(0,255,135,0.2)]"
                        : "border-border bg-surface text-foreground hover:border-brand/40"
                    }`}
                  >
                    {formatCoins(preset)}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs text-foreground-muted">
                  <span>{formatCoins(COIN_MIN)}</span>
                  <span className="font-semibold text-foreground">{formatCoins(coinAmount)}</span>
                  <span>{formatCoins(COIN_MAX)}</span>
                </div>
                <input
                  type="range"
                  min={COIN_MIN}
                  max={COIN_MAX}
                  step={COIN_STEP}
                  value={coinAmount}
                  onChange={handleSlider}
                  className="w-full accent-brand cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* --- Live Order Summary --- */}
          {showSummary && (
            <div
              className="rounded-xl border border-brand/30 bg-brand/5 p-4 text-sm"
              style={{ animation: "fadeIn 0.3s ease both" }}
            >
              <p className="mb-3 font-heading text-xs font-bold uppercase tracking-widest text-brand">
                Order Summary
              </p>
              <div className="flex flex-col gap-1 text-foreground-muted">
                <div className="flex justify-between">
                  <span>Platform</span>
                  <span className="font-semibold text-foreground uppercase">{platform}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coins</span>
                  <span className="font-semibold text-foreground">{coinAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base price</span>
                  <span className="font-semibold text-foreground">{formatUSD(basePrice)}</span>
                </div>
                <div className="flex justify-between text-brand">
                  <span>Discount ({WELCOME_DISCOUNT_PCT}% welcome)</span>
                  <span className="font-semibold">-{formatUSD(discount)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-border pt-2">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-foreground">{formatUSD(total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* --- Stap 3: EA Gegevens --- */}
          {showStep3 && (
            <div className="flex flex-col gap-4" style={{ animation: "fadeIn 0.3s ease both" }}>
              <StepHeader number="03" title="EA account details" done={detailsFilled} />

              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
                    EA Account Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-brand/60 focus:outline-none transition-colors"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
                    EA Account Password
                  </label>
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
                      aria-label={showPassword ? "Hide password" : "Show password"}
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

                {/* Backup codes */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
                      6x Backup Codes
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowVideo(true)}
                      className="text-xs text-accent hover:text-accent/80 transition-colors underline underline-offset-2"
                    >
                      Where do I find these?
                    </button>
                  </div>
                  <textarea
                    required
                    value={backupCodes}
                    onChange={(e) => setBackupCodes(e.target.value)}
                    placeholder={"Enter each code on a new line"}
                    rows={4}
                    className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-brand/60 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* --- Stap 4: Betaalmethode --- */}
          {showStep4 && (
            <div className="flex flex-col gap-4" style={{ animation: "fadeIn 0.3s ease both" }}>
              <StepHeader number="04" title="Payment method" done={paymentMethod !== null} />
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

          {/* --- Stap 5: Betalen --- */}
          {showStep5 && (
            <div style={{ animation: "fadeIn 0.3s ease both" }}>
              {submitted ? (
                <p className="rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-sm font-semibold text-brand text-center">
                  Redirecting to payment...
                </p>
              ) : (
                <button
                  onClick={handlePay}
                  className="w-full rounded-xl bg-brand px-6 py-4 text-base font-bold text-background transition-opacity hover:opacity-90 shadow-[0_0_24px_rgba(0,255,135,0.3)]"
                >
                  Pay {formatUSD(total)}
                </button>
              )}
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
