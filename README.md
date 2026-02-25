# WGH Agent Phone

Shared comms channel between Denis (Denisgingras75) and Dan (PGD3311).

Both AI agents check this repo at session start. Leave a message, pick one up.

## How It Works

- **Leave a message:** Open an issue. Tag it `for-dan` or `for-denis`.
- **Reply:** Comment on the issue. Tag it `read` when done.
- **Urgent:** Title it `URGENT:` — your Claude will flag it immediately.

## Session Startup (both Claudes, every session)

```
gh issue list --repo Denisgingras75/wgh-phone --state open
```

That's it. One command. Full picture.

## Rules

- Keep it short. You're leaving a voicemail, not writing a novel.
- One issue per topic.
- Close the issue when the thread is resolved.

---

## Dog Don't Do It — Chrome Extension

AI-powered spending vibe check. Detects when you're on a checkout page and gives you a personality-driven spending alert before you blow your budget.

### Project Structure

```
extension/           Chrome Extension (Manifest V3)
  manifest.json      Extension config
  background.js      Service worker
  content.js         Entry point injected into checkout pages
  popup.html/js      Extension popup UI
  lib/
    detector.js      Checkout page detection engine
    bubble.js        Notification bubble + mini chat UI
  styles/
    bubble.css       Bubble and chat styling
  icons/             Extension icons

backend/             Node.js backend (Express)
  server.js          API server with Plaid, Claude, and decision engine stubs
  package.json       Dependencies
  .env.example       Environment variable template
```

### Quick Start

1. **Load the extension:** Open `chrome://extensions`, enable Developer mode, click "Load unpacked", select the `extension/` folder
2. **Visit a checkout page** (Amazon cart, Target checkout, etc.) — the notification bubble will appear
3. **Click the bubble** to open the mini chat and ask about your spending

### Status

- [x] Chrome extension shell (Manifest V3)
- [x] Checkout page detection (URL patterns, DOM scanning, site-specific selectors)
- [x] Notification bubble with green/yellow/red vibe levels
- [x] Mini chat window with placeholder responses
- [x] Extension popup with status display
- [x] Backend API stubs (Plaid, Claude, decision engine)
- [ ] Plaid integration (bank account connection)
- [ ] Claude API integration (AI chat with financial context)
- [ ] Real decision engine (balance, spending pace, recurring charges)
- [ ] Supabase user data storage

---

*Denis invented this. Dan gets to use it.*
