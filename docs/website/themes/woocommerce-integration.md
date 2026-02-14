# WooCommerce Integration

WooCommerce Integration

WBcom Essential provides 5 Elementor widgets and 2 Gutenberg blocks for WooCommerce stores. Display products, reviews, and shopping cart features with full customization.

Requirements

WordPress 6.0+
WooCommerce 7.0+ (widgets and blocks appear only when WooCommerce is active)

What's Included

Elementor Widgets (5)

WidgetPurposeUniversal ProductFlexible product display with multiple layoutsAdd BannerPromotional banners for products/salesCustomer ReviewDisplay product reviewsProduct TabProducts organized in tabs by categoryWC TestimonialWooCommerce-styled customer testimonials

Gutenberg Blocks (2)

BlockPurposeProduct GridProducts in customizable grid layoutMini CartShopping cart icon with dropdown

Elementor Widgets

Universal Product Widget

The most flexible product display widget. Show products in grid, list, or carousel layouts.

Settings:

SettingOptionsPurposeLayoutGrid, List, CarouselDisplay styleColumns1-6Grid densityProductsBy Category, By Tag, Featured, On Sale, Best SellersProduct selectionProducts Count1-50Number to displayShow PriceYes/NoDisplay pricingShow RatingYes/NoStar ratingsShow Sale BadgeYes/NoSale indicatorShow Add to CartYes/NoPurchase buttonQuick ViewYes/NoModal preview

Use Cases:

Featured Products Section

Drag Universal Product widget to page
Select "Featured" products
Set 4 columns
Enable price, rating, and add to cart
Style card backgrounds and hover effects

Sale Banner Section

Set layout to Carousel
Select "On Sale" products
Enable prominent sale badges
Set 3 products per view
Enable autoplay

Category Showcase

Set layout to Grid
Filter by specific category
Show 8 products
Enable quick view for faster browsing

Add Banner Widget

Create promotional banners that link to products, categories, or sales pages.

Settings:

SettingOptionsPurposeBanner ImageMedia selectBackground imageOverlayColor + opacityText readabilityHeadingTextMain messageSubheadingTextSupporting textButton TextTextCTA labelButton LinkURLDestinationButton StyleFilled, OutlineButton appearance

Use Cases:

Sale Announcement

Add banner with bold "50% OFF" heading
Subheading: "Summer Sale - Limited Time"
Button: "Shop Now" → Sale category page
Overlay: Semi-transparent dark for text contrast

Category Promotion

Add banner with category image background
Heading: "New Arrivals"
Subheading: "Spring Collection 2025"
Button links to category

Customer Review Widget

Display product reviews with ratings and customer info.

Settings:

SettingOptionsPurposeReview SourceSpecific Product, Latest, Top RatedWhich reviewsLayoutGrid, List, CarouselDisplay styleShow RatingYes/NoStar displayShow DateYes/NoReview dateShow Verified BadgeYes/NoTrust indicatorExcerpt LengthNumberReview truncation

Use Cases:

Product Page Reviews Section

Set source to specific product
Use list layout
Show all details: rating, date, verified
Enable pagination for many reviews

Homepage Social Proof

Set source to "Top Rated"
Use carousel layout
Show 3 reviews at a time
Filter to 5-star reviews only

Product Tab Widget

Products organized in tabs by category for easy browsing.

Settings:

SettingOptionsPurposeTab CategoriesMultiple selectWhich categoriesProducts Per Tab4-12DensityColumns2-6Grid layoutShow PriceYes/NoDisplay pricingShow RatingYes/NoStar ratingsTab StyleHorizontal, VerticalTab position

Use Cases:

Category Browser

Add tabs for main categories: Electronics, Clothing, Home
Show 8 products per tab
4 columns
Enable price and add to cart

Sale + New Arrivals

Tab 1: "On Sale" products
Tab 2: "New Arrivals"
Tab 3: "Best Sellers"
Easy browsing between collections

WC Testimonial Widget

Customer testimonials styled for e-commerce with optional product links.

Settings:

SettingOptionsPurposeTestimonialsRepeaterAdd multipleContentTextQuote textAuthorTextCustomer nameProduct LinkURLLink to product purchasedShow Product InfoYes/NoDisplay productRating1-5Star ratingAvatarImageCustomer photo

Use Cases:

Product-Linked Reviews

Add testimonials with product links
"I love this product!" → links to actual product
Shows product thumbnail alongside review
Builds trust and drives sales

General Store Testimonials

Add testimonials without product links
Focus on store experience
"Great service, fast shipping!"
Use carousel for multiple testimonials

Gutenberg Blocks

Product Grid Block

Display WooCommerce products in a customizable grid. Uses server-side rendering for always-fresh product data.

Settings:

SettingOptionsPurposeColumns1-6Grid densityProducts Count1-50Number to displayCategoryAll or specificFilter by categoryOrder ByDate, Price, Rating, SalesSortingOrderAscending, DescendingSort directionShow On Sale OnlyYes/NoSale filterShow Featured OnlyYes/NoFeatured filterShow PriceYes/NoDisplay pricingShow RatingYes/NoStar ratingsShow Add to CartYes/NoPurchase buttonImage RatioAuto, Square, Portrait, LandscapeImage aspect

Use Cases:

Homepage Featured Products

Add Product Grid block
Set 4 columns
Filter to "Featured" products
Show 8 products
Enable Theme Colors for consistent styling

Category Page

Add Product Grid block
Filter to specific category
Order by "Newest"
Enable pagination
Show all product info

Sidebar Best Sellers

Add Product Grid block
Set 1 column
Filter to "Best Selling"
Show 5 products
Compact card style

Mini Cart Block

Shopping cart icon that shows item count and opens a dropdown cart preview.

Settings:

SettingOptionsPurposeIconCart, Bag, BasketCart icon styleShow CountYes/NoItem count badgeShow TotalYes/NoCart total in dropdownDropdown PositionLeft, RightWhere dropdown opensHide When EmptyYes/NoShow only with items

Use Cases:

Header Cart

Add Mini Cart to header template
Use shopping bag icon
Show item count badge
Position dropdown to right
Enable Theme Colors

Floating Cart Button

Add Mini Cart block
Use sticky positioning (via CSS)
Show count and total
Fixed position bottom-right

Building a Complete Store Page

Homepage Layout

With Elementor:

Hero Banner - Add Banner widget with main promotion
Featured Products - Universal Product widget (Featured, Grid, 8 products)
Categories - Product Tab widget with main categories
Reviews - Customer Review widget (Top Rated, Carousel)
Sale Section - Universal Product widget (On Sale, Carousel)

With Gutenberg:

Hero - Cover block with CTA buttons
Featured Products - Product Grid block (Featured, 4 columns)
Testimonials - Testimonial Carousel block
Sale Products - Product Grid block (On Sale filter)

Category Page Layout

Category Banner - Full-width image with title
Product Grid - Products filtered to category
Related Categories - Links to similar categories

Product Page Enhancements

Reviews Section - Customer Review widget below product
Related Products - Product Grid with related items
Recently Viewed - Product Grid with recent items (requires plugin)

Styling Tips

Enable Theme Colors (Gutenberg)

Both WooCommerce blocks support the "Use Theme Colors" toggle:

Select the block
Open Color Settings in sidebar
Enable "Use Theme Colors"
Block matches your theme automatically

Match WooCommerce Styling (Elementor)

Use Global Colors in Elementor that match your WooCommerce theme settings
Set consistent button colors across all widgets
Use the same border radius on product cards

Custom CSS Examples

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

Troubleshooting

Widgets/Blocks Not Appearing

WooCommerce widgets and blocks only show when WooCommerce is active:

Go to Plugins → Confirm WooCommerce is activated
Ensure you have at least one product published
Refresh the editor

Products Not Showing

Check that products are published (not draft)
Verify products are "In Stock"
Check your filter settings aren't too restrictive
Clear any caching plugins

Add to Cart Not Working

Check for JavaScript errors in browser console
Verify WooCommerce AJAX is enabled
Test with default theme to rule out conflicts

Styling Issues

Clear cache after style changes
Check for CSS conflicts with theme
Use browser inspector to identify overrides

Related Documentation

Getting Started
Theme Colors Guide
Block Reference
Elementor Widgets Guide
