# WBcom Essential + Reign Theme

Build powerful social networks and marketplaces with the multi-purpose Reign theme.

---

## Overview

**Reign** is a premium multi-purpose theme designed for social networks, online communities, and marketplaces. Combined with WBcom Essential:

- Full Elementor integration with 43 widgets
- Complete Gutenberg support with 45 blocks
- BuddyPress + WooCommerce combined layouts
- Social marketplace capabilities
- Multiple demo imports for quick setup
- Advanced theme customization

---

## What Makes Reign Special

| Feature | Description |
|---------|-------------|
| **Multi-Purpose** | Community, marketplace, LMS, or all combined |
| **Elementor Pro Ready** | Full compatibility with Elementor Pro |
| **Demo Library** | 10+ pre-built demos to import |
| **Social Commerce** | BuddyPress + WooCommerce integration |
| **LearnDash Ready** | E-learning site support |
| **bbPress Ready** | Forum integration |

---

## Quick Setup

### Step 1: Install Reign Theme

1. Purchase from [WBcom Designs](https://wbcomdesigns.com/downloads/reign-buddypress-theme/)
2. Download the theme package
3. Go to **Appearance > Themes > Add New > Upload**
4. Upload and activate Reign

### Step 2: Install Required Plugins

Reign may prompt you to install:
- Elementor (free)
- BuddyPress (if using community features)
- WooCommerce (if using store features)

### Step 3: Install WBcom Essential

1. Go to **Plugins > Add New**
2. Upload `wbcom-essential.zip`
3. Activate the plugin

### Step 4: Import a Demo

1. Go to **Appearance > Starter Templates**
2. Browse available demos
3. Choose one that matches your needs
4. Click **Import**

---

## Demo Options

### Social Network Demo

Best for community-focused sites.

**Pre-configured Pages:**
- Homepage with activity feed
- Member directory
- Group directory
- Forums
- User dashboard

**Recommended WBcom Essential Blocks:**
```
Members Carousel, Members Grid
Groups Carousel, Groups Grid
Forums Activity, Forums
Header Bar, Dashboard Intro
Profile Completion
```

### Social Marketplace Demo

Best for community + commerce sites.

**Pre-configured Pages:**
- Homepage with products + members
- Shop page
- Member stores
- Community pages

**Recommended WBcom Essential Blocks:**
```
Product Grid, Mini Cart
Members Carousel, Groups Grid
Testimonial Carousel
Pricing Table, CTA Box
```

### E-Learning Demo

Best for course websites.

**Pre-configured Pages:**
- Course catalog
- Instructor profiles
- Student dashboard
- Community forums

**Recommended WBcom Essential Blocks:**
```
Post Carousel (courses)
Team Carousel (instructors)
Progress Bar, Counter
Members Grid (students)
```

### Business Demo

Best for corporate/business sites.

**Pre-configured Pages:**
- Homepage
- Services
- Team
- Contact

**Recommended WBcom Essential Blocks:**
```
Slider, Flip Box
Icon Box, Team Carousel
Testimonial Carousel
Pricing Table, CTA Box
Counter, Progress Bar
```

---

## Building with Elementor

Reign is optimized for Elementor. Use WBcom Essential widgets:

### Homepage Sections

**Hero Section**
```
[Slider Widget]
- Full-width slides
- Overlay text
- CTA buttons
```

**Stats Section**
```
[Row: 4 Columns]
[Counter] [Counter] [Counter] [Counter]
Members   Groups    Posts     Active
```

**Community Preview**
```
[Row: 2 Columns]
[Members Carousel]    [Groups Carousel]
```

**Featured Content**
```
[Row: Full Width]
[Post Slider - Featured posts]
```

**Testimonials**
```
[Row: Full Width]
[Testimonial Carousel]
```

**Call to Action**
```
[Row: Full Width]
[CTA Box - "Join Our Community"]
```

### Member Directory

```
[Section]
[Heading Widget - "Our Members"]
[Members Grid - Filterable]
```

### Shop Page

```
[Section]
[Heading Widget - "Featured Products"]
[Product Grid - 4 columns]

[Section]
[Heading Widget - "Customer Reviews"]
[Testimonial Carousel - WC reviews]
```

---

## Building with Gutenberg

For those preferring the block editor:

### Full Site Editing

Reign supports FSE. Create templates with WBcom Essential blocks:

**Header Template**
```
[Header Bar]
  - Logo
  - Smart Menu
  - Search
  - Cart (if WooCommerce)
  - User area
```

**Homepage Template**
```
[Slider]
[Members Carousel]
[Groups Grid]
[CTA Box]
[Footer]
```

### Block Patterns

Create reusable patterns:

**Community Stats Pattern**
```
<!-- wp:columns {"columns":4} -->
<!-- wp:column -->
<!-- wp:wbcom/counter {"number":"1000","suffix":"+","title":"Members"} /-->
<!-- /wp:column -->
<!-- ... more columns ... -->
<!-- /wp:columns -->
```

---

## Social Marketplace Setup

Reign excels at combining BuddyPress and WooCommerce.

### Member Stores

If using Dokan, WC Vendors, or similar:

```
[Product Grid - Show vendor products]
[Members Grid - Filter by vendor role]
```

### Community Commerce

```
[Header Bar - Shows cart + notifications + messages]
[Product Grid - Community products]
[Members Carousel - Top sellers]
[Testimonial Carousel - Customer reviews]
```

### Membership Site

```
[Pricing Table - Membership tiers]
[Members Grid - Member type filtering]
[Product Grid - Member-only products]
```

---

## Theme Color System

### Reign Color Variables

Reign defines these CSS variables:

| Variable | Used For |
|----------|----------|
| `--flavor-primary` | Primary brand color |
| `--flavor-secondary` | Secondary actions |
| `--flavor-tertiary` | Accents |
| `--flavor-dark` | Dark backgrounds |
| `--flavor-light` | Light backgrounds |
| `--flavor-text` | Body text |
| `--flavor-heading` | Headings |

### Using Theme Colors

1. Design in **Appearance > Customize > Colors**
2. Enable **"Use Theme Colors"** in any WBcom Essential block
3. Colors automatically sync

### Custom Color Schemes

Reign includes pre-built schemes:
- Default (Blue)
- Dark Mode
- Green Nature
- Purple Creative
- Orange Energy
- Custom (your colors)

---

## Advanced Integrations

### BuddyPress Components

| Component | WBcom Essential Blocks |
|-----------|----------------------|
| Members | Members Grid, Members Lists, Members Carousel |
| Groups | Groups Grid, Groups Lists, Group Carousel |
| Activity | Dashboard Intro |
| Messages | Header Bar (messages icon) |
| Notifications | Header Bar (bell icon) |
| Friends | Members Carousel (friends filter) |

### WooCommerce Components

| Component | WBcom Essential Blocks |
|-----------|----------------------|
| Products | Product Grid |
| Cart | Mini Cart, Header Bar cart |
| Reviews | Testimonial Carousel |
| Categories | Icon Box (link to categories) |

### LearnDash Components

| Component | WBcom Essential Blocks |
|-----------|----------------------|
| Courses | Post Carousel (sfwd-courses) |
| Lessons | Accordion |
| Progress | Progress Bar |
| Instructors | Team Carousel |

### bbPress Components

| Component | WBcom Essential Blocks |
|-----------|----------------------|
| Forums | Forums block |
| Topics | Forums Activity |
| Replies | Forums Activity |

---

## Page Templates

### Community Homepage

```
[Full Width Section - Hero Slider]
[Container Section - Welcome + Stats]
[Full Width Section - Members Carousel]
[Container Section - Groups Grid (3 cols)]
[Full Width Section - Forums Activity]
[Container Section - CTA Box]
```

### Marketplace Homepage

```
[Full Width Section - Product Slider]
[Container Section - Categories (Icon Boxes)]
[Full Width Section - Featured Products Grid]
[Container Section - Seller Profiles (Members Carousel)]
[Full Width Section - Testimonials]
[Container Section - CTA Box]
```

### Learning Homepage

```
[Full Width Section - Course Slider]
[Container Section - Course Categories]
[Full Width Section - Popular Courses Carousel]
[Container Section - Instructors (Team Carousel)]
[Full Width Section - Student Testimonials]
[Container Section - Pricing Tables]
```

---

## Performance Tips

### Image Optimization

- Use Reign's lazy loading
- Optimize images before upload
- Use WebP format when possible

### Carousel Limits

| Block | Recommended Limit |
|-------|-------------------|
| Members Carousel | 6-8 items |
| Product Grid | 8-12 items |
| Post Carousel | 4-6 items |
| Testimonials | 4-6 items |

### Caching

Reign works well with:
- LiteSpeed Cache
- WP Rocket
- W3 Total Cache

**Important**: Configure to exclude:
- User-specific content
- Cart pages
- Checkout pages
- BuddyPress activity

---

## Troubleshooting

### Widgets Not Appearing in Elementor

1. Clear Elementor cache: **Elementor > Tools > Regenerate CSS**
2. Deactivate/reactivate WBcom Essential
3. Check for plugin conflicts

### Block Styles Not Matching

1. Enable **"Use Theme Colors"** in block settings
2. Clear browser cache
3. Check Reign Customizer colors are set

### BuddyPress Content Not Showing

1. Verify BuddyPress is activated
2. Check required components are enabled
3. Ensure you're testing with appropriate user role

---

## Resources

- **Reign Theme**: [wbcomdesigns.com/downloads/reign-buddypress-theme/](https://wbcomdesigns.com/downloads/reign-buddypress-theme/)
- **Documentation**: [docs.wbcomdesigns.com/docs/wb-reign-theme/](https://docs.wbcomdesigns.com/docs/wb-reign-theme/)
- **Video Tutorials**: [YouTube Channel](https://youtube.com/wbcomdesigns)
- **Support**: [Support Portal](https://wbcomdesigns.com/support/)
