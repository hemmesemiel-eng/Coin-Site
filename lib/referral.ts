import { randomBytes } from 'crypto'

// Genereert een unieke referral code (8 karakter alfanumeriek, bijv. "CF8X2K9A")
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const bytes = randomBytes(8)
  return Array.from(bytes)
    .map((b) => chars[b % chars.length])
    .join('')
}

// Bouwt de volledige referral URL
export function buildReferralUrl(code: string, baseUrl: string): string {
  return `${baseUrl}/?ref=${code}`
}

// Leest de referral code uit de URL searchParams
export function getReferralCodeFromUrl(searchParams: URLSearchParams): string | null {
  return searchParams.get('ref')
}

// Referral korting percentage
export const REFERRAL_DISCOUNT_PCT = 5
