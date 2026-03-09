'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { OrderStatus, PaymentStatus, PaymentMethod, Platform } from '@/types/database'

// TODO: Supabase
// const { data: orders } = await supabase_server.from('orders').select('*').order('created_at', { ascending: false })

type Order = {
  id: string
  guestEmail: string
  platform: Platform
  coinAmount: number
  pricePaid: number
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  eaEmail: string
  createdAt: string
}

const mockOrders: Order[] = [
  {
    id: 'CF-A1B2C3',
    guestEmail: 'player@example.com',
    platform: 'ps5',
    coinAmount: 500_000,
    pricePaid: 4.75,
    paymentMethod: 'crypto',
    paymentStatus: 'paid',
    orderStatus: 'queued',
    eaEmail: 'ea@example.com',
    createdAt: '2026-03-08 14:30',
  },
  {
    id: 'CF-D4E5F6',
    guestEmail: 'gamer99@gmail.com',
    platform: 'pc',
    coinAmount: 1_000_000,
    pricePaid: 9.50,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'awaiting_payment',
    orderStatus: 'queued',
    eaEmail: 'gamer@ea.com',
    createdAt: '2026-03-09 09:15',
  },
]

const ORDER_STATUS_FLOW: OrderStatus[] = ['queued', 'transferring', 'completed']

const paymentStatusBadge: Record<PaymentStatus, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  paid: 'bg-green-500/10 text-green-400 border-green-500/20',
  failed: 'bg-red-500/10 text-red-400 border-red-500/20',
  expired: 'bg-red-500/10 text-red-400 border-red-500/20',
  awaiting_payment: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
}

const orderStatusBadge: Record<OrderStatus, string> = {
  queued: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  transferring: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  completed: 'bg-green-500/10 text-green-400 border-green-500/20',
}

function nextStatus(current: OrderStatus): OrderStatus | null {
  const idx = ORDER_STATUS_FLOW.indexOf(current)
  return idx < ORDER_STATUS_FLOW.length - 1 ? ORDER_STATUS_FLOW[idx + 1] : null
}

function OrderRow({ order }: { order: Order }) {
  const [status, setStatus] = useState<OrderStatus>(order.orderStatus)
  const [showSecrets, setShowSecrets] = useState(false)

  function advanceStatus() {
    const next = nextStatus(status)
    if (!next) return
    console.log(`Order ${order.id}: ${status} → ${next}`)
    // TODO: Supabase — await supabase_server.from('orders').update({ order_status: next }).eq('id', order.id)
    setStatus(next)
  }

  const next = nextStatus(status)

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        {/* Left: order info */}
        <div className="flex flex-col gap-1">
          <span className="font-heading text-sm font-semibold text-brand">{order.id}</span>
          <span className="text-xs text-foreground-muted">{order.guestEmail}</span>
          <span className="text-xs text-foreground-muted">{order.createdAt}</span>
        </div>

        {/* Right: badges */}
        <div className="flex flex-wrap gap-2">
          <span className={`rounded border px-2 py-0.5 text-xs font-medium ${paymentStatusBadge[order.paymentStatus]}`}>
            {order.paymentStatus}
          </span>
          <span className={`rounded border px-2 py-0.5 text-xs font-medium ${orderStatusBadge[status]}`}>
            {status}
          </span>
        </div>
      </div>

      {/* Details row */}
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:grid-cols-4">
        <div>
          <p className="text-foreground-muted">Platform</p>
          <p className="font-medium text-foreground uppercase">{order.platform}</p>
        </div>
        <div>
          <p className="text-foreground-muted">Coins</p>
          <p className="font-medium text-foreground">{(order.coinAmount / 1_000_000).toFixed(1)}M</p>
        </div>
        <div>
          <p className="text-foreground-muted">Paid</p>
          <p className="font-medium text-foreground">${order.pricePaid.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-foreground-muted">Method</p>
          <p className="font-medium text-foreground">{order.paymentMethod}</p>
        </div>
      </div>

      {/* EA credentials */}
      <div className="mt-4 rounded-lg border border-border bg-background p-3 text-xs">
        <p className="text-foreground-muted">
          EA Email: <span className="text-foreground">{order.eaEmail}</span>
        </p>
        {showSecrets ? (
          <>
            <p className="mt-1 text-foreground-muted">
              Password: <span className="text-foreground font-mono">mock-password-123</span>
            </p>
            <p className="mt-1 text-foreground-muted">
              Backup codes: <span className="text-foreground font-mono">A1B2-C3D4-E5F6-G7H8</span>
            </p>
          </>
        ) : null}
        <button
          onClick={() => setShowSecrets((v) => !v)}
          className="mt-2 text-accent underline underline-offset-2 hover:text-accent/80"
        >
          {showSecrets ? 'Hide' : 'Show'} password &amp; backup codes
        </button>
      </div>

      {/* Status action */}
      <div className="mt-4 flex justify-end">
        {next ? (
          <button
            onClick={advanceStatus}
            className="rounded-lg border border-border bg-surface-hover px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            Mark as {next}
          </button>
        ) : (
          <span className="text-xs text-foreground-muted">Order completed</span>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
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
            className="border-b-2 border-brand px-4 py-3 text-sm font-medium text-brand"
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
            className="border-b-2 border-transparent px-4 py-3 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
          >
            Customers
          </Link>
        </div>
      </nav>

      {/* Orders list */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Orders <span className="ml-2 text-sm font-normal text-foreground-muted">({mockOrders.length})</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {mockOrders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      </main>
    </div>
  )
}
