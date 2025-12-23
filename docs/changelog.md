# Changelog

All notable changes to Wbcom Essential are documented here.

---

## [4.0.2] - 2025-12-23

### Added

- **38 Gutenberg Blocks** — Complete parity with Elementor widgets
  - General blocks (27): Accordion, Advanced Tabs, Branding, Countdown, Dropdown Button, Flip Box, Heading, Login Form, Notification Area, Portfolio Grid, Post Carousel, Posts Carousel, Post Slider, Posts Revolution, Posts Ticker, Post Timeline, Pricing Table, Progress Bar, Shape, Site Logo, Slider, Smart Menu, Team Carousel, Testimonial, Testimonial Carousel, Text Rotator, Timeline
  - BuddyPress blocks (11): Dashboard Intro, Forums, Forums Activity, Group Carousel, Groups Grid, Groups Lists, Header Bar, Members Grid, Members Lists, Members Carousel, Profile Completion

- **Bundled Vendor Libraries** — WordPress.org compliant
  - Swiper v11.0.0 (local)
  - Font Awesome v5.15.4 (local)

- **Grunt Distribution Task** — `grunt dist` creates clean zip

### Changed

- **WordPress 6.9 Compatibility** — Tested and verified
- **PHP 8.2+ Compatibility** — Updated deprecated functions
- **Block Build System** — Centralized build output to `/build/blocks/`
- **Block Registration** — All blocks use `block.json` render attribute

### Fixed

- **200+ Security Escaping Issues** — All output properly escaped
  - Added `esc_html()` for text content
  - Added `esc_attr()` for HTML attributes
  - Added `esc_url()` for URLs
  - Added `phpcs:ignore` for pre-escaped WordPress functions

- **Deprecated Functions**
  - `rand()` → `wp_rand()` (Tabs.php, Accordion.php)
  - `parse_url()` → `wp_parse_url()` (class-wbcom-shared-loader.php)

- **CDN Offloading** — Removed external CDN dependencies
  - Swiper moved from jsdelivr CDN to local
  - Font Awesome moved from fontawesome CDN to local

- **Translator Comments** — Added for all printf placeholders

- **Block Render Paths** — Fixed `render.php` locations in `src/` folders

### Security

- All Elementor widget output properly escaped
- All Gutenberg block render.php properly escaped
- Input sanitization verified
- Nonce verification for forms

### Developer Notes

- Blocks now use WordPress Scripts v30.15.0
- Swiper updated to v11 (breaking change from v5)
- Font Awesome v5.15.4 bundled locally

---

## [4.0.1] - 2025-12-01

### Fixed

- Memory leak in carousel initialization
- Console warnings for deprecated block APIs
- Block category registration timing

---

## [4.0.0] - 2025-11-15

### Added

- Initial Gutenberg blocks (8 blocks)
- Block editor integration
- Server-side rendering for dynamic blocks

### Changed

- Restructured plugin architecture
- Updated Elementor minimum version to 3.0

---

## [3.5.0] - 2025-10-01

### Added

- WooCommerce widgets (5 new)
- Product carousel widget
- Customer review widget

### Fixed

- BuddyPress compatibility issues
- RTL support improvements

---

## [3.0.0] - 2025-08-01

### Added

- BuddyPress widgets (11 new)
- Members grid and carousel
- Groups display widgets
- Profile completion widget

### Changed

- Widget category reorganization
- Improved mobile responsiveness

---

## Upgrade Notes

### Upgrading to 4.0.2

1. **Backup your site** before upgrading
2. **Clear caches** after upgrade (page cache, CDN, etc.)
3. **Test carousels** — Swiper v11 has API changes from v5
4. **Check custom CSS** — Some class names may have changed

### Breaking Changes in 4.x

- Minimum PHP version: 8.0
- Minimum WordPress version: 6.0
- Minimum Elementor version: 3.0
- Swiper upgraded from v5 to v11

### Deprecations

- Legacy shortcodes will be removed in 5.0
- Old widget skins deprecated (use new styling options)

---

## Version History

| Version | Release Date | WordPress | PHP |
|---------|--------------|-----------|-----|
| 4.0.2 | 2025-12-23 | 6.0+ | 8.0+ |
| 4.0.1 | 2025-12-01 | 6.0+ | 8.0+ |
| 4.0.0 | 2025-11-15 | 6.0+ | 8.0+ |
| 3.5.0 | 2025-10-01 | 5.9+ | 7.4+ |
| 3.0.0 | 2025-08-01 | 5.9+ | 7.4+ |
