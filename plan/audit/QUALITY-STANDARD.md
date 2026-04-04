# WBcom Essential — Block Quality Standard

Derived from deep audit of Kadence Blocks (63+15 Pro), Stackable (46+2 Premium), Spectra (35+9 Pro), and Otter Blocks (47+17 Pro). Free + Pro versions analyzed. Every wbcom-essential Gutenberg block MUST meet this standard.

**Companion doc:** `references/competitive-audit.md` — full block lists, feature matrices, architecture patterns.

---

## 1. Responsive System (MANDATORY)

### Three Breakpoints
Every visual property that could differ by device MUST have three variants:

| Device | Attribute Suffix | CSS Output |
|--------|-----------------|------------|
| Desktop | `{prop}` (no suffix) | Default — no media query |
| Tablet | `{prop}Tablet` | `@media (max-width: 1024px)` |
| Mobile | `{prop}Mobile` | `@media (max-width: 767px)` |

### Properties That MUST Be Responsive
- Font size, line-height, letter-spacing
- Padding (per-side)
- Margin (per-side)
- Gap / column gap
- Min-height
- Column count / grid template
- Text alignment
- Icon size
- Border radius

### Attribute Pattern
```json
{
  "fontSize": { "type": "number", "default": 18 },
  "fontSizeTablet": { "type": "number" },
  "fontSizeMobile": { "type": "number" },
  "fontSizeUnit": { "type": "string", "default": "px" },
  "padding": {
    "type": "object",
    "default": { "top": 24, "right": 24, "bottom": 24, "left": 24 }
  },
  "paddingTablet": { "type": "object" },
  "paddingMobile": { "type": "object" },
  "paddingUnit": { "type": "string", "default": "px" }
}
```

### Device Visibility
Every block MUST support show/hide per device:
```json
{
  "hideOnDesktop": { "type": "boolean", "default": false },
  "hideOnTablet": { "type": "boolean", "default": false },
  "hideOnMobile": { "type": "boolean", "default": false }
}
```

Output CSS:
```css
.wbe-block.wbe-hide-desktop { /* @media (min-width: 1025px) */ display: none !important; }
.wbe-block.wbe-hide-tablet { /* @media (min-width: 768px) and (max-width: 1024px) */ display: none !important; }
.wbe-block.wbe-hide-mobile { /* @media (max-width: 767px) */ display: none !important; }
```

---

## 2. CSS Architecture

### Scoping — Every Block Gets a Unique ID
- Attribute: `uniqueId` (string, auto-generated on insert)
- CSS selector: `.wbe-block-{uniqueId}`
- This prevents style conflicts between multiple instances of the same block

### CSS Custom Properties (Design Tokens)
All blocks share a common token system:
```css
:root {
  /* Spacing scale */
  --wbe-spacing-xs: 8px;
  --wbe-spacing-sm: 16px;
  --wbe-spacing-md: 24px;
  --wbe-spacing-lg: 32px;
  --wbe-spacing-xl: 48px;
  --wbe-spacing-2xl: 64px;

  /* Font sizes */
  --wbe-font-sm: 0.875rem;
  --wbe-font-md: 1rem;
  --wbe-font-lg: 1.25rem;
  --wbe-font-xl: 1.5rem;
  --wbe-font-2xl: 2rem;
  --wbe-font-3xl: 3rem;

  /* Colors — accent inherits from theme or defaults */
  --wbe-accent: #6366f1;
  --wbe-accent-hover: #4f46e5;
  --wbe-text: #111827;
  --wbe-text-muted: #6b7280;
  --wbe-border: #e5e7eb;
  --wbe-surface: #ffffff;
  --wbe-surface-alt: #f9fafb;

  /* Radius */
  --wbe-radius-sm: 4px;
  --wbe-radius-md: 8px;
  --wbe-radius-lg: 12px;
  --wbe-radius-full: 9999px;

  /* Shadow */
  --wbe-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --wbe-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --wbe-shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);

  /* Transitions */
  --wbe-transition: 0.2s ease;
}
```

### Per-Instance Inline CSS
Generate CSS per block instance using `render.php` or a PHP CSS class. Output as:
```html
<style>.wbe-block-{uniqueId} { /* instance styles */ }</style>
<div class="wbe-block wbe-block-{uniqueId} wbe-{blockname}">...</div>
```

### Theme Isolation Rules
1. NEVER use bare element selectors (`h1`, `p`, `a`) — always scope to `.wbe-{blockname}`
2. Use `inherit` for colors/fonts where possible so themes can override
3. Use `:where()` for low-specificity selectors that themes can beat
4. Test with Twenty Twenty-Five, Astra, Kadence, GeneratePress

---

## 3. Spacing & Box Model

### Per-Side Spacing (Padding + Margin)
Every block MUST support per-side padding AND margin:
```json
{
  "padding": {
    "type": "object",
    "default": { "top": 24, "right": 24, "bottom": 24, "left": 24 }
  },
  "paddingTablet": { "type": "object" },
  "paddingMobile": { "type": "object" },
  "paddingUnit": { "type": "string", "default": "px" },
  "margin": {
    "type": "object",
    "default": { "top": 0, "right": 0, "bottom": 0, "left": 0 }
  },
  "marginTablet": { "type": "object" },
  "marginMobile": { "type": "object" },
  "marginUnit": { "type": "string", "default": "px" }
}
```

### Linked/Unlinked Toggle
Editor controls should allow:
- Linked mode: one value applies to all 4 sides
- Unlinked mode: independent values per side

---

## 4. Typography Controls

### Standard Typography Attributes
Every block with text MUST support:
```json
{
  "fontFamily": { "type": "string", "default": "" },
  "fontSize": { "type": "number" },
  "fontSizeTablet": { "type": "number" },
  "fontSizeMobile": { "type": "number" },
  "fontSizeUnit": { "type": "string", "default": "px" },
  "fontWeight": { "type": "string", "default": "" },
  "lineHeight": { "type": "number" },
  "lineHeightTablet": { "type": "number" },
  "lineHeightMobile": { "type": "number" },
  "lineHeightUnit": { "type": "string", "default": "" },
  "letterSpacing": { "type": "number" },
  "textTransform": { "type": "string", "default": "" }
}
```

### Font Loading
- If `fontFamily` is set and is a Google Font, enqueue it
- Support local font loading option (GDPR compliance)
- Use `font-display: swap` always

---

## 5. Color & Background System

### Standard Color Attributes
```json
{
  "textColor": { "type": "string" },
  "textColorHover": { "type": "string" },
  "backgroundColor": { "type": "string" },
  "backgroundColorHover": { "type": "string" },
  "backgroundType": { "type": "string", "default": "color", "enum": ["color", "gradient", "image"] },
  "gradientValue": { "type": "string" },
  "backgroundImage": { "type": "object" },
  "overlayColor": { "type": "string" },
  "overlayOpacity": { "type": "number", "default": 0 }
}
```

### Hover States (MANDATORY for interactive elements)
Buttons, cards, links MUST have:
- Normal color
- Hover color
- Active color (optional, for tabs/accordion)
- Transition: `var(--wbe-transition)`

---

## 6. Border & Shadow

### Border Attributes (Per-Corner Radius)
```json
{
  "borderStyle": { "type": "string", "default": "" },
  "borderWidth": {
    "type": "object",
    "default": { "top": 0, "right": 0, "bottom": 0, "left": 0 }
  },
  "borderColor": { "type": "string" },
  "borderRadius": {
    "type": "object",
    "default": { "topLeft": 0, "topRight": 0, "bottomRight": 0, "bottomLeft": 0 }
  },
  "borderRadiusUnit": { "type": "string", "default": "px" }
}
```

### Box Shadow Attributes
```json
{
  "boxShadow": {
    "type": "object",
    "default": {
      "enabled": false,
      "horizontal": 0,
      "vertical": 4,
      "blur": 12,
      "spread": 0,
      "color": "rgba(0,0,0,0.08)"
    }
  },
  "boxShadowHover": { "type": "object" }
}
```

---

## 7. Block Wrapper Pattern

### PHP (Dynamic Render)
```php
$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => 'wbe-block wbe-block-' . $unique_id . ' wbe-{blockname}',
) );
echo '<div ' . $wrapper_attrs . '>';
```

### JSX (Editor + Static Save)
```jsx
// Edit
const blockProps = useBlockProps({
    className: `wbe-block wbe-block-${uniqueId} wbe-{blockname}`,
});

// Save
const blockProps = useBlockProps.save({
    className: `wbe-block wbe-block-${uniqueId} wbe-{blockname}`,
});
```

### Class Naming Convention (BEM)
```
.wbe-{blockname}              — block root
.wbe-{blockname}__{element}   — child element
.wbe-{blockname}--{modifier}  — variant
```

---

## 8. Accessibility Requirements

### Keyboard Navigation
- All interactive elements MUST be keyboard accessible
- Accordion: Enter/Space toggles, arrow keys navigate
- Tabs: Arrow keys switch tabs, Enter/Space activates
- Carousel: Arrow buttons focusable, keyboard arrows work

### ARIA Attributes
- Accordion: `aria-expanded`, `aria-controls`, `role="button"`
- Tabs: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`
- Carousel: `aria-label` on prev/next, `aria-live="polite"` on track
- Countdown: `aria-live="polite"` for screen reader updates

### Color Contrast
- All text MUST meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text)
- Use `color-contrast()` or document contrast ratios in defaults

### Focus Indicators
- Interactive elements MUST have visible focus ring
- Default: `outline: 2px solid var(--wbe-accent); outline-offset: 2px;`

---

## 9. Schema & SEO

### FAQ Accordion — JSON-LD FAQPage Schema
When `enableSchema` attribute is true:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "...",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

Output via `wp_footer` as `<script type="application/ld+json">`.

---

## 10. Performance Requirements

### Asset Loading
- Frontend CSS: Only load for blocks that appear on the page
- Frontend JS (viewScript): Only load for interactive blocks
- No jQuery dependency — vanilla JS only
- Defer/async all frontend JS

### CLS Prevention
- Set explicit dimensions on images, carousels, accordions
- Use CSS `min-height` on containers to reserve space
- Load responsive CSS in `<head>` (not inline in body)

### Animation
- Use `IntersectionObserver` for scroll-triggered effects
- Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  .wbe-block * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 11. Editor UX Requirements

### InspectorControls Panel Order
1. **Content** — text, items, repeater data
2. **Layout** — columns, alignment, spacing
3. **Style** — colors, typography, borders, shadows
4. **Advanced** — visibility, animation, custom CSS class

### Responsive Preview
- Use WordPress's built-in responsive preview (Desktop/Tablet/Mobile tabs)
- Controls should show device-specific values when previewing that device

### Placeholder State
- Empty blocks MUST show a meaningful placeholder in the editor
- Use `<Placeholder>` component or styled empty state
- Never show a blank white box

---

## 12. Entrance Animations (Optional but Recommended)

### Standard Animation Attributes
```json
{
  "animation": { "type": "string", "default": "", "enum": ["", "fade-up", "fade-down", "fade-left", "fade-right", "zoom-in", "zoom-out"] },
  "animationDelay": { "type": "number", "default": 0 },
  "animationDuration": { "type": "number", "default": 400 }
}
```

### Implementation
- Use `IntersectionObserver` in viewScript
- Add `.wbe-animate` class when element enters viewport
- CSS handles the transition from hidden → visible state
- Always respect `prefers-reduced-motion`

---

## 13. Theme Compatibility Checklist

Before shipping any block, test with:
- [ ] Twenty Twenty-Five (default block theme)
- [ ] Astra (most popular free theme)
- [ ] Kadence Theme (block theme)
- [ ] GeneratePress (lightweight classic theme)
- [ ] BuddyX (our own theme)

### What to verify:
- Colors don't clash with theme palette
- Typography inherits from theme when no custom font set
- Block width respects theme content width
- Wide/full alignment works correctly
- No CSS conflicts with theme styles
- Dark mode (if theme supports it) doesn't break block appearance

---

## 14. Free vs Pro Feature Tiers

### Free Tier (wbcom-essential v4.1.0)
All blocks ship with full quality standard. This is baseline — not negotiable.

### Pro Tier (wbcom-essential-pro — future)
Premium features unlock via filter hooks on free blocks (same architecture as Kadence/Stackable/Otter).

| Feature | Pro Gate | Architecture |
|---------|----------|-------------|
| Dynamic Content (ACF/meta fields) | `apply_filters('wbe_dynamic_content_sources', $sources)` | REST API + render filter |
| Conditional Display (role/date/device/WooCommerce) | `apply_filters('wbe_block_conditions', $conditions)` | `render_block` filter |
| Motion Effects (entrance/scroll animations) | `apply_filters('wbe_animation_effects', $effects)` | CSS properties + conditional JS |
| Evergreen Countdown (per-user cookie timers) | Attribute: `timerType: "evergreen"` | Cookie + optional DB |
| Form Integrations (Mailchimp, Stripe, webhooks) | `apply_filters('wbe_form_integrations', $providers)` | REST API endpoints |
| Query Builder / Loop Block | New block: `wbe/query` | Server-side render + AJAX |
| Custom CSS per Block | Attribute: `customCSS` | Inline `<style>` in render |
| WooCommerce Product Blocks | New blocks: `wbe/product-*` | `render_callback` with WC hooks |

### How Pro Should Hook Into Free
```php
// In pro plugin's boot:
add_filter('wbe_block_conditions', [$this, 'register_pro_conditions']);
add_filter('wbe_animation_effects', [$this, 'register_pro_animations']);
add_filter('render_block', [$this, 'evaluate_conditions'], 999, 2);
add_filter('render_block', [$this, 'render_dynamic_content'], 10, 2);
```

Never fork the free block code. Always extend via filters.

---

## Quick Reference: Block Quality Checklist

### Free Tier (every block, no exceptions)
```
[ ] apiVersion: 3
[ ] Responsive: 3-breakpoint padding/margin/font-size
[ ] Per-side spacing (top/right/bottom/left)
[ ] Device visibility (hide on desktop/tablet/mobile)
[ ] Hover states on all interactive elements
[ ] Box shadow control
[ ] Per-corner border radius
[ ] Unique ID per instance for CSS scoping
[ ] BEM class naming (.wbe-{block}__{element})
[ ] Uses design tokens (--wbe-* CSS variables)
[ ] ARIA attributes on interactive elements
[ ] Keyboard navigable (Tab, Enter, Space, Arrows)
[ ] prefers-reduced-motion respected
[ ] No jQuery dependency
[ ] Mobile-first responsive CSS
[ ] Works with wide/full alignment
[ ] Tested on 5 themes
[ ] FAQ blocks output JSON-LD schema
[ ] Editor shows meaningful placeholder
[ ] InspectorControls in correct panel order
```

### Pro Tier (premium features on top of free)
```
[ ] Dynamic content data attributes (data-wbe-dynamic)
[ ] Condition evaluation via render_block filter
[ ] Animation CSS properties + conditional JS loading
[ ] Evergreen countdown with cookie/DB tracking
[ ] Filter hooks for every Pro feature (never hardcode)
[ ] License check before Pro feature activation
[ ] Separate CSS/JS bundles for Pro assets
```
