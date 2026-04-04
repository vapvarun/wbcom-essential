# WBcom Essential — Gutenberg Blocks Roadmap

## Context

wbcom-essential v4.0.0 is Elementor-only (40+ widgets). The WordPress ecosystem is moving to blocks. This plan adds Gutenberg block equivalents alongside Elementor widgets — both load together, no either/or.

## Architecture

```
plugins/
├── elementor/              ← Existing (keep as-is)
└── gutenberg/              ← NEW
    ├── src/blocks/         ← Source ES6/JSX (@wordpress/scripts)
    ├── build/blocks/       ← Compiled output (what WP loads)
    ├── BlockRegistrar.php  ← Auto-register from build/blocks/
    └── gutenberg.php       ← Loader
```

`loader.php` updated to include `plugins/gutenberg/gutenberg.php` alongside Elementor.

---

## Phase 1: Scaffold + First Blocks

- [ ] Init `plugins/gutenberg/` with `@wordpress/scripts`, `package.json`, `webpack.config.js`
- [ ] Create `BlockRegistrar.php` (auto-discover from `build/blocks/*/block.json`)
- [ ] Create `gutenberg.php` loader
- [ ] Update `loader.php` to require gutenberg loader
- [ ] **Hero Block** — full-width section with gradient bg, heading, subheading, CTA buttons
- [ ] **CTA Block** — conversion section with heading, text, button, optional background

## Phase 2: Core Marketing Blocks

| Block | Elementor Equivalent | Priority |
|-------|---------------------|----------|
| Pricing Table | `PricingTable.php` | High |
| Testimonial Carousel | `TestimonialCarousel.php` | High |
| FAQ Accordion | `Accordion.php` | High |
| Countdown Timer | `Countdown.php` | Medium |
| Feature Grid | (new — no equivalent) | High |
| Stats Counter | `ProgressBar.php` | Medium |
| Tabs | `Tabs.php` | Medium |
| Team Carousel | `TeamCarousel.php` | Low |

## Phase 3: BuddyPress Blocks

| Block | Elementor Equivalent | Priority |
|-------|---------------------|----------|
| Members Grid | `MembersGrid.php` | High |
| Group Carousel | `GroupCarousel.php` | High |
| Profile Completion | `ProfileCompletion.php` | Medium |
| Activity Feed | (new) | Medium |
| Forums Activity | `ForumsActivity.php` | Low |

## Phase 4: WooCommerce Blocks

| Block | Elementor Equivalent | Priority |
|-------|---------------------|----------|
| Product Grid | WooCommerce widgets | Medium |
| Product Carousel | WooCommerce widgets | Medium |

## Phase 5: Block Patterns

Ship pre-made patterns combining multiple blocks:
- [ ] Product Landing Page (Hero + Features + Pricing + Testimonials + CTA)
- [ ] Community Landing Page (Hero + Members Grid + Activity + Groups + CTA)
- [ ] Sales Page (Hero + Features + Pricing + FAQ + Countdown + CTA)

---

## Design Principles

1. **Shared design tokens** — one CSS variable system across Elementor widgets and Gutenberg blocks
2. **Both load together** — Elementor users keep their widgets, block editor users get blocks
3. **Block patterns** — pre-made page layouts so users don't start from scratch
4. **Mirror Elementor API where possible** — same attributes/options so switching is easy
5. **`src/` + `build/`** — same pattern as WPMediaVerse blocks

## Version Target

- v4.1.0 — Phase 1 (scaffold + Hero + CTA)
- v4.2.0 — Phase 2 (marketing blocks)
- v5.0.0 — Phase 3 + 4 + 5 (BP + Woo + Patterns)
