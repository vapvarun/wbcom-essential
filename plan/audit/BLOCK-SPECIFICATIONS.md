# Block Specifications — What Each Block Does

For each of our 30 blocks: what it renders, what controls it needs, and what Kadence/Stackable/Spectra/Otter offer for the same block type. This is the feature spec — the "what to build."

---

## Phase 1: Core Marketing Blocks (12)

---

### 1. Hero Section (`wbcom-essential/hero`)

**What it does:** Full-width section with background, heading, subheading, and CTA buttons. The first thing visitors see.

**Competitor Reference:**
| Feature | Kadence (rowlayout) | Stackable (hero) | Spectra (container) | Otter (section) |
|---------|-------------------|------------------|-------------------|-----------------|
| Background: solid color | Yes | Yes | Yes | Yes |
| Background: gradient | Yes | Yes | Yes | Yes |
| Background: image | Yes | Yes | Yes | Yes |
| Background: video | Yes | Yes | - | - |
| Background overlay + opacity | Yes | Yes | Yes | Yes |
| Min-height (responsive) | Yes | Yes | Yes | Yes |
| Content max-width | Yes | Yes | Yes | Yes |
| Vertical alignment | Yes | Yes | Yes | Yes |
| Inner content via InnerBlocks | Yes | Yes | Yes | Yes |

**Our Spec:**
- **Render:** Dynamic (`render.php`)
- **Background:** Color, gradient (angle + 2 colors), image (with focal point), overlay color + opacity
- **Layout:** Min-height (responsive), content max-width, vertical align (top/center/bottom), text align (responsive)
- **Content:** Heading (RichText h1), subheading (RichText p), primary CTA button, secondary CTA button (optional)
- **Buttons:** Text, URL, target, colors (normal + hover), border radius
- **Responsive:** Padding, min-height, font sizes, text alignment per breakpoint
- **Standard:** All 38 common denominator features

---

### 2. Call to Action (`wbcom-essential/cta`)

**What it does:** Conversion-focused section with heading, description, and prominent button.

**Competitor Reference:**
| Feature | Kadence (infobox) | Stackable (call-to-action) | Spectra (call-to-action) | Otter (button-group) |
|---------|------------------|--------------------------|------------------------|---------------------|
| Stacked layout | Yes | Yes | Yes | Yes |
| Inline layout (text + button side-by-side) | Yes | Yes | Yes | - |
| Background image | Yes | Yes | Yes | Yes |
| Icon/image above heading | Yes | Yes | Yes | - |
| Button with hover colors | Yes | Yes | Yes | Yes |
| InnerBlocks | - | Yes | - | Yes |

**Our Spec:**
- **Render:** Dynamic
- **Layout:** Stacked (centered) or inline (text left, button right). Responsive: inline → stacked on mobile
- **Content:** Heading (RichText h2), description (RichText p), CTA button (text, URL, target)
- **Background:** Color, gradient, image
- **Button:** Text color, bg color, hover text color, hover bg color, border radius, padding
- **Standard:** All 38

---

### 3. Pricing Table (`wbcom-essential/pricing-table`)

**What it does:** Multi-column pricing comparison with plan name, price, features, and CTA button.

**Competitor Reference:**
| Feature | Kadence (pro only) | Stackable (pricing-box) | Spectra (-) | Otter (pricing) |
|---------|-------------------|------------------------|------------|-----------------|
| Multiple plan columns | - | Yes (InnerBlocks) | - | Yes (InnerBlocks) |
| Featured/highlighted plan | - | Via styling | - | Yes |
| Price with currency + period | - | Yes (price child block) | - | Yes |
| Feature list with icons | - | Yes (icon-list child) | - | Yes |
| CTA button per plan | - | Yes (button child) | - | Yes |
| Ribbon/badge | - | - | - | Yes |
| Monthly/yearly toggle | - | - | - | - |

**Our Spec:**
- **Render:** Dynamic
- **Plans:** Repeater array (1-4 plans). Each: name, price, period, features (line-separated), buttonText, buttonUrl, featured (boolean), accentColor
- **Layout:** Columns (responsive: 3 cols desktop, 2 tablet, 1 mobile)
- **Featured plan:** Scale up, badge ("Most Popular"), accent border
- **Feature list:** Checkmark icon per item, strikethrough for unavailable items (prefix with `~`)
- **Button:** Per-plan accent color, filled for featured / outlined for others, hover states
- **Standard:** All 38

---

### 4. Testimonial Carousel (`wbcom-essential/testimonial-carousel`)

**What it does:** Rotating social proof with quotes, author details, and navigation.

**Competitor Reference:**
| Feature | Kadence (testimonials) | Stackable (testimonial) | Spectra (-) | Otter (testimonials) |
|---------|----------------------|------------------------|------------|---------------------|
| Carousel mode | Yes | - | - | Yes |
| Grid mode | Yes | - | - | Yes |
| Quote text | Yes | Yes | - | Yes |
| Author name + role | Yes | Yes | - | Yes |
| Author avatar | Yes | Yes (image-box child) | - | Yes |
| Star rating | Yes | - | - | Yes |
| Dots navigation | Yes | - | - | Yes |
| Arrow navigation | Yes | - | - | Yes |
| Autoplay | Yes | - | - | Yes |
| Multiple visible slides | Yes | - | - | - |

**Our Spec:**
- **Render:** Dynamic
- **Testimonials:** Repeater array. Each: quote, name, role, avatar (image), rating (0-5 stars)
- **Layout:** Carousel (1 visible) or grid (2-3 columns)
- **Carousel:** Autoplay (toggle + speed), dots, arrows, fade transition
- **Star rating:** 1-5 stars, accent color
- **Quote mark:** Decorative quote icon, accent color
- **Standard:** All 38

---

### 5. FAQ Accordion (`wbcom-essential/faq-accordion`)

**What it does:** Collapsible Q&A pairs. Schema markup for SEO.

**Competitor Reference:**
| Feature | Kadence (accordion) | Stackable (accordion) | Spectra (faq) | Otter (accordion) |
|---------|-------------------|----------------------|--------------|-------------------|
| Q&A repeater items | Yes | Yes (InnerBlocks) | Yes (parent+child) | Yes (InnerBlocks) |
| Single open (close others) | Yes | Yes | Yes | Yes |
| Allow multiple open | Yes | Yes | Yes | Yes |
| First item open by default | Yes | Yes | Yes | Yes |
| Icon: plus/minus or chevron | Yes | Yes | Yes | Yes |
| FAQ Schema (JSON-LD) | Yes | - | Yes | Yes |
| Title tag (h2/h3/h4/div) | Yes | - | - | - |
| RichText content (not just plain text) | Yes | Yes | Yes | Yes |

**Our Spec:**
- **Render:** Dynamic
- **Items:** Repeater array. Each: question (string), answer (RichText/HTML)
- **Behavior:** Single open / allow multiple, first open toggle, open/close speed
- **Icons:** Plus/minus or chevron, icon position (left/right)
- **Schema:** `enableFaqSchema` toggle → JSON-LD FAQPage output via `wp_footer`
- **Title tag:** h2 / h3 / h4 / div (a11y flexibility)
- **Colors:** Title color + hover, title bg + hover, content color, content bg, border color
- **Standard:** All 38

---

### 6. Feature Grid (`wbcom-essential/feature-grid`)

**What it does:** Grid of feature/service cards with icon, title, and description.

**Competitor Reference:**
| Feature | Kadence (infobox) | Stackable (feature-grid) | Spectra (info-box) | Otter (service) |
|---------|------------------|------------------------|-------------------|-----------------|
| Icon or image | Yes | Yes (icon child) | Yes | Yes |
| Title | Yes | Yes (heading child) | Yes | Yes |
| Description | Yes | Yes (text child) | Yes | Yes |
| Link (whole card or button) | Yes | Yes | Yes | Yes |
| Columns (responsive) | Manual | Yes (columns parent) | Manual | Manual |
| Card styles (bordered, shadow, flat) | Via styling | Via styling | Via styling | Via styling |
| Hover effects | Yes | Yes | Yes | Yes |

**Our Spec:**
- **Render:** Dynamic
- **Features:** Repeater array. Each: icon (emoji/text), title, description, linkUrl (optional)
- **Layout:** Columns 1-4 (responsive: desktop/tablet/mobile), gap
- **Card styles:** Bordered, shadow, flat (enum)
- **Icon:** Size (responsive), color
- **Hover:** Card translateY, shadow increase
- **Link:** Whole card clickable or no link
- **Standard:** All 38

---

### 7. Countdown Timer (`wbcom-essential/countdown-timer`)

**What it does:** Live countdown to a target date with days/hours/minutes/seconds.

**Competitor Reference:**
| Feature | Kadence (countdown) | Stackable (countdown) | Spectra (countdown) | Otter (countdown) |
|---------|-------------------|----------------------|-------------------|-------------------|
| Target date picker | Yes | Yes | Yes | Yes |
| Days/Hours/Minutes/Seconds | Yes | Yes | Yes | Yes |
| Labels (customizable) | Yes | Yes | Yes | Yes |
| Expire action: show zeros | Yes | Yes | Yes | Yes |
| Expire action: hide block | Yes | - | Yes (pro) | Yes |
| Expire action: show message | Yes | - | Yes (pro) | - |
| Expire action: redirect | Yes | - | Yes (pro) | Yes |
| Evergreen (per-user) | Yes (pro, DB) | - | Yes (pro, cookie) | - |
| Circular style | - | - | - | Yes |
| Box style | Yes | Yes | Yes | Yes |

**Our Spec:**
- **Render:** Dynamic
- **Timer:** Target date (DateTimePicker), show/hide individual units (days/hours/mins/secs)
- **Labels:** Customizable text for each unit (default: Days, Hours, Minutes, Seconds)
- **Expire actions:** Show zeros (default), hide block, show message, redirect URL
- **Style:** Box (default), inline (compact)
- **Colors:** Background, text, accent (unit borders), expired message color
- **Size:** Small / large (responsive number size)
- **Future Pro:** Evergreen timer (cookie-based, per-user countdown)
- **Standard:** All 38

---

### 8. Stats Counter (`wbcom-essential/stats-counter`)

**What it does:** Animated numbers that count up when scrolled into view.

**Competitor Reference:**
| Feature | Kadence (countup) | Stackable (count-up) | Spectra (counter) | Otter (circle-counter) |
|---------|------------------|---------------------|-------------------|----------------------|
| Target number | Yes | Yes | Yes | Yes |
| Animated count-up | Yes | Yes | Yes | Yes |
| Prefix ($ # etc) | Yes | Yes | Yes | - |
| Suffix (+ % /7 etc) | Yes | Yes | Yes | - |
| Label text below | Yes | Yes | Yes | Yes |
| Decimal support | Yes | - | Yes | - |
| Duration control | Yes | - | Yes | Yes |
| Intersection observer trigger | Yes | Yes | Yes | Yes |
| Circular progress | - | - | - | Yes |
| Separator (1,000 vs 1000) | Yes | - | Yes | - |

**Our Spec:**
- **Render:** Dynamic
- **Stats:** Repeater array. Each: number (integer), label, prefix, suffix, decimals (0-2)
- **Layout:** Columns 1-6 (responsive)
- **Animation:** Duration (ms), easing (ease-out-cubic), trigger on scroll (IntersectionObserver)
- **Number format:** Locale-based separators (1,000 vs 1.000)
- **Colors:** Number color (accent), label color (muted)
- **Standard:** All 38

---

### 9. Tabs (`wbcom-essential/tabs`)

**What it does:** Tabbed content panels for organizing information.

**Competitor Reference:**
| Feature | Kadence (tabs) | Stackable (tabs) | Spectra (-) | Otter (tabs) |
|---------|---------------|-----------------|------------|-------------|
| Horizontal tabs | Yes | Yes | - | Yes |
| Vertical tabs | Yes | Yes | - | Yes |
| Icon per tab | Yes | Yes | - | - |
| InnerBlocks content | Yes | Yes | - | Yes |
| Tab style: underline | Yes | Yes | - | Yes |
| Tab style: boxed/pill | Yes | Yes | - | Yes |
| Initial tab open | Yes | Yes | - | Yes |
| Equal tab height | - | Yes | - | - |
| Responsive: stack on mobile | Yes | Yes | - | Yes |

**Our Spec:**
- **Render:** Dynamic
- **Tabs:** Repeater array. Each: title, content (RichText/HTML)
- **Layout:** Horizontal (default), vertical (responsive: vertical → horizontal on mobile)
- **Style:** Underline, boxed (enum)
- **Behavior:** Initial tab open (index), equal height toggle
- **Colors:** Tab text + active text, tab bg + active bg, content bg, border color
- **ARIA:** `role="tablist"`, `role="tab"` + `aria-selected`, `role="tabpanel"`, keyboard arrows
- **Standard:** All 38

---

### 10. Flip Box (`wbcom-essential/flip-box`)

**What it does:** 3D card that flips on hover to reveal back content.

**Competitor Reference:**
| Feature | Kadence (-) | Stackable (-) | Spectra (-) | Otter (flip) |
|---------|------------|--------------|------------|-------------|
| Front face content | - | - | - | Yes |
| Back face content | - | - | - | Yes |
| Flip direction (horizontal/vertical) | - | - | - | Yes |
| 3D perspective | - | - | - | Yes |
| Icon on front | - | - | - | Yes |
| Button on back | - | - | - | Yes |
| Min-height | - | - | - | Yes |

**Our Spec:**
- **Render:** Dynamic
- **Front face:** Icon (emoji/dashicon), title (RichText), description (RichText), background color/image
- **Back face:** Title (RichText), description (RichText), button (text + url), background color/image
- **Flip:** Direction: horizontal (flipX) or vertical (flipY), 3D perspective (800px)
- **Min-height:** Responsive
- **Colors:** Front text/bg, back text/bg, button colors + hover
- **Accessibility:** `prefers-reduced-motion` disables flip, shows both faces stacked
- **Standard:** All 38

---

### 11. Timeline (`wbcom-essential/timeline`)

**What it does:** Vertical timeline with events/milestones on alternating sides.

**Competitor Reference:**
| Feature | Kadence (-) | Stackable (timeline) | Spectra (content-timeline) | Otter (timeline) |
|---------|------------|---------------------|--------------------------|-----------------|
| Vertical layout | - | Yes | Yes | Yes |
| Alternating sides | - | Yes | Yes | Yes |
| Icon/dot per item | - | Yes | Yes | Yes |
| Date/label per item | - | Yes | Yes | Yes |
| Content per item | - | Yes | Yes | Yes |
| Connector line | - | Yes | Yes | Yes |
| Responsive: single column on mobile | - | Yes | Yes | Yes |
| Color per item | - | - | Yes | - |

**Our Spec:**
- **Render:** Dynamic
- **Items:** Repeater array. Each: title, content (RichText), date/label, icon (emoji), accentColor (optional)
- **Layout:** Alternating sides (desktop), single column left (mobile)
- **Connector:** Vertical line color, dot size, dot color
- **Colors:** Line color, dot color (default = accent), title color, content color
- **Responsive:** Alternating → single column at tablet breakpoint
- **Standard:** All 38

---

### 12. Post Carousel (`wbcom-essential/post-carousel`)

**What it does:** Dynamic post display with carousel, grid, or slider modes.

**Competitor Reference:**
| Feature | Kadence (posts) | Stackable (posts) | Spectra (post-grid/masonry) | Otter (posts-grid) |
|---------|----------------|-------------------|---------------------------|-------------------|
| WP_Query (post type, category, tag) | Yes | Yes | Yes | Yes |
| Grid layout | Yes | Yes | Yes | Yes |
| Carousel layout | Yes (pro) | - | - | Yes |
| Masonry layout | Yes (pro) | - | Yes | Yes |
| Posts per page | Yes | Yes | Yes | Yes |
| Offset | Yes | Yes | Yes | Yes |
| Order by (date, title, random) | Yes | Yes | Yes | Yes |
| Featured image | Yes | Yes | Yes | Yes |
| Excerpt | Yes | Yes | Yes | Yes |
| Author/date/category meta | Yes | Yes | Yes | Yes |
| Read more button | Yes | Yes | Yes | Yes |
| Pagination / load more | Yes (pro) | Yes (pro) | Yes | Yes |
| AJAX loading | Yes (pro) | - | Yes | - |

**Our Spec:**
- **Render:** Dynamic (`render.php` with `WP_Query`)
- **Query:** Post type (post default, CPT support), categories, tags, posts per page, offset, order/orderby, exclude current post
- **Layout:** Grid (default), carousel, list — responsive columns
- **Card:** Featured image (with aspect ratio), title, excerpt (character limit), meta (author, date, category), read more link
- **Carousel:** Autoplay, dots, arrows, visible slides (responsive)
- **Image:** Aspect ratio (16:9, 4:3, 1:1, original), border radius
- **Colors:** Card bg, title color + hover, meta color, excerpt color
- **Future Pro:** Pagination, AJAX load more, masonry
- **Standard:** All 38

---

## Phase 2: BuddyPress Blocks (6)

All require `function_exists('buddypress')`. All dynamic render.
Full audit: `plan/audit/bp-elementor-widgets.md`

**Critical:** All BP blocks must handle BuddyPress version differences:
- BP 12.0+: `bp_group_url()`, `bp_members_get_user_url()`
- Older BP: `bp_group_permalink()`, `bp_core_get_user_domain()`

---

### 13. Members Grid (`wbcom-essential/members-grid`)

**What it does:** BuddyPress member cards in a grid layout.

**Existing Elementor widgets merged:** MembersGrid + MembersLists (2 → 1 block with layout toggle)

**Our Spec:**
- **Render:** Dynamic (`render.php` with `bp_has_members()`)
- **Query args:** `type` (active/newest/popular), `per_page` (1-100, default 12), `max`, `member_type` (multi-select profile types)
- **Card data per member:**
  - Avatar (bp_member_avatar, size responsive)
  - Display name + profile link
  - Last active timestamp (relative)
  - Online status indicator (5-min activity threshold)
  - Member type badge (if BP 12.0+)
  - Action buttons via `bp_directory_members_actions` hook: Add Friend, Follow, Message
- **Layout modes:** Grid (2-4 columns responsive) or List (compact rows)
- **Grid columns:** Desktop 3-4, tablet 2, mobile 1
- **Filtering:** Member type filter tabs (optional, from registered bp_member_types)
- **Show/hide toggles:** Avatar, last active, action buttons, online status, member type, filter bar
- **View all link:** Toggle + custom text + URL
- **Colors:** Card bg, name color + hover, meta color, button colors, online indicator color
- **Empty state:** "Sorry, no members were found" message
- **Standard:** All 38

---

### 14. Members Carousel (`wbcom-essential/members-carousel`)

**What it does:** Same member data in Swiper carousel format.

**Existing Elementor widget:** MemeberCarousel (Swiper.js based)

**Our Spec:**
- **Render:** Dynamic (same `bp_has_members()` query as Members Grid)
- **Card:** Same data as Members Grid (avatar, name, last active, optional action buttons)
- **Carousel (Swiper-compatible settings):**
  - `slidesPerView`: responsive (desktop 3-4 / tablet 2 / mobile 1)
  - `slidesPerGroup`: responsive
  - `navigation`: arrows / dots / both / none
  - `autoplay`: toggle + speed (1000-10000ms, default 5000)
  - `pauseOnHover`: toggle
  - `loop`: infinite loop toggle
  - `effect`: slide / fade
  - `speed`: animation speed (300-1500ms)
  - `direction`: ltr / rtl
- **Show/hide:** Last active timestamp, action buttons
- **Standard:** All 38

---

### 15. Groups Grid (`wbcom-essential/groups-grid`)

**What it does:** BuddyPress group cards in a grid layout.

**Existing Elementor widgets merged:** GroupGrid + GroupsLists (2 → 1 block with layout toggle)

**Our Spec:**
- **Render:** Dynamic (`render.php` with `bp_has_groups()`)
- **Query args:** `type` (active/newest/popular/random/alphabetical), `per_page` (1-100, default 12), `max`, `group_type` (multi-select group types)
- **Card data per group:**
  - Group avatar (bp_group_avatar, size responsive)
  - Group name + group URL link (BP version-aware)
  - Member count (e.g., "25 members")
  - Last active timestamp
  - Group type badge
  - Group description excerpt
  - Group admins (names/avatars)
  - Action buttons via `bp_directory_groups_actions` hook: Join/Leave, Message
- **Layout modes:** Grid (2-4 columns responsive) or List (compact rows)
- **Filtering:** Group type filter tabs (optional, from registered bp_group_types)
- **Show/hide toggles:** Avatar, member count, description, admins, action buttons, filter bar
- **View all link:** Toggle + custom text + URL
- **Empty state:** "There were no groups found" + optional "Create a group" link
- **Standard:** All 38

---

### 16. Group Carousel (`wbcom-essential/group-carousel`)

**What it does:** Same group data in Swiper carousel format.

**Existing Elementor widget:** GroupCarousel (Swiper.js based)

**Our Spec:**
- **Render:** Dynamic (same `bp_has_groups()` query as Groups Grid)
- **Card:** Same data as Groups Grid (avatar, name, member count)
- **Carousel:** Same Swiper settings as Members Carousel (slidesPerView, navigation, autoplay, loop, effect, speed, direction — all responsive)
- **Standard:** All 38

---

### 17. Activity Feed (`wbcom-essential/activity-feed`)

**What it does:** BuddyPress activity stream — latest site-wide or per-component activities. NEW block (no Elementor equivalent).

**Our Spec:**
- **Render:** Dynamic (`render.php` with `bp_has_activities()`)
- **Query:** Count (5-20), component filter (all, activity, groups, friends, mentions), type filter, scope
- **Item data:**
  - User avatar (linked to profile)
  - User name
  - Action text (activity description)
  - Timestamp (relative, e.g., "2 hours ago")
  - Content preview (if activity has content)
  - Activity type icon
- **Layout:** List (vertical feed), compact option (smaller avatars, less spacing)
- **Load more:** Button to load next page (AJAX via REST endpoint)
- **Logged out:** Show public activities only, no action buttons
- **Standard:** All 38

---

### 18. Profile Completion (`wbcom-essential/profile-completion`)

**What it does:** Progress indicator showing how complete the logged-in user's profile is.

**Existing Elementor widget:** ProfileCompletion

**Our Spec:**
- **Render:** Dynamic (`render.php` with xprofile field group checks)
- **Progress calculation:**
  - Avatar uploaded (yes/no)
  - Cover image uploaded (yes/no)
  - Each xprofile field group: % of required fields filled
  - Overall percentage (weighted)
- **Display:**
  - Progress bar (horizontal, 0-100%) OR circular progress
  - Step checklist below showing what's complete / incomplete
  - Each step links to the relevant profile edit section
- **Layout:** Horizontal bar + checklist (default), or circular + checklist
- **Colors:** Progress bar filled color (accent), unfilled color, complete step color, incomplete step color
- **Logged out:** Show "Complete your profile" CTA with login link (or hide block)
- **Logged in, 100% complete:** Show "Profile complete!" message with optional confetti
- **Standard:** All 38

---

## Phase 3: WooCommerce + EDD Blocks (10)

Full EDD audit: `plan/audit/edd-existing-blocks.md`
Existing EDD blocks have significant functionality — we must preserve ALL of it.

---

### 19. Product Grid (`wbcom-essential/product-grid`)

**Existing block:** product-grid (WooCommerce, 24 attributes)

**Our Spec:**
- **Render:** Dynamic (`render.php` with `WC_Product_Query`)
- **Query:** Category, tag, on-sale filter, featured filter, stock status, count (rows × columns), orderBy, order
- **Card:** Product image (aspect ratio control), title, price (regular + sale with badge), rating stars, add-to-cart button
- **Display toggles:** showSaleBadge, showRating, showPrice, showAddToCart
- **Layout:** Columns 2-4 (responsive), gap, image ratio (1:1, 4:3, 16:9)
- **Colors:** Card bg, card border radius, title color, price color, sale badge color + bg
- **Standard:** All 38

---

### 20. Product Carousel (`wbcom-essential/product-carousel`)

**Our Spec:**
- Same query and card as Product Grid
- **Carousel:** Swiper settings (slidesPerView responsive, autoplay, dots, arrows, loop, speed)
- **Standard:** All 38

---

### 21. Customer Reviews (`wbcom-essential/customer-reviews`)

**Our Spec:**
- **Render:** Dynamic (`get_comments()` with type=review or edd_review)
- **Query:** Product ID (specific or latest across all), count (1-6), min rating filter
- **Card:** Reviewer name, star rating (1-5), review text (word-limited), date, verified badge, product name
- **Aggregate:** Average rating + total count displayed above cards
- **Layout:** Carousel or grid (2-3 columns)
- **Standard:** All 38

---

### 22. Promo Banner (`wbcom-essential/promo-banner`)

**Our Spec:**
- **Render:** Dynamic
- **Content:** Background image/color/gradient, heading (RichText), subheading (RichText), CTA button, badge text
- **Layout:** Full-width, overlay text positioning (left/center/right), min-height responsive
- **Standard:** All 38

---

### 23. EDD Account Dashboard (`wbcom-essential/edd-account-dashboard`)

**Existing block:** Fully built with REST API, AJAX tabs, 6 tab views. KEEP ALL FUNCTIONALITY.

**Our Spec (migrate to new standard, preserve features):**
- **Render:** Dynamic
- **Attributes:** defaultTab (dashboard/downloads/purchases/profile/subscriptions/licenses), showSupport (toggle), supportUrl, supportLabel
- **Tab system (6 tabs):**
  - **Dashboard:** User greeting, stats cards (total orders, total spent, active licenses, active subscriptions), recent orders table (3 latest)
  - **Downloads:** Grouped by product, file list with download links
  - **Purchases:** Order history table (number, date, amount, status)
  - **Profile:** Renders `[edd_profile_editor]` shortcode
  - **Subscriptions:** (conditional on EDD Recurring) — product, plan, status, amount/period, renewal date, countdown urgency, cancel URL
  - **Licenses:** (conditional on EDD Software Licensing) — license key with copy-to-clipboard, status, activations
- **REST API:** `POST wbcom/v1/edd-account/{tab}` — AJAX tab switching with client-side cache
- **Frontend JS:** Tab switching via fetch(), History API URL updates, license key copy, cancel confirmation dialog
- **Security:** Nonce validation, tab whitelist, wp_kses_post output, referer check
- **Sidebar nav:** Sticky, active state (aria-current), logout link, support link (target=_blank)
- **Logged out:** Show login form with redirect back
- **CSS variables:** `--edd-sidebar-width`, `--edd-sidebar-bg`, `--edd-nav-active-color`, font scale
- **Standard:** All 38

---

### 24. EDD Checkout Enhanced (`wbcom-essential/edd-checkout-enhanced`)

**Existing block:** Progress bar + trust badges + reviews + recommendations. KEEP ALL.

**Our Spec (migrate to new standard):**
- **Render:** Dynamic
- **Attributes:** showProgressBar (toggle), showTrustBadges (toggle), trustBadgeText (string), showReviews (toggle), reviewCount (1-6), showRecommendations (toggle), recommendationCount (1-6)
- **Sections:**
  - **Progress bar:** 4 steps (Cart → Details → Payment → Complete), checkmark for completed, connector lines
  - **Checkout form:** Renders `[download_checkout]` shortcode
  - **Trust badges:** 3 badges (secure checkout, money-back, priority support) + payment method icons (Visa, Mastercard, PayPal, Stripe SVGs)
  - **Reviews:** (conditional on EDD Reviews) — star ratings from cart products, review cards (title, text trimmed to 25 words, author, product, rating)
  - **Recommendations:** (conditional on EDD Recommendations Plus) — `edd_rp_get_multi_suggestions()`, product cards with thumbnail, name, rating, price, add-to-cart button
- **Standard:** All 38

---

### 25. EDD Order Success (`wbcom-essential/edd-order-success`)

**Existing block:** Success header + receipt + next steps. KEEP ALL.

**Our Spec (migrate to new standard):**
- **Render:** Dynamic
- **Attributes:** showSuccessHeader (toggle), successMessage (string), showNextSteps (toggle), accountPageUrl (string)
- **Sections:**
  - **Success header:** Animated SVG checkmark (#16a34a), heading, subtitle
  - **Receipt:** Renders `[edd_receipt]` shortcode
  - **Next steps cards:** "Download Your Files" (always), "View License Keys" (if EDD SL), "Manage Subscription" (if EDD Recurring) — each links to account dashboard with tab parameter
- **Account page URL resolution:** 1) attribute, 2) search for page with our dashboard block, 3) EDD purchase_history_page option, 4) home_url
- **Standard:** All 38

---

### 26. EDD Product Catalog (`wbcom-essential/edd-product-catalog`)

**Existing block:** AJAX-powered product grid with filters. KEEP ALL.

**Our Spec (migrate to new standard):**
- **Render:** Dynamic
- **Attributes:** columns (1-4, default 3), perPage (default 12), showSearch (toggle), showCategoryFilter (toggle), showPriceFilter (toggle), showSort (toggle), defaultCategory, defaultSort
- **AJAX:** Product grid with real-time category, price range, and search filtering
- **Standard:** All 38

---

### 27. EDD Product Filter (`wbcom-essential/edd-product-filter`)

**Existing block:** Sticky filter navigation bar. KEEP ALL.

**Our Spec (migrate to new standard):**
- **Render:** Dynamic
- **Attributes:** filters (array of {label, target} objects, 9 defaults), sticky (toggle), stopAtCover (toggle)
- **Frontend JS:** Sticky positioning, scroll-to-section on filter click, active state tracking
- **Standard:** All 38

---

### 28. Category Grid (`wbcom-essential/category-grid`)

**Existing block:** WordPress category display grid. KEEP ALL.

**Our Spec (migrate to new standard):**
- **Render:** Dynamic
- **Attributes (16):** columns (responsive: desktop/tablet/mobile), gap, cardBorderRadius, selectedCategories (array), excludeEmpty, maxCategories, showPostCount, showImage, imageRatio, orderBy, order, useThemeColors, cardBgColor, nameColor, countColor, overlayColor
- **Standard:** All 38

---

## Phase 4: Nice-to-Have (5)

---

### 29. Login Form (`wbcom-essential/login-form`)

**Our Spec:**
- **Render:** Dynamic
- **Fields:** Username/email, password (with visibility toggle), remember me
- **Actions:** AJAX login, redirect URL, forgot password link
- **Security:** Nonce, rate limiting
- **Standard:** All 38

---

### 30. Progress Bar (`wbcom-essential/progress-bar`)

**Our Spec:**
- **Render:** Dynamic
- **Bars:** Repeater. Each: label, percentage (0-100), color
- **Animation:** Animate width on scroll (IntersectionObserver)
- **Style:** Rounded or square bar ends, striped option
- **Standard:** All 38

---

### 31. Text Rotator (`wbcom-essential/text-rotator`)

**Our Spec:**
- **Render:** Dynamic
- **Content:** Static prefix text + rotating words array + static suffix text
- **Animation:** Fade, slide-up, type (enum)
- **Speed:** Rotation interval (ms), animation duration (ms)
- **Standard:** All 38

---

### 32. Portfolio Grid (`wbcom-essential/portfolio-grid`)

**Our Spec:**
- **Render:** Dynamic (WP_Query for portfolio/project CPT or any CPT)
- **Layout:** Grid with hover overlay (title + category)
- **Filter:** Category filter bar (AJAX)
- **Lightbox:** Optional image lightbox on click
- **Standard:** All 38

---

### 33. Posts Ticker (`wbcom-essential/posts-ticker`)

**Our Spec:**
- **Render:** Dynamic (WP_Query)
- **Content:** Scrolling/sliding post titles with category label
- **Direction:** Left-to-right or right-to-left
- **Speed:** Scroll speed control
- **Standard:** All 38

---

## Summary

| Phase | Blocks | Render Type |
|-------|--------|-------------|
| 1 (Marketing) | 12 | Dynamic (PHP generates scoped CSS) |
| 2 (BuddyPress) | 6 | Dynamic (server-side BP queries) |
| 3 (WooCommerce + EDD) | 10 | Dynamic (WC/EDD queries + REST API) |
| 4 (Nice-to-have) | 5 | Dynamic |
| **Total** | **33** | **All dynamic render** |

### Phase 3 Breakdown (10 blocks)
| # | Block | Source | Status |
|---|-------|--------|--------|
| 19 | product-grid | Existing (WooCommerce) | Rebuild to standard |
| 20 | product-carousel | New | New block |
| 21 | customer-reviews | Existing (WC/EDD) | Rebuild to standard |
| 22 | promo-banner | New | New block |
| 23 | edd-account-dashboard | Existing (complex, REST API, 6 tabs) | Migrate — preserve ALL functionality |
| 24 | edd-checkout-enhanced | Existing (progress bar, badges, reviews, recs) | Migrate — preserve ALL functionality |
| 25 | edd-order-success | Existing (success header, receipt, next steps) | Migrate — preserve ALL functionality |
| 26 | edd-product-catalog | Existing (AJAX filters) | Migrate — preserve ALL functionality |
| 27 | edd-product-filter | Existing (sticky nav) | Migrate — preserve ALL functionality |
| 28 | category-grid | Existing (WordPress core) | Migrate — preserve ALL functionality |

Every block: 38 common denominator features + block-specific features listed above.

### Audit Source Files
- `plan/audit/bp-elementor-widgets.md` — Full BP widget audit (11 widgets, all controls, queries, templates)
- `plan/audit/edd-existing-blocks.md` — Full EDD block audit (8 blocks, all attributes, render output, REST endpoints)
