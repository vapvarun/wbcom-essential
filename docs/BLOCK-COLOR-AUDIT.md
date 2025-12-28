# Wbcom Essential Blocks - Color Audit Report

## Overview

This audit identifies all hardcoded colors in wbcom-essential blocks that should be replaced with CSS custom properties for theme compatibility.

**Total Blocks Audited:** 38
**Files with Hardcoded Colors:** 76 (style.scss + editor.scss)
**Total Hardcoded Color Instances:** 400+

---

## Color Categories to Replace

### Primary Action Colors (Replace with `--wbcom-color-primary`)
These are the most impactful - they're used for buttons, links, and active states.

| Color | Usage | Occurrences |
|-------|-------|-------------|
| `#1d76da` | Primary blue (buttons, links, active) | 35+ |
| `#1557a0` | Primary hover | 5+ |
| `#007cba` | WordPress blue (editor focus) | 25+ |
| `#0073aa` | WordPress blue alt | 10+ |
| `#005177` | Dark blue hover | 8+ |
| `#3182ce` | Chakra blue (buttons, icons) | 20+ |
| `#2271b1` | WordPress admin blue | 5+ |
| `#007CFF` | Bright blue (links) | 5+ |

### Text Colors (Replace with `--wbcom-heading-color`, `--wbcom-text-color`, `--wbcom-meta-color`)

| Color | Usage | Occurrences |
|-------|-------|-------------|
| `#122B46` | Dark heading text | 25+ |
| `#303030` | Dark text | 10+ |
| `#1a1a1a` / `#1a202c` | Near black headings | 8+ |
| `#333` / `#333333` | Dark gray text | 15+ |
| `#4a5568` | Medium gray text | 10+ |
| `#666` / `#666666` | Gray text | 30+ |
| `#718096` | Light gray text | 10+ |
| `#888` / `#888888` | Meta gray | 15+ |
| `#a3a5a9` / `#A3A5A9` | Light meta | 20+ |
| `#9c9c9c` | Filter inactive | 5+ |
| `#939597` | Button text gray | 5+ |

### Background Colors (Replace with `--wbcom-card-bg`, `--wbcom-input-bg`)

| Color | Usage | Occurrences |
|-------|-------|-------------|
| `#ffffff` / `#fff` | White backgrounds | 50+ |
| `#f8f9fa` | Light gray background | 15+ |
| `#f5f5f5` | Alt light background | 15+ |
| `#f7f7f7` / `#f7fafc` | Subtle background | 10+ |
| `#f0f0f0` / `#f0f0f1` | Input/hover background | 8+ |
| `#efefef` | Tab background | 3+ |
| `#e9ecef` | Hover background | 3+ |

### Border Colors (Replace with `--wbcom-border-color`)

| Color | Usage | Occurrences |
|-------|-------|-------------|
| `#e3e3e3` | Primary border | 20+ |
| `#e0e0e0` | Tab borders | 15+ |
| `#ddd` / `#dddddd` | Light border | 20+ |
| `#ccc` / `#cccccc` | Editor borders | 25+ |
| `#e7e9ec` | Subtle border | 5+ |
| `#e2e8f0` | Timeline/card border | 8+ |

### Status Colors (Replace with `--wbcom-success-color`, `--wbcom-error-color`)

| Color | Usage | Occurrences |
|-------|-------|-------------|
| `#1cd991` | Success/online green | 5+ |
| `#16a34a` / `#48bb78` | Success green | 3+ |
| `#4caf50` | Material green | 2+ |
| `#EF3E46` / `#ef3e46` | Error/badge red | 5+ |
| `#dc2626` / `#dc3545` / `#fc8181` | Error red | 5+ |
| `#f6ad55` | Rating orange/star | 3+ |
| `#ffc107` | Warning yellow | 2+ |

---

## Block-by-Block Audit

### High Priority (BuddyPress Blocks - User Facing)

#### 1. login-form
**File:** `blocks/login-form/src/style.scss`
```scss
// Lines 10-36: CSS Variables with hardcoded defaults
--form-bg-color: #ffffff;          // → var(--wbcom-card-bg)
--title-color: #122B46;            // → var(--wbcom-heading-color)
--subtitle-color: #666666;         // → var(--wbcom-text-color)
--label-color: #122B46;            // → var(--wbcom-heading-color)
--input-bg-color: #f8f9fa;         // → var(--wbcom-input-bg)
--input-border-color: #e3e3e3;     // → var(--wbcom-border-color)
--input-text-color: #122B46;       // → var(--wbcom-heading-color)
--input-focus-border-color: #1d76da; // → var(--wbcom-color-primary)
--button-bg-color: #1d76da;        // → var(--wbcom-button-bg)
--button-text-color: #ffffff;      // → var(--wbcom-button-text)
--button-hover-bg-color: #1557a0;  // → var(--wbcom-button-hover-bg)
--link-color: #1d76da;             // → var(--wbcom-link-color)
--link-hover-color: #1557a0;       // → var(--wbcom-link-hover-color)
--checkbox-color: #1d76da;         // → var(--wbcom-color-primary)

// Lines 87-95: Error/Success states
#fef2f2, #dc2626, #fecaca           // → var(--wbcom-error-bg), var(--wbcom-error-color)
#f0fdf4, #16a34a, #bbf7d0           // → var(--wbcom-success-bg), var(--wbcom-success-color)
```

#### 2. members-grid
**File:** `blocks/members-grid/src/style.scss`
```scss
// Lines 12-17: CSS Variables
--card-bg: #ffffff;                // → var(--wbcom-card-bg)
--name-color: #122b46;             // → var(--wbcom-heading-color)
--meta-color: #a3a5a9;             // → var(--wbcom-meta-color)

// Lines 107-127: Friend button
#3182ce                            // → var(--wbcom-color-primary)
#fff                               // → var(--wbcom-button-text)
#666                               // → var(--wbcom-text-color)
```

#### 3. groups-grid
**File:** `blocks/groups-grid/src/style.scss`
```scss
// Lines 12-18: CSS Variables
--card-bg: #ffffff;                // → var(--wbcom-card-bg)
--name-color: #122B46;             // → var(--wbcom-heading-color)
--meta-color: #A3A5A9;             // → var(--wbcom-meta-color)
--button-bg: #1d76da;              // → var(--wbcom-button-bg)
--button-text: #ffffff;            // → var(--wbcom-button-text)

// Lines 135-172: Leave group button
#e3e3e3, #666                      // → var(--wbcom-border-color), var(--wbcom-text-color)
```

#### 4. header-bar
**File:** `blocks/header-bar/src/style.scss`
```scss
// Lines 13-20: CSS Variables
--icon-color: #303030;             // → var(--wbcom-heading-color)
--counter-bg: #1d76da;             // → var(--wbcom-color-primary)
--dropdown-bg: #ffffff;            // → var(--wbcom-card-bg)
--dropdown-text: #303030;          // → var(--wbcom-heading-color)
--user-name-color: #303030;        // → var(--wbcom-heading-color)
--sign-up-bg: #1d76da;             // → var(--wbcom-button-bg)
--sign-up-text: #ffffff;           // → var(--wbcom-button-text)

// Lines 71-301: Various hardcoded colors
#fff, #e0e0e0, #1d76da, #1565c0, #666, #333
```

#### 5. profile-completion
**File:** `blocks/profile-completion/src/style.scss`
```scss
// Lines 10-18: CSS Variables
--completion-color: #1cd991;       // → var(--wbcom-success-color)
--incomplete-color: #ef3e46;       // → var(--wbcom-error-color)
--progress-border: #dedfe2;        // → var(--wbcom-border-color)
--number-color: #122b46;           // → var(--wbcom-heading-color)
--text-color: #a3a5a9;             // → var(--wbcom-meta-color)
--details-bg: #ffffff;             // → var(--wbcom-card-bg)
--button-color: #939597;           // → var(--wbcom-text-color)
--button-border: #9ea8b2;          // → var(--wbcom-border-color)

// Lines 65-372: Various hardcoded
#fff, #e7e9ec, #f5f5f5, #007cff
```

#### 6. notification-area
**File:** `blocks/notification-area/src/style.scss`
```scss
// Lines 8-14: CSS Variables
--icon-color: #122B46;             // → var(--wbcom-heading-color)
--icon-hover-color: #007CFF;       // → var(--wbcom-color-primary)
--username-color: #122B46;         // → var(--wbcom-heading-color)
--badge-color: #EF3E46;            // → var(--wbcom-error-color)
--badge-text-color: #ffffff;       // → #fff (keep)
--dropdown-bg-color: #ffffff;      // → var(--wbcom-card-bg)
--dropdown-border-color: #e3e3e3;  // → var(--wbcom-border-color)
```

#### 7. members-lists
**File:** `blocks/members-lists/src/style.scss`
```scss
// Lines 8-17: CSS Variables
--box-border-color: #e3e3e3;       // → var(--wbcom-border-color)
--box-bg-color: #ffffff;           // → var(--wbcom-card-bg)
--filter-border-color: #e3e3e3;    // → var(--wbcom-border-color)
--online-color: #1cd991;           // → var(--wbcom-success-color)
--name-color: #122b46;             // → var(--wbcom-heading-color)

// Lines 96-207: Filter and list colors
#9c9c9c, #1d76da, #303030, #fff, #666
```

#### 8. groups-lists
**File:** `blocks/groups-lists/src/style.scss`
```scss
// Lines 8-18: CSS Variables
--box-bg: #ffffff;                 // → var(--wbcom-card-bg)
--box-border-color: #e3e3e3;       // → var(--wbcom-border-color)
--title-color: #303030;            // → var(--wbcom-heading-color)
--meta-color: #a3a5a9;             // → var(--wbcom-meta-color)
--link-color: #1d76da;             // → var(--wbcom-link-color)
--filter-normal-color: #9c9c9c;    // → var(--wbcom-meta-color)
--filter-active-color: #303030;    // → var(--wbcom-heading-color)
--filter-active-border: #1d76da;   // → var(--wbcom-color-primary)
```

#### 9. forums
**File:** `blocks/forums/src/style.scss`
```scss
// Lines 8-15: CSS Variables
--box-bg: #ffffff;                 // → var(--wbcom-card-bg)
--box-border-color: #e3e3e3;       // → var(--wbcom-border-color)
--title-color: #122B46;            // → var(--wbcom-heading-color)
--title-hover: #007CFF;            // → var(--wbcom-link-hover-color)
--meta-color: #A3A5A9;             // → var(--wbcom-meta-color)
--last-reply-color: #4D5C6D;       // → var(--wbcom-text-color)
--link-color: #1d76da;             // → var(--wbcom-link-color)
```

#### 10. forums-activity
**File:** `blocks/forums-activity/src/style.scss`
```scss
// Lines 8-17: CSS Variables
--box-bg: #ffffff;                 // → var(--wbcom-card-bg)
--box-border-color: #e3e3e3;       // → var(--wbcom-border-color)
--forum-title-color: #A3A5A9;      // → var(--wbcom-meta-color)
--topic-title-color: #122B46;      // → var(--wbcom-heading-color)
--meta-color: #A3A5A9;             // → var(--wbcom-meta-color)
--excerpt-color: #666666;          // → var(--wbcom-text-color)
--button-color: #122B46;           // → var(--wbcom-heading-color)
--button-border-color: #e3e3e3;    // → var(--wbcom-border-color)
```

#### 11. dashboard-intro
**File:** `blocks/dashboard-intro/src/style.scss`
```scss
// Lines 8-10: CSS Variables
--greeting-color: #A3A5A9;         // → var(--wbcom-meta-color)
--name-color: #122B46;             // → var(--wbcom-heading-color)
--description-color: #666666;      // → var(--wbcom-text-color)
```

#### 12. members-carousel
**File:** `blocks/members-carousel/src/style.scss`
```scss
// Lines 8-13: CSS Variables
--card-bg: #ffffff;                // → var(--wbcom-card-bg)
--name-color: #122b46;             // → var(--wbcom-heading-color)
--meta-color: #a3a5a9;             // → var(--wbcom-meta-color)
--arrow-color: #122b46;            // → var(--wbcom-heading-color)
--dot-color: #122b46;              // → var(--wbcom-heading-color)
```

#### 13. group-carousel
**File:** `blocks/group-carousel/src/style.scss`
```scss
// Lines 8-13: CSS Variables
--card-bg: #ffffff;                // → var(--wbcom-card-bg)
--name-color: #122B46;             // → var(--wbcom-heading-color)
--meta-color: #A3A5A9;             // → var(--wbcom-meta-color)
--arrow-color: #122B46;            // → var(--wbcom-heading-color)
--dot-color: #122B46;              // → var(--wbcom-heading-color)
```

---

### Medium Priority (General/Post Blocks)

#### 14. posts-revolution
**File:** `blocks/posts-revolution/src/style.scss`
```scss
// Lines 8-13: CSS Variables
--category-color: #1d76da;         // → var(--wbcom-color-primary)
--category-hover-color: #1557a0;   // → var(--wbcom-color-secondary)
--title-color: #122B46;            // → var(--wbcom-heading-color)
--title-hover-color: #1d76da;      // → var(--wbcom-link-hover-color)
--excerpt-color: #666666;          // → var(--wbcom-text-color)
--meta-color: #888888;             // → var(--wbcom-meta-color)
```

#### 15. posts-ticker
**File:** `blocks/posts-ticker/src/style.scss`
```scss
// Lines 8-13: CSS Variables
--label-bg-color: #1d76da;         // → var(--wbcom-color-primary)
--label-text-color: #ffffff;       // → #fff (keep)
--ticker-bg-color: #f8f9fa;        // → var(--wbcom-card-bg-alt)
--text-color: #122B46;             // → var(--wbcom-heading-color)
--hover-color: #1d76da;            // → var(--wbcom-link-hover-color)
--border-color: #e3e3e3;           // → var(--wbcom-border-color)
```

#### 16. post-carousel
**File:** `blocks/post-carousel/src/style.scss`
```scss
// Lines 32-190: Hardcoded inline colors
#fff, #333, #007cba, #666, #eee, #888, #ddd, #bbb
```

#### 17. posts-carousel
**File:** `blocks/posts-carousel/src/style.scss`
```scss
// Lines 32-263: Hardcoded inline with some vars
var(--card-bg, #fff)
var(--category-color, #3182ce)
var(--title-color, #1a202c)
var(--excerpt-color, #4a5568)
var(--meta-color, #718096)
var(--nav-color, #3182ce)
```

#### 18. post-slider
**File:** `blocks/post-slider/src/style.scss`
```scss
// All inline vars with fallbacks
var(--title-color, #fff)
var(--button-text, #1a202c)
var(--button-bg, #fff)
var(--nav-color, #fff)
```

#### 19. post-timeline
**File:** `blocks/post-timeline/src/style.scss`
```scss
// All inline vars with fallbacks
var(--bar-color, #e2e8f0)
var(--dot-color, #3182ce)
var(--date-color, #718096)
var(--card-bg, #fff)
var(--title-color, #1a202c)
var(--excerpt-color, #4a5568)
var(--button-text, #fff)
var(--button-bg, #3182ce)
```

#### 20. timeline
**File:** `blocks/timeline/src/style.scss`
```scss
// Lines 6-9: CSS Variables
--bar-color: #e2e8f0;              // → var(--wbcom-border-color)
--content-background: #f7fafc;     // → var(--wbcom-card-bg-alt)
```

#### 21. portfolio-grid
**File:** `blocks/portfolio-grid/src/style.scss`
```scss
// Lines 12-18: CSS Variables
--portfolio-item-bg: #ffffff;      // → var(--wbcom-card-bg)
--portfolio-title-color: #ffffff;  // → #fff (on overlay)
--portfolio-filter-active: #3182ce; // → var(--wbcom-color-primary)
--portfolio-filter-text: #4a5568;  // → var(--wbcom-text-color)
```

---

### Lower Priority (UI Components)

#### 22. accordion
**File:** `blocks/accordion/src/style.scss`
```scss
#ddd, #f8f9fa, #e9ecef, #fff, #0073aa
```

#### 23. advanced-tabs
**File:** `blocks/advanced-tabs/src/style.scss`
```scss
#fff, #e0e0e0, #f5f5f5, #efefef, #ffffff
```

#### 24. dropdown-button
**File:** `blocks/dropdown-button/src/style.scss`
```scss
var(--normal-bg-color, #2271b1)
var(--normal-text-color, #ffffff)
var(--dropdown-hover-bg-color, #f5f5f5)
var(--dropdown-hover-text-color, #2271b1)
#ffffff, #ddd, #eee
```

#### 25. slider
**File:** `blocks/slider/src/style.scss`
```scss
#0073aa, #fff, #005177
```

#### 26. smart-menu
**File:** `blocks/smart-menu/src/style.scss`
```scss
#007cba, #fff, #005a87
var(--item-color, #333)
var(--item-color-hover, #007cba)
var(--sub-bg, #fff)
var(--sub-item-color, #555)
```

#### 27. testimonial
**File:** `blocks/testimonial/src/style.scss`
```scss
// Lines 7-21: CSS Variables
--bg-color: #ffffff;               // → var(--wbcom-card-bg)
--quote-icon-color: #1d76da;       // → var(--wbcom-color-primary)
--quote-color: #4a5568;            // → var(--wbcom-text-color)
--name-color: #1a202c;             // → var(--wbcom-heading-color)
--role-color: #718096;             // → var(--wbcom-meta-color)
--rating-color: #f6ad55;           // → var(--wbcom-warning-color)
```

#### 28. testimonial-carousel
**File:** `blocks/testimonial-carousel/src/style.scss`
```scss
#ffffff                            // → var(--wbcom-card-bg)
```

#### 29. team-carousel
**File:** `blocks/team-carousel/src/style.scss`
```scss
#e2e8f0, #a0aec0, #ffffff
```

#### 30. pricing-table
**File:** `blocks/pricing-table/src/style.scss`
```scss
#48bb78, #ffffff, #fc8181          // Success/error badges
```

#### 31. progress-bar
Uses inline vars - review defaults

#### 32. countdown
Uses inline vars - review defaults

#### 33. flip-box
**File:** `blocks/flip-box/src/style.scss`
```scss
// Lines 13-24: CSS Variables
--flip-front-bg: #f5f5f5;          // → var(--wbcom-card-bg-alt)
--flip-front-title: #1a1a1a;       // → var(--wbcom-heading-color)
--flip-front-content: #666666;     // → var(--wbcom-text-color)
--flip-front-icon: #3182ce;        // → var(--wbcom-color-primary)
--flip-back-bg: #3182ce;           // → var(--wbcom-color-primary)
--flip-back-title: #ffffff;        // → #fff
--flip-back-icon: #ffffff;         // → #fff
--flip-btn-bg: #ffffff;            // → #fff
--flip-btn-text: #3182ce;          // → var(--wbcom-color-primary)
```

#### 34. text-rotator
**File:** `blocks/text-rotator/src/style.scss`
```scss
--rotating-color: #3182ce;         // → var(--wbcom-color-primary)
```

#### 35. shape
**File:** `blocks/shape/src/style.scss`
```scss
--shape-background: #3182ce;       // → var(--wbcom-color-primary)
--shape-icon-color: #ffffff;       // → #fff
```

#### 36. site-logo
**File:** `blocks/site-logo/src/style.scss`
```scss
#f5f5f5, #ccc, #666                // Placeholder state only
```

#### 37. branding
**File:** `blocks/branding/src/editor.scss`
```scss
#ccc, #f9f9f9                      // Editor placeholder only
```

#### 38. heading
No hardcoded colors (uses inline styles from block attributes)

---

## Implementation Strategy

### Phase 1: Update CSS Variables in Block Style Files

For each block, update the CSS variable declarations to use bridge variables:

```scss
// BEFORE
.wbcom-essential-login-form-wrapper {
    --button-bg-color: #1d76da;
    --button-text-color: #ffffff;
}

// AFTER
.wbcom-essential-login-form-wrapper {
    --button-bg-color: var(--wbcom-button-bg, #1d76da);
    --button-text-color: var(--wbcom-button-text, #ffffff);
}
```

### Phase 2: Replace Inline Hardcoded Colors

For colors not using CSS variables, add them:

```scss
// BEFORE
.some-element {
    color: #666;
    background: #f5f5f5;
}

// AFTER
.some-element {
    color: var(--wbcom-text-color);
    background: var(--wbcom-card-bg-alt);
}
```

### Phase 3: Update theme-colors.css Mappings

Ensure `theme-colors.css` has mappings for all block-specific variables.

---

## Files to Modify

### Priority 1 (BuddyPress Blocks)
1. `blocks/login-form/src/style.scss`
2. `blocks/members-grid/src/style.scss`
3. `blocks/groups-grid/src/style.scss`
4. `blocks/header-bar/src/style.scss`
5. `blocks/profile-completion/src/style.scss`
6. `blocks/notification-area/src/style.scss`
7. `blocks/members-lists/src/style.scss`
8. `blocks/groups-lists/src/style.scss`
9. `blocks/forums/src/style.scss`
10. `blocks/forums-activity/src/style.scss`
11. `blocks/dashboard-intro/src/style.scss`
12. `blocks/members-carousel/src/style.scss`
13. `blocks/group-carousel/src/style.scss`

### Priority 2 (Post/Content Blocks)
14. `blocks/posts-revolution/src/style.scss`
15. `blocks/posts-ticker/src/style.scss`
16. `blocks/post-carousel/src/style.scss`
17. `blocks/posts-carousel/src/style.scss`
18. `blocks/post-slider/src/style.scss`
19. `blocks/post-timeline/src/style.scss`
20. `blocks/timeline/src/style.scss`
21. `blocks/portfolio-grid/src/style.scss`

### Priority 3 (UI Components)
22. `blocks/accordion/src/style.scss`
23. `blocks/advanced-tabs/src/style.scss`
24. `blocks/dropdown-button/src/style.scss`
25. `blocks/slider/src/style.scss`
26. `blocks/smart-menu/src/style.scss`
27. `blocks/testimonial/src/style.scss`
28. `blocks/testimonial-carousel/src/style.scss`
29. `blocks/team-carousel/src/style.scss`
30. `blocks/pricing-table/src/style.scss`
31. `blocks/flip-box/src/style.scss`
32. `blocks/text-rotator/src/style.scss`
33. `blocks/shape/src/style.scss`

### Editor Files (Lower Priority)
All corresponding `editor.scss` files need similar treatment but are lower priority since they're only visible in the admin.

---

## Color Variable Reference

### Bridge Variables (defined in theme-colors.css)

| Variable | Theme.json Source | Fallback |
|----------|-------------------|----------|
| `--wbcom-color-primary` | `--wp--preset--color--primary` | `#0073aa` |
| `--wbcom-color-secondary` | `--wp--preset--color--secondary` | `#005177` |
| `--wbcom-heading-color` | `--wp--preset--color--contrast` | `#1a1a1a` |
| `--wbcom-text-color` | `--wp--preset--color--contrast-2` | `#636363` |
| `--wbcom-meta-color` | `--wp--preset--color--contrast-3` | `#8c8c8c` |
| `--wbcom-card-bg` | `--wp--preset--color--base` | `#ffffff` |
| `--wbcom-card-bg-alt` | `--wp--preset--color--base-2` | `#f5f5f5` |
| `--wbcom-input-bg` | `--wp--preset--color--base-3` | `#f0f0f0` |
| `--wbcom-border-color` | `--wp--preset--color--base-2` | `#e5e7eb` |
| `--wbcom-button-bg` | `--wbcom-color-primary` | (primary) |
| `--wbcom-button-text` | (static) | `#ffffff` |
| `--wbcom-button-hover-bg` | `--wbcom-color-secondary` | (secondary) |
| `--wbcom-link-color` | `--wbcom-color-primary` | (primary) |
| `--wbcom-link-hover-color` | `--wbcom-color-secondary` | (secondary) |
| `--wbcom-success-color` | `--wp--preset--color--success` | `#4caf50` |
| `--wbcom-error-color` | `--wp--preset--color--error` | `#dc3545` |
| `--wbcom-warning-color` | `--wp--preset--color--warning` | `#ffc107` |

---

## Verification Checklist

After updating each block:

- [ ] Verify block renders correctly with default colors
- [ ] Test with BuddyX Pro theme colors
- [ ] Test with a different theme (Twenty Twenty-Four)
- [ ] Check editor preview matches frontend
- [ ] Verify no regression in existing functionality
- [ ] Run `npm run build` to compile changes

---

## Notes

1. **Keep fallbacks**: Always include fallback values for backwards compatibility
2. **Editor styles**: Editor-specific colors (focus rings, selection) can remain hardcoded as they're WordPress admin colors
3. **Static white**: Pure white (#fff, #ffffff) on dark backgrounds can remain static
4. **Gradients**: Complex gradients may need special handling
5. **Build required**: After SCSS changes, run `npm run build` to compile
