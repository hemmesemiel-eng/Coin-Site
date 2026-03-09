// AES-256-CBC encryptie via Node.js native crypto — geen externe package nodig
// De IV (initialization vector) is random per encryptie en wordt mee opgeslagen in de output.
// Formaat van de encrypted string: "iv:encryptedData" (hex:hex)
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto'

const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16 // AES block size

// Leid een 32-byte sleutel af uit de ENCRYPTION_KEY env var via scrypt
function getKey(): Buffer {
  const secret = process.env.ENCRYPTION_KEY!
  // Salt is vast — de sleutel zelf is al random genoeg
  return scryptSync(secret, 'coinfactory-salt', 32)
}

export function encrypt(text: string): string {
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, getKey(), iv)
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export function decrypt(encrypted: string): string {
  const [ivHex, dataHex] = encrypted.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const data = Buffer.from(dataHex, 'hex')
  const decipher = createDecipheriv(ALGORITHM, getKey(), iv)
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8')
}
