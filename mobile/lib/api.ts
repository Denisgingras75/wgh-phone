/**
 * API client for the Dog Don't Do It backend.
 */

// TODO: Update this to your deployed backend URL
const API_BASE = __DEV__
  ? 'http://localhost:3001/api'
  : 'https://your-backend.fly.dev/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  health: () => request<{ status: string }>('/health'),

  // Plaid
  createLinkToken: () =>
    request<{ link_token: string }>('/plaid/create-link-token', {
      method: 'POST',
    }),

  exchangeToken: (publicToken: string) =>
    request('/plaid/exchange-token', {
      method: 'POST',
      body: JSON.stringify({ public_token: publicToken }),
    }),

  getTransactions: () =>
    request<{ transactions: Transaction[] }>('/plaid/transactions'),

  // Decision engine
  evaluate: (purchaseAmount: number, url?: string) =>
    request<VibeResult>('/evaluate', {
      method: 'POST',
      body: JSON.stringify({ purchaseAmount, url }),
    }),

  // Chat
  chat: (message: string) =>
    request<{ reply: string }>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),

  // Push notification token registration
  registerPushToken: (token: string) =>
    request('/push/register', {
      method: 'POST',
      body: JSON.stringify({ pushToken: token }),
    }),
};

export type VibeLevel = 'green' | 'yellow' | 'red';

export interface VibeResult {
  vibe: VibeLevel;
  message: string;
  purchaseAmount: number;
}

export interface Transaction {
  date: string;
  name: string;
  amount: number;
  category: string;
}
