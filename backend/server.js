/**
 * Dog Don't Do It — Backend Server
 *
 * Handles:
 * - Plaid Link token creation and token exchange
 * - Transaction data retrieval
 * - Decision engine (spending vibe check)
 * - Claude API chat with financial context
 *
 * Status: Stub/scaffold — routes defined, logic placeholder.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ─── Health check ────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'dog-dont-do-it' });
});

// ─── Plaid routes ────────────────────────────────────────────

/**
 * POST /api/plaid/create-link-token
 * Creates a Plaid Link token for the frontend to initiate bank connection.
 */
app.post('/api/plaid/create-link-token', async (req, res) => {
  // TODO: Initialize Plaid client and create link token
  res.json({
    link_token: 'placeholder-link-token',
    _note: 'Plaid not yet configured — add keys to .env',
  });
});

/**
 * POST /api/plaid/exchange-token
 * Exchanges a public_token from Plaid Link for an access_token.
 */
app.post('/api/plaid/exchange-token', async (req, res) => {
  const { public_token } = req.body;
  // TODO: Exchange public_token for access_token via Plaid
  // TODO: Store access_token in Supabase
  res.json({
    success: true,
    _note: 'Token exchange not yet implemented',
  });
});

/**
 * GET /api/plaid/transactions
 * Pulls recent transactions for the connected account.
 */
app.get('/api/plaid/transactions', async (req, res) => {
  // TODO: Fetch transactions from Plaid using stored access_token
  res.json({
    transactions: [
      { date: '2026-02-24', name: 'Amazon', amount: 47.99, category: 'Shopping' },
      { date: '2026-02-23', name: 'Chipotle', amount: 12.50, category: 'Food' },
      { date: '2026-02-22', name: 'Netflix', amount: 15.99, category: 'Subscription' },
      { date: '2026-02-20', name: 'Target', amount: 63.21, category: 'Shopping' },
      { date: '2026-02-19', name: 'Uber Eats', amount: 28.40, category: 'Food' },
    ],
    _note: 'Placeholder data — Plaid not yet connected',
  });
});

// ─── Decision Engine ─────────────────────────────────────────

/**
 * POST /api/evaluate
 * Evaluates whether the user should proceed with a purchase.
 * Input: { purchaseAmount, url }
 * Output: { vibe: 'green' | 'yellow' | 'red', message, reasoning }
 */
app.post('/api/evaluate', async (req, res) => {
  const { purchaseAmount = 0 } = req.body;

  // TODO: Pull real balance + transaction history from Plaid
  // TODO: Check upcoming recurring charges
  // TODO: Calculate spending pace

  // Placeholder logic
  let vibe, message;
  if (purchaseAmount < 25) {
    vibe = 'green';
    message = "You're chillin, go for it.";
  } else if (purchaseAmount < 100) {
    vibe = 'yellow';
    message = 'Ehhh you got bills coming up tho.';
  } else {
    vibe = 'red';
    message = "Dog. Don't do it.";
  }

  res.json({ vibe, message, purchaseAmount });
});

// ─── Chat (Claude API) ──────────────────────────────────────

/**
 * POST /api/chat
 * Sends a user question to Claude with financial context injected.
 * Input: { message }
 * Output: { reply }
 */
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  // TODO: Build financial context from Plaid data
  // TODO: Call Claude API with context + user message

  // Placeholder response
  res.json({
    reply: `I heard you ask: "${message}". Once Plaid and Claude API are connected, I'll give you real financial insights!`,
  });
});

// ─── Push Notification Token Registration ───────────────────

// In-memory store — replace with Supabase in production
const pushTokens = new Set();

/**
 * POST /api/push/register
 * Registers an Expo push token so we can send spending alerts.
 */
app.post('/api/push/register', (req, res) => {
  const { pushToken } = req.body;
  if (!pushToken) return res.status(400).json({ error: 'pushToken required' });
  pushTokens.add(pushToken);
  console.log(`[Push] Registered token: ${pushToken}`);
  res.json({ success: true });
});

// ─── Plaid Webhooks ──────────────────────────────────────────

/**
 * POST /api/plaid/webhook
 * Receives webhook events from Plaid when new transactions are detected.
 * This is how we catch Google Pay, Apple Pay, and all other transactions
 * in real-time — Plaid sees them the moment they hit the bank.
 */
app.post('/api/plaid/webhook', async (req, res) => {
  const { webhook_type, webhook_code, item_id, new_transactions } = req.body;
  console.log(`[Plaid Webhook] ${webhook_type}:${webhook_code}`);

  // TODO: Verify webhook signature with Plaid

  if (webhook_type === 'TRANSACTIONS' && webhook_code === 'DEFAULT_UPDATE') {
    // New transactions detected — evaluate and send push notification
    console.log(`[Plaid Webhook] ${new_transactions} new transactions for item ${item_id}`);

    // TODO: Fetch the new transactions from Plaid
    // TODO: Run decision engine on each transaction
    // TODO: Send push notification with vibe check

    // Placeholder: send a push notification for the new transactions
    await sendSpendingAlert({
      merchantName: 'New Purchase',
      amount: 0,
      vibe: 'yellow',
      message: 'New transaction detected — checking your vibe...',
    });
  }

  res.json({ received: true });
});

/**
 * Sends a spending alert push notification to all registered devices.
 */
async function sendSpendingAlert({ merchantName, amount, vibe, message }) {
  const vibeEmoji = { green: '\u{1F7E2}', yellow: '\u{1F7E1}', red: '\u{1F534}' };
  const title = vibe === 'red'
    ? "\u{1F6D1} Dog. Don't do it."
    : vibe === 'yellow'
      ? '\u{1F436} Heads up...'
      : '\u{1F436} All good!';

  const body = amount > 0
    ? `${merchantName}: -$${amount.toFixed(2)} — ${message}`
    : message;

  const pushMessages = [...pushTokens].map((token) => ({
    to: token,
    sound: 'default',
    title,
    body,
    data: { vibe, merchantName, amount },
    channelId: 'spending-alerts',
  }));

  if (pushMessages.length === 0) return;

  // Send via Expo Push API
  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(pushMessages),
    });
    console.log(`[Push] Sent alert to ${pushMessages.length} device(s)`);
  } catch (err) {
    console.error('[Push] Failed to send:', err.message);
  }
}

// ─── Start server ────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`[Dog Don't Do It] Backend running on http://localhost:${PORT}`);
});
