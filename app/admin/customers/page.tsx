'use client'

import { useState } from 'react'
import Link from 'next/link'

// TODO: Supabase
// const { data: customers } = await supabase_server.from('profiles').select('*, orders(count)')

type Customer = {
  email: string
  orderCount: number
  discountPct: number
  memberSince: string
}

const mockCustomers: Customer[] = [
  {
    email: 'player@example.com',
    orderCount: 3,
    discountPct: 5,
    memberSince: '2026-01-15',
  },
  {
    email: 'gamer99@gmail.com',
    orderCount: 1,
    discountPct: 0,
    memberSince: '2026-03-09',
  },
]

function CustomerRow({ customer }: { customer: Customer }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(String(customer.discountPct))
  const [saved, setSaved] = useState(customer.discountPct)

  function handleSave() {
    const parsed = parseInt(value, 10)
    if (isNaN(parsed) || parsed < 0 || parsed > 50) return
    console.log(`Discount update: ${customer.email} → ${parsed}%`)
    // TODO: Supabase — await supabase_server.from('profiles').update({ discount_pct: parsed }).eq('email', customer.email)
    setSaved(parsed)
    setValue(String(parsed))
    setEditing(false)
  }

  function handleCancel() {
    setValue(String(saved))
    setEditing(false)
  }

  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-4 pl-4 text-sm text-foreground">{customer.email}</td>
      <td className="py-4 text-center text-sm text-foreground">{customer.orderCount}</td>
      <td className="py-4 text-center">
        {editing ? (
          <div className="flex items-center justify-center gap-1">
            <input
              type="number"
              min="0"
              max="50"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-center text-sm text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              autoFocus
            />
            <span className="text-sm text-foreground-muted">%</span>
          </div>
        ) : (
          <span
            className={`text-sm font-medium ${saved > 0 ? 'text-brand' : 'text-foreground-muted'}`}
          >
            {saved}%
          </span>
        )}
      </td>
      <td className="py-4 text-center text-sm text-foreground-muted">{customer.memberSince}</td>
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
            Edit Discount
          </button>
        )}
      </td>
    </tr>
  )
}

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('')

  const filtered = mockCustomers.filter((c) =>
    c.email.toLowerCase().includes(search.toLowerCase())
  )

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
            className="border-b-2 border-transparent px-4 py-3 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
          >
            Prices
          </Link>
          <Link
            href="/admin/customers"
            className="border-b-2 border-brand px-4 py-3 text-sm font-medium text-brand"
          >
            Customers
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Customers <span className="ml-2 text-sm font-normal text-foreground-muted">({filtered.length})</span>
          </h2>
          <input
            type="search"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs rounded-lg border border-border bg-surface px-4 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:w-auto"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pl-4 text-left text-xs font-medium uppercase tracking-wide text-foreground-muted">
                  Email
                </th>
                <th className="py-3 text-center text-xs font-medium uppercase tracking-wide text-foreground-muted">
                  Orders
                </th>
                <th className="py-3 text-center text-xs font-medium uppercase tracking-wide text-foreground-muted">
                  Discount
                </th>
                <th className="py-3 text-center text-xs font-medium uppercase tracking-wide text-foreground-muted">
                  Member Since
                </th>
                <th className="py-3 pr-4 text-right text-xs font-medium uppercase tracking-wide text-foreground-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((customer) => (
                  <CustomerRow key={customer.email} customer={customer} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-foreground-muted">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
