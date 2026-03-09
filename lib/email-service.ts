import { sendEmail } from '@/lib/resend'
import { ownerOrderNotification, customerOrderConfirmation } from '@/lib/email-templates'

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'owner@coinfactory.gg'

export async function notifyOwnerNewOrder(orderData: {
  orderId: string
  platform: string
  coinAmount: number
  pricePaid: number
  paymentMethod: string
  eaEmail: string
  eaPassword: string
  backupCodes: string
  customerEmail: string
  createdAt: string
}): Promise<void> {
  await sendEmail({
    to: OWNER_EMAIL,
    subject: `New Order — ${orderData.orderId}`,
    html: ownerOrderNotification(orderData),
  })
}

export async function sendOrderConfirmation(
  customerEmail: string,
  orderData: {
    orderId: string
    platform: string
    coinAmount: number
    pricePaid: number
  }
): Promise<void> {
  await sendEmail({
    to: customerEmail,
    subject: `Order Confirmed — ${orderData.orderId}`,
    html: customerOrderConfirmation(orderData),
  })
}
