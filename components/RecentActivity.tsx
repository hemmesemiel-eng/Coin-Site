"use client";

import { useState, useEffect } from "react";

const activities = [
  { username: "xFUT_Pro92", country: "Netherlands", amount: "500K", platform: "PS5" },
  { username: "CoinsLord", country: "Germany", amount: "1M", platform: "PC" },
  { username: "UltimateXbox", country: "Belgium", amount: "2M", platform: "Xbox" },
  { username: "FUT_Beast", country: "France", amount: "750K", platform: "PS5" },
  { username: "ProClub99", country: "Spain", amount: "1.5M", platform: "PS4" },
  { username: "CoinHunter_7", country: "UK", amount: "500K", platform: "PC" },
  { username: "EliteFUT", country: "Italy", amount: "3M", platform: "PS5" },
  { username: "GoalMachine", country: "Netherlands", amount: "1M", platform: "Xbox" },
];

export default function RecentActivity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length);
        setVisible(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const activity = activities[currentIndex];

  return (
    <div
      className="fixed bottom-6 left-4 z-40 sm:left-6"
      aria-live="polite"
      aria-label="Recent purchases"
    >
      <div
        className="flex items-center gap-3 rounded-full border border-border bg-surface/95 px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-400"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          maxWidth: "280px",
        }}
      >
        {/* Groene puls-dot */}
        <div className="relative shrink-0">
          <div className="h-2.5 w-2.5 rounded-full bg-brand" />
          <div
            className="absolute inset-0 rounded-full bg-brand"
            style={{ animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }}
          />
        </div>

        {/* Tekst */}
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-foreground">
            {activity.username}
          </p>
          <p className="truncate text-xs text-foreground-muted">
            {activity.country} · {activity.amount} coins · {activity.platform}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
