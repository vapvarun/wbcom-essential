# Setting Up an Online Store

Build WooCommerce store pages with product showcases, customer reviews, and shopping cart features using WBcom Essential.

---

## What You'll Build

A complete store frontend with:

1. Homepage with featured products
2. Product category pages
3. Sales and promotions sections
4. Customer reviews showcase
5. Mini cart in header

**Time required**: 30-45 minutes

**Requirements**:
- WordPress 6.0+
- WooCommerce 7.0+ (activated)
- WBcom Essential (activated)
- At least a few products published

---

## Part 1: Store Homepage

### Hero Banner

Start with a promotional banner:

**With Elementor:**
1. Add an **Add Banner** widget
2. Configure:
   - Banner image: Product or lifestyle photo
   - Heading: "Summer Sale - 30% Off"
   - Subheading: "Limited time only"
   - Button: "Shop Now" → Sale category

**With Gutenberg:**
1. Add a **Slider** block
2. Create slides for:
   - Current promotion
   - New arrivals
   - Best sellers

### Featured Products Section

1. Add a **Heading** block: "Featured Products"

**With Gutenberg (Product Grid):**
1. Add a **Product Grid** block
2. Settings:
   - Columns: 4
   - Products count: 8
   - Show featured only: Yes
   - Show price: Yes
   - Show rating: Yes
   - Show add to cart: Yes
   - Image ratio: Square

**With Elementor (Universal Product):**
1. Add a **Universal Product** widget
2. Settings:
   - Layout: Grid
   - Products: Featured
   - Columns: 4
   - Show price, rating, add to cart: Yes

### Category Tabs

Let visitors browse by category:

**With Elementor:**
1. Add a **Product Tab** widget
2. Configure:
   - Tab categories: Your main categories
   - Products per tab: 8
   - Columns: 4
   - Show price and add to cart

**With Gutenberg:**
1. Add an **Advanced Tabs** block
2. Create tabs for each category
3. In each tab, add a **Product Grid** block filtered to that category

### Customer Reviews

Build trust with customer testimonials:

**With Elementor:**
1. Add a **Customer Review** widget
2. Settings:
   - Review source: Top Rated
   - Layout: Carousel
   - Show rating: Yes
   - Show verified badge: Yes

**With Gutenberg:**
1. Add a **Testimonial Carousel** block
2. Add real customer reviews with:
   - Quote text
   - Customer name
   - Star rating
   - Avatar (optional)

### On Sale Section

Highlight discounted products:

1. Add a **Heading** block: "On Sale Now"

**Gutenberg:**
1. Add a **Product Grid** block
2. Settings:
   - Show on sale only: Yes
   - Columns: 4
   - Products count: 4

**Elementor:**
1. Add a **Universal Product** widget
2. Settings:
   - Products: On Sale
   - Layout: Carousel
   - Enable prominent sale badges

---

## Part 2: Category Pages

### Category Banner

1. Add a full-width image or **Slider** block
2. Feature category-specific imagery
3. Include category name as overlay text

### Product Grid

1. Add a **Product Grid** block (Gutenberg) or **Universal Product** widget (Elementor)
2. Settings:
   - Filter to specific category
   - Columns: 3 or 4
   - Enable pagination
   - Order by: Newest or Best Selling

### Related Categories

After the product grid:
1. Add a **Heading** block: "You Might Also Like"
2. Add links to related categories

---

## Part 3: Mini Cart Setup

Add a cart icon to your header that shows items and total.

### With Gutenberg

1. Edit your header template (Site Editor → Header)
2. Add a **Mini Cart** block
3. Settings:
   - Icon: Cart or Bag
   - Show count: Yes
   - Show total: Yes
   - Dropdown position: Right

### With Elementor

If using Elementor's Theme Builder:
1. Edit your header template
2. Add the **Header Bar** widget
3. Enable "Show Cart" option

---

## Part 4: Promotional Banners

### Sale Announcement Banner

**With Elementor:**
1. Add an **Add Banner** widget
2. Configure:
   - Image: Sale-themed background
   - Heading: "50% OFF Everything"
   - Subheading: "This Weekend Only"
   - Button: "Shop Sale" → Sale category

### Seasonal Promotion

Create urgency with a countdown:

1. Add a **Countdown** block
2. Set target date to sale end
3. Style to match your sale theme
4. Add CTA button below

---

## Complete Homepage Structure

```
[Hero Section]
├── Slider or Add Banner
└── Main promotion

[Featured Products]
├── Heading: "Featured Products"
└── Product Grid (featured filter)

[Category Browser]
└── Product Tab widget (by category)

[Social Proof]
├── Heading: "What Customers Say"
└── Customer Reviews or Testimonial Carousel

[Sale Section]
├── Heading: "On Sale Now"
├── Countdown (optional)
└── Product Grid (on sale filter)

[Final CTA]
└── Add Banner (subscribe/promo)
```

---

## WooCommerce Block Settings Reference

### Product Grid Block (Gutenberg)

| Setting | Options | Recommendation |
|---------|---------|----------------|
| Columns | 1-6 | 4 for desktop |
| Products Count | 1-50 | 8-12 |
| Category | All or specific | Filter for sections |
| Order By | Date, Price, Rating, Sales | Varies by section |
| Show On Sale | Yes/No | Yes for sale sections |
| Show Featured | Yes/No | Yes for homepage |
| Show Price | Yes/No | Always Yes |
| Show Rating | Yes/No | Yes (builds trust) |
| Show Add to Cart | Yes/No | Yes |
| Image Ratio | Auto, Square, Portrait, Landscape | Square for consistency |

### Universal Product Widget (Elementor)

| Setting | Options | Recommendation |
|---------|---------|----------------|
| Layout | Grid, List, Carousel | Grid for directories, Carousel for highlights |
| Products | Category, Tag, Featured, On Sale, Best Sellers | Match section purpose |
| Columns | 1-6 | 4 for desktop |
| Quick View | Yes/No | Yes (improves UX) |

---

## Styling Tips

### Enable Theme Colors

1. Select any WooCommerce block
2. Open Color Settings
3. Enable "Use Theme Colors"
4. Block matches your theme automatically

### Consistent Product Cards

Match styling across all product displays:
- Same border radius
- Same shadow
- Same image aspect ratio
- Same button style

### Sale Badge Styling

Make sale badges prominent:
```css
/* Custom sale badge */
.wbcom-essential-product-grid__sale-badge {
  background: #ff0000;
  font-weight: bold;
  padding: 5px 10px;
}
```

### Add to Cart Buttons

Make buttons prominent:
```css
/* Larger add to cart */
.wbcom-essential-product-grid .add_to_cart_button {
  padding: 12px 24px;
  font-size: 14px;
}
```

---

## Mobile Optimization

### Column Adjustments

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Product Grid | 4 cols | 2 cols | 2 cols |
| Carousel items | 4 | 2 | 1 |

### Mobile Cart

The Mini Cart block:
- Works on mobile
- Opens as dropdown or modal
- Touch-friendly controls

### Product Images

- Use square aspect ratio for consistency
- Images automatically resize on mobile
- Test that product details are readable

---

## Troubleshooting

### Products Not Showing

1. Check products are published (not draft)
2. Verify products are "In Stock"
3. Check filter settings aren't too restrictive
4. Clear caching plugins

### Add to Cart Not Working

1. Check browser console for JavaScript errors
2. Verify WooCommerce AJAX is enabled
3. Test with default theme
4. Disable other plugins to find conflicts

### Styling Issues

1. Clear all caches after style changes
2. Regenerate Elementor CSS if using widgets
3. Check for CSS conflicts with theme
4. Use browser inspector to identify overrides

---

## Related Documentation

- [WooCommerce Integration](../integrations/woocommerce.md) - All WooCommerce blocks and widgets
- [Block Reference](../blocks-guide.md) - Complete block settings
- [Building a Landing Page](./landing-page.md) - Marketing pages
- [Theme Colors Guide](../features/theme-colors.md) - Color inheritance

