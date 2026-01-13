# Changelog

All notable changes to WBcom Essential are documented here.

---

## [4.0.2] - 2025-01-13

### Added

- **"Use Theme Colors" Toggle** - All 45 Gutenberg blocks now support automatic theme color inheritance
  - Enable via Color Settings panel in block sidebar
  - Colors map to theme CSS custom properties (--wbcom-color-primary, etc.)
  - Consistent with Elementor widget global color behavior

- **7 Bonus Gutenberg Blocks** - New blocks without Elementor widget equivalents:
  - Counter - Animated number counter with prefix/suffix
  - CTA Box - Call-to-action box with button
  - Divider - Decorative divider with multiple styles
  - Icon Box - Icon with title and description
  - Mini Cart - WooCommerce mini shopping cart
  - Social Icons - Social media icon links
  - Star Rating - Star rating display

- **Theme Color CSS Variables** - New stylesheet for theme integration:
  - `--wbcom-color-primary` - Primary accent color
  - `--wbcom-color-secondary` - Secondary accent color
  - `--wbcom-color-base` - Background color
  - `--wbcom-color-contrast` - Text color
  - See `plugins/gutenberg/assets/css/theme-colors.css` for full list

### Fixed

- **Swiper Carousel Initialization** - Fixed initialization issues across all carousel blocks
- **Profile Completion Block** - Resolved compatibility issues with BuddyPress
- **Block Category Registration** - Proper timing for category registration
- **RTL Stylesheets** - All blocks now generate correct RTL styles

### Changed

- **Documentation Overhaul** - Complete rewrite of CLAUDE.md with accurate block mapping
- **Block Build Output** - Centralized to `/build/blocks/` directory

### Developer Notes

- All 45 blocks implement the `useThemeColors` attribute pattern
- Theme colors use CSS custom properties with fallbacks
- Blocks add `use-theme-colors` class when toggle is enabled

---

## [4.0.1] - 2025-12-01

### Fixed

- Memory optimization in carousel initialization
- Console warnings for deprecated block APIs
- Block category registration timing

---

## [4.0.0] - 2025-11-15

### Added

- **45 Gutenberg Blocks** - Complete parity with Elementor widgets
  - General blocks (26): Accordion, Advanced Tabs, Branding, Countdown, Counter, CTA Box, Divider, Dropdown Button, Flip Box, Heading, Icon Box, Login Form, Portfolio Grid, Post Carousel, Posts Carousel, Post Slider, Posts Revolution, Posts Ticker, Post Timeline, Pricing Table, Progress Bar, Shape, Site Logo, Slider, Smart Menu, Social Icons, Star Rating, Team Carousel, Testimonial, Testimonial Carousel, Text Rotator, Timeline
  - BuddyPress blocks (11): Dashboard Intro, Forums, Forums Activity, Group Carousel, Groups Grid, Groups Lists, Header Bar, Members Grid, Members Lists, Members Carousel, Profile Completion
  - WooCommerce blocks (2): Product Grid, Mini Cart

- **Bundled Vendor Libraries** - WordPress.org compliant
  - Swiper v11.0.0 (local)
  - Font Awesome v5.15.4 (local)

- **Grunt Distribution Task** - `grunt dist` creates clean zip

### Changed

- **Minimum Requirements**:
  - PHP 8.0+ (was 7.4)
  - WordPress 6.0+ (was 5.9)
  - Elementor 3.0+ (was 2.9)

- **Block Build System** - Centralized build output to `/build/blocks/`
- **Block Registration** - All blocks use `block.json` render attribute

### Fixed

- **200+ Security Escaping Issues** - All output properly escaped
- **Deprecated Functions** - `rand()` to `wp_rand()`, `parse_url()` to `wp_parse_url()`
- **CDN Dependencies** - Removed external CDN, all assets bundled locally

### Security

- All Elementor widget output properly escaped
- All Gutenberg block render.php properly escaped
- Input sanitization verified
- Nonce verification for forms

---

## [3.9.4] - 2025-10-15

### Added

- Member and group carousel arrows in logout mode

### Changed

- Login widget user experience improvements

### Fixed

- Plugin conflicts with Elementor Pro

---

## [3.9.3] - 2025-10-01

### Fixed

- Elementor Schemes to Globals migration

---

## [3.9.2] - 2025-09-15

### Fixed

- Fatal error with Elementor compatibility

---

## [3.9.1] - 2025-09-01

### Added

- Updated icons library
- Slider dots and arrow icons

### Fixed

- Icon size in posts carousel widget

---

## [3.9.0] - 2025-08-15

### Added

- FAQ schema support for Accordion widget
- Device control for notification area

### Changed

- Global color support integration
- Separated CSS styles for better performance

### Fixed

- Duplicate color control removal
- Mobile dropdown functionality
- User dropdown cart CSS issues

---

## Upgrade Notes

### Upgrading to 4.0.2

1. **Backup your site** before upgrading
2. **Clear caches** after upgrade (page cache, CDN, browser)
3. **Test theme colors** - Enable "Use Theme Colors" on a block to verify
4. **Check carousels** - Swiper v11 has API changes from v5

### Breaking Changes in 4.x

| Change | Impact |
|--------|--------|
| PHP 8.0+ required | Update PHP if on older version |
| WordPress 6.0+ required | Update WordPress if on older version |
| Elementor 3.0+ required | Update Elementor if on older version |
| Swiper v5 to v11 | Custom carousel CSS may need updates |

### Deprecations

- Legacy shortcodes will be removed in 5.0
- Old widget skins deprecated (use new styling options)

---

## Version History

| Version | Release Date | WordPress | PHP | Blocks |
|---------|--------------|-----------|-----|--------|
| 4.0.2 | 2025-01-13 | 6.0+ | 8.0+ | 45 |
| 4.0.1 | 2025-12-01 | 6.0+ | 8.0+ | 45 |
| 4.0.0 | 2025-11-15 | 6.0+ | 8.0+ | 45 |
| 3.9.4 | 2025-10-15 | 5.9+ | 7.4+ | 8 |
| 3.9.0 | 2025-08-15 | 5.9+ | 7.4+ | 8 |
