"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  // Check localStorage after mount (server-side rendering has no localStorage)
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface px-4 py-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground-muted">
          We use cookies to improve your experience and analyze site usage.{" "}
          <Link href="/privacy" className="text-brand underline-offset-2 hover:underline">
            Learn more
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={decline}
            className="rounded border border-border bg-transparent px-4 py-2 text-sm text-foreground-muted transition-colors hover:border-foreground-muted hover:text-foreground"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded bg-brand px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>

      <style>{`
        .cookie-banner {
          animation: slide-up 0.3s ease-out;
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
