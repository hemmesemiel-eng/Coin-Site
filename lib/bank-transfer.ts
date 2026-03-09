import { randomBytes } from 'crypto'

// Genereert een uniek referentienummer voor bank transfers (bv. CF-A3X9K2)
// randomBytes zorgt voor cryptografisch veilige willekeurigheid
export function generateBankReference(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const bytes = randomBytes(6)
  const code = Array.from(bytes)
    .map((b) => chars[b % chars.length])
    .join('')
  return `CF-${code}`
}

export function getBankDetails() {
  return {
    iban: process.env.BANK_IBAN || 'TO BE CONFIGURED',
    bankName: process.env.BANK_NAME || 'TO BE CONFIGURED',
    accountHolder: 'Coinfactory',
  }
}
