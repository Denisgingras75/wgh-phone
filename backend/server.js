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

// ─── Start server ────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`[Dog Don't Do It] Backend running on http://localhost:${PORT}`);
});
