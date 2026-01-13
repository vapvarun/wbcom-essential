# WooCommerce Integration

WBcom Essential provides **5 Elementor widgets** and **2 Gutenberg blocks** for WooCommerce stores. Display products, reviews, and shopping cart features with full customization.

---

## Requirements

- WordPress 6.0+
- WooCommerce 7.0+ (widgets and blocks appear only when WooCommerce is active)

---

## What's Included

### Elementor Widgets (5)

| Widget | Purpose |
|--------|---------|
| **Universal Product** | Flexible product display with multiple layouts |
| **Add Banner** | Promotional banners for products/sales |
| **Customer Review** | Display product reviews |
| **Product Tab** | Products organized in tabs by category |
| **WC Testimonial** | WooCommerce-styled customer testimonials |

### Gutenberg Blocks (2)

| Block | Purpose |
|-------|---------|
| **Product Grid** | Products in customizable grid layout |
| **Mini Cart** | Shopping cart icon with dropdown |

---

## Elementor Widgets

### Universal Product Widget

The most flexible product display widget. Show products in grid, list, or carousel layouts.

**Settings:**

| Setting | Options | Purpose |
|---------|---------|---------|
| Layout | Grid, List, Carousel | Display style |
| Columns | 1-6 | Grid density |
| Products | By Category, By Tag, Featured, On Sale, Best Sellers | Product selection |
| Products Count | 1-50 | Number to display |
| Show Price | Yes/No | Display pricing |
| Show Rating | Yes/No | Star ratings |
| Show Sale Badge | Yes/No | Sale indicator |
| Show Add to Cart | Yes/No | Purchase button |
| Quick View | Yes/No | Modal preview |

**Use Cases:**

*Featured Products Section*
1. Drag Universal Product widget to page
2. Select "Featured" products
3. Set 4 columns
4. Enable price, rating, and add to cart
5. Style card backgrounds and hover effects

*Sale Banner Section*
1. Set layout to Carousel
2. Select "On Sale" products
3. Enable prominent sale badges
4. Set 3 products per view
5. Enable autoplay

*Category Showcase*
1. Set layout to Grid
2. Filter by specific category
3. Show 8 products
4. Enable quick view for faster browsing

---

### Add Banner Widget

Create promotional banners that link to products, categories, or sales pages.

**Settings:**

| Setting | Options | Purpose |
|---------|---------|---------|
| Banner Image | Media select | Background image |
| Overlay | Color + opacity | Text readability |
| Heading | Text | Main message |
| Subheading | Text | Supporting text |
| Button Text | Text | CTA label |
| Button Link | URL | Destination |
| Button Style | Filled, Outline | Button appearance |

**Use Cases:**

*Sale Announcement*
1. Add banner with bold "50% OFF" heading
2. Subheading: "Summer Sale - Limited Time"
3. Button: "Shop Now" → Sale category page
4. Overlay: Semi-transparent dark for text contrast

*Category Promotion*
1. Add banner with category image background
2. Heading: "New Arrivals"
3. Subheading: "Spring Collection 2025"
4. Button links to category

---

### Customer Review Widget

Display product reviews with ratings and customer info.

**Settings:**

| Setting | Options | Purpose |
|---------|---------|---------|
| Review Source | Specific Product, Latest, Top Rated | Which reviews |
| Layout | Grid, List, Carousel | Display style |
| Show Rating | Yes/No | Star display |
| Show Date | Yes/No | Review date |
| Show Verified Badge | Yes/No | Trust indicator |
| Excerpt Length | Number | Review truncation |

**Use Cases:**

*Product Page Reviews Section*
1. Set source to specific product
2. Use list layout
3. Show all details: rating, date, verified
4. Enable pagination for many reviews

*Homepage Social Proof*
1. Set source to "Top Rated"
2. Use carousel layout
3. Show 3 reviews at a time
4. Filter to 5-star reviews only

---

### Product Tab Widget

Products organized in tabs by category for easy browsing.

**Settings:**

| Setting | Options | Purpose |
|---------|---------|---------|
| Tab Categories | Multiple select | Which categories |
| Products Per Tab | 4-12 | Density |
| Columns | 2-6 | Grid layout |
| Show Price | Yes/No | Display pricing |
| Show Rating | Yes/No | Star ratings |
| Tab Style | Horizontal, Vertical | Tab position |

**Use Cases:**

*Category Browser*
1. Add tabs for main categories: Electronics, Clothing, Home
2. Show 8 products per tab
3. 4 columns
4. Enable price and add to cart

*Sale + New Arrivals*
1. Tab 1: "On Sale" products
2. Tab 2: "New Arrivals"
3. Tab 3: "Best Sellers"
4. Easy browsing between collections

---

### WC Testimonial Widget

Customer testimonials styled for e-commerce with optional product links.

**Settings:**

| Setting | Options | Purpose |
|---------|---------|---------|
| Testimonials | Repeater | Add multiple |
| Content | Text | Quote text |
| Author | Text | Customer name |
| Product Link | URL | Link to product purchased |
| Show Product Info | Yes/No | Display product |
| Rating | 1-5 | Star rating |
| Avatar | Image | Customer photo |

**Use Cases:**

*Product-Linked Reviews*
1. Add testimonials with product links
2. "I love this product!" → links to actual product
3. Shows product thumbnail alongside review
4. Builds trust and drives sales

*General Store Testimonials*
1. Add testimonials without product links
2. Focus on store experience
3. "Great service, fast shipping!"
4. Use carousel for multiple testimonials

---

## Gutenberg Blocks

### Product Grid Block

Display WooCommerce products in a customizable grid. Uses server-side rendering for always-fresh product data.

**Settings:**

| Setting | Options | Purpose |
|---------|---------|---------|
| Columns | 1-6 | Grid density |
| Products Count | 1-50 | Number to display |
| Category | All or specific | Filter by category |
| Order By | Date, Price, Rating, Sales | Sorting |
| Order | Ascending, Descending | Sort direction |
| Show On Sale Only | Yes/No | Sale filter |
| Show Featured Only | Yes/No | Featured filter |
| Show Price | Yes/No | Display pricing |
| Show Rating | Yes/No | Star ratings |
| Show Add to Cart | Yes/No | Purchase button |
| Image Ratio | Auto, Square, Portrait, Landscape | Image aspect |

**Use Cases:**

*Homepage Featured Products*
1. Add Product Grid block
2. Set 4 columns
3. Filter to "Featured" products
4. Show 8 products
5. Enable Theme Colors for consistent styling

*Category Page*
1. Add Product Grid block
2. Filter to specific category
3. Order by "Newest"
4. Enable pagination
5. Show all product info

*Sidebar Best Sellers*
1. Add Product Grid block
2. Set 1 column
3. Filter to "Best Selling"
4. Show 5 products
5. Compact card style

---

### Mini Cart Block

Shopping cart icon that shows item count and opens a dropdown cart preview.

**Settings:**

| Setting | Options | Purpose |
|---------|---------|---------|
| Icon | Cart, Bag, Basket | Cart icon style |
| Show Count | Yes/No | Item count badge |
| Show Total | Yes/No | Cart total in dropdown |
| Dropdown Position | Left, Right | Where dropdown opens |
| Hide When Empty | Yes/No | Show only with items |

**Use Cases:**

*Header Cart*
1. Add Mini Cart to header template
2. Use shopping bag icon
3. Show item count badge
4. Position dropdown to right
5. Enable Theme Colors

*Floating Cart Button*
1. Add Mini Cart block
2. Use sticky positioning (via CSS)
3. Show count and total
4. Fixed position bottom-right

---

## Building a Complete Store Page

### Homepage Layout

**With Elementor:**

1. **Hero Banner** - Add Banner widget with main promotion
2. **Featured Products** - Universal Product widget (Featured, Grid, 8 products)
3. **Categories** - Product Tab widget with main categories
4. **Reviews** - Customer Review widget (Top Rated, Carousel)
5. **Sale Section** - Universal Product widget (On Sale, Carousel)

**With Gutenberg:**

1. **Hero** - Cover block with CTA buttons
2. **Featured Products** - Product Grid block (Featured, 4 columns)
3. **Testimonials** - Testimonial Carousel block
4. **Sale Products** - Product Grid block (On Sale filter)

### Category Page Layout

1. **Category Banner** - Full-width image with title
2. **Product Grid** - Products filtered to category
3. **Related Categories** - Links to similar categories

### Product Page Enhancements

1. **Reviews Section** - Customer Review widget below product
2. **Related Products** - Product Grid with related items
3. **Recently Viewed** - Product Grid with recent items (requires plugin)

---

## Styling Tips

### Enable Theme Colors (Gutenberg)

Both WooCommerce blocks support the "Use Theme Colors" toggle:

1. Select the block
2. Open Color Settings in sidebar
3. Enable "Use Theme Colors"
4. Block matches your theme automatically

### Match WooCommerce Styling (Elementor)

1. Use Global Colors in Elementor that match your WooCommerce theme settings
2. Set consistent button colors across all widgets
3. Use the same border radius on product cards

### Custom CSS Examples

```css
/* Larger add to cart buttons */
.wbcom-essential-product-grid .add_to_cart_button {
  padding: 15px 30px;
  font-size: 16px;
}

/* Sale badge styling */
.wbcom-essential-product-grid__sale-badge {
  background: #ff0000;
  font-weight: bold;
}

/* Card hover effect */
.wbcom-essential-product-grid__card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}
```

---

## Troubleshooting

### Widgets/Blocks Not Appearing

WooCommerce widgets and blocks only show when WooCommerce is active:

1. Go to Plugins → Confirm WooCommerce is activated
2. Ensure you have at least one product published
3. Refresh the editor

### Products Not Showing

1. Check that products are published (not draft)
2. Verify products are "In Stock"
3. Check your filter settings aren't too restrictive
4. Clear any caching plugins

### Add to Cart Not Working

1. Check for JavaScript errors in browser console
2. Verify WooCommerce AJAX is enabled
3. Test with default theme to rule out conflicts

### Styling Issues

1. Clear cache after style changes
2. Check for CSS conflicts with theme
3. Use browser inspector to identify overrides

---

## Related Documentation

- [Getting Started](../getting-started.md)
- [Theme Colors Guide](../features/theme-colors.md)
- [Block Reference](../blocks-guide.md)
- [Elementor Widgets Guide](../widgets-guide.md)
