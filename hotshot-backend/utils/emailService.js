import { Resend } from 'resend'
import process from 'process'

const getResend = () => {
  return new Resend(process.env.RESEND_API_KEY)
}

// ── Order Confirmation ────────────────────────────
export const sendOrderConfirmationEmail = async (order) => {
  const resend = getResend()

  const itemsHTML = order.items.map((item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #1a1a1a;">
        <span style="color: #ffffff; font-size: 12px; text-transform: uppercase; font-weight: bold;">${item.name}</span>
        <br/>
        <span style="color: #71717a; font-size: 11px;">Size: ${item.size} · Qty: ${item.quantity}</span>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #1a1a1a; text-align: right;">
        <span style="color: #ef4444; font-size: 12px; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</span>
      </td>
    </tr>
  `).join('')

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: order.shippingAddress.email,
    subject: `Order Confirmed — #${order._id.toString().slice(-8).toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #09090b; border: 1px solid #1a1a1a;">
          <div style="background-color: #000000; padding: 32px; border-bottom: 1px solid #1a1a1a; text-align: center;">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: 4px; margin: 0;">
              HOTSHOT <span style="color: #ef4444;">//</span> LUXURY
            </h1>
          </div>
          <div style="padding: 32px;">
            <h2 style="color: #ffffff; font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">
              Order Confirmed ✓
            </h2>
            <p style="color: #71717a; font-size: 13px; margin-bottom: 24px;">
              Hi ${order.shippingAddress.firstName}, your order has been received and is being processed.
            </p>
            <div style="background-color: #0a0a0a; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 24px;">
              <p style="color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 4px;">Order ID</p>
              <p style="color: #ffffff; font-size: 13px; font-weight: bold; margin: 0;">
                #${order._id.toString().slice(-8).toUpperCase()}
              </p>
            </div>
            <p style="color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">Items Ordered</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              ${itemsHTML}
              <tr>
                <td style="padding: 16px 12px 0; text-align: right;" colspan="2">
                  <span style="color: #71717a; font-size: 12px;">Total: </span>
                  <span style="color: #ef4444; font-size: 16px; font-weight: 900;">$${order.totalPrice.toFixed(2)}</span>
                </td>
              </tr>
            </table>
            <p style="color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">Shipping To</p>
            <div style="background-color: #0a0a0a; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 24px;">
              <p style="color: #a1a1aa; font-size: 12px; line-height: 1.8; margin: 0;">
                ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br/>
                ${order.shippingAddress.address}<br/>
                ${order.shippingAddress.city}, ${order.shippingAddress.state}<br/>
                ${order.shippingAddress.country}
              </p>
            </div>
            <div style="text-align: center; margin-top: 32px;">
              <a href="${process.env.CLIENT_URL}/orders"
                style="background-color: #ef4444; color: #ffffff; text-decoration: none; padding: 14px 32px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; display: inline-block;">
                VIEW MY ORDERS
              </a>
            </div>
          </div>
          <div style="padding: 24px 32px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="color: #3f3f46; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">
              © 2026 Hotshot Luxury. All Rights Reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

// ── Contact Form Email ────────────────────────────
export const sendContactEmail = async ({ firstName, lastName, email, phone, message }) => {
  const resend = getResend()

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Message from ${firstName} ${lastName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #09090b; border: 1px solid #1a1a1a;">
          <div style="background-color: #000000; padding: 32px; border-bottom: 1px solid #1a1a1a; text-align: center;">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: 4px; margin: 0;">
              HOTSHOT <span style="color: #ef4444;">//</span> LUXURY
            </h1>
          </div>
          <div style="padding: 32px;">
            <h2 style="color: #ffffff; font-size: 16px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px;">
              New Contact Message
            </h2>
            <div style="background-color: #0a0a0a; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 16px;">
              <p style="color: #71717a; font-size: 11px; text-transform: uppercase; margin: 0 0 4px;">From</p>
              <p style="color: #ffffff; font-size: 13px; margin: 0;">${firstName} ${lastName}</p>
            </div>
            <div style="background-color: #0a0a0a; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 16px;">
              <p style="color: #71717a; font-size: 11px; text-transform: uppercase; margin: 0 0 4px;">Email</p>
              <p style="color: #ffffff; font-size: 13px; margin: 0;">${email}</p>
            </div>
            <div style="background-color: #0a0a0a; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 16px;">
              <p style="color: #71717a; font-size: 11px; text-transform: uppercase; margin: 0 0 4px;">Phone</p>
              <p style="color: #ffffff; font-size: 13px; margin: 0;">${phone || 'Not provided'}</p>
            </div>
            <div style="background-color: #0a0a0a; border: 1px solid #1a1a1a; padding: 16px;">
              <p style="color: #71717a; font-size: 11px; text-transform: uppercase; margin: 0 0 8px;">Message</p>
              <p style="color: #a1a1aa; font-size: 13px; line-height: 1.8; margin: 0;">${message}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

// ── Newsletter Welcome Email ──────────────────────
export const sendNewsletterWelcomeEmail = async (email) => {
  const resend = getResend()

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to the Hotshot Luxury VIP List',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #09090b; border: 1px solid #1a1a1a;">
          <div style="background-color: #000000; padding: 32px; border-bottom: 1px solid #1a1a1a; text-align: center;">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: 4px; margin: 0;">
              HOTSHOT <span style="color: #ef4444;">//</span> LUXURY
            </h1>
          </div>
          <div style="padding: 40px 32px; text-align: center;">
            <h2 style="color: #ffffff; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 16px;">
              You're In.
            </h2>
            <p style="color: #71717a; font-size: 13px; line-height: 1.8; margin-bottom: 32px;">
              Welcome to the Hotshot Luxury VIP list. You'll be the first to know about exclusive drops, limited releases and special offers.
            </p>
            <a href="${process.env.CLIENT_URL}/shop"
              style="background-color: #ef4444; color: #ffffff; text-decoration: none; padding: 14px 32px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; display: inline-block;">
              SHOP THE DROP
            </a>
          </div>
          <div style="padding: 24px 32px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="color: #3f3f46; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">
              © 2026 Hotshot Luxury. All Rights Reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

// ── Password Reset OTP Email ──────────────────────
export const sendPasswordResetEmail = async (email, otp) => {
  const resend = getResend()

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset Your Hotshot Luxury Password',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #09090b; border: 1px solid #1a1a1a;">
          <div style="background-color: #000000; padding: 32px; border-bottom: 1px solid #1a1a1a; text-align: center;">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: 4px; margin: 0;">
              HOTSHOT <span style="color: #ef4444;">//</span> LUXURY
            </h1>
          </div>
          <div style="padding: 40px 32px; text-align: center;">
            <h2 style="color: #ffffff; font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">
              Password Reset
            </h2>
            <p style="color: #71717a; font-size: 13px; line-height: 1.8; margin-bottom: 32px;">
              Use the code below to reset your password. This code expires in 15 minutes.
            </p>
            <div style="background-color: #0a0a0a; border: 1px solid #ef4444; padding: 24px; margin-bottom: 32px; letter-spacing: 8px;">
              <span style="color: #ef4444; font-size: 32px; font-weight: 900;">${otp}</span>
            </div>
            <p style="color: #3f3f46; font-size: 11px;">
              If you didn't request this, ignore this email.
            </p>
          </div>
          <div style="padding: 24px 32px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="color: #3f3f46; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">
              © 2026 Hotshot Luxury. All Rights Reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}