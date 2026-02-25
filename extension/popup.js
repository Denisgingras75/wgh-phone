/**
 * Popup script — reads detection state from storage and updates the popup UI.
 */
document.addEventListener('DOMContentLoaded', () => {
  const pageStatus = document.getElementById('page-status');
  const vibeStatus = document.getElementById('vibe-status');
  const plaidStatus = document.getElementById('plaid-status');
  const connectBtn = document.getElementById('connect-plaid-btn');
  const settingsBtn = document.getElementById('settings-btn');

  // Load last detection from storage
  chrome.storage.local.get(['lastDetection', 'plaidConnected'], (data) => {
    // Plaid status
    if (data.plaidConnected) {
      plaidStatus.innerHTML = '<span class="status-dot dot-green"></span>Connected';
    }

    // Page detection status
    const det = data.lastDetection;
    if (det && Date.now() - det.timestamp < 60000) {
      pageStatus.innerHTML = `<span class="status-dot dot-green"></span>Checkout detected`;

      const vibeColors = { green: 'dot-green', yellow: 'dot-yellow', red: 'dot-red' };
      const vibeLabels = {
        green: "You're chillin",
        yellow: 'Watch out',
        red: "Don't do it",
      };
      vibeStatus.innerHTML = `<span class="status-dot ${vibeColors[det.vibe] || 'dot-gray'}"></span>${vibeLabels[det.vibe] || '—'}`;
    } else {
      pageStatus.innerHTML = '<span class="status-dot dot-gray"></span>Not a checkout page';
      vibeStatus.textContent = '—';
    }
  });

  // Connect Plaid button (placeholder)
  connectBtn.addEventListener('click', () => {
    // TODO: Open Plaid Link flow via backend
    connectBtn.textContent = 'Coming soon...';
    connectBtn.disabled = true;
    setTimeout(() => {
      connectBtn.textContent = 'Connect Bank Account';
      connectBtn.disabled = false;
    }, 2000);
  });

  // Settings button (placeholder)
  settingsBtn.addEventListener('click', () => {
    // TODO: Open options page
    alert('Settings page coming soon!');
  });
});
