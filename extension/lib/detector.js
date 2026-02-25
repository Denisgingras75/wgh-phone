/**
 * Checkout page detector — scans URL patterns, DOM elements, and button text
 * to determine if the user is on a checkout/cart/payment page.
 */
const CheckoutDetector = (() => {
  // URL patterns that signal checkout/cart/payment pages
  const URL_PATTERNS = [
    /checkout/i,
    /\/cart/i,
    /payment/i,
    /place.?order/i,
    /billing/i,
    /purchase/i,
    /buy.*now/i,
    /order.*review/i,
    /shipping.*address/i,
  ];

  // CSS selectors for payment-related form elements
  const PAYMENT_SELECTORS = [
    'input[name*="card" i]',
    'input[name*="credit" i]',
    'input[autocomplete="cc-number"]',
    'input[autocomplete="cc-exp"]',
    'input[autocomplete="cc-csc"]',
    '[data-testid*="payment" i]',
    '[data-testid*="checkout" i]',
    'form[action*="checkout" i]',
    'form[action*="payment" i]',
    'form[action*="order" i]',
    '#checkout',
    '.checkout',
    '#payment-method',
    '.payment-form',
  ];

  // Button text patterns that indicate final purchase step
  const BUTTON_TEXT_PATTERNS = [
    /place.*order/i,
    /complete.*purchase/i,
    /pay\s*now/i,
    /buy\s*now/i,
    /submit.*order/i,
    /confirm.*order/i,
    /proceed.*to.*pay/i,
    /checkout/i,
  ];

  // Site-specific selectors for major retailers
  const SITE_SPECIFIC = {
    'amazon.com': ['#submitOrderButtonId', '#placeYourOrder', '.place-your-order-button'],
    'target.com': ['[data-test="placeOrderButton"]', '[data-test="orderSummary"]'],
    'walmart.com': ['[data-testid="PlaceOrderBtn"]', '.checkout-cta'],
    'bestbuy.com': ['.btn-place-order', '[data-track="Place Your Order"]'],
  };

  function checkUrl() {
    const url = window.location.href;
    return URL_PATTERNS.some((pattern) => pattern.test(url));
  }

  function checkPaymentForms() {
    return PAYMENT_SELECTORS.some(
      (selector) => document.querySelector(selector) !== null
    );
  }

  function checkButtons() {
    const buttons = document.querySelectorAll(
      'button, input[type="submit"], a.btn, a.button, [role="button"]'
    );
    for (const btn of buttons) {
      const text = btn.textContent || btn.value || '';
      if (BUTTON_TEXT_PATTERNS.some((pattern) => pattern.test(text.trim()))) {
        return true;
      }
    }
    return false;
  }

  function checkSiteSpecific() {
    const hostname = window.location.hostname;
    for (const [site, selectors] of Object.entries(SITE_SPECIFIC)) {
      if (hostname.includes(site)) {
        return selectors.some(
          (selector) => document.querySelector(selector) !== null
        );
      }
    }
    return false;
  }

  /**
   * Returns a detection result:
   * { isCheckout: boolean, confidence: 'high' | 'medium' | 'low', signals: string[] }
   */
  function detect() {
    const signals = [];

    if (checkUrl()) signals.push('url_pattern');
    if (checkPaymentForms()) signals.push('payment_form');
    if (checkButtons()) signals.push('purchase_button');
    if (checkSiteSpecific()) signals.push('site_specific');

    const count = signals.length;
    let confidence = 'low';
    if (count >= 3) confidence = 'high';
    else if (count >= 1) confidence = 'medium';

    return {
      isCheckout: count >= 1,
      confidence,
      signals,
    };
  }

  return { detect };
})();
