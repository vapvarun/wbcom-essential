# Elementor Widget Deep Audit — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize all 43 Elementor widgets in wbcom-essential to match V2 Gutenberg quality standard — responsive controls, accessibility, design tokens, Swiper migration, and consistent code patterns.

**Architecture:** 7 independent phases ordered by impact. Each phase is self-contained and can be committed/released independently. Phases 1-2 are quick wins, Phases 3-5 are the core modernization, Phases 6-7 are alignment with V2 Gutenberg patterns.

**Tech Stack:** Elementor 4.0.1, PHP 8.0+, Swiper.js (replacing Slick), CSS custom properties, BuddyPress REST API

---

## Audit Summary (43 widgets)

| Issue | Severity | Widgets Affected | Phase |
|---|---|---|---|
| No `add_responsive_control()` for sizing | CRITICAL | 43/43 | 2 |
| Hardcoded hex colors (no design tokens) | HIGH | 30/43 | 4 |
| Slick.js carousel (legacy, jQuery-dependent) | HIGH | 9/43 | 3 |
| jQuery dependency | HIGH | 18/43 | 3 |
| Carousels lack keyboard navigation | HIGH | 9/43 | 5 |
| ARIA attributes missing | MEDIUM | 29/43 | 5 |
| Inline styles in render() | MEDIUM | 18/43 | 4 |
| BP widgets use legacy functions (not REST API) | MEDIUM | 11/43 | 6 |
| Minimum Elementor version too old (2.0.0) | LOW | 1 file | 1 |
| ElementorPro dependency in querycontrol | LOW | 1 file | 1 |
| Filename typo (MemeberCarousel) | LOW | 1 file | 1 |

---

## Phase 1: Quick Wins (30 min)

Fixes that require minimal code changes and zero risk of regression.

### Task 1.1: Update Minimum Elementor Version

**Files:**
- Modify: `plugins/elementor/Plugins.php:72`
- Modify: `plugins/elementor/wbcom-essential-elementor.php:34`

- [ ] **Step 1: Update Plugins.php minimum version**

```php
// Line 72 — change from:
public static $minimum_elementor_version = '2.0.0';
// To:
public static $minimum_elementor_version = '3.5.0';
```

- [ ] **Step 2: Update loader version check**

```php
// wbcom-essential-elementor.php line 34 — already 3.0.0, bump to:
$elementor_version_required = '3.5.0';
```

- [ ] **Step 3: Verify Elementor still loads**

Navigate to any page with Elementor widgets — confirm no version mismatch error.

- [ ] **Step 4: Commit**

```bash
git add plugins/elementor/Plugins.php plugins/elementor/wbcom-essential-elementor.php
git commit -m "chore: bump minimum Elementor version to 3.5.0"
```

---

### Task 1.2: Fix MemeberCarousel Filename Typo

**Files:**
- Rename: `plugins/elementor/widgets/Buddypress/MemeberCarousel.php` → `MemberCarousel.php`
- Modify: `plugins/elementor/Plugins.php` (class reference in `get_elements()`)

- [ ] **Step 1: Check current class name inside the file**

Read `MemeberCarousel.php` — check if the class name is `MemeberCarousel` or `MemberCarousel`. The rename must match.

- [ ] **Step 2: Rename file**

```bash
cd plugins/elementor/widgets/Buddypress/
git mv MemeberCarousel.php MemberCarousel.php
```

- [ ] **Step 3: Update class name in widget file if needed**

If class is `MemeberCarousel`, rename to `MemberCarousel`. Update `get_name()` return value if it references the typo.

- [ ] **Step 4: Update Plugins.php registry**

In `get_elements()` method, find the entry with `'class' => 'Buddypress\MemeberCarousel'` and change to `'class' => 'Buddypress\MemberCarousel'`.

- [ ] **Step 5: Test — insert Member Carousel widget in Elementor editor**

Confirm the widget still loads and renders without errors.

- [ ] **Step 6: Commit**

```bash
git add -A plugins/elementor/widgets/Buddypress/ plugins/elementor/Plugins.php
git commit -m "fix: rename MemeberCarousel to MemberCarousel (typo)"
```

---

### Task 1.3: Remove ElementorPro Dependency

**Files:**
- Modify: `plugins/elementor/widgets/querycontrol/group-control-posts.php:18`

- [ ] **Step 1: Check what ElementorPro\Core\Utils is used for**

Read the file — find all usages of `Utils::` calls. Determine if they can be replaced with WordPress/Elementor-free equivalents.

- [ ] **Step 2: Replace or guard the import**

```php
// Line 18 — wrap with class_exists check:
if ( class_exists( 'ElementorPro\Core\Utils' ) ) {
    // use Pro utils
} else {
    // fallback implementation
}
```

- [ ] **Step 3: Test post-query widgets with and without Elementor Pro**

Insert a PostsCarousel or PostsRevolution widget — confirm filtering works.

- [ ] **Step 4: Commit**

```bash
git add plugins/elementor/widgets/querycontrol/group-control-posts.php
git commit -m "fix: guard ElementorPro dependency in Group_Control_Posts"
```

---

## Phase 2: Responsive Controls (2-3 hours)

Add `add_responsive_control()` for sizing properties across all 43 widgets. Currently ZERO widgets support per-device padding, margin, or dimension controls.

### Task 2.1: Create Responsive Control Helper

**Files:**
- Create: `plugins/elementor/helpers/responsive-controls.php`

- [ ] **Step 1: Create helper trait for common responsive controls**

```php
<?php
namespace WBCOM_ESSENTIAL\ELEMENTOR\Helpers;

trait Responsive_Controls {

    protected function add_wbe_spacing_controls( $prefix, $selector, $section_id = null ) {
        $this->add_responsive_control(
            $prefix . '_padding',
            [
                'label'      => __( 'Padding', 'wbcom-essential' ),
                'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', 'em', '%' ],
                'selectors'  => [
                    '{{WRAPPER}} ' . $selector => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            $prefix . '_margin',
            [
                'label'      => __( 'Margin', 'wbcom-essential' ),
                'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', 'em', '%' ],
                'selectors'  => [
                    '{{WRAPPER}} ' . $selector => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );
    }

    protected function add_wbe_responsive_columns( $prefix, $selector ) {
        $this->add_responsive_control(
            $prefix . '_columns',
            [
                'label'   => __( 'Columns', 'wbcom-essential' ),
                'type'    => \Elementor\Controls_Manager::SELECT,
                'default' => '3',
                'options' => [
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                    '4' => '4',
                    '5' => '5',
                    '6' => '6',
                ],
                'selectors' => [
                    '{{WRAPPER}} ' . $selector => 'grid-template-columns: repeat({{VALUE}}, 1fr);',
                ],
            ]
        );
    }
}
```

- [ ] **Step 2: Commit helper**

```bash
git add plugins/elementor/helpers/responsive-controls.php
git commit -m "feat: add responsive controls helper trait for Elementor widgets"
```

### Task 2.2 – 2.5: Apply Responsive Controls to Widget Groups

Apply the trait to widget groups in batches. Each batch is one commit:

- **Task 2.2**: General carousels (6 widgets): Slider, PostCarousel, PostSlider, TestimonialCarousel, TeamCarousel, TextRotator
- **Task 2.3**: General UI (8 widgets): Accordion, Tabs, FlipBox, PricingTable, ProgressBar, Countdown, PortfolioGrid, Timeline
- **Task 2.4**: BuddyPress (11 widgets): all BP widgets — add responsive padding/margin to card containers
- **Task 2.5**: WooCommerce (5 widgets) + remaining General (8 widgets)

For each batch:
- [ ] Add `use Responsive_Controls;` trait to each widget class
- [ ] Add `$this->add_wbe_spacing_controls()` in the Style section of `register_controls()`
- [ ] Test one widget per batch in Elementor editor — switch device preview, confirm controls appear
- [ ] Commit batch

---

## Phase 3: Slick → Swiper Migration (3-4 hours)

Migrate 9 carousel widgets from Slick.js (jQuery) to Swiper.js (vanilla JS) to match V2 Gutenberg blocks.

### Task 3.1: Create Shared Swiper Init Script

**Files:**
- Create: `plugins/elementor/assets/js/wbe-swiper-init.js`

- [ ] **Step 1: Write Swiper initialization utility**

```javascript
( function () {
    'use strict';

    window.wbeInitSwiper = function ( container, options ) {
        var defaults = {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: false,
            pagination: { el: container.querySelector( '.swiper-pagination' ), clickable: true },
            navigation: {
                nextEl: container.querySelector( '.swiper-button-next' ),
                prevEl: container.querySelector( '.swiper-button-prev' ),
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: options.slidesPerView || 3 },
            },
            keyboard: { enabled: true },
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
            },
        };

        var merged = Object.assign( {}, defaults, options );
        return new Swiper( container.querySelector( '.swiper' ), merged );
    };
} )();
```

- [ ] **Step 2: Register the script in ElementorHooks.php**

```php
wp_register_script(
    'wbe-swiper-init',
    WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/js/wbe-swiper-init.js',
    array(),
    WBCOM_ESSENTIAL_VERSION,
    true
);
```

- [ ] **Step 3: Commit**

```bash
git add plugins/elementor/assets/js/wbe-swiper-init.js plugins/elementor/hooks/ElementorHooks.php
git commit -m "feat: add shared Swiper init utility for Elementor carousels"
```

### Tasks 3.2 – 3.4: Migrate Carousel Widgets (3 batches)

**Batch A** (Task 3.2): General carousels — Slider, PostCarousel, PostSlider
**Batch B** (Task 3.3): General carousels — TestimonialCarousel, TeamCarousel
**Batch C** (Task 3.4): WooCommerce carousels — UniversalProduct, CustomerReview, ProductTab, WcTestimonial

For each widget:
- [ ] Replace Slick HTML structure (`slick-slide`) with Swiper (`swiper-slide`)
- [ ] Update `render()` method — change markup from Slick to Swiper container pattern
- [ ] Update script dependency from `array('jquery', 'wb-lib-slick')` to `array('wbe-swiper-init')`
- [ ] Update widget JS file — replace `$('.selector').slick({...})` with `wbeInitSwiper(container, {...})`
- [ ] Update CSS — replace `.slick-*` selectors with `.swiper-*`
- [ ] Test in Elementor editor + frontend — verify carousel slides, navigation, autoplay
- [ ] Commit batch

### Task 3.5: Remove Slick Assets

- [ ] Delete `plugins/elementor/assets/css/library/slick.css`
- [ ] Delete `plugins/elementor/assets/js/library/slick.min.js`
- [ ] Remove Slick `wp_register_*` calls from all widget files
- [ ] Commit

---

## Phase 4: Design Tokens & Hardcoded Colors (2-3 hours)

Replace hardcoded hex colors in 30 widgets with CSS custom properties matching V2 Gutenberg design tokens.

### Task 4.1: Create Elementor Design Tokens CSS

**Files:**
- Create: `plugins/elementor/assets/css/design-tokens.css`

- [ ] **Step 1: Create Elementor-specific token file**

Mirror the V2 Gutenberg tokens from `plugins/gutenberg/src/shared/design-tokens.css` but scoped to Elementor widget selectors. Same `--wbe-*` variable names for consistency.

- [ ] **Step 2: Enqueue in ElementorHooks.php on frontend**
- [ ] **Step 3: Commit**

### Tasks 4.2 – 4.4: Replace Hardcoded Colors (3 batches)

**Batch A** (Task 4.2): General widgets 1-12
**Batch B** (Task 4.3): General widgets 13-24
**Batch C** (Task 4.4): BuddyPress (5 widgets) + WooCommerce (1 widget)

For each widget:
- [ ] Find hardcoded hex colors in control defaults and CSS
- [ ] Replace with `var(--wbe-color-*)` or Elementor Global Color references
- [ ] Replace inline `style=` attributes with CSS classes where possible
- [ ] Test visual appearance hasn't changed (colors should resolve to same values)
- [ ] Commit batch

---

## Phase 5: Accessibility (2-3 hours)

Add ARIA attributes to all widgets and keyboard navigation to carousels.

### Task 5.1: Carousel Keyboard Navigation

After Swiper migration (Phase 3), Swiper's built-in `keyboard: { enabled: true }` and `a11y` module handle this. Verify:

- [ ] Arrow keys navigate slides
- [ ] Tab key moves focus to navigation buttons
- [ ] Screen reader announces slide changes
- [ ] Test all 9 carousel widgets

### Task 5.2: ARIA Attributes for Non-Carousel Widgets

29 widgets lack ARIA attributes. Add in batches:

- [ ] **Accordion/Tabs**: `role="tablist"`, `role="tab"`, `aria-expanded`, `aria-controls`
- [ ] **Flip Box**: `role="group"`, `aria-label` for front/back
- [ ] **Progress Bar**: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- [ ] **Countdown**: `role="timer"`, `aria-live="polite"`
- [ ] **Login Form**: `role="form"`, `aria-label`
- [ ] **Pricing Table**: `role="region"`, `aria-label` for each plan
- [ ] **Portfolio Grid**: `role="list"`, `role="listitem"`
- [ ] **BP & WC widgets**: `role="region"` + descriptive `aria-label`

Each batch → test with VoiceOver/screen reader → commit.

---

## Phase 6: BuddyPress REST API Migration (4-6 hours)

Migrate 11 BP Elementor widgets from legacy `bp_*` functions to BuddyPress REST API, matching V2 Gutenberg pattern.

### Task 6.1: Plan BP Widget Migration Strategy

- [ ] For each BP widget, map current `bp_*` function calls to REST API equivalents:
  - `bp_has_members()` / `bp_the_member()` → `GET /buddypress/v1/members`
  - `bp_has_groups()` / `bp_the_group()` → `GET /buddypress/v1/groups`
  - `bp_has_activities()` → `GET /buddypress/v1/activity`

- [ ] Decide: server-side REST calls via `wp_remote_get()` to internal API, or client-side AJAX like V2 Gutenberg?

### Tasks 6.2 – 6.4: Migrate BP Widgets (3 batches)

**Batch A**: Member widgets (MembersGrid, MemberCarousel, MembersLists)
**Batch B**: Group widgets (GroupGrid, GroupCarousel, GroupsLists)
**Batch C**: Activity + misc (Forums, ForumsActivity, DashboardIntro, ProfileCompletion, HeaderBar)

Each widget:
- [ ] Replace `bp_*` template loop with REST API data fetch
- [ ] Update render() to use REST response data
- [ ] Test with BuddyPress active — verify data matches legacy output
- [ ] Commit batch

---

## Phase 7: Code Quality Cleanup (1-2 hours)

### Task 7.1: Remove Owl Carousel Assets

- [ ] Check if any widget still uses Owl Carousel (`owl.carousel.js`, `owl.carousel.css`, `owl.theme.css`)
- [ ] If unused, delete assets and remove registrations
- [ ] Commit

### Task 7.2: Consolidate jQuery Ticker

- [ ] Check if `jquery.newsTicker.min.js` can be replaced with vanilla JS in PostsTicker widget
- [ ] If so, rewrite and remove jQuery dependency
- [ ] Commit

### Task 7.3: Standardize `add_render_attribute()` Usage

- [ ] Audit widgets still using raw `echo '<div class="...">'` patterns
- [ ] Migrate to `$this->add_render_attribute()` + `$this->get_render_attribute_string()` for consistency
- [ ] Focus on widgets with most inline attributes first
- [ ] Commit in batches

---

## Execution Order & Dependencies

```
Phase 1 (Quick Wins) ──→ No dependencies, do first
Phase 2 (Responsive)  ──→ Independent, can parallel with 3
Phase 3 (Swiper)       ──→ Must complete before Phase 5.1 (keyboard nav)
Phase 4 (Tokens)       ──→ Independent
Phase 5 (A11y)         ──→ Phase 3 must be done for carousel keyboard nav
Phase 6 (BP REST)      ──→ Independent, largest scope
Phase 7 (Cleanup)      ──→ After Phases 3-4
```

## Estimated Timeline

| Phase | Effort | Widgets Touched | Commits |
|---|---|---|---|
| 1. Quick Wins | 30 min | 3 files | 3 |
| 2. Responsive Controls | 2-3 hrs | 43 widgets | 5 |
| 3. Slick → Swiper | 3-4 hrs | 9 widgets | 5 |
| 4. Design Tokens | 2-3 hrs | 30 widgets | 4 |
| 5. Accessibility | 2-3 hrs | 38 widgets | 3 |
| 6. BP REST API | 4-6 hrs | 11 widgets | 4 |
| 7. Cleanup | 1-2 hrs | misc | 3 |
| **Total** | **15-22 hrs** | **43 widgets** | **~27 commits** |

## Testing Strategy

After each phase:
1. Activate Elementor 4.0.1 + wbcom-essential
2. Insert one widget per category in Elementor editor — verify controls load
3. Switch device preview (desktop/tablet/mobile) — verify responsive controls
4. Preview page — verify frontend rendering
5. Check browser console — zero JS errors
6. Run Playwright screenshots at 1440px and 390px for visual regression
