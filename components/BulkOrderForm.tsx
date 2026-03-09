"use client";

import { useState } from "react";

const platforms = ["PS4", "PS5", "Xbox", "PC"];

export default function BulkOrderForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Supabase / Resend — stuur e-mail via lib/email-service.ts
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-accent/30 bg-accent/10 px-6 py-12 text-center">
        <p className="font-heading text-lg font-bold text-accent">Request received!</p>
        <p className="mt-2 text-sm text-foreground-muted">
          We will come back to you with a custom quote within 2 hours.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="bulk-name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="bulk-name"
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bulk-email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="bulk-email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="bulk-amount" className="text-sm font-medium text-foreground">
            Desired Amount (coins)
          </label>
          <input
            id="bulk-amount"
            type="text"
            name="amount"
            required
            placeholder="e.g. 50,000,000"
            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bulk-platform" className="text-sm font-medium text-foreground">
            Platform
          </label>
          <select
            id="bulk-platform"
            name="platform"
            defaultValue=""
            required
            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="" disabled>
              Select platform
            </option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="bulk-message" className="text-sm font-medium text-foreground">
          Message{" "}
          <span className="font-normal text-foreground-muted">(optional)</span>
        </label>
        <textarea
          id="bulk-message"
          name="message"
          rows={4}
          placeholder="Any additional info — preferred payment method, timeline, etc."
          className="resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-lg bg-accent px-6 py-3 font-heading font-semibold text-white transition-opacity hover:opacity-90"
      >
        Send Request
      </button>
    </form>
  );
}
