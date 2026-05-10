import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const adminEmail = process.env.RESEND_ADMIN_EMAIL!

export async function sendOrderConfirmation({
  to,
  orderNumber,
  customerName,
  items,
  total
}: {
  to: string
  orderNumber: string
  customerName: string
  items: Array<{ product_name: string; quantity: number; unit_price: number }>
  total: number
}) {
  const itemsList = items.map(item => 
    `${item.product_name} x${item.quantity} - $${(item.unit_price * item.quantity).toFixed(2)}`
  ).join('\n')

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to,
    subject: `Order Confirmed - ${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Order Confirmed! 🎉</h1>
        <p>Hi ${customerName},</p>
        <p>Thank you for your order. Here's your order summary:</p>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin: 0 0 10px;">Order #${orderNumber}</h2>
          <div style="white-space: pre-line;">${itemsList}</div>
          <hr style="margin: 20px 0;" />
          <p style="font-size: 18px; font-weight: bold;">Total: $${total.toFixed(2)}</p>
        </div>
        
        <p>We'll notify you when your order ships.</p>
      </div>
    `
  })

  if (error) console.error('Failed to send confirmation:', error)
  return data
}

export async function sendAdminNotification({
  orderNumber,
  customerName,
  total,
  itemsCount
}: {
  orderNumber: string
  customerName: string
  total: number
  itemsCount: number
}) {
  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: adminEmail,
    subject: `🔔 New Order: ${orderNumber} - $${total.toFixed(2)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
        <h1>🔔 New Order Received!</h1>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
          <p><strong>Order:</strong> ${orderNumber}</p>
          <p><strong>Customer:</strong> ${customerName}</p>
          <p><strong>Items:</strong> ${itemsCount}</p>
          <p style="font-size: 20px; font-weight: bold; color: #059669;">
            Total: $${total.toFixed(2)}
          </p>
        </div>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/orders" 
           style="display: inline-block; background: #3b82f6; color: white; 
                  padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 20px;">
          View in Dashboard
        </a>
      </div>
    `
  })

  if (error) console.error('Failed to send admin notification:', error)
  return data
}
