# Wbcom Essential 4.5.0 — V2 Block Rebuild

**Branch:** `4.5.0` (39 commits)
**Theme Tested:** Reign 7.9.7+
**WP Tested:** 6.9+
**PHP Required:** 8.0+

---

## What Changed

All 21 legacy Gutenberg blocks have been **deleted** and replaced with **32 new V2 blocks** built from scratch. This is a complete rewrite with shared infrastructure, competitive-audit quality (Kadence/Stackable/Spectra/Otter level), and full Reign theme compatibility.

**Important:** Legacy blocks will no longer render. Any page using old blocks needs to be updated with the new V2 blocks.

---

## Documents to Read Before Testing

| Document | Path |
|---|---|
| Plugin Architecture | `CLAUDE.md` (root) |
| V2 Rebuild Plan | `plan/GUTENBERG-V2-REBUILD.md` |
| Quality Standard | `plan/audit/QUALITY-STANDARD.md` |
| EDD Premium UX Plan | `plan/EDD-BLOCKS-PREMIUM-UX.md` |

---

## New Block Inventory (32 blocks)

### Essential - Marketing (7)
`hero` · `cta` · `pricing-table` · `testimonial-carousel` · `feature-grid` · `promo-banner` · `countdown-timer`

### Essential - Content (5)
`faq-accordion` · `tabs` · `login-form` · `portfolio-grid` · `timeline`

### Essential - Blog (3)
`post-carousel` · `posts-ticker` · `category-grid`

### Essential - Design (6)
`flip-box` · `progress-bar` · `text-rotator` · `stats-counter` · `edd-account-dashboard` · `edd-checkout-enhanced`

### Essential - BuddyPress (5)
`activity-feed` · `members-grid` · `members-carousel` · `groups-grid` · `group-carousel`

### Essential - WooCommerce (4)
`product-grid` · `product-carousel` · `customer-reviews` · `edd-order-success`

### Essential - EDD (2)
`product-catalog` · `product-filter`

---

## Blocks Removed (21 legacy)

heading, branding, site-logo, shape, slider, smart-menu, divider, social-icons, star-rating, icon-box, header-bar, mini-cart, dashboard-intro, forums, forums-activity, groups-lists, members-lists, dropdown-button, posts-revolution, post-slider, counter, cta-box, accordion, advanced-tabs, countdown, post-timeline, testimonial, team-carousel, profile-completion

---

## Shared Infrastructure

Every V2 block inherits from `plugins/gutenberg/src/shared/`:

**JS Components:** ResponsiveControl, SpacingControl, TypographyControl, BoxShadowControl, BorderRadiusControl, ColorHoverControl, DeviceVisibility

**JS Hooks:** useUniqueId, useResponsiveValue

**CSS:** design-tokens.css (20 color tokens, spacing/radius/shadow/transition scales), base.css (reset, device visibility, reduced-motion), theme-isolation.css (Reign specificity overrides)

**PHP:** WBE_CSS (per-instance scoped CSS), WBE_Schema (JSON-LD), WBE_Fonts (Google Fonts)

---

## Quality Standard (every block)

- apiVersion 3
- Responsive 3-breakpoint (desktop, tablet, mobile)
- Per-side spacing (padding + margin)
- Device visibility toggles
- Box shadow + per-corner radius
- Unique ID scoping (`.wbe-block-{uniqueId}`)
- BEM naming (`.wbe-{block}__{element}`)
- Design tokens (`--wbe-*` CSS custom properties)
- ARIA attributes + keyboard navigation
- `prefers-reduced-motion` support
- No jQuery — vanilla JS or React only
- Mobile-first CSS

---

## EDD Blocks — Detailed Overview

5 EDD blocks built for the live wbcomdesigns.com store (Reign theme). Each has its own test page set to full-width.

### 1. Product Catalog (`/edd-product-catalog/`)
- REST-powered product grid via `/wbcom/v1/products`
- Search bar with inline SVG icon
- Category, price range, and sort dropdowns
- 3-column responsive grid (1-col on mobile)
- Product cards with image hover zoom, title, excerpt, price, CTA button
- Green "Download Free" button for free products, blue "View Product" for paid
- Price range display for variable pricing ($49.00 – $199.00)
- Skeleton loading animation
- Empty state with icon
- Product Filter bar included (sticky with shadow, pill buttons, horizontal scroll on mobile)

### 2. EDD Account Dashboard (`/edd-account-dashboard/`)
- Sidebar navigation with icons (Dashboard, Subscriptions, Downloads, Licenses, Order History, Edit Profile, Sign Out)
- Active tab with blue left border indicator
- Stats cards: Total Orders, Total Spent, Active Licenses, Active Subscriptions
- Tab content loaded via REST API
- Guest state: login card with styled form
- Mobile: sidebar collapses to horizontal icon tabs

### 3. EDD Enhanced Checkout (`/edd-checkout/`)
- 4-step progress bar (Cart ✓ → Details → Payment → Complete)
- Wraps EDD native checkout form
- Trust badges: Secure Checkout, 14-Day Money Back, Priority Support
- Payment icons: Visa, Mastercard, PayPal, Stripe, Razorpay (each toggleable)
- Trustpilot social proof section: 4.7/5 rating, 87 reviews, 3 review cards
- All Trustpilot data is configurable from block sidebar (rating, count, URL, review cards)
- Live editor preview — all sections visible in block editor
- Mapped to EDD checkout page in settings

### 4. EDD Order Success (`/edd-order-success/`)
- Animated green checkmark with CSS keyframe
- "Thank you for your purchase!" header
- EDD receipt table (order #, status, payment method, date, subtotal, total, invoice link)
- Products table with download links
- "What's Next?" action cards: Download Files, View License Keys, Manage Account
- `prefers-reduced-motion` support for checkmark animation
- Mapped to EDD confirmation page in settings

### 5. Product Filter (included on catalog page)
- Pill-shaped filter buttons (All Products, Plugins, Themes)
- Sticky positioning with IntersectionObserver shadow
- Admin bar offset support
- Mobile: horizontal scroll with gradient fade masks
- Smooth scroll to filtered sections

---

## Key Bug Fixes

| Fix | Impact |
|---|---|
| `has_block()` auto-prefix bug | Shared CSS (design tokens, theme isolation) was never loading on frontend — all blocks looked unstyled |
| "Price varies" fallback | Products with variable pricing enabled but no tiers now show base price instead of "Price varies" |
| Theme isolation layer | Beats Reign's aggressive global CSS (`a`, `button`, `h1-h6`, `input`, `select`) without `!important` |
| WP 6.7 textdomain warning | Removed manual `load_plugin_textdomain()` + lazy-loaded `__()` in constructors |
| Form input reset over-ride | Theme isolation was resetting `font-size`, `background-image` on form elements at higher specificity than block CSS |
| Product catalog REST 500 | Fixed `update_post_meta_cache` → `update_meta_cache` call |

---

## EDD Settings Mapped

| EDD Setting | Page ID | URL |
|---|---|---|
| Checkout (purchase_page) | 83 | `/edd-checkout/` |
| Confirmation (confirmation_page) | 84 | `/edd-order-success/` |
| Account (purchase_history_page) | 82 | `/edd-account-dashboard/` |
| Product Catalog | 85 | `/edd-product-catalog/` |

Test mode is enabled with the Store Gateway for test purchases.

---

## Build Commands

```bash
cd wp-content/plugins/wbcom-essential

npm run build:blocks     # Build all 32 blocks → build/blocks/
npm run dev:blocks       # Dev mode with file watch
npm run clean:blocks     # Remove build/blocks/
```

---

## Testing Checklist

### Setup
- [ ] Clone `4.5.0` branch
- [ ] Activate Reign theme
- [ ] Activate wbcom-essential plugin
- [ ] Run `npm install && npm run build:blocks`
- [ ] Activate EDD plugin

### Block Editor
- [ ] Insert block → all 32 blocks appear under "Essential -" categories
- [ ] Each block shows proper editor preview (not broken/empty)
- [ ] EDD Checkout block: sidebar shows Checkout Options, Social Proof, Trustpilot Reviews, Payment Icons, Recommendations, Advanced panels
- [ ] Toggle Trustpilot off/on → editor preview updates
- [ ] Uncheck a payment icon → editor preview updates

### Frontend — Desktop (1440px)
- [ ] `/edd-product-catalog/` — product grid renders, search/filters work, buttons styled (green free, blue paid)
- [ ] `/edd-account-dashboard/` — sidebar nav + stats cards, tab switching works
- [ ] `/edd-checkout/` — progress bar, trust badges, payment icons, Trustpilot reviews all render
- [ ] `/edd-order-success/` — checkmark animation, receipt, "What's Next?" cards

### Frontend — Mobile (390px)
- [ ] Product catalog: 1-column grid, filters stack
- [ ] Account dashboard: horizontal tab icons
- [ ] Checkout: trust badges stack vertically
- [ ] Order success: cards stack to single column

### EDD Purchase Flow
- [ ] Go to product catalog → click "View Product"
- [ ] On product page → click "Purchase" / "Add to Cart"
- [ ] Checkout page loads with progress bar + cart items
- [ ] Fill details → click "Purchase"
- [ ] Order success page shows receipt with real order data

### Quality
- [ ] Query Monitor shows **zero** "Doing it Wrong" warnings
- [ ] No console JS errors on any page
- [ ] Blocks render correctly on Reign theme (no theme style bleeding)

---

## Notes for Nitin

1. **Old blocks are gone.** If any existing page used a legacy block (like `accordion`, `counter`, `cta-box`), it will show "This block contains unexpected or invalid content." Replace with the new V2 equivalent.

2. **Category names changed.** "Starter Pack" → "Essential" in block inserter.

3. **EDD blocks are conditional.** They only appear when Easy Digital Downloads plugin is active.

4. **BuddyPress blocks use REST API.** They require BuddyPress REST API to be enabled (default in BP 12+).

5. **Design tokens.** All blocks use `--wbe-*` CSS custom properties. They automatically adapt to theme colors via `--wbcom-*` fallbacks.

6. **Theme isolation.** The `theme-isolation.css` file handles Reign's aggressive global styles. This benefits all 32 blocks, not just EDD ones.
