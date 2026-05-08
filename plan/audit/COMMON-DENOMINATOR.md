# Common Denominator — What ALL 8 Plugins Share

Features present in every single plugin (Kadence, Stackable, Spectra, Otter — Free AND Pro).
If all 8 have it, we MUST have it. No exceptions.

---

## Architecture (ALL 8)

| Feature | Kadence | Stackable | Spectra | Otter |
|---------|---------|-----------|---------|-------|
| Per-instance unique ID / class | `.kt-btns{uniqueID}` | `.stk-block` | `.uagb-block-{id}` | `#wp-block-{id}` |
| CSS scoped to unique ID | Yes | Yes | Yes | Yes |
| Block category registration | `kadence-blocks` | `stackable` | `uagb` | `themeisle-blocks` |
| Abstract block base class | `Kadence_Blocks_Abstract_Block` | Via filters | `UAGB_Block` | `Base_CSS` |
| PHP render callback (dynamic render) | All blocks | Most blocks | All blocks | All blocks |
| `apiVersion: 3` in block.json | Yes | Yes | Yes | Yes |
| `$schema` in block.json | Yes | Yes | Yes | Yes |
| `textdomain` in block.json | Yes | Yes | Yes | Yes |
| `useBlockProps()` in editor | Yes | Yes | Yes | Yes |
| `get_block_wrapper_attributes()` in PHP | Yes | Yes | Yes | Yes |

**Our baseline:** Every block has unique ID, scoped CSS, PHP render, apiVersion 3.

---

## Responsive System (ALL 8)

| Feature | Kadence | Stackable | Spectra | Otter |
|---------|---------|-----------|---------|-------|
| 3 breakpoints (Desktop/Tablet/Mobile) | Yes | Yes | Yes | Yes |
| Attribute suffix pattern | `{prop}Tablet`, `{prop}Mobile` | Object keys | `{prop}Tablet`, `{prop}Mobile` | `{prop}Tablet`, `{prop}Mobile` |
| Responsive font size | Yes | Yes | Yes | Yes |
| Responsive padding | Yes | Yes | Yes | Yes |
| Responsive margin | Yes | Yes | Yes | Yes |
| Responsive alignment | Yes | Yes | Yes | Yes |
| Responsive column count | Yes | Yes | Yes | Yes |
| CSS media queries for each breakpoint | Yes | Yes | Yes | Yes |

**Breakpoint values:**
| Plugin | Tablet | Mobile |
|--------|--------|--------|
| Kadence | ~1024px | ~768px |
| Stackable | 1024px | 768px |
| Spectra | 976px | 767px |
| Otter | 960px | 768px |

**Our baseline:** `@media (max-width: 1024px)` tablet, `@media (max-width: 767px)` mobile. Suffix pattern: `{prop}Tablet`, `{prop}Mobile`.

---

## Spacing & Box Model (ALL 8)

| Feature | Kadence | Stackable | Spectra | Otter |
|---------|---------|-----------|---------|-------|
| Per-side padding (T/R/B/L) | Array `[t,r,b,l]` | Object `{top,right,bottom,left}` | Individual attrs | Object `{top,right,bottom,left}` |
| Per-side margin | Yes | Yes | Yes | Yes |
| Padding responsive (3 breakpoints) | Yes | Yes | Yes | Yes |
| Margin responsive (3 breakpoints) | Yes | Yes | Yes | Yes |
| Unit selector (px/em/rem/%) | Yes | Yes | Yes | Yes |

**Our baseline:** Object `{top, right, bottom, left}` + unit + 3 breakpoints.

---

## Typography (ALL 8)

| Feature | Kadence | Stackable | Spectra | Otter |
|---------|---------|-----------|---------|-------|
| Font family picker | Yes | Yes | Yes | Yes |
| Font size (responsive) | Yes | Yes | Yes | Yes |
| Font weight | Yes | Yes | Yes | Yes |
| Line height (responsive) | Yes | Yes | Yes | Yes |
| Letter spacing | Yes | Yes | Yes | Yes |
| Text transform | Yes | Yes | Yes | Yes |
| Google Fonts loading | Yes | Yes | Yes | Yes |
| Local font option (GDPR) | Yes | Yes | Yes | Yes |
| `font-display: swap` | Yes | Yes | Yes | Yes |

**Our baseline:** Full typography control group with responsive font-size + line-height, Google Fonts with local option.

---

## Colors (ALL 8)

| Feature | Kadence | Stackable | Spectra | Otter |
|---------|---------|-----------|---------|-------|
| Text color | Yes | Yes | Yes | Yes |
| Background color | Yes | Yes | Yes | Yes |
| Gradient support | Yes | Yes | Yes | Yes |
| Theme palette integration | Yes | Yes | Yes | Yes |
| Hover color variant | Yes | Yes | Yes | Yes |
| Link color | Yes | Yes | Yes | Yes |

**Our baseline:** Text + background + gradient + hover states + theme palette integration.

---

## Border & Shadow (ALL 8)

| Feature | Kadence | Stackable | Spectra | Otter |
|---------|---------|-----------|---------|-------|
| Border style/width/color | Yes | Yes | Yes | Yes |
| Per-corner border radius | Yes | Yes | Yes | Yes |
| Box shadow | Yes | Yes | Yes | Yes |
| Box shadow hover variant | Yes | Yes | Partial | Yes |

**Our baseline:** Border (style/width/color), per-corner radius, box shadow with hover.

---

## Editor UX (ALL 8)

| Feature | Kadence | Stackable | Spectra | Otter |
|---------|---------|-----------|---------|-------|
| InspectorControls sidebar | Yes | Yes | Yes | Yes |
| Block examples/preview | Yes | Yes | Yes | Yes |
| Placeholder state when empty | Yes | Yes | Yes | Yes |
| Block icon in inserter | Yes | Yes | Yes | Yes |
| Keywords for search | Yes | Yes | Yes | Yes |
| Organized panel sections | Yes | Yes | Yes | Yes |
| Wide/Full alignment support | Yes | Yes | Yes | Yes |

**Our baseline:** All of the above.

---

## Accessibility (ALL 8)

| Feature | Kadence | Stackable | Spectra | Otter |
|---------|---------|-----------|---------|-------|
| ARIA attributes on interactive elements | Yes | Yes | Yes | Yes |
| Keyboard navigation (Tab/Enter/Space) | Yes | Yes | Yes | Yes |
| `role` attributes (tablist, tab, tabpanel) | Yes | Yes | Yes | Yes |
| `aria-expanded` on accordion/toggle | Yes | Yes | Yes | Yes |
| `aria-selected` on tabs | Yes | Yes | Yes | Yes |
| `aria-label` on icon buttons | Yes | Yes | Yes | Yes |
| Focus visible indicators | Yes | Yes | Yes | Yes |

**Our baseline:** Full ARIA, keyboard nav, focus indicators on every interactive block.

---

## Performance (ALL 8)

| Feature | Kadence | Stackable | Spectra | Otter |
|---------|---------|-----------|---------|-------|
| No jQuery on frontend | Yes | Yes | Yes | Yes |
| Conditional asset loading (only when block used) | Yes | Yes | Yes | Yes |
| CSS deduplication (no duplicate per-instance styles) | Yes | Yes | Yes | Yes |
| Minified frontend CSS/JS | Yes | Yes | Yes | Yes |
| RTL stylesheet auto-generation | Yes | Yes | Yes | Yes |

**Our baseline:** Zero jQuery, conditional loading, deduplication, minified, RTL.

---

## Schema & SEO (ALL 4 that have Accordion)

| Feature | Kadence | Stackable | Spectra | Otter |
|---------|---------|-----------|---------|-------|
| FAQ Schema (JSON-LD) on accordion | Yes | - | Yes | Yes |
| Schema toggle attribute | `faqSchema` | - | `enableSchemaSupport` | Built into accordion |
| Output method | wp_footer JSON-LD | - | render callback | render callback |

**Our baseline:** FAQ accordion outputs JSON-LD FAQPage schema when enabled.

---

## Common Blocks (present in ALL 4 free plugins)

These blocks exist in every single competitor. We MUST have equivalents.

| Block Type | Kadence | Stackable | Spectra | Otter |
|------------|---------|-----------|---------|-------|
| **Accordion / FAQ** | accordion | accordion | faq | accordion |
| **Tabs** | tabs | tabs | (via container) | tabs |
| **Button / Button Group** | advancedbtn + singlebtn | button-group + button | buttons + buttons-child | button-group + button |
| **Heading (advanced)** | advancedheading | heading | advanced-heading | advanced-heading |
| **Icon / Icon List** | icon + icon-list | icon + icon-list | icon-list | icon-list |
| **Image (advanced)** | image | image | image | (core image) |
| **Testimonials** | testimonials | testimonial | (via container) | testimonials |
| **Counter / Count Up** | countup | count-up | counter | circle-counter |
| **Countdown Timer** | countdown | countdown | countdown | countdown |
| **Progress Bar** | progress-bar | progress-bar | (via counter) | progress-bar |
| **Info Box / Feature** | infobox | icon-box / feature | info-box | service |
| **Posts / Query** | posts | posts | post-grid | posts-grid |
| **Table of Contents** | table-of-contents | table-of-contents | table-of-content | (none) |
| **Spacer / Divider** | spacer | spacer + divider | (core spacer) | (core spacer) |
| **Container / Section** | rowlayout + column | columns + column | container | advanced-columns |
| **Pricing Table** | (none free) | pricing-box | (none) | pricing |
| **Timeline** | (none free) | timeline | content-timeline | timeline |
| **Google Maps** | googlemaps | map | google-map | google-map |
| **Video Popup** | videopopup | video-popup | (none) | (none) |
| **Form** | form + 15 fields | (none) | forms + fields | form + fields |

---

## Pro Features (present in ALL 4 pro plugins)

| Feature | Kadence Pro | Stackable Premium | Spectra Pro | Otter Pro |
|---------|------------|-------------------|-------------|-----------|
| **Dynamic Content** | ACF, Pods, WC, Events Cal | ACF, MetaBox, JetEngine, WC | Posts, Custom Fields, Site | ACF, Post Meta, User Meta, WC |
| **Conditional Display** | (none explicit) | 12 types (role, date, PHP, meta, WC) | Popup targeting (page, role, device) | 14+ types (role, date, geo, WC cart/purchase) |
| **License gating** | StellarWP Uplink | Freemius | BSF Core | ThemeIsle SDK |
| **Filter-based Pro→Free** | Yes (hooks + class extension) | Yes (`stackable.blocks-premium`) | Yes (`spectra_{block}_*` filters) | Yes (`otter_blocks_*` filters) |
| **Separate Pro CSS/JS** | Yes (dist/) | Yes (dist/*__premium_only.*) | Yes (dist/, assets/) | Yes (build/pro/) |
| **Pro-only blocks** | 15 blocks | 2 blocks | 9 blocks | 17 blocks |
| **REST API for dynamic features** | `/kbp-dynamic/v1/` | `/stackable/v3/` | `/uagpro_dc/v1/` | `/otter/v1/` |
| **Form CRM / integrations** | Mailchimp, AC, ConvertKit, Sendinblue, GetResponse | (none) | (none) | Mailchimp, Sendinblue, Stripe |
| **Evergreen countdown** | Yes (DB + cookie) | (none) | Yes (cookie) | (none) |
| **Custom CSS per block** | (none) | Yes | (none) | Yes |
| **Motion / animations** | AOS library | Entrance + scroll + transform | (via free) | (via free) |

---

## THE NON-NEGOTIABLE LIST

### Every wbcom-essential block MUST have (Day 1):

**Attributes:**
1. `uniqueId` — auto-generated, used for CSS scoping
2. `padding` / `paddingTablet` / `paddingMobile` — object `{top, right, bottom, left}`
3. `margin` / `marginTablet` / `marginMobile` — object `{top, right, bottom, left}`
4. `paddingUnit` / `marginUnit` — string (px/em/rem/%)
5. `fontSize` / `fontSizeTablet` / `fontSizeMobile` — number (where text exists)
6. `lineHeight` / `lineHeightTablet` / `lineHeightMobile` — number
7. `fontFamily` / `fontWeight` / `letterSpacing` / `textTransform`
8. `textColor` / `textColorHover`
9. `backgroundColor` / `backgroundColorHover`
10. `borderStyle` / `borderWidth` / `borderColor`
11. `borderRadius` — object `{topLeft, topRight, bottomRight, bottomLeft}`
12. `boxShadow` — object `{enabled, horizontal, vertical, blur, spread, color}`
13. `boxShadowHover` — object (same shape)
14. `hideOnDesktop` / `hideOnTablet` / `hideOnMobile` — boolean
15. `textAlign` / `textAlignTablet` / `textAlignMobile`

**CSS:**
16. Scoped to `.wbe-block-{uniqueId}`
17. Design tokens via `--wbe-*` CSS variables
18. 3 media query breakpoints in output
19. `prefers-reduced-motion` respected
20. No bare element selectors (always scoped)

**Editor:**
21. `useBlockProps()` with BEM class
22. InspectorControls: Content → Layout → Style → Advanced
23. Shared components for spacing, typography, shadow, border, visibility
24. Block example for inserter preview
25. Keywords for block search

**Frontend:**
26. `get_block_wrapper_attributes()` in render.php
27. No jQuery
28. Conditional asset loading
29. ARIA attributes on interactive elements
30. Keyboard navigation (Tab, Enter, Space, Arrows)
31. Focus indicators
32. RTL support (auto via wp-scripts)

**SEO:**
33. FAQ/Accordion: JSON-LD FAQPage schema when enabled

### Every wbcom-essential PRO feature MUST have:
34. Filter hook for Pro→Free extension
35. License check before activation
36. Separate CSS/JS bundle
37. REST API endpoint (for dynamic features)
38. Never fork free block code — always extend via filters
