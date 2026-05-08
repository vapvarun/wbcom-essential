# Competitive Block Plugin Audit — Complete Reference

Audited 2026-04-04. Free + Pro versions of all 4 plugins.

---

## Block Count Summary

| Plugin | Free Blocks | Pro-Only Blocks | Total |
|--------|------------|-----------------|-------|
| Kadence Blocks | 63 | 15 (+ 10 query filters) | 88 |
| Stackable | 46 | 2 | 48 |
| Spectra (UAG) | 35+ | 9 | 44+ |
| Otter Blocks | 47 | 17 | 64 |

---

## Pro-Only Blocks by Plugin

### Kadence Pro (15 blocks)
| Block | Type | Notes |
|-------|------|-------|
| Query Loop | Dynamic | Faceted filtering with database indexing |
| 10 Query Filters | Dynamic | Checkbox, Date, Range, Rating, Search, Sort, WooAttribute, Reset, Buttons, General |
| Post Grid / Carousel | Dynamic | Masonry, infinite scroll, related posts |
| Product Carousel | Dynamic | WooCommerce product queries |
| Portfolio Grid | Dynamic | Lightbox, hover overlays |
| Slider / Slide | Interactive | Splide.js, fade transitions |
| Repeater + Template | Dynamic | Duplicate blocks with dynamic data |
| Dynamic HTML | Dynamic | Shortcode + custom field rendering |
| Dynamic List | Dynamic | Post/field list output |
| Image Overlay | Static | Hover animations, AOS |
| Split Content | Static | Two-column with drag resize |
| Modal | Interactive | Trigger button + overlay |
| User Info | Dynamic | Logged-in user profile display |

### Stackable Premium (2 blocks)
| Block | Type | Notes |
|-------|------|-------|
| Load More | Interactive | For Posts block pagination |
| Pagination | Interactive | For Posts + core/query |

### Spectra Pro (9 blocks)
| Block | Type | Notes |
|-------|------|-------|
| Login Form | Dynamic | reCAPTCHA, redirect, AJAX |
| Registration Form | Dynamic | Rate limiting, email templates, auto-login |
| Instagram Feed | Dynamic | Carousel + grid, caching |
| Loop Builder | Dynamic | AJAX queries, FSE compatible |
| Loop Wrapper | Dynamic | Template container |
| Loop Category Filter | Interactive | Taxonomy filtering |
| Loop Search | Interactive | Real-time search |
| Loop Sort | Interactive | Sort controls |
| Loop Reset | Interactive | Clear filters |

### Otter Pro (17 blocks)
| Block | Type | Notes |
|-------|------|-------|
| 11 WooCommerce Product Blocks | Dynamic | Add to Cart, Images, Price, Title, Short Desc, Rating, Tabs, Stock, Meta, Related, Upsells |
| Form File Upload | Interactive | Multi-file, type restrictions |
| Form Hidden Field | Static | Tracking/webhooks |
| Form Stripe Field | Interactive | Stripe payment in forms |
| Business Hours + Item | Static | Schedule display |
| Review Comparison | Static | Side-by-side product comparison |
| Modal | Interactive | Exit intent, recurring close, scroll trigger |

---

## Pro Feature Comparison (What Premium Unlocks)

### 1. Dynamic Content System

| Feature | Kadence Pro | Stackable Premium | Spectra Pro | Otter Pro |
|---------|------------|-------------------|-------------|-----------|
| Post Meta | Yes | Yes | Yes | Yes |
| ACF Fields | Yes | Yes | Yes (custom-fields) | Yes |
| WooCommerce Product Data | Yes | Yes (extensive) | Via Loop Builder | Yes |
| User/Author Data | Yes | Yes | Yes (site source) | Yes |
| Pods Framework | Yes | - | - | - |
| MetaBox | - | Yes | - | - |
| JetEngine | - | Yes | - | - |
| The Events Calendar | Yes | - | - | - |
| REST API | Yes (`/kbp-dynamic/v1/`) | Yes (`/stackable/v3/`) | Yes (`/uagpro_dc/v1/`) | Yes (filters) |

### 2. Conditional Display / Visibility

| Condition Type | Kadence Pro | Stackable Premium | Spectra Pro | Otter Pro |
|---------------|------------|-------------------|-------------|-----------|
| User Role | - | Yes | Yes (popup) | Yes |
| Login Status | - | Yes | Yes (popup) | Yes |
| Date/Time Range | - | Yes | Yes (popup) | Yes |
| Recurring Day/Time | - | - | - | Yes |
| Post Meta | - | Yes | - | Yes |
| Custom PHP | - | Yes | - | - |
| Query String | - | Yes | - | Yes |
| Cookie | - | - | - | Yes |
| Country/Geo | - | - | - | Yes (IPHub) |
| WooCommerce Cart | - | Yes | - | Yes |
| WooCommerce Purchase | - | - | - | Yes |
| WooCommerce Total Spent | - | - | - | Yes |
| Post Type | - | Yes | Yes | Yes |
| Post Taxonomy | - | Yes | - | - |
| LearnDash Course | - | - | - | Yes |

### 3. Form System & Integrations

| Feature | Kadence Pro | Stackable | Spectra Pro | Otter Pro |
|---------|------------|-----------|-------------|-----------|
| Conditional Fields | Yes (JS logic) | - | - | - |
| Form Submissions DB | Yes (BerlinDB) | - | - | Yes (CPT) |
| Form Analytics | Yes | - | - | - |
| Mailchimp | Yes | - | - | Yes |
| ActiveCampaign | Yes | - | - | - |
| ConvertKit | Yes | - | - | - |
| Sendinblue | Yes | - | - | Yes |
| GetResponse | Yes | - | - | - |
| Stripe Payments | - | - | - | Yes |
| File Upload | - | - | - | Yes |
| Webhook | - | - | - | Yes |
| Login Form | - | - | Yes | - |
| Registration Form | - | - | Yes (rate limited) | - |
| reCAPTCHA | Yes | - | Yes (v2/v3) | Yes |

### 4. Animation & Motion Effects

| Feature | Kadence Pro | Stackable Premium | Spectra Pro | Otter Pro |
|---------|------------|-------------------|-------------|-----------|
| AOS (Animate On Scroll) | Yes | - | - | - |
| Entrance Animations | - | Yes (CSS properties) | - | - |
| Scroll Animations | - | Yes | - | - |
| Transform/Transition | - | Yes (per device) | - | - |
| Parallax | - | - | - | - |

### 5. Query / Loop Builder

| Feature | Kadence Pro | Spectra Pro |
|---------|------------|-------------|
| Faceted Filtering | Yes (10 filter types) | Yes (category, search, sort) |
| Database Indexing | Yes (kbp_query_index table) | No |
| AJAX Pagination | Yes | Yes |
| WooCommerce Queries | Yes (attributes, ratings) | Yes (product archives) |
| FSE Compatibility | - | Yes |

### 6. Countdown Enhancements

| Feature | Kadence Pro | Spectra Pro |
|---------|------------|-------------|
| Evergreen (per-user) | Yes (cookie + DB) | Yes (cookie-based) |
| Campaign ID | Yes | Yes |
| Reset Days | Yes | Yes |
| End Action: Hide | Yes | Yes |
| End Action: Redirect | Yes | Yes |
| End Action: Content | - | Yes |
| DB Tracking | Yes (kbp_countdown_entries) | No (cookie only) |

### 7. Other Pro Features

| Feature | Plugin |
|---------|--------|
| Custom CSS per block | Stackable, Otter |
| Editor role management (content-only mode) | Stackable |
| Custom icon library | Stackable |
| Live search (core/search enhancement) | Otter |
| WooCommerce product page builder | Otter |
| Instagram Feed | Spectra |
| Review comparison table | Otter |
| Portfolio grid with lightbox | Kadence |

---

## Architecture Patterns (How Pro Extends Free)

### Kadence — Class Extension + REST API
- Pro blocks extend `Kadence_Blocks_Pro_Abstract_Block`
- Free block enhancements via separate classes (not inheritance)
- Dynamic content via dedicated REST controller (`/kbp-dynamic/v1/`)
- Custom DB tables via BerlinDB/StellarWP
- License: StellarWP Uplink

### Stackable — Filter Injection
- Premium code in `pro__premium_only/` directory
- Gated by `sugb_fs()->is__premium_only()` (Freemius)
- Filter hooks: `stackable.blocks-premium`, `stackable_conditional_display/*`
- Separate CSS/JS bundles loaded conditionally
- Effects JS loaded only when animation CSS properties detected

### Spectra — Block Config Filters
- Pro configs in `/blocks-config/freemium-blocks/*/block.php`
- Filter naming: `spectra_{block}_attributes`, `spectra_{block}_styling`, `spectra_{block}_frontend_dynamic_js`
- Extensions lazy-loaded via `/core/extensions-manager.php`
- License: BSF Core framework

### Otter — Hook-Based Module Loading
- Singleton `Main` class orchestrates all modules
- Filter hooks: `otter_blocks_register_blocks`, `otter_blocks_evaluate_condition`, `otter_blocks_evaluate_dynamic_content_*`
- Every feature checks `License::has_active_license()` before activating
- Pro blocks have dedicated render classes + CSS classes
- License: ThemeIsle SDK with Neve Pro inheritance

---

## Pricing Models

| Plugin | Free | Starter | Pro/Business | Agency |
|--------|------|---------|-------------|--------|
| Kadence | All 63 blocks | - | StellarWP Uplink | - |
| Stackable | 44 blocks | Plan 1 | Plan 2 | Plan 3 |
| Spectra | 35+ blocks | - | BSF License | - |
| Otter | 47 blocks | Plan 1 (single) | Plan 2 (multi) | Plan 3 (agency) |

---

## Key Takeaways for WBcom Essential

### Free Tier Must-Haves (from all 4 free plugins)
1. Full responsive system (3 breakpoints)
2. Per-side spacing + per-corner radius
3. Hover states on interactive elements
4. Device visibility toggles
5. Design token system (CSS variables)
6. FAQ Schema (JSON-LD)
7. Box shadow controls
8. 40-60+ blocks covering all common patterns

### Premium Tier Opportunities
1. **Dynamic Content** — ACF/meta field binding (all 4 Pro plugins have this)
2. **Conditional Display** — Role/date/WooCommerce conditions
3. **Query Builder / Loop** — Faceted filtering + AJAX pagination
4. **Form Integrations** — Mailchimp, Stripe, submission tracking
5. **Evergreen Countdown** — Per-user cookie-based timers
6. **Motion Effects** — Entrance + scroll animations
7. **WooCommerce Blocks** — Product-specific blocks
8. **Login/Register Forms** — User auth blocks

### Architecture to Follow
- Filter-based Pro → Free integration (don't fork, extend)
- Separate CSS/JS bundles for Pro features
- License check before every Pro feature activation
- Custom DB tables only for high-value features (form submissions, query indexing)
- REST API for dynamic content rendering
