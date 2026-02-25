/**
 * Background service worker — handles messages from content scripts
 * and will coordinate with the backend API once wired up.
 */

// Listen for checkout detection events from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CHECKOUT_DETECTED') {
    console.log('[Dog Don\'t Do It] Checkout detected:', message.data);

    // Store the latest detection for the popup to read
    chrome.storage.local.set({
      lastDetection: {
        ...message.data,
        tabId: sender.tab?.id,
        timestamp: Date.now(),
      },
    });

    // TODO: Call backend decision engine here
    // fetch(`${BACKEND_URL}/api/evaluate`, { ... })

    sendResponse({ status: 'ok' });
  }

  if (message.type === 'CHAT_MESSAGE') {
    // TODO: Forward to backend → Claude API
    console.log('[Dog Don\'t Do It] Chat message:', message.text);
    sendResponse({ reply: 'Backend not connected yet — placeholder response.' });
  }

  return true; // keep message channel open for async response
});

// Set up badge on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('[Dog Don\'t Do It] Extension installed.');
});
