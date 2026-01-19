# WBcom Essential + BuddyX Theme

The ultimate combination for building community websites with WordPress and BuddyPress.

---

## Overview

**BuddyX** is a free, community-focused WordPress theme designed specifically for BuddyPress sites. When combined with WBcom Essential, you get:

- 45 Gutenberg blocks optimized for community layouts
- 43 Elementor widgets with seamless theme integration
- Automatic theme color inheritance
- Pre-built community page templates
- BuddyPress-specific blocks and widgets

---

## Quick Setup

### Step 1: Install BuddyX Theme

1. Go to **Appearance > Themes > Add New**
2. Search for "BuddyX"
3. Click **Install** then **Activate**

### Step 2: Install WBcom Essential

1. Go to **Plugins > Add New**
2. Upload `wbcom-essential.zip`
3. Click **Install Now** then **Activate**

### Step 3: Enable Theme Colors

WBcom Essential automatically detects BuddyX theme colors. To use them:

1. Edit any page with Gutenberg or Elementor
2. Add a WBcom Essential block/widget
3. In the Color Settings panel, enable **"Use Theme Colors"**
4. Colors will now match your BuddyX customizer settings

---

## Recommended Blocks for BuddyX

### Header Section

Build a stunning community header:

| Block | Purpose | BuddyX Feature |
|-------|---------|----------------|
| **Header Bar** | User navigation | Shows login/profile, notifications, messages, cart |
| **Branding** | Site logo | Inherits BuddyX logo settings |
| **Smart Menu** | Navigation | Supports BuddyX mega menu |

**Example Header Layout:**
```
[Branding] [Smart Menu] [Header Bar]
```

### Community Homepage

| Block | Purpose | Best For |
|-------|---------|----------|
| **Members Carousel** | Showcase active members | Homepage, sidebar |
| **Members Grid** | Member directory preview | Homepage sections |
| **Groups Carousel** | Featured groups | Homepage, community pages |
| **Groups Grid** | Group directory preview | Community hub |
| **Forums Activity** | Recent discussions | Homepage, dashboard |

### Member Pages

| Block | Purpose | Location |
|-------|---------|----------|
| **Profile Completion** | Encourage profile setup | Dashboard, profile sidebar |
| **Dashboard Intro** | Welcome returning users | Member dashboard |
| **Members Lists** | Full member directory | Members page |

### Group Pages

| Block | Purpose | Location |
|-------|---------|----------|
| **Groups Lists** | Full group directory | Groups page |
| **Group Carousel** | Featured/active groups | Sidebar, homepage |
| **Forums** | Group discussions | Group single page |

---

## Theme Color Variables

BuddyX defines these CSS variables that WBcom Essential blocks use:

| Variable | BuddyX Setting | Used For |
|----------|----------------|----------|
| `--flavor-primary` | Primary Color | Buttons, links, accents |
| `--flavor-secondary` | Secondary Color | Secondary buttons, hover |
| `--flavor-tertiary` | Accent Color | Highlights, icons |
| `--flavor-base` | Background | Block backgrounds |
| `--flavor-contrast` | Text Color | Content text |

### Customizer Locations

1. **Appearance > Customize > Colors**
   - Primary Color
   - Secondary Color
   - Accent Color

2. **Appearance > Customize > Typography**
   - Heading Font
   - Body Font

---

## Page Templates

### Community Homepage

Create a community homepage using these blocks:

```
[Hero Section - Post Slider or Slider]
[Members Carousel - "Active Members"]
[Groups Grid - 3 columns, featured groups]
[Forums Activity - Recent discussions]
[CTA Box - "Join Our Community"]
```

### Members Directory

```
[Heading - "Our Members"]
[Members Grid - Filterable by member type]
[Pagination]
```

### Groups Directory

```
[Heading - "Community Groups"]
[Groups Grid - With search and filters]
[Pagination]
```

### User Dashboard

```
[Dashboard Intro - Welcome message]
[Profile Completion - Progress bar]
[Forums Activity - User's recent posts]
[Members Carousel - Friends/connections]
```

---

## BuddyPress-Specific Settings

### Members Carousel/Grid

| Setting | Recommended Value | Why |
|---------|-------------------|-----|
| **Per Page** | 8-12 | Balances display and performance |
| **Order By** | `active` | Shows engaged members |
| **Show** | Avatar, Name, Member Type | Essential info |
| **Member Type** | Filter specific types | Highlight verified/premium members |

### Groups Carousel/Grid

| Setting | Recommended Value | Why |
|---------|-------------------|-----|
| **Per Page** | 6-9 | Groups have more content |
| **Order By** | `active` or `popular` | Shows thriving groups |
| **Show** | Avatar, Name, Member Count | Social proof |
| **Group Type** | Filter if using types | Categorize by purpose |

### Header Bar

| Setting | Recommended for BuddyX |
|---------|------------------------|
| **Show Search** | Yes - uses BuddyX search |
| **Show Notifications** | Yes - BP notifications |
| **Show Messages** | Yes - BP messages |
| **Show Cart** | If using WooCommerce |
| **Dark Mode Toggle** | If BuddyX dark mode enabled |

---

## Styling Tips

### Match BuddyX Card Style

BuddyX uses rounded cards with subtle shadows. Configure blocks:

```
Border Radius: 8px
Box Shadow: 0 2px 8px rgba(0,0,0,0.08)
Background: var(--flavor-base)
```

### Consistent Spacing

BuddyX uses 30px section spacing. Set block margins:

```
Margin Top: 30px
Margin Bottom: 30px
```

### Typography Harmony

Use BuddyX's heading styles:

```
H1: 2.5rem (40px)
H2: 2rem (32px)
H3: 1.5rem (24px)
```

---

## Common Patterns

### Featured Members Section

```html
<!-- Gutenberg -->
[columns]
  [column 2/3]
    [heading] Meet Our Community [/heading]
    [paragraph] Discover amazing people... [/paragraph]
  [/column]
  [column 1/3]
    [button] View All Members [/button]
  [/column]
[/columns]
[members-carousel slides="4" order="active"]
```

### Community Stats

```html
[columns 4]
  [counter prefix="" number="1000" suffix="+" title="Members"]
  [counter prefix="" number="50" suffix="+" title="Groups"]
  [counter prefix="" number="5000" suffix="+" title="Discussions"]
  [counter prefix="" number="10000" suffix="+" title="Messages"]
[/columns]
```

### Call to Action

```html
[cta-box
  title="Ready to Join?"
  description="Become part of our thriving community today."
  button_text="Sign Up Free"
  button_url="/register"
]
```

---

## Troubleshooting

### Blocks Don't Match Theme Colors

1. Check **Use Theme Colors** is enabled in block settings
2. Clear any caching plugins
3. Verify BuddyX Customizer colors are set

### BuddyPress Blocks Not Appearing

1. Ensure BuddyPress is activated
2. Check that required BP components are enabled
3. Refresh the block editor

### Header Bar Not Showing User Menu

1. User must be logged in
2. Check BuddyPress profile component is active
3. Verify menu items are enabled in block settings

---

## Resources

- **BuddyX Theme**: [wbcomdesigns.com/downloads/buddyx-theme/](https://wbcomdesigns.com/downloads/buddyx-theme/)
- **BuddyX Documentation**: [docs.wbcomdesigns.com/docs/buddyx-free-theme/](https://docs.wbcomdesigns.com/docs/buddyx-free-theme/)
- **BuddyPress Setup**: [BuddyPress Integration Guide](../integrations/buddypress.md)
- **Support**: [wbcomdesigns.com/support/](https://wbcomdesigns.com/support/)
