# Online Store Tutorial

Setting Up an Online Store

Build WooCommerce store pages with product showcases, customer reviews, and shopping cart features using WBcom Essential.

What You'll Build

A complete store frontend with:

Homepage with featured products
Product category pages
Sales and promotions sections
Customer reviews showcase
Mini cart in header

Time required: 30-45 minutes

Requirements:

WordPress 6.0+
WooCommerce 7.0+ (activated)
WBcom Essential (activated)
At least a few products published

Part 1: Store Homepage

Hero Banner

Start with a promotional banner:

With Elementor:

Add an Add Banner widget
Configure:
Banner image: Product or lifestyle photo
Heading: "Summer Sale - 30% Off"
Subheading: "Limited time only"
Button: "Shop Now" → Sale category

With Gutenberg:

Add a Slider block
Create slides for:
Current promotion
New arrivals
Best sellers

Featured Products Section

Add a Heading block: "Featured Products"

With Gutenberg (Product Grid):

Add a Product Grid block
Settings:
Columns: 4
Products count: 8
Show featured only: Yes
Show price: Yes
Show rating: Yes
Show add to cart: Yes
Image ratio: Square

With Elementor (Universal Product):

Add a Universal Product widget
Settings:
Layout: Grid
Products: Featured
Columns: 4
Show price, rating, add to cart: Yes

Category Tabs

Let visitors browse by category:

With Elementor:

Add a Product Tab widget
Configure:
Tab categories: Your main categories
Products per tab: 8
Columns: 4
Show price and add to cart

With Gutenberg:

Add an Advanced Tabs block
Create tabs for each category
In each tab, add a Product Grid block filtered to that category

Customer Reviews

Build trust with customer testimonials:

With Elementor:

Add a Customer Review widget
Settings:
Review source: Top Rated
Layout: Carousel
Show rating: Yes
Show verified badge: Yes

With Gutenberg:

Add a Testimonial Carousel block
Add real customer reviews with:
Quote text
Customer name
Star rating
Avatar (optional)

On Sale Section

Highlight discounted products:

Add a Heading block: "On Sale Now"

Gutenberg:

Add a Product Grid block
Settings:
Show on sale only: Yes
Columns: 4
Products count: 4

Elementor:

Add a Universal Product widget
Settings:
Products: On Sale
Layout: Carousel
Enable prominent sale badges

Part 2: Category Pages

Category Banner

Add a full-width image or Slider block
Feature category-specific imagery
Include category name as overlay text

Product Grid

Add a Product Grid block (Gutenberg) or Universal Product widget (Elementor)
Settings:
Filter to specific category
Columns: 3 or 4
Enable pagination
Order by: Newest or Best Selling

Related Categories

After the product grid:

Add a Heading block: "You Might Also Like"
Add links to related categories

Part 3: Mini Cart Setup

Add a cart icon to your header that shows items and total.

With Gutenberg

Edit your header template (Site Editor → Header)
Add a Mini Cart block
Settings:
Icon: Cart or Bag
Show count: Yes
Show total: Yes
Dropdown position: Right

With Elementor

If using Elementor's Theme Builder:

Edit your header template
Add the Header Bar widget
Enable "Show Cart" option

Part 4: Promotional Banners

Sale Announcement Banner

With Elementor:

Add an Add Banner widget
Configure:
Image: Sale-themed background
Heading: "50% OFF Everything"
Subheading: "This Weekend Only"
Button: "Shop Sale" → Sale category

Seasonal Promotion

Create urgency with a countdown:

Add a Countdown block
Set target date to sale end
Style to match your sale theme
Add CTA button below

Complete Homepage Structure

[Hero Section]
├── Slider or Add Banner
└── Main promotion

[Featured Products]
├── Heading: &quot;Featured Products&quot;
└── Product Grid (featured filter)

[Category Browser]
└── Product Tab widget (by category)

[Social Proof]
├── Heading: &quot;What Customers Say&quot;
└── Customer Reviews or Testimonial Carousel

[Sale Section]
├── Heading: &quot;On Sale Now&quot;
├── Countdown (optional)
└── Product Grid (on sale filter)

[Final CTA]
└── Add Banner (subscribe/promo)

WooCommerce Block Settings Reference

Product Grid Block (Gutenberg)

SettingOptionsRecommendationColumns1-64 for desktopProducts Count1-508-12CategoryAll or specificFilter for sectionsOrder ByDate, Price, Rating, SalesVaries by sectionShow On SaleYes/NoYes for sale sectionsShow FeaturedYes/NoYes for homepageShow PriceYes/NoAlways YesShow RatingYes/NoYes (builds trust)Show Add to CartYes/NoYesImage RatioAuto, Square, Portrait, LandscapeSquare for consistency

Universal Product Widget (Elementor)

SettingOptionsRecommendationLayoutGrid, List, CarouselGrid for directories, Carousel for highlightsProductsCategory, Tag, Featured, On Sale, Best SellersMatch section purposeColumns1-64 for desktopQuick ViewYes/NoYes (improves UX)

Styling Tips

Enable Theme Colors

Select any WooCommerce block
Open Color Settings
Enable "Use Theme Colors"
Block matches your theme automatically

Consistent Product Cards

Match styling across all product displays:

Same border radius
Same shadow
Same image aspect ratio
Same button style

Sale Badge Styling

Make sale badges prominent:

/* Custom sale badge */
.wbcom-essential-product-grid__sale-badge {
  background: #ff0000;
  font-weight: bold;
  padding: 5px 10px;
}

Add to Cart Buttons

Make buttons prominent:

/* Larger add to cart */
.wbcom-essential-product-grid .add_to_cart_button {
  padding: 12px 24px;
  font-size: 14px;
}

Mobile Optimization

Column Adjustments

ElementDesktopTabletMobileProduct Grid4 cols2 cols2 colsCarousel items421

Mobile Cart

The Mini Cart block:

Works on mobile
Opens as dropdown or modal
Touch-friendly controls

Product Images

Use square aspect ratio for consistency
Images automatically resize on mobile
Test that product details are readable

Troubleshooting

Products Not Showing

Check products are published (not draft)
Verify products are "In Stock"
Check filter settings aren't too restrictive
Clear caching plugins

Add to Cart Not Working

Check browser console for JavaScript errors
Verify WooCommerce AJAX is enabled
Test with default theme
Disable other plugins to find conflicts

Styling Issues

Clear all caches after style changes
Regenerate Elementor CSS if using widgets
Check for CSS conflicts with theme
Use browser inspector to identify overrides

Related Documentation

WooCommerce Integration - All WooCommerce blocks and widgets
Block Reference - Complete block settings
Building a Landing Page - Marketing pages
Theme Colors Guide - Color inheritance
