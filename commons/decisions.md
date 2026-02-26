# Architectural Decisions — WGH

Decisions with date, rationale, who made it. Both Claudes read this.

---

## 2026-02-25: The Commons — agent collaboration infrastructure

**Decision:** Build shared context layer between Denis's Claude and Dan's Claude via GitHub (wgh-phone repo).
**Rationale:** Isolated sessions waste 90% of context. Shared whiteboard + auto-broadcast makes both agents aware of changes.
**Who:** Denis
**Affects:** All future sessions, hook configuration, session start/end workflow

## 2026-02-24: Specials before ratings for launch

**Decision:** Build specials (restaurant deals) as the core launch feature, not ratings.
**Rationale:** Specials create behavior ("go do something") while ratings require behavior first. Specials drive immediate foot traffic.
**Who:** Denis
**Affects:** Feature priority, ManageRestaurant portal, Discover page feed

## 2026-02-24: Server staff as primary distribution channel

**Decision:** Train restaurant staff to prompt users to rate dishes at point of peak satisfaction.
**Rationale:** Highest-leverage, zero-cost distribution. Trusted human recommendation at the perfect moment.
**Who:** Denis
**Affects:** Onboarding flow, QR code strategy, restaurant manager relationships
