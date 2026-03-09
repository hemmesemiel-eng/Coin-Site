'use client'

import { useState } from 'react'

const mockReferralCode = 'CF8X2K9A'
const BASE_URL = 'https://coinfactory.gg'

export default function ReferralSection() {
  const [copied, setCopied] = useState(false)

  const referralUrl = `${BASE_URL}/?ref=${mockReferralCode}`

  async function copyLink() {
    await navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="mt-8 rounded-xl border border-border bg-surface p-6">
      <h2 className="font-heading text-xl font-bold text-foreground">
        Your Referral Link
      </h2>
      <p className="mt-1 text-sm text-foreground-muted">
        Share your link. When someone buys for the first time using your link,
        you both get 5% off your next order.
      </p>

      {/* Link display + copy */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 font-mono text-sm text-foreground-muted">
          {referralUrl}
        </div>
        <button
          onClick={copyLink}
          className={`shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
            copied
              ? 'bg-brand/20 text-brand'
              : 'bg-accent text-white hover:bg-accent/90'
          }`}
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>

      {/* Stats */}
      <div className="mt-5 flex gap-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-foreground-muted">
            Referrals
          </p>
          <p className="mt-0.5 font-heading text-2xl font-bold text-foreground">
            0
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-foreground-muted">
            Discounts Earned
          </p>
          <p className="mt-0.5 font-heading text-2xl font-bold text-foreground">
            0
          </p>
        </div>
      </div>
    </section>
  )
}
