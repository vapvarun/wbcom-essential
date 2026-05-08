# EDD Blocks — Premium UX Redesign Plan

**Date:** 2026-04-05
**Branch:** `4.5.0`
**Theme:** Reign (vapvarun/reign-theme — same as live store wbcomdesigns.com)
**Status:** In progress — design tokens loading fixed, theme isolation WIP

---

## Root Problem

Reign theme's global CSS aggressively styles `a`, `button`, `h1-h6`, `select`, `input` elements. When WordPress inlines block CSS (which it does for performance), our block styles lose specificity against Reign's global rules.

**Result:** Buttons render as text links, headings get theme colors, inputs lose custom styling.

---

## Phase 0: Theme Isolation Layer (do first)

Create `plugins/gutenberg/src/shared/theme-isolation.css` — a CSS reset scoped to all wbcom-essential blocks that neutralizes aggressive theme styles.

```css
/* Reset theme bleeding for all wbcom-essential blocks */
[class*="wp-block-wbcom-essential"] a {
    color: inherit;
    text-decoration: none;
}
[class*="wp-block-wbcom-essential"] h1,
[class*="wp-block-wbcom-essential"] h2,
[class*="wp-block-wbcom-essential"] h3 {
    color: inherit;
    margin: 0;
}
[class*="wp-block-wbcom-essential"] select,
[class*="wp-block-wbcom-essential"] input[type="text"],
[class*="wp-block-wbcom-essential"] input[type="search"] {
    appearance: none;
    -webkit-appearance: none;
}
[class*="wp-block-wbcom-essential"] ul,
[class*="wp-block-wbcom-essential"] ol {
    list-style: none;
    margin: 0;
    padding: 0;
}
```

Enqueue alongside design-tokens.css and base.css in `gutenberg.php`.

---

## Phase 1: Product Catalog — Premium UX

**Current state:** CSS is correct but theme overrides buttons. Cards lack visual separation.

**Target:** Notion/Gumroad-quality product grid.

### Fixes needed:
1. **Theme-proof buttons** — Use the isolation layer + scoped selectors
2. **Card separation** — Gap between cards (currently touching), visible card borders + shadow
3. **Image aspect ratio** — 16:10 with hover zoom (CSS ready, just not rendering due to missing tokens)
4. **Free badge** — Green pill badge on free products
5. **Price display** — Fix "Price varies" to show actual range ($69 – $199)
6. **Search bar** — Search icon visible (SVG in background-image, needs token fix)
7. **Filter dropdowns** — Styled with custom chevron, focus ring
8. **Load More button** — Filled on hover, outline default
9. **Mobile** — Stack to 1 column at 480px, 2 at 768px

### Price "varies" fix:
The REST endpoint `edd-product-catalog-rest.php` line 238 — `wp_list_pluck($prices, 'amount')` returns strings. Need to cast to float:
```php
$amounts = array_map('floatval', array_filter($amounts, 'is_numeric'));
```

---

## Phase 2: EDD Account Dashboard — Premium UX

**Current state:** Sidebar + tabs work but styling is basic.

### Improvements:
1. Sidebar nav — active tab highlight with left border accent
2. Stats cards — icon + number + label in a grid
3. Tab content — card-based layout with proper spacing
4. Downloads list — product image thumbnails + download button
5. License keys — copy-to-clipboard buttons
6. Profile form — modern form fields with focus states
7. Mobile — sidebar collapses to horizontal tabs

---

## Phase 3: EDD Checkout Enhanced — Premium UX

**Current state:** Progress bar + trust badges render.

### Improvements:
1. Progress bar — step numbers with check icons for completed
2. Trust badges — icon + title + description in a clean row
3. Payment logos — proper sizing and alignment
4. Cart items — if present, show product thumbnails
5. Total section — clear visual hierarchy
6. Mobile — stack trust badges vertically

---

## Phase 4: EDD Order Success — Premium UX

**Current state:** Green check + next steps cards render.

### Improvements:
1. Success header — larger check animation on load
2. Receipt table — clean bordered table with alternating rows
3. Next step cards — hover effect, icon accent color
4. License key display — monospace font, copy button
5. Mobile — stack next step cards

---

## Phase 5: Product Filter — Premium UX

**Current state:** Filter tabs render but basic.

### Improvements:
1. Active tab — filled accent background, white text
2. Inactive tabs — ghost style with hover effect
3. Sticky behavior — shadow when stuck
4. Smooth scroll — to target sections
5. Mobile — horizontal scroll with overflow fade

---

## Quality Checklist (each block)

```
[ ] Renders correctly on Reign theme (live store theme)
[ ] No theme style bleeding (links, headings, buttons)
[ ] Card hover effects (shadow + subtle lift)
[ ] Image hover zoom (scale 1.06)
[ ] Buttons are filled, not text links
[ ] Focus states visible (outline ring)
[ ] prefers-reduced-motion respected
[ ] Mobile responsive at 480px, 768px, 1024px
[ ] Empty states with icon
[ ] Loading skeletons (shimmer animation)
[ ] Design tokens used (no hardcoded colors)
[ ] BEM naming consistent
```

---

## Test Page

Post ID 76 at `http://local-test.local/76-2/` — has product-catalog block.
Page ID 80 at `http://local-test.local/edd-blocks-test/` — has all 5 EDD blocks.

## Demo Data

8 EDD products (IDs 68-75) with images, categories, variable pricing, excerpts.
5 categories: WordPress Plugins, BuddyPress Addons, Theme Addons, WooCommerce Tools, Free Plugins.
