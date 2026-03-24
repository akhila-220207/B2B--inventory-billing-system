const nodemailer = require('nodemailer');

/**
 * Creates a transporter using SMTP settings from environment variables.
 * Works with Gmail, Outlook, or any SMTP server.
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS   // Use App Password for Gmail
    }
  });
};

/**
 * Sends an order confirmation email to the buyer.
 */
const sendOrderConfirmationEmail = async ({ to, buyerName, orderId, items, totalAmount, shippingAddress, trackingUrl }) => {
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_email@gmail.com') {
    console.warn('⚠️ Email credentials not set. Skipping buyer email.');
    return 'skipped';
  }

  const itemRows = items.map(item => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #f0f0f0;">${item.name}</td>
      <td style="padding:8px;border-bottom:1px solid #f0f0f0;text-align:center;">${item.quantity}</td>
      <td style="padding:8px;border-bottom:1px solid #f0f0f0;text-align:right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
    </tr>`).join('');

  const html = `
    <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:linear-gradient(135deg,#2563eb,#1e40af);padding:32px 40px;color:#fff;">
        <h1 style="margin:0;font-size:24px;font-weight:900;letter-spacing:-0.5px;">Inventaa</h1>
        <p style="margin:4px 0 0;font-size:13px;opacity:0.8;">B2B Inventory & Billing Platform</p>
      </div>
      <div style="padding:32px 40px;">
        <h2 style="margin:0 0 8px;color:#111827;font-size:20px;">Order Confirmed! 🎉</h2>
        <p style="color:#6b7280;margin:0 0 24px;">Hi <strong>${buyerName}</strong>, your order has been placed successfully.</p>
        
        <div style="background:#f9fafb;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Order ID</p>
          <p style="margin:0;font-size:16px;font-weight:900;color:#111827;">#${orderId.toString().slice(-8).toUpperCase()}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <thead>
            <tr style="background:#f3f4f6;">
              <th style="padding:10px 8px;text-align:left;font-size:11px;color:#6b7280;text-transform:uppercase;">Item</th>
              <th style="padding:10px 8px;text-align:center;font-size:11px;color:#6b7280;text-transform:uppercase;">Qty</th>
              <th style="padding:10px 8px;text-align:right;font-size:11px;color:#6b7280;text-transform:uppercase;">Amount</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="text-align:right;margin-bottom:24px;padding-top:12px;border-top:2px solid #111827;">
          <span style="font-size:11px;color:#6b7280;text-transform:uppercase;font-weight:700;">Grand Total</span><br>
          <span style="font-size:24px;font-weight:900;color:#2563eb;">₹${totalAmount.toLocaleString('en-IN')}</span>
        </div>

        <div style="background:#f9fafb;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Shipping To</p>
          <p style="margin:0;color:#374151;font-size:14px;">${shippingAddress}</p>
        </div>

        <a href="${trackingUrl}" style="display:block;background:#2563eb;color:#fff;text-decoration:none;text-align:center;padding:16px;border-radius:12px;font-weight:700;font-size:15px;margin-bottom:24px;">Track Your Order →</a>

        <p style="color:#9ca3af;font-size:11px;text-align:center;margin:0;">If you didn't place this order, please contact us immediately.</p>
      </div>
    </div>`;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Inventaa" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Order Confirmed #${orderId.toString().slice(-8).toUpperCase()} — Inventaa`,
      html
    });
    console.log(`✅ Order confirmation email sent to ${to}`);
    return 'sent';
  } catch (err) {
    console.error('❌ Failed to send buyer email:', err.message);
    return 'error';
  }
};

/**
 * Sends a new order alert email to the supplier.
 */
const sendSupplierOrderAlertEmail = async ({ to, supplierName, orderId, buyerBusiness, items, totalAmount }) => {
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_email@gmail.com') {
    console.warn('⚠️ Email credentials not set. Skipping supplier email.');
    return 'skipped';
  }

  const itemRows = items.map(item => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #f0f0f0;">${item.name}</td>
      <td style="padding:8px;border-bottom:1px solid #f0f0f0;text-align:center;">${item.quantity}</td>
      <td style="padding:8px;border-bottom:1px solid #f0f0f0;text-align:right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
    </tr>`).join('');

  const html = `
    <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:linear-gradient(135deg,#059669,#065f46);padding:32px 40px;color:#fff;">
        <h1 style="margin:0;font-size:24px;font-weight:900;">Inventaa</h1>
        <p style="margin:4px 0 0;font-size:13px;opacity:0.8;">Supplier Notification</p>
      </div>
      <div style="padding:32px 40px;">
        <h2 style="margin:0 0 8px;color:#111827;">New Order Received! 📦</h2>
        <p style="color:#6b7280;margin:0 0 24px;">Hi <strong>${supplierName}</strong>, <strong>${buyerBusiness}</strong> has placed an order for your products.</p>
        
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:1px;">Order ID</p>
          <p style="margin:0;font-size:16px;font-weight:900;color:#111827;">#${orderId.toString().slice(-8).toUpperCase()}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <thead>
            <tr style="background:#f3f4f6;">
              <th style="padding:10px 8px;text-align:left;font-size:11px;color:#6b7280;text-transform:uppercase;">Product</th>
              <th style="padding:10px 8px;text-align:center;font-size:11px;color:#6b7280;text-transform:uppercase;">Qty</th>
              <th style="padding:10px 8px;text-align:right;font-size:11px;color:#6b7280;text-transform:uppercase;">Revenue</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="text-align:right;margin-bottom:24px;padding-top:12px;border-top:2px solid #059669;">
          <span style="font-size:11px;color:#6b7280;text-transform:uppercase;font-weight:700;">Total Order Value</span><br>
          <span style="font-size:24px;font-weight:900;color:#059669;">₹${totalAmount.toLocaleString('en-IN')}</span>
        </div>

        <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0;">Please prepare this order for dispatch. Log in to your Inventaa Supplier Dashboard to manage it.</p>
      </div>
    </div>`;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Inventaa" <${process.env.EMAIL_USER}>`,
      to,
      subject: `New Order #${orderId.toString().slice(-8).toUpperCase()} — Action Required`,
      html
    });
    console.log(`✅ Supplier alert email sent to ${to}`);
    return 'sent';
  } catch (err) {
    console.error('❌ Failed to send supplier email:', err.message);
    return 'error';
  }
};

/**
 * Sends a welcome email when a user registers.
 */
const sendWelcomeEmail = async ({ to, name, role }) => {
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_email@gmail.com') return 'skipped';

  const isBuyer = role === 'buyer';
  const html = `
    <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:linear-gradient(135deg,#2563eb,#1e40af);padding:32px 40px;color:#fff;">
        <h1 style="margin:0;font-size:24px;font-weight:900;">Welcome to Inventaa! 🎉</h1>
      </div>
      <div style="padding:32px 40px;">
        <h2 style="margin:0 0 8px;color:#111827;">Hi ${name},</h2>
        <p style="color:#6b7280;margin:0 0 24px;">Your account has been created successfully as a <strong>${isBuyer ? 'Buyer' : 'Supplier'}</strong>.</p>
        ${isBuyer
          ? `<p style="color:#374151;">You can now browse the marketplace, add products to your cart, and place bulk orders with ease.</p>`
          : `<p style="color:#374151;">You can now list your products, manage inventory, and start receiving orders from verified businesses.</p>`
        }
        <p style="color:#9ca3af;font-size:12px;margin-top:32px;">If you did not create this account, please contact support immediately.</p>
      </div>
    </div>`;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Inventaa" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Welcome to Inventaa, ${name}!`,
      html
    });
    console.log(`✅ Welcome email sent to ${to}`);
    return 'sent';
  } catch (err) {
    console.error('❌ Failed to send welcome email:', err.message);
    return 'error';
  }
};

module.exports = { sendOrderConfirmationEmail, sendSupplierOrderAlertEmail, sendWelcomeEmail };
