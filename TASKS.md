# Gutenberg Blocks Gap Analysis Tasks

**Generated:** 2025-12-23
**Purpose:** Feature parity tasks for Elementor widgets → Gutenberg blocks

---

## Basecamp Card Index

Quick reference for all gap analysis cards in the Bugs column.

### CRITICAL Priority Cards

| Task | Card ID | URL |
|------|---------|-----|
| Profile Completion - Dynamic Field Toggles | 9409959113 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409959113 |
| Groups Grid - Missing Sort Options | 9409959152 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409959152 |
| Posts Ticker - Missing Ticker Types | 9409959197 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409959197 |
| Pricing Table - Missing Button Animations | 9409959234 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409959234 |

### HIGH Priority Cards

| Task | Card ID | URL |
|------|---------|-----|
| Post Carousel - Query & Styling Controls | 9409960454 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409960454 |
| Login Form - Complete Styling | 9409960498 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409960498 |
| Posts Revolution - Pagination Support | 9409960545 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409960545 |
| Testimonial - Layout & Styling Controls | 9409960577 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409960577 |
| Progress Bar - Advanced Controls | 9409960597 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409960597 |
| Timeline - Visual Controls | 9409960632 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409960632 |
| Members Lists/Groups Lists - Avatar Styling | 9409960668 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409960668 |
| All Blocks - Typography Controls | 9409960702 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409960702 |

### MEDIUM Priority Cards

| Task | Card ID | URL |
|------|---------|-----|
| Accordion - Advanced Controls | 9409963254 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963254 |
| Countdown - Per-Unit Styling | 9409963292 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963292 |
| Slider - Navigation Styling | 9409963316 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963316 |
| Flip Box - Animation Options | 9409963332 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963332 |
| Team Carousel - Member Card Styling | 9409963353 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963353 |
| Text Rotator - Animation Options | 9409963390 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963390 |
| Smart Menu - Submenu Controls | 9409963413 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963413 |
| Dropdown Button - Button Skins | 9409963441 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963441 |
| Header Bar - Icon Customization | 9409963492 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963492 |
| Notification Area - Responsive Visibility | 9409963506 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963506 |
| Dashboard Intro - Layout & Avatar | 9409963540 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963540 |
| Forums/Forums Activity - Styling | 9409963599 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409963599 |

### LOW Priority Cards

| Task | Card ID | URL |
|------|---------|-----|
| Carousels - Advanced Swiper Options | 9409964315 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409964315 |
| Post Blocks - Offset & Advanced Query | 9409964378 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409964378 |
| Shape - Border & Shadow | 9409964435 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409964435 |
| Site Logo - Image Options | 9409964479 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409964479 |
| Branding - Hover States | 9409964538 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409964538 |
| All Blocks - Border Controls Pattern | 9409964587 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409964587 |
| All Blocks - Box Shadow Controls Pattern | 9409964632 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409964632 |

### Basecamp Columns

| Column | ID | URL |
|--------|-----|-----|
| Bugs | 7416110477 | https://3.basecamp.com/5798509/buckets/37595336/card_tables/columns/7416110477 |
| Ready for Testing | 7416110490 | https://3.basecamp.com/5798509/buckets/37595336/card_tables/columns/7416110490 |

---

## Quick Stats

| Category | Blocks | Critical Gaps | High Gaps | Medium Gaps |
|----------|--------|---------------|-----------|-------------|
| General UI | 7 | 2 | 4 | 1 |
| Post/Content | 6 | 1 | 5 | 0 |
| BuddyPress | 11 | 1 | 4 | 6 |
| Carousels | 3 | 0 | 1 | 2 |
| Header/Dashboard | 5 | 0 | 3 | 2 |
| **Total** | **32** | **4** | **17** | **11** |

---

## Priority Definitions

- **CRITICAL**: Block unusable or missing core functionality that customers expect
- **HIGH**: Significant feature loss affecting user experience
- **MEDIUM**: Nice-to-have features for power users
- **LOW**: Minor polish, rarely used features

---

## CRITICAL PRIORITY TASKS

### 1. Profile Completion - Dynamic Field Toggles
**Block:** `profile-completion`
**Impact:** Block cannot show/hide individual profile fields

**Missing:**
- [ ] Per-profile-group field toggles (loop through xprofile groups)
- [ ] Dynamic field configuration based on BuddyPress profile fields
- [ ] Individual field completion tracking

**Elementor Reference:** `ProfileCompletion.php:200-280` - loops through profile groups

---

### 2. Groups Grid - Missing Sort Options
**Block:** `groups-grid`
**Impact:** Users cannot sort groups by "random" or "alphabetical"

**Missing:**
- [ ] Add "random" to sortType options
- [ ] Add "alphabetical" to sortType options

**Current:** Only `active` available
**Elementor:** `newest`, `active`, `popular`, `random`, `alphabetical`

---

### 3. Posts Ticker - Missing Ticker Types
**Block:** `posts-ticker`
**Impact:** Only horizontal ticker available, missing 3 types

**Missing:**
- [ ] Vertical ticker type
- [ ] Marquee ticker type
- [ ] Typewriter ticker type
- [ ] Per-type speed configuration

**Elementor Reference:** `PostsTicker.php` - 4 ticker types with unique animations

---

### 4. Pricing Table - Missing Button Animations
**Block:** `pricing-table`
**Impact:** No button hover effects or animations

**Missing:**
- [ ] 8 button animation skins
- [ ] Button hover state colors (bg, text, border)
- [ ] Button size variations (small, medium, large)
- [ ] Per-feature icon color control

---

## HIGH PRIORITY TASKS

### Typography Controls (All Blocks)

Most blocks missing granular typography. Add to each:

- [ ] **Font family** selector
- [ ] **Font size** (responsive)
- [ ] **Font weight** selector
- [ ] **Line height** control
- [ ] **Letter spacing** control
- [ ] **Text transform** (uppercase, lowercase, capitalize)

**Blocks Needing Typography:**
1. `members-lists` - Name typography
2. `groups-lists` - Title & meta typography
3. `forums` - Title & content typography
4. `forums-activity` - All text elements
5. `header-bar` - Username typography
6. `testimonial` - All text elements
7. `countdown` - Digits & labels separately
8. `pricing-table` - Per-section typography
9. `accordion` - Title typography
10. `advanced-tabs` - Tab title typography

---

### 5. Post Carousel - Query & Styling
**Block:** `post-carousel`
**Impact:** Limited query options, missing styling

**Missing Query Controls:**
- [ ] Category filtering (select2 multi)
- [ ] Tag filtering
- [ ] Author filtering
- [ ] Include posts by ID
- [ ] Exclude posts by ID
- [ ] Post type selection

**Missing Styling:**
- [ ] Card hover background color
- [ ] Category badge styling
- [ ] Footer section styling
- [ ] Image animation effects

---

### 6. Login Form - Complete Styling
**Block:** `login-form`
**Impact:** Form looks unstyled compared to Elementor

**Missing:**
- [ ] Logo image with responsive width
- [ ] Form width responsive control
- [ ] Form background (gradient support)
- [ ] Form border & shadow
- [ ] Input field styling (bg, border, focus states)
- [ ] Button styling (bg, hover, padding)
- [ ] Link colors (forgot password, register)
- [ ] Remember me checkbox styling
- [ ] Custom placeholder text

---

### 7. Posts Revolution - Pagination
**Block:** `posts-revolution`
**Impact:** No way to paginate large post lists

**Missing:**
- [ ] Pagination support (numeric or prev/next)
- [ ] Posts per page for pagination
- [ ] Animation effects (44 options in Elementor)
- [ ] Sticky posts filtering
- [ ] Include/exclude posts by ID

---

### 8. Testimonial - Layout & Styling
**Block:** `testimonial`
**Impact:** Limited layout control

**Missing:**
- [ ] Thumbnail/image upload
- [ ] Image size selection
- [ ] Flex direction control (column, row, reverse)
- [ ] Author info direction & alignment
- [ ] Item background, border, shadow
- [ ] Content/author separate typography
- [ ] Avatar size and styling

---

### 9. Progress Bar - Advanced Controls
**Block:** `progress-bar`
**Impact:** Limited customization

**Missing:**
- [ ] Animated stripes option
- [ ] Percent position (inside/outside/hidden)
- [ ] Bar wrapper background (separate from fill)
- [ ] Border radius per corner
- [ ] Box shadow control
- [ ] Title typography
- [ ] Percentage typography

---

### 10. Timeline - Visual Controls
**Block:** `timeline`
**Impact:** Basic timeline only

**Missing:**
- [ ] Button skin animations (8 variations)
- [ ] Tags/Authors filtering
- [ ] Content border & shadow
- [ ] Icon container shadow
- [ ] Date typography & margin
- [ ] Image border radius controls
- [ ] More date format options (11 vs 4)

---

### 11. Members Lists/Groups Lists - Avatar Styling
**Blocks:** `members-lists`, `groups-lists`

**Missing:**
- [ ] Avatar opacity control
- [ ] Avatar border (full control: style, width, color)
- [ ] Avatar shadow (box-shadow)
- [ ] Avatar spacing control
- [ ] Online status border styling

---

## MEDIUM PRIORITY TASKS

### 12. Accordion - Advanced Controls
**Block:** `accordion`

**Missing:**
- [ ] Icon prefix control (icon manager vs dashicons)
- [ ] Text prefix option
- [ ] Title HTML tag selection
- [ ] URL Sharing (hash-based navigation)
- [ ] Arrow size responsive control
- [ ] Icon container sizing
- [ ] Arrow color (normal/hover states)
- [ ] Content area border styling

---

### 13. Countdown - Per-Unit Styling
**Block:** `countdown`

**Missing:**
- [ ] Individual unit styling (Days, Hours, Minutes, Seconds)
- [ ] Box shadow control
- [ ] Horizontal alignment for boxes
- [ ] Content layout options (horizontal, vertical, reverse)
- [ ] Text shadow controls
- [ ] Box border radius responsive

---

### 14. Slider - Navigation Styling
**Block:** `slider`

**Missing:**
- [ ] Navigation arrow styling (color, size per state)
- [ ] Dots styling (size, spacing, hover/active colors)
- [ ] Slide transition timing function
- [ ] Parallax effect option
- [ ] Per-slide background gradients
- [ ] Keyboard navigation toggle

---

### 15. Flip Box - Animation Options
**Block:** `flip-box`

**Missing:**
- [ ] Flip animation directions (left, right, up, down, zoom, rotate)
- [ ] Animation timing function
- [ ] Button animation skins (8 variations)
- [ ] Button hover state styling
- [ ] Front/back separate icon sizing
- [ ] Front/back border & shadow

---

### 16. Team Carousel - Member Card Styling
**Block:** `team-carousel`

**Missing:**
- [ ] Social media icons per member
- [ ] Image overlay effects
- [ ] Hover effects (scale, shadow, color)
- [ ] Member card border & shadow
- [ ] Pagination styling (dots color, size)
- [ ] Navigation arrow styling

---

### 17. Text Rotator - Animation Options
**Block:** `text-rotator`

**Missing:**
- [ ] Multiple animation options (fadeIn, slideLeft, zoomIn, etc.)
- [ ] Typing animation with backspace effect
- [ ] Cursor blinking animation
- [ ] Per-text custom animation
- [ ] Loop count control
- [ ] Separate prefix/suffix styling

---

### 18. Smart Menu - Submenu Controls
**Block:** `smart-menu`

**Missing:**
- [ ] Collapsible behavior options (6 types)
- [ ] Submenu animation selection
- [ ] Min/Max width for submenus
- [ ] Offset X/Y for menu levels
- [ ] Transition duration control
- [ ] Icon style selection (caret/chevron/plus)
- [ ] Detailed submenu item styling

---

### 19. Dropdown Button - Button Skins
**Block:** `dropdown-button`

**Missing:**
- [ ] 8 animation/skin styles
- [ ] Button gradient background
- [ ] Complete border styling per state
- [ ] Icon background color
- [ ] Dropdown shadow controls
- [ ] Separator color between items

---

### 20. Header Bar - Icon Customization
**Block:** `header-bar`

**Missing:**
- [ ] Individual icon selection (not just dashicons)
- [ ] Profile menu selector
- [ ] Individual icon colors (search, messages, etc.)
- [ ] Icon text shadow
- [ ] Advanced dropdown styling
- [ ] Dark mode toggle icon
- [ ] Counter box shadow

---

### 21. Notification Area - Responsive Visibility
**Block:** `notification-area`

**Missing:**
- [ ] Per-device visibility (desktop/tablet/mobile)
- [ ] Counter top spacing
- [ ] Detailed dropdown styling
- [ ] Plugin-specific detection (WooCommerce/BuddyPress)

---

### 22. Dashboard Intro - Layout & Avatar
**Block:** `dashboard-intro`

**Missing:**
- [ ] Responsive layout choice (left/above/right)
- [ ] Avatar border (style, width, color)
- [ ] Avatar padding & shadow
- [ ] Detailed typography per element

---

### 23. Forums/Forums Activity - Styling
**Blocks:** `forums`, `forums-activity`

**Missing:**
- [ ] Avatar opacity control
- [ ] Gradient background support
- [ ] Color state tabs (normal/hover)
- [ ] Individual typography controls
- [ ] Button state styling (normal/hover)

---

## LOW PRIORITY TASKS

### 24. Carousels - Advanced Swiper Options
**Blocks:** `group-carousel`, `members-carousel`, `testimonial-carousel`

**Missing:**
- [ ] Pause on interaction control
- [ ] Direction control (RTL)
- [ ] Effect selection (slide/fade)
- [ ] Keyboard navigation
- [ ] Grab cursor indicator

---

### 25. Post Blocks - Offset & Advanced Query
**Blocks:** `post-slider`, `post-timeline`, `posts-carousel`, `portfolio-grid`

**Missing:**
- [ ] Offset parameter
- [ ] Include/exclude by post ID
- [ ] Display type variations
- [ ] Advanced pagination types

---

### 26. Shape - Border & Shadow
**Block:** `shape`

**Missing:**
- [ ] Box shadow control
- [ ] Border styling (width, style, color)
- [ ] SVG width/height numeric controls
- [ ] Icon background color

---

### 27. Site Logo - Image Options
**Block:** `site-logo`

**Missing:**
- [ ] Image size selection dropdown
- [ ] Border styling
- [ ] Box shadow control
- [ ] Responsive max-width slider
- [ ] Link external/nofollow options

---

### 28. Branding - Hover States
**Block:** `branding`

**Missing:**
- [ ] Title hover color
- [ ] Separate description typography
- [ ] Link styling for title

---

## Systematic Patterns to Add

### Border Controls (Group Control Equivalent)

Add to blocks missing border customization:

```javascript
// Pattern to implement
{
    borderWidth: { type: 'number', default: 0 },
    borderStyle: { type: 'string', default: 'solid' },
    borderColor: { type: 'string', default: '#000000' },
    borderRadius: { type: 'object', default: { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 } }
}
```

**Blocks:** accordion, countdown, testimonial, pricing-table, flip-box, login-form, dashboard-intro, forums

---

### Box Shadow Controls

```javascript
// Pattern to implement
{
    boxShadow: {
        type: 'object',
        default: {
            horizontal: 0,
            vertical: 0,
            blur: 0,
            spread: 0,
            color: 'rgba(0,0,0,0.1)',
            position: 'outset'
        }
    }
}
```

**Blocks:** all blocks with container elements

---

### Responsive Controls Pattern

```javascript
// Pattern for responsive attributes
{
    columnDesktop: { type: 'number', default: 3 },
    columnTablet: { type: 'number', default: 2 },
    columnMobile: { type: 'number', default: 1 },
    // Same pattern for padding, margin, font-size, etc.
}
```

**Blocks:** most blocks need this for spacing and sizing

---

### Hover State Pattern

```javascript
// Pattern for hover states
{
    titleColor: { type: 'string', default: '#000000' },
    titleHoverColor: { type: 'string', default: '#0073aa' },
    // Repeat for backgrounds, borders, etc.
}
```

**Blocks:** all interactive elements (buttons, links, cards)

---

## Implementation Order

### Sprint 1 - Critical (Week 1)
1. Profile Completion - Dynamic fields
2. Groups Grid - Sort options
3. Posts Ticker - Ticker types
4. Pricing Table - Button animations

### Sprint 2 - High Priority Query/Content (Week 2)
5. Post Carousel - Query controls
6. Login Form - Styling
7. Posts Revolution - Pagination
8. Testimonial - Layout controls

### Sprint 3 - High Priority Styling (Week 3)
9. Progress Bar - Advanced controls
10. Timeline - Visual controls
11. Members/Groups Lists - Avatar styling
12. Typography for all blocks (systematic)

### Sprint 4 - Medium Priority (Week 4)
13-23. Medium priority tasks above

### Sprint 5 - Polish (Week 5)
24-28. Low priority tasks
- Systematic border controls
- Systematic shadow controls
- Responsive controls audit

---

## Files Quick Reference

### Elementor Widgets Location
```
plugins/elementor/widgets/
├── General/           # 27 widgets
├── Buddypress/        # 11 widgets
├── WooCommerce/       # 5 widgets
└── querycontrol/      # Query helpers
```

### Gutenberg Blocks Location
```
plugins/gutenberg/blocks/
├── {block-name}/
│   ├── {block-name}.php    # Registration
│   └── src/
│       ├── block.json      # Attributes
│       ├── edit.js         # Editor
│       ├── render.php      # Frontend
│       └── style.scss      # Styles
```

---

## Notes

- Always test with BuddyX theme for full compatibility
- Check Elementor widget for exact control implementation
- Use CSS custom properties for dynamic styling
- Ensure all strings are translatable
- Test responsive behavior at 768px and 480px breakpoints
