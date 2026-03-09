'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const STORAGE_KEY_CODE = 'referral-code'
const STORAGE_KEY_DISMISSED = 'referral-banner-dismissed'

export default function ReferralBanner() {
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const code = searchParams.get('ref')
    if (!code) return

    // Sla code op zodat de configurator hem later kan gebruiken
    localStorage.setItem(STORAGE_KEY_CODE, code)

    // Toon banner alleen als nog niet eerder gesloten
    const dismissed = localStorage.getItem(STORAGE_KEY_DISMISSED)
    if (!dismissed) {
      setVisible(true)
    }
  }, [searchParams])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY_DISMISSED, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="relative flex items-center justify-between gap-4 border-b border-accent/30 bg-accent/10 px-4 py-3 sm:px-6">
      <p className="text-sm font-medium text-foreground">
        <span className="font-semibold text-accent">You&apos;ve been referred!</span>{' '}
        5% extra discount applied on your first order.
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="shrink-0 text-foreground-muted transition-colors hover:text-foreground"
      >
        ×
      </button>
    </div>
  )
}
