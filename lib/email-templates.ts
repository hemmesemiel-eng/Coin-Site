// Gedeelde inline styles — e-mailclients ondersteunen geen externe CSS
const base = `
  font-family: 'Inter', Arial, sans-serif;
  background-color: #0a0a0f;
  color: #e0e0e0;
  margin: 0;
  padding: 0;
`

const wrapper = `
  max-width: 600px;
  margin: 0 auto;
  background-color: #0a0a0f;
  padding: 40px 20px;
`

const header = `
  background-color: #00ff87;
  color: #0a0a0f;
  text-align: center;
  padding: 32px 24px;
  border-radius: 8px 8px 0 0;
`

const card = `
  background-color: #13131a;
  border: 1px solid #1e1e2e;
  border-radius: 0 0 8px 8px;
  padding: 32px 24px;
`

const labelStyle = `
  color: #888;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 10px 12px 4px;
`

const valueStyle = `
  color: #e0e0e0;
  font-size: 15px;
  padding: 0 12px 10px;
  border-bottom: 1px solid #1e1e2e;
`

const buttonStyle = `
  display: inline-block;
  background-color: #00ff87;
  color: #0a0a0f;
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
  padding: 14px 32px;
  border-radius: 6px;
  margin-top: 24px;
`

const footerStyle = `
  text-align: center;
  color: #555;
  font-size: 12px;
  margin-top: 24px;
`

function row(label: string, value: string): string {
  return `
    <div>
      <div style="${labelStyle}">${label}</div>
      <div style="${valueStyle}">${value}</div>
    </div>
  `
}

// ---

export function ownerOrderNotification(order: {
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
}): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const formattedCoins = order.coinAmount.toLocaleString('en-US')
  const formattedDate = new Date(order.createdAt).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="${base}">
      <div style="${wrapper}">
        <div style="${header}">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">
            New Order Received
          </h1>
          <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.8;">${order.orderId}</p>
        </div>
        <div style="${card}">
          ${row('Order ID', order.orderId)}
          ${row('Platform', order.platform.toUpperCase())}
          ${row('Coin Amount', `${formattedCoins} coins`)}
          ${row('Amount Paid', `$${order.pricePaid.toFixed(2)}`)}
          ${row('Payment Method', order.paymentMethod.replace('_', ' '))}
          ${row('Customer Email', order.customerEmail)}
          ${row('EA Email', order.eaEmail)}
          ${row('EA Password', `<code style="background:#0a0a0f;padding:2px 6px;border-radius:4px;font-family:monospace;">${order.eaPassword}</code>`)}
          ${row('Backup Codes', `<pre style="margin:0;font-family:monospace;font-size:13px;white-space:pre-wrap;">${order.backupCodes}</pre>`)}
          ${row('Order Date', formattedDate)}
          <div style="text-align:center;">
            <a href="${siteUrl}/admin" style="${buttonStyle}">Open Admin Panel</a>
          </div>
        </div>
        <div style="${footerStyle}">
          Coinfactory &mdash; Internal notification. Do not forward this email.
        </div>
      </div>
    </body>
    </html>
  `
}

// ---

export function customerOrderConfirmation(order: {
  orderId: string
  platform: string
  coinAmount: number
  pricePaid: number
}): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const formattedCoins = order.coinAmount.toLocaleString('en-US')

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="${base}">
      <div style="${wrapper}">
        <div style="${header}">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">
            Your order is confirmed!
          </h1>
          <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.8;">${order.orderId}</p>
        </div>
        <div style="${card}">
          <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #ccc;">
            Thanks for your order. We'll start processing it right away.
          </p>
          ${row('Platform', order.platform.toUpperCase())}
          ${row('Coin Amount', `${formattedCoins} coins`)}
          ${row('Amount Paid', `$${order.pricePaid.toFixed(2)}`)}
          <div style="
            background-color: #0d1f18;
            border: 1px solid #00ff8740;
            border-radius: 6px;
            padding: 16px 20px;
            margin-top: 24px;
          ">
            <p style="margin: 0; color: #00ff87; font-weight: 700; font-size: 14px;">
              Estimated delivery: within 2 hours
            </p>
            <p style="margin: 6px 0 0; color: #aaa; font-size: 13px;">
              We'll start transferring your coins as soon as possible.
            </p>
          </div>
          <div style="text-align:center;">
            <a href="${siteUrl}/dashboard" style="${buttonStyle}">Track Your Order</a>
          </div>
          <div style="margin-top:32px; padding-top:24px; border-top:1px solid #1e1e2e;">
            <p style="margin:0; font-size:13px; color:#666; text-align:center;">
              Questions? Contact us at
              <a href="mailto:support@coinfactory.gg" style="color:#00ff87; text-decoration:none;">
                support@coinfactory.gg
              </a>
            </p>
          </div>
        </div>
        <div style="${footerStyle}">
          Coinfactory &mdash; FC 26 Coins
        </div>
      </div>
    </body>
    </html>
  `
}
