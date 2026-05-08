# Competitive Block Plugin Audit — Index

Audited 2026-04-04. All 4 top Gutenberg block plugins, Free + Pro versions.

## Summary Documents
- [COMPETITIVE-SUMMARY.md](COMPETITIVE-SUMMARY.md) — Side-by-side comparison: block counts, pro features, architecture patterns, pricing models
- [QUALITY-STANDARD.md](QUALITY-STANDARD.md) — Mandatory quality standard for every wbcom-essential block (derived from all 4 audits)

## Individual Plugin Audits

### Kadence Blocks (63 free + 15 pro = 78 blocks)
- [kadence-blocks-free.md](kadence-blocks-free.md) — 63 blocks, CSS engine (Kadence_Blocks_CSS), design tokens (--global-kb-*), abstract block class, FAQ schema, responsive visibility, AOS animations, form system (15 field types), header builder
- [kadence-blocks-pro.md](kadence-blocks-pro.md) — Query loop with 10 filter types + DB indexing, dynamic content (ACF/Pods/WooCommerce/Events Calendar), form CRM integrations (Mailchimp/ActiveCampaign/ConvertKit/Sendinblue/GetResponse), evergreen countdown, repeater block, portfolio grid, slider (Splide.js), modal, user info, conditional field logic

### Stackable (46 free + 2 premium = 48 blocks)
- [stackable-free.md](stackable-free.md) — 46 blocks, InnerBlocks composition (stk-required-blocks/stk-substitution-blocks), global design tokens, dynamic breakpoints (customizable), CSS optimization (cached in post meta), CLS prevention, providesContext system, --stk-* CSS variables, zero jQuery
- [stackable-premium.md](stackable-premium.md) — 2 extra blocks (Load More, Pagination), motion effects (entrance + scroll + transform), conditional display (12 types: role/date/PHP/meta/WooCommerce/query string), dynamic content (ACF/MetaBox/JetEngine/WooCommerce), custom CSS per block, editor role management, custom icon library

### Spectra / UAG (35+ free + 9 pro = 44+ blocks)
- [spectra-free.md](spectra-free.md) — 35+ blocks, per-post CSS file generation (uploads/uag-plugin/), Global Block Styles (GBS) system, UAGCopyPaste meta, block positioning/sticky, responsive breakpoints (976/767), FAQ + HowTo schema, Swiper/Slick/Isotope libraries, template library (Astra Block Templates)
- [spectra-pro.md](spectra-pro.md) — Login/Registration forms (rate-limited), Instagram Feed, Loop Builder (AJAX queries, FSE compatible), dynamic content extension (REST API), popup builder with conditional display, evergreen countdown (cookie-based), modal enhancements (exit intent/delayed/cookies), slider hash navigation, freemium block extension pattern via filters

### Otter Blocks (47 free + 17 pro = 64 blocks)
- [otter-blocks-free.md](otter-blocks-free.md) — 47 blocks + 5 Atomic Wind primitives, CSS_Utility pattern matcher, per-block CSS classes, box shadow object, isSynced global defaults, block conditions (otterConditions), dynamic content tags (<o-dynamic>), 60+ patterns in 12 categories, form system (Mailchimp/Sendinblue/Stripe), Lottie animations, popup block
- [otter-blocks-pro.md](otter-blocks-pro.md) — 17 blocks (11 WooCommerce product blocks, form file/hidden/Stripe fields, business hours, review comparison, modal), advanced conditions (14+ types including WooCommerce cart/purchase/spend, geo-targeting, LearnDash), form submission tracking (CPT), webhooks, WooCommerce product page builder, live search, ACF integration

## Key Patterns to Replicate

### Architecture (how Pro extends Free)
| Plugin | Pattern | Implementation |
|--------|---------|---------------|
| Kadence | Class extension + REST API | Pro blocks extend abstract class, dynamic content via `/kbp-dynamic/v1/` |
| Stackable | Filter injection | `stackable.blocks-premium` filter, Freemius gating |
| Spectra | Block config filters | `spectra_{block}_attributes/styling/frontend_dynamic_js` |
| Otter | Hook-based modules | `otter_blocks_register_blocks`, `otter_blocks_evaluate_condition` |

### CSS Generation
| Plugin | Strategy |
|--------|----------|
| Kadence | PHP Kadence_Blocks_CSS singleton, set_selector/add_property, set_media_state() for breakpoints |
| Stackable | CSS cached in post_meta on save, loaded in head to prevent CLS |
| Spectra | Per-post CSS files in wp-uploads, fallback to inline |
| Otter | CSS_Utility pattern matcher, per-block CSS classes, minified via tubalmartin/CssMin |

### Responsive System
| Plugin | Breakpoints | Attribute Pattern |
|--------|------------|-------------------|
| Kadence | Desktop (default), Tablet, Mobile | `prop`, `tabletProp` or `propTablet`, `mobileProp` or `propMobile` |
| Stackable | 1024px / 768px (customizable) | Object: `{ desktop, tablet, mobile, desktopHover, tabletHover, mobileHover }` |
| Spectra | 976px / 767px | `prop`, `propTablet`, `propMobile` |
| Otter | 960px / 768px | `prop`, `propTablet`, `propMobile` |

### Premium Features (what to gate behind wbcom-essential Pro)
1. **Dynamic Content** — all 4 Pro plugins have it (ACF, meta fields, WooCommerce data)
2. **Conditional Display** — Stackable (12 types), Otter (14+ types), Spectra (popup targeting)
3. **Motion Effects** — Stackable (entrance + scroll + transform)
4. **Evergreen Countdown** — Kadence (DB-tracked), Spectra (cookie-based)
5. **Form Integrations** — Kadence (5 CRM providers), Otter (Stripe + webhooks + submission tracking)
6. **Query Builder** — Kadence (faceted + indexed), Spectra (Loop Builder + AJAX)
7. **WooCommerce Blocks** — Otter (11 product blocks), Kadence (product carousel)
