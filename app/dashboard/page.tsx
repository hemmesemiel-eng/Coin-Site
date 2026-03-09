"use client";

import { useState } from "react";
import Link from "next/link";
import ReferralSection from "@/components/ReferralSection";

// TODO: Supabase
// const { data: orders } = await supabase.from('orders').select('*').eq('user_id', user.id)
// const { data: { user } } = await supabase.auth.getUser()

interface Order {
  id: string;
  platform: string;
  coinAmount: number;
  pricePaid: number;
  createdAt: string;
}

const mockOrders: Order[] = [
  {
    id: "CF-A1B2C3",
    platform: "PS5",
    coinAmount: 500_000,
    pricePaid: 4.75,
    createdAt: "2026-03-01",
  },
  {
    id: "CF-D4E5F6",
    platform: "PC",
    coinAmount: 1_000_000,
    pricePaid: 9.5,
    createdAt: "2026-03-08",
  },
];

// Mock user — replace with real Supabase session
const mockUser = { name: "Test User", email: "player@example.com" };
const mockDiscount = true; // TODO: Supabase — read from user profile

function formatCoins(amount: number) {
  return amount >= 1_000_000
    ? `${amount / 1_000_000}M`
    : `${amount / 1_000}K`;
}

type Tab = "orders" | "referral" | "settings";

function OrdersTab() {
  return (
    <div>
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Order ID", "Platform", "Coins", "Amount", "Date"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-foreground-muted"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, i) => (
                <tr
                  key={order.id}
                  className={i < mockOrders.length - 1 ? "border-b border-border" : ""}
                >
                  <td className="px-5 py-4 font-mono text-foreground">
                    {order.id}
                  </td>
                  <td className="px-5 py-4 text-foreground">{order.platform}</td>
                  <td className="px-5 py-4 text-foreground">
                    {formatCoins(order.coinAmount)}
                  </td>
                  <td className="px-5 py-4 text-foreground">
                    €{order.pricePaid.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-foreground-muted">
                    {order.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {mockOrders.length === 0 && (
          <div className="px-5 py-12 text-center text-foreground-muted">
            No orders yet.{" "}
            <Link href="/#order" className="text-brand hover:opacity-80">
              Place your first order →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Change email */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="font-heading text-base font-semibold text-foreground">
          Change Email
        </h3>
        <form
          className="mt-4 flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="New email address"
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-foreground-muted focus:border-brand focus:outline-none"
          />
          <button
            type="submit"
            className="self-start rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Update Email
          </button>
        </form>
        {/* TODO: Supabase — supabase.auth.updateUser({ email }) */}
      </div>

      {/* Change password */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="font-heading text-base font-semibold text-foreground">
          Change Password
        </h3>
        <form
          className="mt-4 flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="password"
            placeholder="Current password"
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-foreground-muted focus:border-brand focus:outline-none"
          />
          <input
            type="password"
            placeholder="New password"
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-foreground-muted focus:border-brand focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-foreground-muted focus:border-brand focus:outline-none"
          />
          <button
            type="submit"
            className="self-start rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Update Password
          </button>
        </form>
        {/* TODO: Supabase — supabase.auth.updateUser({ password }) */}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Welcome back,{" "}
          <span className="text-brand">{mockUser.name}</span>
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">{mockUser.email}</p>
      </div>

      {/* Loyalty discount banner */}
      {mockDiscount && (
        <div className="mb-8 flex flex-col gap-4 rounded-xl border border-brand/30 bg-brand/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-bold text-brand">
              Special deal for you: 5% discount active
            </p>
            <p className="mt-0.5 text-sm text-foreground-muted">
              Your loyalty discount is applied automatically at checkout.
            </p>
          </div>
          <Link
            href="/#order"
            className="inline-block shrink-0 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Order Now
          </Link>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex gap-1 border-b border-border">
        {(["orders", "referral", "settings"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-brand text-brand"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            {tab === "referral" ? "Referral" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "orders" && <OrdersTab />}
      {activeTab === "referral" && <ReferralSection />}
      {activeTab === "settings" && <SettingsTab />}
    </main>
  );
}
