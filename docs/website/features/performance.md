# Performance

Performance Optimization

WBcom Essential is built with performance in mind. This guide covers optimization techniques and best practices.

Overview

WBcom Essential optimizes performance through:

Conditional Loading - Only load assets when blocks/widgets are used
Lazy Loading - Defer off-screen content
Optimized Queries - Efficient database queries for BuddyPress/WooCommerce
Minimal JavaScript - Vanilla JS where possible, no jQuery dependency
CSS Optimization - Scoped styles, minimal specificity

Asset Loading

Conditional CSS/JS Loading

Assets are loaded only when needed:

Gutenberg Blocks

Block used on page → Block CSS/JS loaded
Block not used → No assets loaded

Elementor Widgets

Widget added to page → Widget assets enqueued
Widget not present → No assets loaded

Shared Libraries

Common libraries are loaded once and shared:

LibrarySize (gzipped)Used BySwiper~35KBAll carouselsSlick~20KBLegacy carouselsWordPress blocks~variesAll blocks

Database Query Optimization

BuddyPress Queries

Members and Groups blocks use optimized queries:

Efficient Patterns:

// Use BP&#039;s built-in query functions
bp_has_members( array(
    &#039;type&#039;     =&gt; &#039;active&#039;,
    &#039;per_page&#039; =&gt; 12,
    &#039;page&#039;     =&gt; 1,
) );

Caching: Results are cached using WP Object Cache when available.

WooCommerce Queries

Product Grid uses WC's native query optimization:

// Leverages WC product query caching
$products = wc_get_products( array(
    &#039;limit&#039;   =&gt; 12,
    &#039;status&#039;  =&gt; &#039;publish&#039;,
    &#039;orderby&#039; =&gt; &#039;date&#039;,
) );

Posts Queries

Blog blocks use WP_Query with optimization:

// Only get needed fields
$args = array(
    &#039;posts_per_page&#039;      =&gt; 6,
    &#039;no_found_rows&#039;       =&gt; true,  // Skip pagination count
    &#039;update_post_meta_cache&#039; =&gt; false,  // If meta not needed
    &#039;update_post_term_cache&#039; =&gt; false,  // If terms not needed
);

Image Optimization

Lazy Loading

All block images use native lazy loading:

&lt;img loading=&quot;lazy&quot; src=&quot;...&quot; alt=&quot;...&quot;&gt;

Responsive Images

Proper srcset for different screen sizes:

&lt;img
    srcset=&quot;image-300.jpg 300w, image-600.jpg 600w, image-1200.jpg 1200w&quot;
    sizes=&quot;(max-width: 600px) 100vw, 600px&quot;
    src=&quot;image-600.jpg&quot;
&gt;

Avatar Optimization

BuddyPress avatars are loaded at appropriate sizes:

ContextAvatar SizeUsageCarousel150x150Members CarouselGrid150x150Members GridList50x50Members ListsHeader Bar32x32User dropdown

JavaScript Optimization

No jQuery Dependency

New blocks use vanilla JavaScript:

// Modern JS, no jQuery
document.addEventListener(&#039;DOMContentLoaded&#039;, () =&gt; {
    const carousel = document.querySelector(&#039;.swiper&#039;);
    new Swiper(carousel, { /* options */ });
});

Deferred Loading

Non-critical JS is deferred:

wp_enqueue_script(
    &#039;wbcom-carousel&#039;,
    $url,
    array(),
    $version,
    true  // Load in footer
);

Event Delegation

Event listeners use delegation for efficiency:

// One listener for many elements
document.body.addEventListener(&#039;click&#039;, (e) =&gt; {
    if (e.target.matches(&#039;.accordion-header&#039;)) {
        // Handle click
    }
});

CSS Optimization

Scoped Styles

Each block has scoped CSS:

/* Styles only apply to this block */
.wbcom-essential-members-carousel {
    /* carousel styles */
}

.wbcom-essential-members-carousel .swiper-slide {
    /* slide styles */
}

Critical CSS

Essential styles are inlined for above-the-fold content:

// Inline critical styles
wp_add_inline_style(&#039;wbcom-essential-blocks&#039;, $critical_css);

CSS Variables

Theme colors use CSS variables for efficient theming:

.wbcom-essential-block {
    color: var(--wbcom-color-contrast);
    background: var(--wbcom-color-base);
}

Caching Compatibility

Page Cache

WBcom Essential works with popular caching plugins:

PluginCompatibilityWP Super CacheFullW3 Total CacheFullWP RocketFullLiteSpeed CacheFullCloudflareFull

Object Cache

Benefits from object caching (Redis, Memcached):

BuddyPress member/group data cached
WooCommerce product data cached
Post queries cached

Cache Exclusions

Dynamic content that should be excluded from page cache:

ContentReasonHeader Bar (logged in)User-specific dataProfile CompletionUser-specific progressMini CartUser's cart itemsDashboard IntroPersonalized message

WP Rocket Example:

// Exclude dynamic blocks from cache
add_filter(&#039;rocket_cache_reject_uri&#039;, function($uris) {
    $uris[] = &#039;/members/(.*)&#039;;
    $uris[] = &#039;/groups/(.*)&#039;;
    return $uris;
});

Server-Side Rendering

Why SSR for Dynamic Blocks

BuddyPress and WooCommerce blocks use Server-Side Rendering:

Benefits:

Always fresh data
Better SEO (content in HTML)
Works without JavaScript
Proper caching integration

Implementation:

// Block registration with render callback
register_block_type(&#039;wbcom/members-grid&#039;, array(
    &#039;render_callback&#039; =&gt; &#039;render_members_grid_block&#039;,
));

Static vs Dynamic Blocks

Block TypeRenderingCache FriendlyAccordionStatic (JS)YesTabsStatic (JS)YesMembers GridDynamic (SSR)PartialProduct GridDynamic (SSR)Partial

Recommended Limits

Carousel Items

BlockRecommended MaxPerformance ImpactMembers Carousel12Low if cachedGroups Carousel12Low if cachedPosts Carousel8Medium (images)Testimonial Carousel6Low

Grid Items

BlockRecommended MaxPerformance ImpactMembers Grid24 per pageLow if cachedGroups Grid18 per pageLow if cachedProduct Grid12 per pageMedium (images)Portfolio Grid12 per pageHigh (large images)

Posts Per Page

BlockRecommendedNotesPost Carousel6-8Balance variety vs performancePosts Revolution12With paginationPosts Ticker10Continuous scrollPost Timeline10With load more

Performance Testing

Tools

Query Monitor - Database query analysis
Debug Bar - WordPress debugging
Chrome DevTools - Network and performance
GTmetrix - Page speed testing
WebPageTest - Detailed performance analysis

Key Metrics

MetricTargetImportanceLCP (Largest Contentful Paint)< 2.5sHighFID (First Input Delay)< 100msHighCLS (Cumulative Layout Shift)< 0.1MediumTTFB (Time to First Byte)< 600msMedium

Common Performance Issues

High LCP:

Optimize hero images
Preload critical assets
Use CDN

High CLS:

Set image dimensions
Reserve space for lazy content
Avoid injecting content above fold

High FID:

Minimize main thread work
Break up long tasks
Defer non-critical JS

Optimization Checklist

Server Level

[ ] PHP 8.0+ for best performance
[ ] Object caching enabled (Redis/Memcached)
[ ] OpCode caching (OPcache)
[ ] CDN configured

WordPress Level

[ ] Page caching enabled
[ ] Image optimization plugin active
[ ] Unused plugins deactivated
[ ] Database optimized

WBcom Essential Level

[ ] Limit carousel items to recommendations
[ ] Use pagination for large grids
[ ] Enable lazy loading
[ ] Cache BuddyPress/WooCommerce queries

Frontend Level

[ ] Images optimized (WebP, compressed)
[ ] Critical CSS inlined
[ ] JS deferred where possible
[ ] Fonts preloaded

Resources

WordPress Performance
Core Web Vitals
BuddyPress Performance
WooCommerce Performance
