# Common Mistakes & How to Avoid Them

Learn from these common mistakes to build better sites faster!

---

## Mistake #1: Not Using Theme Colors

### The Problem

Manually setting colors on every block, then needing to change your brand color and having to update 50+ blocks.

### The Solution

1. Enable **"Use Theme Colors"** on every block
2. Set your colors once in **Appearance > Customize > Colors**
3. All blocks automatically update when you change theme colors

### How to Enable

Every WBcom Essential block has a "Use Theme Colors" toggle in the Color Settings panel:

```
Block Settings > Color Settings > Use Theme Colors: ON
```

**Time Saved**: Hours of manual color updates when rebranding

---

## Mistake #2: Too Many Carousel Items

### The Problem

Adding 30+ items to a carousel, causing slow page load and poor performance.

### The Solution

| Block Type | Recommended Max |
|------------|-----------------|
| Members Carousel | 12 |
| Groups Carousel | 12 |
| Posts Carousel | 8 |
| Testimonials | 6 |
| Team Carousel | 8 |

### Why It Matters

- Each item loads images and data
- Mobile users on slow connections suffer most
- Google penalizes slow sites in search rankings

### Better Alternative

Use **pagination** or **"Load More"** buttons for large collections instead of cramming everything into one carousel.

---

## Mistake #3: Forgetting to Enable Loop

### The Problem

Carousel stops at the end, leaving visitors confused about how to see more items.

### The Solution

Always enable **Loop** in carousel settings:

```
Block Settings > Carousel Settings > Loop: ON
```

This creates infinite scrolling where the carousel continues smoothly.

### Also Enable

- **Autoplay**: Keeps carousel moving automatically
- **Pause on Hover**: Stops when user hovers (shows they have control)

---

## Mistake #4: Ignoring Mobile Preview

### The Problem

Building beautiful desktop layouts that look terrible on phones.

### The Solution

**Always preview on mobile before publishing:**

1. Click "Preview" in the editor
2. Use browser DevTools (F12) > Toggle Device Toolbar
3. Check at 375px width (iPhone size)

### What to Check

- [ ] Text is readable without zooming
- [ ] Buttons are tappable (not too small)
- [ ] Carousels swipe smoothly
- [ ] No horizontal scrolling
- [ ] Images don't overflow

---

## Mistake #5: Wrong Block for the Job

### The Problem

Using Members Grid when you wanted Members Carousel, or vice versa.

### The Solution

| Want This | Use This |
|-----------|----------|
| Sliding showcase | **Carousel** blocks |
| Full directory page | **Grid** blocks |
| Compact, detailed list | **Lists** blocks |

### Quick Reference

- **Carousel** = Moving, engaging, limited items
- **Grid** = Static, filterable, many items
- **List** = Compact, detailed info, easy scanning

---

## Mistake #6: No Call-to-Action

### The Problem

Beautiful pages that don't tell visitors what to do next.

### The Solution

Every important page needs a clear CTA:

```
[CTA Box]
Title: "Ready to Get Started?"
Button: "Sign Up Free" or "Contact Us"
```

### CTA Placement Tips

- **End of homepage sections**: Keep visitors engaged
- **After testimonials**: Social proof leads to action
- **Below pricing tables**: Make it easy to buy
- **In the header**: Always visible option

---

## Mistake #7: Inconsistent Styling

### The Problem

Each block has different colors, fonts, and spacing, making the site look unprofessional.

### The Solution

1. **Use Theme Colors** toggle (mentioned above)
2. **Stick to 2-3 colors** (primary, secondary, accent)
3. **Use consistent spacing** (30px between sections is standard)
4. **Match your theme** (BuddyX, BuddyX Pro, or Reign)

### Quick Consistency Check

- [ ] All headings use the same style
- [ ] Button colors match across blocks
- [ ] Spacing between sections is even
- [ ] Fonts are consistent

---

## Mistake #8: Slow Images

### The Problem

Uploading huge images (5MB+) that slow down your site.

### The Solution

Before uploading images:

1. **Resize**: Max 1920px wide for full-width, 800px for content
2. **Compress**: Use TinyPNG or ShortPixel
3. **Format**: Use WebP when possible

### Recommended Sizes

| Usage | Max Width | File Size |
|-------|-----------|-----------|
| Hero/Slider | 1920px | Under 200KB |
| Grid thumbnails | 400px | Under 50KB |
| Avatars | 150px | Under 20KB |

---

## Mistake #9: Not Testing with Real Content

### The Problem

Using placeholder text and images, then the design breaks with real content.

### The Solution

Test with realistic content:

- **Names**: Use real-length names (not just "John")
- **Testimonials**: Use full quotes (not "Great!")
- **Posts**: Use actual post titles and excerpts
- **Products**: Use real product data

### What Breaks with Real Content

- Long names overflow cards
- Short testimonials look empty
- Product titles wrap awkwardly
- Images have wrong aspect ratios

---

## Mistake #10: Forgetting BuddyPress/WooCommerce Activation

### The Problem

"Why don't I see the Members Grid block?"

### The Solution

BuddyPress and WooCommerce blocks **only appear when those plugins are active**:

| Plugin | Blocks Available When Active |
|--------|------------------------------|
| BuddyPress | Members, Groups, Forums, Dashboard Intro, Profile Completion, Header Bar |
| WooCommerce | Product Grid, Mini Cart, Header Bar (cart) |

### Checklist

1. Install and activate BuddyPress/WooCommerce
2. Enable required components (Settings > BuddyPress)
3. Refresh the editor
4. Blocks now appear

---

## Mistake #11: Overloading the Homepage

### The Problem

Every block on the homepage: Members Carousel + Groups Grid + Posts Carousel + Products + Testimonials + Forum Activity + Countdown + CTA...

### The Solution

Homepage should be **focused**, not exhaustive:

**Recommended Homepage Structure:**
1. Hero section (Slider or large image)
2. Brief intro (what your site is about)
3. 1-2 content showcases (Members OR Products)
4. Social proof (Testimonials)
5. Clear CTA

**Move to other pages:**
- Full member directory → Members page
- All products → Shop page
- Forum activity → Community page

---

## Mistake #12: Ignoring Performance

### The Problem

Site takes 10+ seconds to load because of too many heavy elements.

### The Solution

Follow these performance guidelines:

| Element | Maximum Per Page |
|---------|------------------|
| Carousels | 2-3 |
| Grids | 1-2 (with pagination) |
| Videos | 1 (lazy load) |
| Large images | 5-6 |

### Performance Boosters

- Enable lazy loading (images load as you scroll)
- Use a caching plugin (WP Rocket, LiteSpeed Cache)
- Optimize images before uploading
- Limit carousel items

---

## Quick Reference Card

Print this and keep it handy:

```
✓ Enable "Use Theme Colors" on all blocks
✓ Limit carousels to 6-12 items
✓ Always enable Loop on carousels
✓ Preview on mobile before publishing
✓ Include CTA on every important page
✓ Optimize images before uploading
✓ Test with real content, not placeholders
✓ Activate BuddyPress/WooCommerce for their blocks
✓ Focus homepage on 3-4 key elements
✓ Use consistent spacing (30px between sections)
```

---

## Need More Help?

- **[Getting Started Guide](./getting-started.md)** - Build your first page
- **[Solution Finder](./solution-finder.md)** - Find the right block
- **[Performance Guide](./features/performance.md)** - Speed up your site
- **[Support](https://wbcomdesigns.com/support/)** - Get expert help
