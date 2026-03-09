import { encrypt } from '@/lib/crypto'
import { generateBankReference, getBankDetails } from '@/lib/bank-transfer'
import { createPayment } from '@/lib/nowpayments'
import type { Platform, PaymentMethod } from '@/types/database'

export async function POST(request: Request) {
  const body = await request.json()
  const { platform, coinAmount, eaEmail, eaPassword, backupCodes, paymentMethod, guestEmail } = body as {
    platform: Platform
    coinAmount: number
    eaEmail: string
    eaPassword: string
    backupCodes: string
    paymentMethod: PaymentMethod
    guestEmail?: string
  }

  if (!platform || !coinAmount || !eaEmail || !eaPassword || !backupCodes || !paymentMethod) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Bereken prijs: $10 per 1.000.000 coins
  const basePrice = (coinAmount / 1_000_000) * 10
  // TODO: Supabase — haal echte kortingspct op voor ingelogde gebruiker
  const discountPct = 0 // tijdelijk: geen korting totdat Supabase live is
  const discount = parseFloat((basePrice * discountPct).toFixed(2))
  const total = parseFloat((basePrice - discount).toFixed(2))

  // Versleutel gevoelige velden voor opslag in Supabase
  const encryptedPassword = encrypt(eaPassword)
  const encryptedBackupCodes = encrypt(backupCodes)

  // TODO: Supabase — sla order op in de database
  // const { data: order, error } = await createServerClient()
  //   .from('orders')
  //   .insert({
  //     guest_email: guestEmail ?? null,
  //     platform,
  //     coin_amount: coinAmount,
  //     price_paid: total,
  //     discount_applied: discount,
  //     ea_email: eaEmail,
  //     ea_password_encrypted: encryptedPassword,
  //     backup_codes_encrypted: encryptedBackupCodes,
  //     payment_method: paymentMethod,
  //   })
  //   .select()
  //   .single()
  // if (error) return Response.json({ error: 'Failed to create order' }, { status: 500 })

  // Tijdelijke mock order ID totdat Supabase live is
  const mockOrderId = 'CF-' + Math.random().toString(36).substring(2, 8).toUpperCase()

  if (paymentMethod === 'bank_transfer') {
    const reference = generateBankReference()
    const bankDetails = getBankDetails()
    // TODO: Supabase — sla bank_reference op bij order
    return Response.json({
      ok: true,
      orderId: mockOrderId,
      total,
      bankDetails,
      reference,
    })
  }

  if (paymentMethod === 'crypto') {
    // TODO: payCurrency moet door de klant gekozen worden (btc/eth/usdt/ltc)
    // const payment = await createPayment({
    //   orderId: order.id,
    //   priceAmount: total,
    //   priceCurrency: 'usd',
    //   payCurrency: 'btc',
    //   ipnCallbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/nowpayments/webhook`,
    //   orderDescription: `Coinfactory — ${coinAmount.toLocaleString()} coins (${platform})`,
    // })
    // return Response.json({ ok: true, orderId: order.id, payAddress: payment.payAddress, total })
  }

  // Mock response voor alle andere betaalmethodes (paysafecard, skrill)
  return Response.json({
    ok: true,
    orderId: mockOrderId,
    total,
    message: 'Order created (mock — Supabase not connected yet)',
  })
}
