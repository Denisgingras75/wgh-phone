# Shared Context — WGH

*Last updated: 2026-02-25*

## Current Architecture State

- **Frontend:** React SPA (Vite), deployed to Netlify
- **Backend:** Supabase (Postgres + Auth + Edge Functions)
- **Routing:** React Router v6 — `/`, `/browse`, `/restaurant/:id`, `/dish/:id`, `/profile`, `/manage`, `/discover`
- **Styling:** CSS variables with theme support (Appetite/Island Depths), className=layout, style={{}}=color
- **Auth:** Google OAuth via Supabase

## Active Integrations

- Supabase (database, auth, RLS)
- Google OAuth
- GitHub Issues (Agent Phone)

## Known Issues

- Safari 15 compatibility: no ES2023+ methods (toSorted, findLast, Object.groupBy, .at())
- RPC param naming inconsistent: geo RPCs = bare names, entity lookups = p_ prefix

## Navigation Order

Home → Browse → Discover → Profile (+ Restaurant Detail, Dish Detail, Manage)

## Key Patterns

- API layer: all Supabase calls go through `src/api/*.js`, never direct from components
- Error handling: `createClassifiedError` from `utils/errorHandler`
- Logging: `logger` from `utils/logger`, never `console.*`
- Components: named export + default export at bottom
