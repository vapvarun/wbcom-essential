# UX Audit — Remaining Issues

**Audit Date:** 2026-04-08
**Fixed:** 23 of 94 issues (commits a153934, 3efc0e2, 1f5faf0, 2e08814)
**Remaining:** 71 issues

---

## Critical (2 remaining)

### 1. ResponsiveControl Not Wired Into Any Block
- **Impact:** All 32 blocks — users can only set desktop padding/margin, tablet/mobile values unreachable
- **Root cause:** `plugins/gutenberg/src/shared/components/ResponsiveControl.js` exists but is never imported by any block's edit.js
- **Fix:** Wrap `SpacingControl` inside `ResponsiveControl` in every block's Advanced panel. Wire `paddingTablet`, `paddingMobile`, `marginTablet`, `marginMobile` attributes. The CSS generation (`css.js` + `WBE_CSS`) already handles responsive media queries — only the editor UI is missing.
- **Scope:** All 32 blocks' `edit.js` files
- **Effort:** Large — each block needs ~15 lines changed in edit.js

### 2. Activity Feed Duplicate Stylesheets
- **File:** `plugins/gutenberg/src/blocks/activity-feed/style.scss` AND `style.css` both exist
- **Issue:** Different class names (`.wbe-af__*` vs `.wbe-activity-feed__*`). Only one should ship.
- **Fix:** Verify which file the build uses (check block.json `style` field), delete the other
- **Effort:** Small

---

## High (8 remaining)

### 3. TypographyControl Not Used by Any Block
- **File:** `plugins/gutenberg/src/shared/components/TypographyControl.js`
- **Impact:** No block has font size/family/weight/line-height controls. Premium block libraries (Kadence, Stackable) all have this.
- **Fix:** Add `TypographyControl` to Style panel of every block with headings/text (14+ blocks)
- **Scope:** All text-bearing blocks' edit.js + new attributes in block.json
- **Effort:** Large

### 4. ColorHoverControl Not Used by Any Block
- **File:** `plugins/gutenberg/src/shared/components/ColorHoverControl.js`
- **Impact:** No block allows setting hover colors in the editor. CTA has `buttonBgHover` but uses plain ColorPalette.
- **Fix:** Add to Hero, CTA, Pricing Table, Promo Banner, Flip Box button colors
- **Effort:** Medium

### 5. Countdown Timer English Labels Baked Into Save
- **File:** `plugins/gutenberg/src/blocks/countdown-timer/save.js` (lines 77-78)
- **Issue:** "Days", "Hours", "Mins", "Secs" are hardcoded English in the static save output. Non-English sites display English permanently.
- **Fix:** Use `import { __ } from '@wordpress/i18n'` for each label in save.js
- **Effort:** Small

### 6. Post Carousel Swiper A11y Strings Hardcoded
- **File:** `plugins/gutenberg/src/blocks/post-carousel/view.js` (lines 56-57)
- **Issue:** `prevSlideMessage: 'Previous post'` and `nextSlideMessage: 'Next post'` are hardcoded English
- **Fix:** Pass via data attribute from render.php, same pattern as product-catalog i18n fix
- **Effort:** Small

### 7. Members/Groups Grid No Pagination
- **Files:** `members-grid/view.js`, `groups-grid/view.js`
- **Issue:** Fetches flat `per_page` set with no load-more. Large communities get all members in one request.
- **Fix:** Add load-more button (same pattern as activity-feed)
- **Effort:** Medium

### 8. Settings Tab Can Render Empty
- **File:** `admin/class-wbcom-essential-widget-showcase.php` (lines 261-270)
- **Issue:** Settings tab shows empty form if settings classes aren't loaded
- **Fix:** Add conditional — if no settings sections registered, show helpful message
- **Effort:** Small

### 9. Editor Responsive Preview Buttons Don't Change Sidebar
- **Same root cause as #1** — ResponsiveControl is not integrated. Fixing #1 fixes this.

### 10. Inconsistent Color Picker (7 use ColorPalette, 20 use ColorPicker)
- **Impact:** Two different UX patterns for the same control across blocks
- **Fix:** Standardize all 32 blocks on `ColorPalette` (matches WP core pattern)
- **Effort:** Medium — 20 blocks need ColorPicker→ColorPalette swap

---

## Medium (30 remaining)

### Editor/Admin
- [ ] 3 shared components shipped but unused (dead code in bundle) — remove or integrate
- [ ] Inconsistent sidebar panel structure (2 patterns across 32 blocks)
- [ ] 4 blocks missing `example` preview in inserter (product-catalog, product-filter, edd-account-dashboard, edd-checkout-enhanced)
- [ ] Admin page block count breakdown incorrect (17/7/3 should be 16/6/5)
- [ ] 20 blocks use `<p><strong>` for color labels instead of `<BaseControl>` (a11y issue)

### EDD Blocks
- [ ] Profile form: no success toast, no inline validation after save
- [ ] Password mismatch: no client-side validation
- [ ] Checkout trust badge "14-Day Money Back" hardcoded — needs block attribute
- [ ] Razorpay icon shown even when gateway not active — detect via `edd_get_enabled_payment_gateways()`
- [ ] Trustpilot reviews section is manual, not API-connected — add disclaimer or remove branding
- [ ] Tab content cached in JS, never invalidated — add TTL or bust on navigation
- [ ] CSS `--wbe-*` tokens missing hardcoded fallback values
- [ ] Dashboard tab shows blank space when user has no completed orders (missing empty state for that section)
- [ ] License "Upgrade" links point to EDD legacy page instead of custom dashboard
- [ ] Order receipt links point to EDD default page instead of custom Order Success block
- [ ] Product catalog: no "Clear Filters" button in empty state
- [ ] Product catalog: no `aria-live` region for filter results
- [ ] Product catalog: skeleton loader count always matches perPage (jarring if only 3 products)

### Static Blocks
- [ ] Mobile breakpoint inconsistency: 7 blocks use 767px, 25 use 640px — standardize
- [ ] Flip Box self-referential CSS variable breaks tablet height
- [ ] Promo Banner overlay has no opacity slider (unlike Hero)
- [ ] Portfolio Grid filter uses incorrect `role="tablist"` ARIA

### BP/Blog Blocks
- [ ] Activity feed: no distinct error UI on REST API failure (shows empty state instead)
- [ ] Members/Groups carousel: Swiper not found = silent failure (no fallback)
- [ ] Members/Groups: avatar images have empty `alt=""` — should use member/group name
- [ ] Groups Grid: extra REST request for user membership (per_page=100 truncation)
- [ ] Stats Counter: `parseInt` truncates decimals
- [ ] `color-mix()` CSS used without fallback in 4 blocks (category-grid, post-carousel, posts-ticker, portfolio-grid)
- [ ] Countdown timer: shows "00:00:00:00" before JS hydrates

---

## Low (31 remaining)

- [ ] Two empty block categories registered (essential-header, wbcom-essential)
- [ ] Dashicons on admin page instead of modern icons
- [ ] Import path inconsistency (4 blocks use `../../../src/shared/`)
- [ ] Unused ToggleControl import in Hero edit.js
- [ ] Tabs: hidden horizontal scrollbar with no scroll indicator on mobile
- [ ] FAQ Accordion: Unicode icon characters may render inconsistently cross-platform
- [ ] 9 inline `<style>` tags per page from generateBlockCSS (performance)
- [ ] Promo Banner mobile image fixed at 180px height
- [ ] Tabs `outline: none` base fails in browsers without `:focus-visible`
- [ ] Activity Feed `decodeEntities` creates unused element
- [ ] Members Carousel avatar size not driven by CSS variable
- [ ] Group Carousel duplicate visibility utility CSS (already fixed in shared, may still be in SCSS)
- [ ] Login Form: no visible error state for failed login (WP redirects to wp-login.php)
- [ ] Text Rotator: `white-space: nowrap` causes horizontal overflow on long text
- [ ] Stats Counter: separator line logic breaks on tablet when columns != 2
- [ ] Countdown Timer: React key warning in save.js
- [ ] All BP blocks: editor preview uses `REST_REQUEST` detection (fragile)
- [ ] Product Catalog: card link not full-card clickable (only image + title)
- [ ] Product Catalog: Load More button missing `:focus-visible` style
- [ ] Product Catalog: product card image placeholder missing accessible name
- [ ] Product Catalog: REST endpoint has no rate limiting
- [ ] Product Filter: no "All" button by default if user forgets to add one
- [ ] Product Filter: sticky positioning depends on theme-specific CSS selectors
- [ ] Product Filter: hidden scrollbar on mobile with no scroll indicator
- [ ] Product Filter: first button always hardcoded active (ignores URL state)
- [ ] EDD Checkout: form styles override all EDD inputs (may break payment gateway elements)
- [ ] EDD Checkout: reviews social proof queries not cached
- [ ] EDD Order Success: no handling of missing payment_key (shows confusing error)
- [ ] EDD Order Success: "What's Next" cards show Downloads/Licenses for all purchases (even services)
- [ ] EDD Dashboard: "Times Billed" shows "3 / Until cancelled" (awkward phrasing)
- [ ] EDD Dashboard: license count includes all statuses but label says "Active Licenses"

---

## Recommended Priority Order for Next Session

1. **ResponsiveControl wiring** (#1) — biggest UX gap, infrastructure already exists
2. **TypographyControl integration** (#3) — key differentiator vs competitors
3. **Countdown Timer i18n** (#5) + **Post Carousel a11y strings** (#6) — quick wins
4. **Color picker standardization** (#10) — consistency pass
5. **Members/Groups pagination** (#7) — functional gap for large communities
