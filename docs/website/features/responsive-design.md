# Responsive Design

Responsive Design

WBcom Essential blocks and widgets are built with a mobile-first approach, ensuring your content looks great on all devices.

Overview

All 45 Gutenberg blocks and 43 Elementor widgets include responsive controls for:

Visibility - Show/hide elements per device
Spacing - Adjust margins and padding
Typography - Scale font sizes
Layout - Change columns and alignment
Carousels - Configure slides per view

Breakpoints

WBcom Essential uses standard WordPress/Elementor breakpoints:

DeviceBreakpointDefault WidthDesktop> 1024px1140px containerTablet768px - 1024px100% with paddingMobile< 768px100% with padding

Custom Breakpoints (Elementor)

When using Elementor Pro, custom breakpoints are fully supported:

Settings > Responsive in Elementor
Add custom breakpoints
WBcom widgets respect these automatically

Responsive Controls

Gutenberg Blocks

Responsive controls appear in the block settings panel:

Typography Scaling

Desktop: 32px
Tablet:  28px
Mobile:  24px

Column Layout

Desktop: 4 columns
Tablet:  2 columns
Mobile:  1 column

Carousel Slides Per View

Desktop: 4 slides
Tablet:  2 slides
Mobile:  1 slide

Elementor Widgets

Elementor provides device-specific controls (desktop, tablet, mobile icons):

Click the device icon next to any responsive setting
Adjust value for that device
Preview using the responsive preview mode

Block-Specific Responsive Behavior

Carousels (Members, Groups, Posts, Testimonials)

SettingDesktopTabletMobileSlides Per View421Slides Per GroupMatch slides21Navigation ArrowsShowShowHidePagination DotsShowShowShowTouch SwipeEnabledEnabledEnabled

Grids (Members Grid, Groups Grid, Product Grid)

SettingDesktopTabletMobileColumns421Gap30px20px15pxCard Padding20px15px12px

Header Bar

ElementDesktopTabletMobileSearchFull widthIcon onlyIcon onlyNotificationsShowShowIcon onlyMessagesShowShowIcon onlyCartShow countShow countIcon onlyUser MenuFullCompactHamburger

Pricing Table

SettingDesktopTabletMobileDisplaySide by sideSide by sideStackedWidth33% each50% each100%FeaturesFull listFull listCollapsible

CSS Media Queries

WBcom Essential uses consistent media queries:

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

Touch Optimization

All interactive elements are optimized for touch devices:

Minimum Touch Target Size

Buttons: 44px minimum height
Links: 44px minimum touch area
Carousel arrows: 48px
Close buttons: 44px

Touch Gestures

Carousels: Swipe left/right
Accordions: Tap to expand
Tabs: Tap to switch
Dropdown menus: Tap to open

Hover States on Touch

Hover effects converted to tap states
No hover-dependent functionality
All content accessible without hover

Performance on Mobile

Lazy Loading

Images load when entering viewport
Carousels preload adjacent slides only
Off-screen content deferred

Reduced Motion

Respects prefers-reduced-motion setting
Animations simplified on mobile
Option to disable animations globally

Image Sizing

Responsive image srcset supported
WebP format when browser supports
Appropriate sizes for device width

Testing Recommendations

Browser DevTools

Open browser developer tools (F12)
Toggle device toolbar
Test at 320px, 768px, 1024px, 1440px

Real Device Testing

Test on actual iOS and Android devices
Check touch interactions
Verify scroll performance

Common Issues to Check

[ ] Text readable without zooming
[ ] Buttons tappable without zooming
[ ] No horizontal scroll
[ ] Images scale properly
[ ] Forms usable on mobile
[ ] Carousels swipeable

Troubleshooting

Content Overflows on Mobile

Problem: Content extends beyond viewport width

Solutions:

Check for fixed-width elements
Add overflow-x: hidden to container
Use percentage widths instead of pixels

Touch Events Not Working

Problem: Carousel doesn't swipe on mobile

Solutions:

Ensure touch is enabled in carousel settings
Check for conflicting CSS (touch-action: none)
Clear browser cache

Layout Breaks at Certain Width

Problem: Layout breaks between breakpoints

Solutions:

Use flexible units (%, vw, rem)
Add intermediate breakpoint if needed
Check container max-width settings

Resources

WordPress Responsive Images
Elementor Responsive Design
Mobile-First CSS
