# EDD Account Experience — Design Spec

**Date:** 2026-06-04
**Target:** wbcom-essential 4.6.0 (branch `4.6.0`) + reign-child-theme + wbcom-edd.local test bed
**Goal:** Replace the poor account section on wbcomdesigns.com (Reign theme) with a personalized
My Account hub that promotes free plugins, pro upgrades, special offers, and what's new —
plus a polished checkout flow. Free plugins are claimable in one click by logged-in users
(no checkout).

## Problem

- The live store's account section under Reign is visually broken / dated ("very bad").
- Free plugins currently require going through checkout, adding friction.
- No marketing surface inside the account area: no offers, no recommendations, no
  release news. Logged-in customers are the highest-intent audience and see none of it.

## Dual-Layer Architecture (decided)

| Layer | Repo | Scope |
|---|---|---|
| **General** | `wbcom-essential` @ `4.6.0` | All reusable features: dashboard sections, Free Plugins tab, claim flow, offers, recommendations. Works on any EDD store, any theme. |
| **Site-specific** | `reign-child-theme` | Reign 8.0.0 compat CSS, Wbcom Designs branding, support-portal wiring, free→pro meta on real products. |
| **Test bed** | wbcom-edd.local | Seeded products/orders/discounts; pages wired to wbcom-essential blocks. |

Decision: block-based, NOT child-theme page templates. Features must survive theme
switches and ship to all wbcom-essential users; the child theme only carries
presentation overrides. (No duplicated logic across the boundary.)

## Layer 1 — wbcom-essential 4.6.0

All work extends the existing `edd-account-dashboard` block (v2.0.0 → v2.1.0) and
`includes/edd-account-dashboard-functions.php`. Existing infrastructure reused:

- REST namespace `wbcom/v1`, route `/edd-account/(?P<tab>[a-z-]+)` (tab content loader)
- Per-tab render functions `wbcom_essential_edd_render_*_tab()`
- Helpers: `wbcom_essential_edd_empty_state()`, `wbcom_essential_edd_tab_header()`
- Shared block infra: design tokens (`--wbe-*`), BEM (`.wbe-…`), apiVersion 3

### 1. Rich Dashboard tab (rework `wbcom_essential_edd_render_dashboard_tab()`)

Order top→bottom: offer banner → What's New → Recommended for You → existing
stats/recent orders. Each section independently toggleable via block attributes
(`showOffers`, `showWhatsNew`, `showRecommendations` — all default true).

**a) Special Offers banner**
- Source: active EDD discounts (within start/end dates, not maxed out) carrying meta
  flag `_wbcom_show_in_account = 1`.
- Admin UI: "Show in account dashboard" checkbox added to the EDD discount add/edit
  screens (EDD 3 adjustment meta).
- Frontend: banner with discount name/amount, copy-code button, shop link. Multiple
  flagged discounts rotate or stack (max 2 visible).
- Internal/partner codes never leak: only flagged discounts ever render.

**b) What's New row**
- Latest published downloads (4, by `post_date` desc), excluding ones the user owns.
- Owned products with a newer release get "update available" treatment with a download
  link (Software Licensing aware when active).

**c) Recommended for You**
- Priority 1 (free→pro): user owns a free download whose meta `_wbcom_pro_counterpart`
  (download ID) points to a product they don't own → recommend the Pro.
- Priority 2 (fill): top products sharing `download_category` terms with the user's
  purchases, excluding owned. Max 4 cards total.
- Admin UI: "Pro counterpart" select field in the Download Settings metabox.

### 2. New "Free Plugins" tab

- Added to sidebar nav, valid-tabs list (render.php + REST validate callback).
- Grid of all published $0 downloads (price check covers variable-price products whose
  cheapest option is 0 → excluded; only flat-free products qualify).
- Card: thumbnail, title, short description, claim state:
  - Not claimed → **Download Free** button → REST POST `wbcom/v1/edd-account/claim-free`
    (nonce + `is_user_logged_in`) → creates a completed $0 EDD order via EDD 3 order API
    → returns signed file URL → browser starts download. Product now appears in
    Downloads/Purchases tabs and gets update access.
  - Already claimed → "In your library" badge + link to Downloads tab.
  - Has `_wbcom_pro_counterpart` → secondary **Upgrade to Pro** CTA linking to the pro
    product page.
- Idempotent: claiming twice never creates a second order (check existing purchase first).
- Rate-limited: max N claims per user per hour (filterable) to deter scraping.

### 3. Checkout / receipt verification

`edd-checkout-enhanced` and `edd-order-success` blocks already exist — no new build,
but the full journey is tested and any bugs found are fixed in 4.6.0:
browse → add to cart → checkout (Stripe test, discount apply, free order) → receipt.

### Security

- All new REST routes: `is_user_logged_in` permission + nonce (`wp_rest`).
- Claim endpoint validates the download is genuinely free server-side at claim time.
- All output escaped; all meta saves sanitized + capability-checked (`manage_shop_settings`
  for discount flag, `edit_product` for counterpart meta).

## Layer 2 — reign-child-theme (Wbcom Designs specific)

1. **Reign 8.0.0 compat CSS** — scoped overrides fixing Reign styles that break the
   dashboard/checkout (buttons, forms, tables, link states). Anything generic enough
   for all Reign users moves into a `.reign-theme`-scoped section of the block's own
   stylesheet instead.
2. **Branding** — account-area styling aligned with wbcomdesigns.com.
3. **Site wiring** (content, not code): My Account page with the dashboard block
   (support URL → Wbcom support portal, label "My Tickets"), checkout/receipt pages
   using the enhanced blocks, `_wbcom_pro_counterpart` set on real free products.

## Layer 3 — Test bed (wbcom-edd.local)

Seed via WP-CLI script (kept in repo `scripts/` as a dev tool, not shipped in dist):

- 8 downloads: 3 free/pro pairs (free flat-$0 + licensed pro with variable prices),
  1 subscription product (Recurring), 1 plain paid product; categories/tags assigned.
- `_wbcom_pro_counterpart` meta linking each free → pro.
- 2 discount codes (1 flagged `_wbcom_show_in_account`).
- Test customer (`customer@test.local`) with 2 historical orders + 1 active license
  + 1 active subscription, so every tab has content.
- Pages: My Account (new, dashboard block), Checkout 6 (enhanced block), Receipt 7 +
  Confirmation 10 (order-success block), Order History 9 → redirect to My Account
  Purchases tab.

## Acceptance Criteria

1. Logged-in test customer sees offer banner, What's New, recommendations (pro upsell
   first) on Dashboard tab.
2. Free Plugins tab: claim → file downloads, $0 order recorded, item in Downloads tab,
   second claim is idempotent; logged-out users never see claim buttons.
3. Pro upsell CTAs render only where a counterpart exists and isn't owned.
4. Full checkout journey passes under Reign 8.0.0 (Stripe test + discount + free order).
5. Every surface browser-verified (Playwright MCP) at desktop AND 390px under Reign —
   before/after screenshots for the account section.
6. WPCS pre-commit clean; manifest delta updated (new REST route, hooks, functions);
   no duplicate logic.

## Out of Scope

- Elementor widget equivalents (block-only).
- Live-site deployment (separate release flow via wp-plugin-release).
- Groundhogg campaign automation on claim events (future: fire a `wbcom_essential_free_claim`
  action hook now so CRM can listen later).
