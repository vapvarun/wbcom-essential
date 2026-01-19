# WBcom Essential + BuddyX Pro Theme

Premium community building with advanced features, layouts, and integrations.

---

## Overview

**BuddyX Pro** is the premium version of BuddyX, offering advanced customization options, multiple layout styles, and exclusive features. Combined with WBcom Essential:

- All 45 blocks with full feature set
- Premium header and layout options
- LearnDash LMS integration
- Advanced WooCommerce features
- Multiple member directory layouts
- Exclusive theme color schemes

---

## Premium Features

### What BuddyX Pro Adds

| Feature | Free BuddyX | BuddyX Pro |
|---------|-------------|------------|
| Layout Options | 1 | 5+ |
| Header Styles | Basic | Advanced Builder |
| Member Layouts | Grid | Grid, List, Card, Compact |
| Group Layouts | Grid | Grid, List, Card |
| Dark Mode | Basic | Full with toggle |
| Color Schemes | Custom | 10+ Pre-built |
| LearnDash | Basic | Full Integration |
| WooCommerce | Basic | Advanced Features |

---

## Quick Setup

### Step 1: Install BuddyX Pro

1. Purchase from [WBcom Designs](https://developer.wbcomdesigns.com/themes/buddyx-pro/)
2. Download the theme zip file
3. Go to **Appearance > Themes > Add New > Upload**
4. Upload and activate BuddyX Pro

### Step 2: Install WBcom Essential

1. Go to **Plugins > Add New**
2. Upload `wbcom-essential.zip`
3. Activate the plugin

### Step 3: Import Demo Content (Recommended)

1. Go to **Appearance > BuddyX Pro > Demo Import**
2. Choose a demo layout
3. Import to get pre-configured pages

### Step 4: Configure Theme Colors

1. **Appearance > Customize > Colors**
2. Choose a pre-built scheme or customize
3. WBcom Essential blocks will inherit these colors

---

## Advanced Header Building

BuddyX Pro offers an advanced header builder. Combine with WBcom Essential:

### Header Elements Available

| Element | WBcom Essential Block | Pro Feature |
|---------|----------------------|-------------|
| Logo | Branding / Site Logo | Multiple logo options |
| Menu | Smart Menu | Mega menu builder |
| User Area | Header Bar | Advanced styling |
| Search | Header Bar search | Ajax search |
| Cart | Header Bar cart | Mini cart dropdown |
| Dark Mode | Header Bar toggle | Full dark mode |

### Recommended Header Layout

**Layout 1: Full Width Community**
```
[Row 1: Top Bar]
[Branding] | [Contact Info] | [Social Icons]

[Row 2: Main Header]
[Branding] | [Smart Menu] | [Header Bar]
```

**Layout 2: Centered Logo**
```
[Row 1]
[Smart Menu Left] | [Branding Center] | [Header Bar Right]
```

**Layout 3: Stacked**
```
[Row 1: Branding Centered]
[Row 2: Smart Menu + Header Bar]
```

---

## Member Directory Layouts

BuddyX Pro offers multiple member directory styles. Match them with blocks:

### Grid Layout
```
[Members Grid columns="4" show_avatar show_name show_member_type]
```

### List Layout
```
[Members Lists layout="list" show_avatar show_name show_bio show_last_active]
```

### Card Layout (Pro Exclusive)
```
[Members Grid layout="card" show_cover show_avatar show_name show_stats]
```

### Compact Layout
```
[Members Grid layout="compact" columns="6" show_avatar show_name]
```

---

## LearnDash Integration

BuddyX Pro has built-in LearnDash support. Combine with WBcom Essential:

### Course Showcase
```
[Post Carousel post_type="sfwd-courses" posts_per_view="3"]
```

### Student Progress
```
[Progress Bar title="Course Progress" percentage="75"]
```

### Learning Dashboard
```
[Dashboard Intro message="Welcome back, learner!"]
[Post Carousel post_type="sfwd-courses" meta_key="_sfwd-course_current" show_progress="true"]
```

---

## WooCommerce Integration

### Product Showcase
```
[Product Grid columns="4" category="featured" show_price show_rating]
```

### Mini Cart in Header
```
[Header Bar show_cart="true" cart_style="dropdown"]
```

### Membership Products
```
[Pricing Table
  title="Premium Member"
  price="$9.99"
  period="/month"
  features="Access all groups, Premium badge, Priority support"
  button_text="Subscribe Now"
]
```

---

## Premium Color Schemes

BuddyX Pro includes pre-built color schemes:

| Scheme | Primary | Secondary | Best For |
|--------|---------|-----------|----------|
| Default | #2271b1 | #1d2327 | Professional |
| Dark | #1a1a2e | #16213e | Gaming, Tech |
| Starter | #007cba | #00a0d2 | Modern, Clean |
| Starter Light | #0073aa | #00a0d2 | Bright, Friendly |
| Developer | #23282d | #0073aa | Technical |

### Using with Blocks

1. Select scheme in **Appearance > Customize > Colors**
2. Enable **Use Theme Colors** in block settings
3. Blocks automatically use scheme colors

---

## Exclusive Pro Layouts

### Social Network Homepage

```
[Hero: Slider with community images]

[Section: Stats]
[Columns 4]
  [Counter: Members] [Counter: Groups] [Counter: Posts] [Counter: Active Today]
[/Columns]

[Section: Activity Feed]
[Columns 2/3 + 1/3]
  [Forums Activity limit="10"]
  [Sidebar: Members Carousel + Groups Carousel]
[/Columns]

[Section: Featured Groups]
[Groups Grid columns="3" featured="true"]

[Section: CTA]
[CTA Box: Join the community]
```

### Learning Community

```
[Hero: Course promotion slider]

[Section: Popular Courses]
[Post Carousel post_type="sfwd-courses"]

[Section: Instructors]
[Team Carousel - showing course authors]

[Section: Student Testimonials]
[Testimonial Carousel]

[Section: Pricing]
[Pricing Table x3 - Free/Pro/Enterprise]
```

### Social Marketplace

```
[Header Bar with cart]

[Hero: Featured products slider]

[Section: Categories]
[Icon Boxes - Product categories]

[Section: New Products]
[Product Grid columns="4" orderby="date"]

[Section: Community]
[Members Carousel - Top sellers]

[Section: Reviews]
[Testimonial Carousel - Customer reviews]
```

---

## Advanced Customization

### Custom CSS Variables

BuddyX Pro exposes additional CSS variables:

```css
/* Header */
--flavor-header-bg
--flavor-header-text
--flavor-header-link

/* Sidebar */
--flavor-sidebar-bg
--flavor-sidebar-widget-bg

/* Cards */
--flavor-card-bg
--flavor-card-border
--flavor-card-shadow

/* Typography */
--flavor-heading-font
--flavor-body-font
```

### Block Custom Styling

Add custom classes in block Advanced tab:

```
buddyx-card-hover  /* Adds BuddyX hover effect */
buddyx-shadow      /* Adds BuddyX shadow style */
buddyx-rounded     /* Uses BuddyX border radius */
```

---

## Performance Optimization

### Recommended Settings

| Setting | Value | Location |
|---------|-------|----------|
| Lazy Load Images | On | Customizer > Performance |
| Minify CSS/JS | On | Or use caching plugin |
| Carousel Items | 4-6 | Block settings |
| Posts Per Page | 10-12 | Block settings |

### Caching Compatibility

BuddyX Pro works with:
- WP Super Cache
- W3 Total Cache
- LiteSpeed Cache
- WP Rocket

**Note**: Exclude logged-in users for BuddyPress dynamic content.

---

## Support & Resources

- **BuddyX Pro Theme**: [developer.wbcomdesigns.com/themes/buddyx-pro/](https://developer.wbcomdesigns.com/themes/buddyx-pro/)
- **Documentation**: [developer.wbcomdesigns.com/docs/buddyx-pro/](https://developer.wbcomdesigns.com/docs/buddyx-pro/)
- **Video Tutorials**: [YouTube Channel](https://youtube.com/wbcomdesigns)
- **Premium Support**: [Support Portal](https://developer.wbcomdesigns.com/support/)
