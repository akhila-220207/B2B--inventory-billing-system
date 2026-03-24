const twilio = require('twilio');

/**
 * Sends a professional WhatsApp Business API message using Twilio.
 * 
 * Supports two modes:
 * 1. TEMPLATE MODE (Pro): Sends approved message template with CTA "Track Order" button.
 *    Requires: TWILIO_CONTENT_SID in .env (from approved Meta template).
 * 2. FALLBACK MODE: Sends a rich plain-text message automatically.
 * 
 * @param {string} to - Recipient phone with country code (e.g. +919876543210)
 * @param {object} orderDetails - { orderId, amount }
 * @returns {string} - 'sent_template' | 'sent_text' | 'skipped' | 'error'
 */
const sendWhatsAppTracking = async (to, orderDetails) => {
  const { orderId, amount } = orderDetails;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken  = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
  const contentSid = process.env.TWILIO_CONTENT_SID; // e.g. HXxxxxxxxxxxxxx
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const trackingUrl = `${frontendUrl}/order-tracking/${orderId}`;

  // Guard: skip if credentials are placeholders
  if (!accountSid || !authToken || accountSid === 'your_sid_here') {
    console.warn('⚠️ Twilio credentials not set. Skipping WhatsApp API notification.');
    return 'skipped';
  }

  const client = twilio(accountSid, authToken);

  // Format recipient for WhatsApp
  const formattedTo = to.startsWith('whatsapp:')
    ? to
    : `whatsapp:${to.startsWith('+') ? to : `+${to}`}`;

  // ─── MODE 1: Template with CTA Button (Flipkart-style) ───────────────────
  if (contentSid && contentSid !== 'your_content_sid_here') {
    try {
      const message = await client.messages.create({
        from: fromNumber,
        to: formattedTo,
        contentSid,
        // Variables map to your approved template placeholders
        contentVariables: JSON.stringify({
          '1': amount.toString(), // e.g. ₹1512
          '2': orderId.toString(),
          '3': trackingUrl
        })
      });
      console.log(`✅ WhatsApp template message sent! SID: ${message.sid}`);
      return 'sent_template';
    } catch (err) {
      console.error('❌ Template message failed:', err.message);
      // Fall through to plain text
    }
  }

  // ─── MODE 2: Rich Plain-Text Fallback (automatic) ────────────────────────
  try {
    const body =
      `🛒 *Order Confirmed — Inventaa*\n\n` +
      `✅ Your order of *₹${amount}* has been placed successfully!\n\n` +
      `📦 *Order ID:* ${orderId.toString().slice(-8).toUpperCase()}\n\n` +
      `Track your shipment live here:\n${trackingUrl}\n\n` +
      `_To stop updates, reply STOP._`;

    const message = await client.messages.create({
      from: fromNumber,
      body,
      to: formattedTo
    });

    console.log(`✅ WhatsApp text message sent! SID: ${message.sid}`);
    return 'sent_text';
  } catch (err) {
    console.error('❌ Failed to send WhatsApp message via Twilio:', err.message);
    return 'error';
  }
};

module.exports = { sendWhatsAppTracking };
