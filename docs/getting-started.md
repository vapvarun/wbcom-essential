# Getting Started with WBcom Essential

Welcome to WBcom Essential. This guide walks you through installation, first steps, and building your first page with widgets and blocks.

## What You Get

WBcom Essential adds two sets of tools to your WordPress site:

| Tool Type | Count | Best For |
|-----------|-------|----------|
| Elementor Widgets | 43 | Visual page building with drag-and-drop |
| Gutenberg Blocks | 45 | Native WordPress editor, Full Site Editing |

Both work independently. Use Elementor widgets if you prefer the Elementor page builder. Use Gutenberg blocks if you work with the native WordPress editor.

---

## Installation

### Requirements

| Requirement | Minimum Version |
|-------------|-----------------|
| WordPress | 6.0 |
| PHP | 8.0 |
| MySQL | 5.7+ or MariaDB 10.3+ |

### Install the Plugin

**From WordPress Dashboard:**

1. Go to **Plugins → Add New**
2. Click **Upload Plugin**
3. Select the `wbcom-essential.zip` file
4. Click **Install Now**, then **Activate**

**Via FTP:**

1. Extract the zip file
2. Upload the `wbcom-essential` folder to `/wp-content/plugins/`
3. Go to **Plugins** in WordPress admin
4. Find "WBcom Essential" and click **Activate**

### Verify Installation

After activation:

- **For Elementor:** Edit any page → Open widget panel → Look for "Starter Templates" category
- **For Gutenberg:** Add a new block → Search "Starter Pack" → You should see 7 block categories

---

## Your First Page with Elementor

Let's build a simple landing page using Elementor widgets.

### Step 1: Create a New Page

1. Go to **Pages → Add New**
2. Enter a title like "Welcome"
3. Click **Edit with Elementor**

### Step 2: Add a Hero Section

1. Drag a **Section** onto the canvas
2. Set the layout to full width
3. From the widget panel, find **Starter Templates → Heading**
4. Drag the Heading widget into your section
5. Type your headline and adjust the typography

### Step 3: Add a Team Section

1. Add another section below
2. Find **Starter Templates → Team Carousel**
3. Drag it into the section
4. Add team members: name, role, photo, and social links
5. Adjust the carousel settings (slides per view, autoplay)

### Step 4: Add Testimonials

1. Add a new section
2. Find **Starter Templates → Testimonial Carousel**
3. Add customer testimonials with ratings
4. Style the cards to match your brand

### Step 5: Publish

Click **Publish** to make your page live.

---

## Your First Page with Gutenberg

Let's build the same page using Gutenberg blocks.

### Step 1: Create a New Page

1. Go to **Pages → Add New**
2. Enter a title

### Step 2: Add Blocks

1. Click the **+** button to add a block
2. Search for "Starter Pack" or browse categories:
   - **Starter Pack - Header** for branding and navigation
   - **Starter Pack - Design** for visual elements
   - **Starter Pack - Content** for text and interactive content

### Step 3: Configure Block Settings

Each block has settings in the sidebar:

1. Select your block
2. Look at the right sidebar for **Block** settings
3. Adjust colors, typography, spacing
4. Enable **Use Theme Colors** to match your theme automatically

### Step 4: Use Theme Colors

This is a key feature. Instead of picking colors manually:

1. Select any block
2. In the sidebar, find **Color Settings**
3. Enable **Use Theme Colors**
4. The block now inherits colors from your theme

This keeps your site consistent without manual color matching.

---

## Recommended Combinations

### For Community Sites (BuddyPress)

| Purpose | Widget/Block |
|---------|--------------|
| Homepage intro | Dashboard Intro |
| Show active members | Members Carousel |
| Display groups | Groups Grid |
| User navigation | Header Bar |

### For Online Stores (WooCommerce)

| Purpose | Widget/Block |
|---------|--------------|
| Featured products | Product Grid |
| Shopping cart | Mini Cart |
| Customer testimonials | Testimonial Carousel |
| Pricing plans | Pricing Table |

### For Business Sites

| Purpose | Widget/Block |
|---------|--------------|
| Hero section | Slider or Heading |
| Team showcase | Team Carousel |
| Client logos | Portfolio Grid |
| Service pricing | Pricing Table |
| Contact form | Login Form (for members) |

---

## Tips for Success

### Performance

- **Limit carousel items** to 6-8 for fast loading
- **Optimize images** before uploading
- **Use lazy loading** where available in carousel settings

### Consistency

- **Enable "Use Theme Colors"** on all blocks for a unified look
- **Use consistent typography** across similar elements
- **Stick to 2-3 heading styles** throughout your site

### Mobile Experience

- **Preview on mobile** before publishing
- **Reduce columns** on mobile (4 → 2 columns)
- **Test touch interactions** for carousels and accordions

---

## Next Steps

- [Block Reference](./blocks-guide.md) - Detailed guide to all 45 blocks
- [Theme Colors Guide](./features/theme-colors.md) - Master the theme colors feature
- [BuddyPress Integration](./integrations/buddypress.md) - Build community pages
- [FAQ & Troubleshooting](./faq.md) - Common issues and fixes

---

## Need Help?

- **Documentation:** https://docs.wbcomdesigns.com/wbcom-essential/
- **Support:** https://wbcomdesigns.com/support/
