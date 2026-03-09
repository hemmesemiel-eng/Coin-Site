import { verifyWebhookSignature } from '@/lib/nowpayments'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('x-nowpayments-sig') ?? ''

  if (!verifyWebhookSignature(body, signature)) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const payload = JSON.parse(body)
  const { payment_id, payment_status, order_id } = payload

  if (payment_status === 'finished') {
    // TODO: Supabase — zet payment_status op 'paid', order_status op 'queued'
    // await supabase.from('orders').update({ payment_status: 'paid', order_status: 'queued' }).eq('id', order_id)
    // TODO: Email — stuur notificatie naar owner (Fase 9)
    console.log('Payment confirmed for order:', order_id, 'payment_id:', payment_id)
  }

  if (payment_status === 'expired') {
    // TODO: Supabase — zet payment_status op 'expired'
    // await supabase.from('orders').update({ payment_status: 'expired' }).eq('id', order_id)
    console.log('Payment expired for order:', order_id)
  }

  if (payment_status === 'partially_paid') {
    // TODO: Supabase — markeer als underpaid, notificeer owner
    console.log('Underpaid for order:', order_id)
  }

  return Response.json({ ok: true })
}
