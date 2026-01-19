# Responsive Design

WBcom Essential blocks and widgets are built with a mobile-first approach, ensuring your content looks great on all devices.

---

## Overview

All 45 Gutenberg blocks and 43 Elementor widgets include responsive controls for:

- **Visibility** - Show/hide elements per device
- **Spacing** - Adjust margins and padding
- **Typography** - Scale font sizes
- **Layout** - Change columns and alignment
- **Carousels** - Configure slides per view

---

## Breakpoints

WBcom Essential uses standard WordPress/Elementor breakpoints:

| Device | Breakpoint | Default Width |
|--------|------------|---------------|
| Desktop | > 1024px | 1140px container |
| Tablet | 768px - 1024px | 100% with padding |
| Mobile | < 768px | 100% with padding |

### Custom Breakpoints (Elementor)

When using Elementor Pro, custom breakpoints are fully supported:

1. **Settings > Responsive** in Elementor
2. Add custom breakpoints
3. WBcom widgets respect these automatically

---

## Responsive Controls

### Gutenberg Blocks

Responsive controls appear in the block settings panel:

**Typography Scaling**
```
Desktop: 32px
Tablet:  28px
Mobile:  24px
```

**Column Layout**
```
Desktop: 4 columns
Tablet:  2 columns
Mobile:  1 column
```

**Carousel Slides Per View**
```
Desktop: 4 slides
Tablet:  2 slides
Mobile:  1 slide
```

### Elementor Widgets

Elementor provides device-specific controls (desktop, tablet, mobile icons):

1. Click the device icon next to any responsive setting
2. Adjust value for that device
3. Preview using the responsive preview mode

---

## Block-Specific Responsive Behavior

### Carousels (Members, Groups, Posts, Testimonials)

| Setting | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Slides Per View | 4 | 2 | 1 |
| Slides Per Group | Match slides | 2 | 1 |
| Navigation Arrows | Show | Show | Hide |
| Pagination Dots | Show | Show | Show |
| Touch Swipe | Enabled | Enabled | Enabled |

### Grids (Members Grid, Groups Grid, Product Grid)

| Setting | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Columns | 4 | 2 | 1 |
| Gap | 30px | 20px | 15px |
| Card Padding | 20px | 15px | 12px |

### Header Bar

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Search | Full width | Icon only | Icon only |
| Notifications | Show | Show | Icon only |
| Messages | Show | Show | Icon only |
| Cart | Show count | Show count | Icon only |
| User Menu | Full | Compact | Hamburger |

### Pricing Table

| Setting | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Display | Side by side | Side by side | Stacked |
| Width | 33% each | 50% each | 100% |
| Features | Full list | Full list | Collapsible |

---

## CSS Media Queries

WBcom Essential uses consistent media queries:

```css
/* Mobile First Approach */

/* Base styles (Mobile) */
.wbcom-essential-block {
    padding: 15px;
}

/* Tablet and up */
@media (min-width: 768px) {
    .wbcom-essential-block {
        padding: 20px;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .wbcom-essential-block {
        padding: 30px;
    }
}
```

---

## Touch Optimization

All interactive elements are optimized for touch devices:

### Minimum Touch Target Size
- Buttons: 44px minimum height
- Links: 44px minimum touch area
- Carousel arrows: 48px
- Close buttons: 44px

### Touch Gestures
- Carousels: Swipe left/right
- Accordions: Tap to expand
- Tabs: Tap to switch
- Dropdown menus: Tap to open

### Hover States on Touch
- Hover effects converted to tap states
- No hover-dependent functionality
- All content accessible without hover

---

## Performance on Mobile

### Lazy Loading
- Images load when entering viewport
- Carousels preload adjacent slides only
- Off-screen content deferred

### Reduced Motion
- Respects `prefers-reduced-motion` setting
- Animations simplified on mobile
- Option to disable animations globally

### Image Sizing
- Responsive image srcset supported
- WebP format when browser supports
- Appropriate sizes for device width

---

## Testing Recommendations

### Browser DevTools
1. Open browser developer tools (F12)
2. Toggle device toolbar
3. Test at 320px, 768px, 1024px, 1440px

### Real Device Testing
- Test on actual iOS and Android devices
- Check touch interactions
- Verify scroll performance

### Common Issues to Check
- [ ] Text readable without zooming
- [ ] Buttons tappable without zooming
- [ ] No horizontal scroll
- [ ] Images scale properly
- [ ] Forms usable on mobile
- [ ] Carousels swipeable

---

## Troubleshooting

### Content Overflows on Mobile

**Problem**: Content extends beyond viewport width

**Solutions**:
1. Check for fixed-width elements
2. Add `overflow-x: hidden` to container
3. Use percentage widths instead of pixels

### Touch Events Not Working

**Problem**: Carousel doesn't swipe on mobile

**Solutions**:
1. Ensure touch is enabled in carousel settings
2. Check for conflicting CSS (`touch-action: none`)
3. Clear browser cache

### Layout Breaks at Certain Width

**Problem**: Layout breaks between breakpoints

**Solutions**:
1. Use flexible units (%, vw, rem)
2. Add intermediate breakpoint if needed
3. Check container max-width settings

---

## Resources

- [WordPress Responsive Images](https://developer.wordpress.org/plugins/responsive-images/)
- [Elementor Responsive Design](https://elementor.com/help/responsive-design/)
- [Mobile-First CSS](https://www.browserstack.com/guide/mobile-first-css)
