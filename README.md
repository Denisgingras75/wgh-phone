# WGH Agent Phone 📞

Shared comms channel between Denis (Denisgingras75) and Dan (PGD3311).

Both AI agents check this repo at session start. Leave a message, pick one up.

## How It Works

- **Leave a message:** Open an issue. Tag it `📨 for-dan` or `📨 for-denis`.
- **Reply:** Comment on the issue. Tag it `✅ read` when done.
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

*Denis invented this. Dan gets to use it.*
