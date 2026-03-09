"use client";

import Link from "next/link";
import { useState } from "react";

// Mock order data — replace with real data from URL params or Supabase session
// TODO: Supabase
// const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single()
const mockOrderId = "CF-A1B2C3";
const mockEmail = ""; // Set from order if known, passed to register link

function CheckIcon() {
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
      <path d="M7.5 12l3 3 5-5.5" />
    </svg>
  );
}

export default function ThankYouPage() {
  const [dismissed, setDismissed] = useState(false);

  const registerHref = mockEmail
    ? `/register?email=${encodeURIComponent(mockEmail)}`
    : "/register";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      {/* Checkmark + order info */}
      <div className="flex max-w-lg flex-col items-center text-center">
        <div className="mb-6 text-brand">
          <CheckIcon />
        </div>

        <h1 className="font-heading text-4xl font-bold text-foreground">
          Thank you for your order!
        </h1>

        <p className="mt-4 text-lg text-foreground-muted">
          Order{" "}
          <span className="font-mono font-semibold text-foreground">
            #{mockOrderId}
          </span>
        </p>

        <p className="mt-2 text-foreground-muted">
          Your coins will be delivered within{" "}
          <span className="font-semibold text-foreground">2 hours</span>.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-block rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Track your order →
        </Link>
      </div>

      {/* Guest-to-account conversion card */}
      {!dismissed && (
        <div className="mt-12 w-full max-w-md rounded-2xl border border-border bg-surface p-7">
          <h2 className="font-heading text-lg font-bold text-foreground">
            Save your order history
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            Create a free account to track your order, earn loyalty discounts,
            and get exclusive deals.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={registerHref}
              className="flex-1 rounded-lg bg-brand px-4 py-2.5 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Create Account →
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
