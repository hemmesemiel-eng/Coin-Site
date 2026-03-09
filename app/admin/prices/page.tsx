'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Platform } from '@/types/database'

// TODO: Supabase
// const { data: prices } = await supabase_server.from('prices').select('*')

type PriceRow = {
  platform: Platform
  pricePerMillion: number
}

const initialPrices: PriceRow[] = [
  { platform: 'ps4', pricePerMillion: 10.0 },
  { platform: 'ps5', pricePerMillion: 10.0 },
  { platform: 'xbox', pricePerMillion: 10.0 },
  { platform: 'pc', pricePerMillion: 10.0 },
]

function PriceRowItem({ row }: { row: PriceRow }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(row.pricePerMillion.toFixed(2))
  const [saved, setSaved] = useState(row.pricePerMillion)

  function handleSave() {
    const parsed = parseFloat(value)
    if (isNaN(parsed) || parsed <= 0) return
    console.log(`Price update: ${row.platform} → $${parsed.toFixed(2)} per 1M coins`)
    // TODO: Supabase — await supabase_server.from('prices').update({ price_per_million: parsed }).eq('platform', row.platform)
    setSaved(parsed)
    setValue(parsed.toFixed(2))
    setEditing(false)
  }

  function handleCancel() {
    setValue(saved.toFixed(2))
    setEditing(false)
  }

  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-4 pl-4 font-medium text-foreground uppercase">{row.platform}</td>
      <td className="py-4 text-foreground-muted">
        {editing ? (
          <div className="flex items-center gap-2">
            <span className="text-foreground-muted">$</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-24 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              autoFocus
            />
            <span className="text-xs text-foreground-muted">per 1M coins</span>
          </div>
        ) : (
          <span className="text-foreground">${saved.toFixed(2)} per 1M coins</span>
        )}
      </td>
      <td className="py-4 pr-4 text-right">
        {editing ? (
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSave}
              className="rounded-lg border border-brand/40 bg-brand/10 px-3 py-1.5 text-xs font-medium text-brand transition-colors hover:bg-brand/20"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground-muted transition-colors hover:border-accent hover:text-accent"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  )
}

export default function AdminPricesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-xs text-foreground-muted">Logged in as Owner</p>
          </div>
          <span className="rounded border border-brand/30 bg-brand/10 px-2 py-1 text-xs font-medium text-brand">
            Owner
          </span>
        </div>
      </header>

      {/* Nav tabs */}
      <nav className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl gap-1 px-6">
          <Link
            href="/admin"
            className="border-b-2 border-transparent px-4 py-3 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
          >
            Orders
          </Link>
          <Link
            href="/admin/prices"
            className="border-b-2 border-brand px-4 py-3 text-sm font-medium text-brand"
          >
            Prices
          </Link>
          <Link
            href="/admin/customers"
            className="border-b-2 border-transparent px-4 py-3 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
          >
            Customers
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Prices per Platform</h2>
          <p className="mt-1 text-sm text-foreground-muted">
            Changes take effect immediately for new orders.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pl-4 text-left text-xs font-medium uppercase tracking-wide text-foreground-muted">
                  Platform
                </th>
                <th className="py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground-muted">
                  Price
                </th>
                <th className="py-3 pr-4 text-right text-xs font-medium uppercase tracking-wide text-foreground-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {initialPrices.map((row) => (
                <PriceRowItem key={row.platform} row={row} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
