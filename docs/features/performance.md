# Performance Optimization

WBcom Essential is built with performance in mind. This guide covers optimization techniques and best practices.

---

## Overview

WBcom Essential optimizes performance through:

- **Conditional Loading** - Only load assets when blocks/widgets are used
- **Lazy Loading** - Defer off-screen content
- **Optimized Queries** - Efficient database queries for BuddyPress/WooCommerce
- **Minimal JavaScript** - Vanilla JS where possible, no jQuery dependency
- **CSS Optimization** - Scoped styles, minimal specificity

---

## Asset Loading

### Conditional CSS/JS Loading

Assets are loaded only when needed:

**Gutenberg Blocks**
```
Block used on page → Block CSS/JS loaded
Block not used → No assets loaded
```

**Elementor Widgets**
```
Widget added to page → Widget assets enqueued
Widget not present → No assets loaded
```

### Shared Libraries

Common libraries are loaded once and shared:

| Library | Size (gzipped) | Used By |
|---------|----------------|---------|
| Swiper | ~35KB | All carousels |
| Slick | ~20KB | Legacy carousels |
| WordPress blocks | ~varies | All blocks |

---

## Database Query Optimization

### BuddyPress Queries

Members and Groups blocks use optimized queries:

**Efficient Patterns**:
```php
// Use BP's built-in query functions
bp_has_members( array(
    'type'     => 'active',
    'per_page' => 12,
    'page'     => 1,
) );
```

**Caching**: Results are cached using WP Object Cache when available.

### WooCommerce Queries

Product Grid uses WC's native query optimization:

```php
// Leverages WC product query caching
$products = wc_get_products( array(
    'limit'   => 12,
    'status'  => 'publish',
    'orderby' => 'date',
) );
```

### Posts Queries

Blog blocks use `WP_Query` with optimization:

```php
// Only get needed fields
$args = array(
    'posts_per_page'      => 6,
    'no_found_rows'       => true,  // Skip pagination count
    'update_post_meta_cache' => false,  // If meta not needed
    'update_post_term_cache' => false,  // If terms not needed
);
```

---

## Image Optimization

### Lazy Loading

All block images use native lazy loading:

```html
<img loading="lazy" src="..." alt="...">
```

### Responsive Images

Proper srcset for different screen sizes:

```html
<img
    srcset="image-300.jpg 300w, image-600.jpg 600w, image-1200.jpg 1200w"
    sizes="(max-width: 600px) 100vw, 600px"
    src="image-600.jpg"
>
```

### Avatar Optimization

BuddyPress avatars are loaded at appropriate sizes:

| Context | Avatar Size | Usage |
|---------|-------------|-------|
| Carousel | 150x150 | Members Carousel |
| Grid | 150x150 | Members Grid |
| List | 50x50 | Members Lists |
| Header Bar | 32x32 | User dropdown |

---

## JavaScript Optimization

### No jQuery Dependency

New blocks use vanilla JavaScript:

```javascript
// Modern JS, no jQuery
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.swiper');
    new Swiper(carousel, { /* options */ });
});
```

### Deferred Loading

Non-critical JS is deferred:

```php
wp_enqueue_script(
    'wbcom-carousel',
    $url,
    array(),
    $version,
    true  // Load in footer
);
```

### Event Delegation

Event listeners use delegation for efficiency:

```javascript
// One listener for many elements
document.body.addEventListener('click', (e) => {
    if (e.target.matches('.accordion-header')) {
        // Handle click
    }
});
```

---

## CSS Optimization

### Scoped Styles

Each block has scoped CSS:

```css
/* Styles only apply to this block */
.wbcom-essential-members-carousel {
    /* carousel styles */
}

.wbcom-essential-members-carousel .swiper-slide {
    /* slide styles */
}
```

### Critical CSS

Essential styles are inlined for above-the-fold content:

```php
// Inline critical styles
wp_add_inline_style('wbcom-essential-blocks', $critical_css);
```

### CSS Variables

Theme colors use CSS variables for efficient theming:

```css
.wbcom-essential-block {
    color: var(--wbcom-color-contrast);
    background: var(--wbcom-color-base);
}
```

---

## Caching Compatibility

### Page Cache

WBcom Essential works with popular caching plugins:

| Plugin | Compatibility |
|--------|---------------|
| WP Super Cache | Full |
| W3 Total Cache | Full |
| WP Rocket | Full |
| LiteSpeed Cache | Full |
| Cloudflare | Full |

### Object Cache

Benefits from object caching (Redis, Memcached):

- BuddyPress member/group data cached
- WooCommerce product data cached
- Post queries cached

### Cache Exclusions

Dynamic content that should be excluded from page cache:

| Content | Reason |
|---------|--------|
| Header Bar (logged in) | User-specific data |
| Profile Completion | User-specific progress |
| Mini Cart | User's cart items |
| Dashboard Intro | Personalized message |

**WP Rocket Example**:
```php
// Exclude dynamic blocks from cache
add_filter('rocket_cache_reject_uri', function($uris) {
    $uris[] = '/members/(.*)';
    $uris[] = '/groups/(.*)';
    return $uris;
});
```

---

## Server-Side Rendering

### Why SSR for Dynamic Blocks

BuddyPress and WooCommerce blocks use Server-Side Rendering:

**Benefits**:
- Always fresh data
- Better SEO (content in HTML)
- Works without JavaScript
- Proper caching integration

**Implementation**:
```php
// Block registration with render callback
register_block_type('wbcom/members-grid', array(
    'render_callback' => 'render_members_grid_block',
));
```

### Static vs Dynamic Blocks

| Block Type | Rendering | Cache Friendly |
|------------|-----------|----------------|
| Accordion | Static (JS) | Yes |
| Tabs | Static (JS) | Yes |
| Members Grid | Dynamic (SSR) | Partial |
| Product Grid | Dynamic (SSR) | Partial |

---

## Recommended Limits

### Carousel Items

| Block | Recommended Max | Performance Impact |
|-------|----------------|-------------------|
| Members Carousel | 12 | Low if cached |
| Groups Carousel | 12 | Low if cached |
| Posts Carousel | 8 | Medium (images) |
| Testimonial Carousel | 6 | Low |

### Grid Items

| Block | Recommended Max | Performance Impact |
|-------|----------------|-------------------|
| Members Grid | 24 per page | Low if cached |
| Groups Grid | 18 per page | Low if cached |
| Product Grid | 12 per page | Medium (images) |
| Portfolio Grid | 12 per page | High (large images) |

### Posts Per Page

| Block | Recommended | Notes |
|-------|-------------|-------|
| Post Carousel | 6-8 | Balance variety vs performance |
| Posts Revolution | 12 | With pagination |
| Posts Ticker | 10 | Continuous scroll |
| Post Timeline | 10 | With load more |

---

## Performance Testing

### Tools

- **Query Monitor** - Database query analysis
- **Debug Bar** - WordPress debugging
- **Chrome DevTools** - Network and performance
- **GTmetrix** - Page speed testing
- **WebPageTest** - Detailed performance analysis

### Key Metrics

| Metric | Target | Importance |
|--------|--------|------------|
| LCP (Largest Contentful Paint) | < 2.5s | High |
| FID (First Input Delay) | < 100ms | High |
| CLS (Cumulative Layout Shift) | < 0.1 | Medium |
| TTFB (Time to First Byte) | < 600ms | Medium |

### Common Performance Issues

**High LCP**:
- Optimize hero images
- Preload critical assets
- Use CDN

**High CLS**:
- Set image dimensions
- Reserve space for lazy content
- Avoid injecting content above fold

**High FID**:
- Minimize main thread work
- Break up long tasks
- Defer non-critical JS

---

## Optimization Checklist

### Server Level
- [ ] PHP 8.0+ for best performance
- [ ] Object caching enabled (Redis/Memcached)
- [ ] OpCode caching (OPcache)
- [ ] CDN configured

### WordPress Level
- [ ] Page caching enabled
- [ ] Image optimization plugin active
- [ ] Unused plugins deactivated
- [ ] Database optimized

### WBcom Essential Level
- [ ] Limit carousel items to recommendations
- [ ] Use pagination for large grids
- [ ] Enable lazy loading
- [ ] Cache BuddyPress/WooCommerce queries

### Frontend Level
- [ ] Images optimized (WebP, compressed)
- [ ] Critical CSS inlined
- [ ] JS deferred where possible
- [ ] Fonts preloaded

---

## Resources

- [WordPress Performance](https://developer.wordpress.org/plugins/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [BuddyPress Performance](https://developer.buddypress.org/performance/)
- [WooCommerce Performance](https://woocommerce.com/document/optimizing-woocommerce-store-performance/)
