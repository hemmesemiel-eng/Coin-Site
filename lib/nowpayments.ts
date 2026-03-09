import { createHmac } from 'crypto'

const BASE_URL = 'https://api.nowpayments.io/v1'
const API_KEY = process.env.NOWPAYMENTS_API_KEY!

export interface CreatePaymentParams {
  orderId: string
  priceAmount: number
  priceCurrency: 'usd'
  payCurrency: 'btc' | 'eth' | 'usdttrc20' | 'ltc'
  ipnCallbackUrl: string
  orderDescription: string
}

export interface PaymentResult {
  paymentId: string
  paymentStatus: string
  payAddress: string
  priceAmount: number
  expiresAt: string
}

export async function createPayment(params: CreatePaymentParams): Promise<PaymentResult> {
  const response = await fetch(`${BASE_URL}/payment`, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price_amount: params.priceAmount,
      price_currency: params.priceCurrency,
      pay_currency: params.payCurrency,
      ipn_callback_url: params.ipnCallbackUrl,
      order_id: params.orderId,
      order_description: params.orderDescription,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`NOWPayments createPayment failed: ${error}`)
  }

  const data = await response.json()

  return {
    paymentId: data.payment_id,
    paymentStatus: data.payment_status,
    payAddress: data.pay_address,
    priceAmount: data.price_amount,
    expiresAt: data.expiration_estimate_date,
  }
}

export async function getPayment(paymentId: string): Promise<PaymentResult> {
  const response = await fetch(`${BASE_URL}/payment/${paymentId}`, {
    headers: { 'x-api-key': API_KEY },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`NOWPayments getPayment failed: ${error}`)
  }

  const data = await response.json()

  return {
    paymentId: data.payment_id,
    paymentStatus: data.payment_status,
    payAddress: data.pay_address,
    priceAmount: data.price_amount,
    expiresAt: data.expiration_estimate_date,
  }
}

// Verifieert dat het webhook-verzoek echt van NOWPayments komt via HMAC-SHA512
export function verifyWebhookSignature(body: string, signature: string): boolean {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET!
  const hmac = createHmac('sha512', secret)
  hmac.update(body)
  const expected = hmac.digest('hex')
  return expected === signature
}
