/**
 * Content script — entry point injected into checkout pages.
 * Runs the detector, then shows the bubble if a checkout page is detected.
 */
(() => {
  // Avoid double-injection
  if (window.__dddiLoaded) return;
  window.__dddiLoaded = true;

  // Initial detection after DOM settles
  runDetection();

  // Re-check on SPA navigations (pushState / popstate)
  let lastUrl = location.href;
  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      runDetection();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  function runDetection() {
    const result = CheckoutDetector.detect();
    console.log('[Dog Don\'t Do It] Detection result:', result);

    if (result.isCheckout) {
      // Placeholder: pick vibe level based on confidence.
      // Once the backend is wired, this will come from the decision engine.
      const vibe = pickPlaceholderVibe(result);
      BubbleUI.create(vibe);

      // Notify background script
      chrome.runtime.sendMessage({
        type: 'CHECKOUT_DETECTED',
        data: {
          url: location.href,
          confidence: result.confidence,
          signals: result.signals,
          vibe,
        },
      });
    }
  }

  /**
   * Placeholder vibe picker — rotates through levels for demo purposes.
   * Real logic will call the decision engine on the backend.
   */
  function pickPlaceholderVibe(detectionResult) {
    if (detectionResult.confidence === 'high') return 'red';
    if (detectionResult.confidence === 'medium') return 'yellow';
    return 'green';
  }
})();
