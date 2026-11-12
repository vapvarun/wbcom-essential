# EDD Blocks

EDD blocks cover the customer side of an Easy Digital Downloads store: the account area, checkout sections, the order confirmation page and a filterable product catalog. They appear in the block inserter under **Essential - EDD** and load only when Easy Digital Downloads is active.

If Easy Digital Downloads is not active, these blocks show the notice "Easy Digital Downloads is required for this block."

The four checkout section blocks (Checkout Progress, Checkout Recommendations, Checkout Social Proof and Checkout Trust Badges) are designed to sit inside the EDD Checkout block. Only the settings below appear for them: padding and device visibility, not margin or shadow. The other blocks have the shared Spacing and Advanced settings described in [Blocks Overview](blocks-overview.md).

## EDD Account Dashboard

One My Account page for customers, with a sidebar menu, downloads, order history and optional license and subscription tabs. Block name: `wbcom-essential/edd-account-dashboard`.

### Add it

1. Create a page for the customer account.
2. Open the block inserter and search for **EDD Account Dashboard**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Settings | Default Tab | The tab shown when the page first loads: Dashboard, Downloads, Order History, Free Plugins or Edit Profile. | Dashboard |
| Settings | Show Support Link | Adds a support link to the sidebar. | On |
| Settings | Support URL | Full URL of your support portal or helpdesk. Shown when Show Support Link is on. | The Wbcom Designs support page |
| Settings | Support Link Label | Text of the support link. Shown when Show Support Link is on. | Submit Ticket |
| Settings | Show special offers banner | Shows the offers banner. | On |
| Settings | Show What's New | Shows the What's New section. | On |
| Settings | Show recommendations | Shows product recommendations. | On |
| Advanced | Padding, Margin, Box Shadow, Border Radius | Spacing, shadow and corners of the block. | Shadow off |
| Advanced | Device Visibility | Hide on Desktop, Tablet or Mobile. | All shown |

### Tips

- Change the Support URL to your own helpdesk. The default points to the Wbcom Designs support page.
- Logged-out visitors see a login form that returns them to the same page.
- A Subscriptions tab appears when EDD Recurring Payments is active. A Licenses tab appears when EDD Software Licensing is active.

## EDD Enhanced Checkout (legacy)

A legacy wrapper kept only so pages saved before version 4.7.0 keep working. It no longer appears in the block inserter. Block name: `wbcom-essential/edd-checkout-enhanced`.

For new pages, use the EDD Checkout block and add the Wbcom checkout section blocks inside it: [EDD Checkout Progress](#edd-checkout-progress), [EDD Checkout Recommendations](#edd-checkout-recommendations), [EDD Checkout Social Proof](#edd-checkout-social-proof) and [EDD Checkout Trust Badges](#edd-checkout-trust-badges).

## EDD Checkout Progress

A four-step progress indicator: Cart, Details, Payment and Complete. Block name: `wbcom-essential/edd-checkout-progress`.

### Add it

1. Open the page that holds the EDD Checkout block.
2. Open the block inserter and search for **EDD Checkout Progress**.
3. Select it to insert it into the checkout.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Progress Options | None | This section has no options yet. | - |
| Spacing | Padding | Space inside the block. | Block default |
| Spacing | Device Visibility | Hide on Desktop, Tablet or Mobile. | All shown |

### Tips

- The steps are a visual guide. EDD's block checkout shows cart, details and payment on one page.

## EDD Checkout Recommendations

A "Customers Also Purchased" list of products based on what is in the cart. Block name: `wbcom-essential/edd-checkout-recommendations`.

### Add it

1. Open the page that holds the EDD Checkout block.
2. Open the block inserter and search for **EDD Checkout Recommendations**.
3. Select it to insert it into the checkout.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Recommendation Options | Number of Recommendations | How many products to suggest, 1 to 6. | 3 |
| Spacing | Padding | Space inside the block. | Block default |
| Spacing | Device Visibility | Hide on Desktop, Tablet or Mobile. | All shown |

### Tips

- The block shows nothing when the cart is empty.

## EDD Checkout Social Proof

Customer reviews and a Trustpilot rating with your own review cards. It works on checkout, product and landing pages. Block name: `wbcom-essential/edd-checkout-social`.

### Add it

1. Open the page where you want social proof.
2. Open the block inserter and search for **EDD Checkout Social Proof**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Social Proof Options | Show Customer Reviews | Shows reviews from your store. | On |
| Social Proof Options | Number of Reviews | How many reviews to show, 1 to 6. Shown when Show Customer Reviews is on. | 3 |
| Social Proof Options | Show Trustpilot Section | Shows the Trustpilot section. | On |
| Social Proof Options | Trustpilot Rating | Your real Trustpilot score, 0 to 5. At 0 the score is not shown. | 0 |
| Social Proof Options | Total Reviews | Total number of your Trustpilot reviews. | 0 |
| Social Proof Options | Trustpilot URL | Link to your Trustpilot page. | Blank |
| Social Proof Options | Review Cards | Your own reviews: Reviewer Name, Stars, Title and Review Text. Add up to 5 with + Add Review. | None |
| Spacing | Padding | Space inside the block. | Block default |
| Spacing | Device Visibility | Hide on Desktop, Tablet or Mobile. | All shown |

### Tips

- Customer reviews come from the EDD Reviews extension.
- The Trustpilot section stays hidden until you add at least one review card.

## EDD Checkout Trust Badges

Security, money-back guarantee and support badges, plus icons for the payment methods you accept. Block name: `wbcom-essential/edd-checkout-trust`.

### Add it

1. Open the page that holds the EDD Checkout block.
2. Open the block inserter and search for **EDD Checkout Trust Badges**.
3. Select it to insert it into the checkout.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Security Badge | Show security badge | Shows the security badge. | On |
| Security Badge | Trust Badge Text | Badge heading. Name your own payment processor if you mention one. | Secure checkout |
| Security Badge | Security Description | Badge text. Word it so it stays true for your store. | Your payment information is encrypted and secure. |
| Guarantee Badge | Show guarantee badge | Shows the guarantee badge. | On |
| Guarantee Badge | Money-Back Guarantee (days) | Length of the guarantee, 7 to 90 days. | 30 |
| Guarantee Badge | Guarantee Description | Badge text. Match it to your refund policy. | Covered by our money-back guarantee. |
| Support Badge | Show support badge | Shows the support badge. | Off |
| Support Badge | Support Title | Badge heading. | Priority Support |
| Support Badge | Support Description | Badge text. Describe the support you provide. | Dedicated support for all customers. |
| Payment Icons | Visa, Mastercard, Paypal, Stripe, Razorpay | Tick the payment methods your store accepts. | All off |
| Spacing | Padding | Space inside the block. | Block default |
| Spacing | Device Visibility | Hide on Desktop, Tablet or Mobile. | All shown |

### Tips

- The badges make claims to your customers. Turn on only the ones that are true for your store.

## EDD Order Success

A purchase confirmation page with a success header, the order receipt and next-step cards. Block name: `wbcom-essential/edd-order-success`.

### Add it

1. Open the page you set as the EDD Success page.
2. Open the block inserter and search for **EDD Order Success**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Success Header | Show Success Header | Shows the header with the confirmation message. | On |
| Success Header | Success Message | The main heading shown after purchase. | Thank you for your purchase! |
| What's Next Section | Show What's Next Cards | Shows cards for downloads, licenses and the account. | On |
| What's Next Section | Account Page URL | URL of your purchase history or account page. Leave blank to use the EDD default. | Blank |
| Advanced | Padding, Margin, Box Shadow, Border Radius | Spacing, shadow and corners of the block. | Shadow off |
| Advanced | Device Visibility | Hide on Desktop, Tablet or Mobile. | All shown |

### Tips

- The receipt is the standard EDD receipt.
- The What's Next cards link to downloads and the account page. A license card appears when EDD Software Licensing is active.

## Product Catalog

A product grid for your EDD downloads with search, category, price and sort filters. Filtering updates the grid without reloading the page. Block name: `wbcom-essential/product-catalog`.

### Add it

1. Open the block inserter.
2. Search for **Product Catalog**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Layout | Columns | Number of columns. | 3 |
| Layout | Products per page | How many products load at a time. | 12 |
| Category | Show products from | All Categories or one download category. | All Categories |
| Filters | Search bar | Shows the search field. | On |
| Filters | Category filter | Shows the category filter. | On |
| Filters | Price filter | Shows the price filter. | On |
| Filters | Sort dropdown | Shows the sort menu. | On |
| Filters | Default sort | Title (A-Z), Newest first, Price: Low to High, Price: High to Low or Most Popular. | Title (A-Z) |
| Advanced | Padding, Margin, Box Shadow, Border Radius | Spacing, shadow and corners of the block. | Shadow off |
| Advanced | Device Visibility | Hide on Desktop, Tablet or Mobile. | All shown |

### Tips

- A Load More button loads the next products.
- If no product matches the filters, the block shows "No products found matching your filters." If loading fails it shows a Retry button.
