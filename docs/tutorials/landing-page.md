# Building a Landing Page

Create a conversion-focused landing page using WBcom Essential blocks. This tutorial covers hero sections, feature grids, testimonials, and call-to-action sections.

---

## What You'll Build

A complete landing page with:

1. Hero section with animated text
2. Feature highlights with icon boxes
3. Testimonials carousel
4. Pricing table comparison
5. Final call-to-action

**Time required**: 30-45 minutes

---

## Before You Start

You'll need:

- WordPress 6.0+
- WBcom Essential activated
- A page to work with (Pages → Add New)

---

## Section 1: Hero Section

### Option A: Slider Hero (Gutenberg)

1. Add a **Slider** block
2. Add 2-3 slides with:
   - Background image
   - Heading text
   - Button link
3. Settings to adjust:
   - Slide height: 80vh
   - Autoplay: On (5 seconds)
   - Transition: Fade
   - Navigation: Dots only

### Option B: Text Rotator Hero (Gutenberg)

Create a dynamic headline that cycles through words:

1. Add a **Group** block for the hero container
2. Inside, add a **Text Rotator** block
3. Configure:
   - Before text: "We help businesses"
   - Rotating words: "grow", "scale", "succeed"
   - After text: "online"
   - Animation: Type effect
4. Add a **Buttons** block below for CTAs

### Option C: Elementor Hero

1. Add a Section with full-width layout
2. Add the **Slider** widget
3. Configure slides with:
   - Background image
   - Heading, subheading, button
   - Overlay for text readability

---

## Section 2: Feature Highlights

### Using Icon Boxes (Gutenberg)

1. Add a **Columns** block (3 columns)
2. In each column, add an **Icon Box** block
3. Configure each:
   - Icon: Choose relevant icon
   - Title: Feature name
   - Description: 2-3 sentences
   - Link: Optional learn more link
4. Style settings:
   - Icon position: Top
   - Alignment: Center
   - Enable Theme Colors for consistency

### Using Flip Boxes (More Interactive)

1. Add a **Columns** block (3 columns)
2. In each column, add a **Flip Box** block
3. Configure:
   - **Front**: Icon and title
   - **Back**: Full description and button
   - Flip direction: Horizontal
4. This creates an interactive experience where users hover to see more

### Elementor Alternative

1. Add a Section with 3 columns
2. Use the **Flip Box** widget in each
3. Configure front (teaser) and back (details) for each feature

---

## Section 3: Social Proof

### Testimonial Carousel (Gutenberg)

1. Add a **Testimonial Carousel** block
2. Add 4-6 testimonials:
   - Quote text (2-3 sentences)
   - Author name
   - Role/Company
   - Avatar (optional)
   - Star rating
3. Carousel settings:
   - Slides per view: 3 (desktop), 1 (mobile)
   - Autoplay: On (6 seconds)
   - Show navigation: Yes
4. Enable Theme Colors

### Single Featured Testimonial

For a hero testimonial:

1. Add a **Testimonial** block
2. Configure:
   - Quote: Your best customer quote
   - Author and role
   - Large avatar
   - 5-star rating
3. Center alignment works well here

### Counter Stats Section

Add credibility numbers:

1. Add a **Columns** block (4 columns)
2. In each, add a **Counter** block
3. Configure each:
   - End number: Your stat (1000+, 98%, etc.)
   - Prefix/Suffix: $, +, %
   - Title below: "Happy Customers", etc.
   - Animation duration: 2000ms

Example counters:
- "500+" with "Projects Completed"
- "98%" with "Client Satisfaction"
- "15+" with "Years Experience"
- "24/7" with "Support Available"

---

## Section 4: Pricing Tables

### Pricing Table Comparison (Gutenberg)

1. Add a **Columns** block (3 columns)
2. In each column, add a **Pricing Table** block
3. Configure each plan:

**Basic Plan:**
- Title: "Starter"
- Price: $29
- Period: /month
- Features: 5-7 items with checkmarks
- Button: "Get Started"

**Popular Plan:**
- Title: "Professional"
- Price: $79
- Period: /month
- Features: 8-10 items
- Button: "Get Started"
- Enable "Featured" ribbon

**Enterprise Plan:**
- Title: "Enterprise"
- Price: $199
- Period: /month
- Features: All features
- Button: "Contact Sales"

4. Style the middle column to stand out (larger, highlighted)

### Elementor Alternative

1. Add a Section with 3 columns
2. Use the **Pricing Table** widget in each
3. Configure similarly, using Elementor's styling controls

---

## Section 5: Final CTA

### CTA Box (Gutenberg)

1. Add a **CTA Box** block
2. Configure:
   - Heading: "Ready to Get Started?"
   - Description: "Join thousands of satisfied customers..."
   - Button text: "Start Free Trial"
   - Button link: Your signup page
3. Style settings:
   - Background color: Your primary color
   - Text color: White
   - Full-width layout

### With Countdown (Urgency)

Add urgency with a limited-time offer:

1. Add a **Group** block
2. Inside, add:
   - **Heading**: "Special Launch Offer"
   - **Countdown** block: Set to your deadline
   - **CTA Box**: With your offer details
3. This creates urgency that drives conversions

---

## Complete Page Structure

```
[Full-width Hero]
├── Slider or Text Rotator
├── Headline + Subheadline
└── CTA Buttons

[Feature Highlights]
├── Section Heading
└── 3 Icon Boxes or Flip Boxes

[Social Proof]
├── Section Heading
├── Counter Stats (4 columns)
└── Testimonial Carousel

[Pricing]
├── Section Heading
└── 3 Pricing Tables

[Final CTA]
├── CTA Box with Button
└── Optional: Countdown Timer
```

---

## Mobile Optimization

### Check Responsive Settings

1. Preview your page in mobile view
2. Adjust column layouts:
   - 3 columns → 1 column on mobile
   - 4 columns → 2 columns on tablet, 1 on mobile
3. Check text sizes are readable
4. Verify buttons are tappable (minimum 44px height)

### Carousel Settings for Mobile

- Reduce slides per view
- Enable touch/swipe
- Make navigation dots larger
- Consider disabling autoplay on mobile

---

## Tips for High Conversion

### Above the Fold

- Clear headline explaining value
- Single, prominent CTA button
- Social proof element (testimonial or stat)

### Trust Signals

- Customer logos
- Security badges
- Testimonials with real names and photos
- Statistics (customers, projects, years)

### Clear CTAs

- Use contrasting colors for buttons
- Action-oriented text ("Get Started" not "Submit")
- Multiple CTAs throughout the page
- Same CTA repeated in hero and footer

### Page Speed

- Optimize all images before uploading
- Limit carousel items to 6-8
- Use lazy loading where available
- Test with Google PageSpeed Insights

---

## Next Steps

- [Building a Community Site](./community-site.md) - Member directories and groups
- [Setting Up an Online Store](./online-store.md) - Product showcases and cart
- [Block Reference](../blocks-guide.md) - All block settings

