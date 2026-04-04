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

---

### 13. Members Grid (`wbcom-essential/members-grid`)

**What it does:** BuddyPress member cards in a grid layout.

**Our Spec:**
- **Render:** Dynamic (`render.php` with `BP_User_Query`)
- **Query:** Count (4-24), type (active, newest, popular, alphabetical), exclude admins toggle
- **Card:** Avatar (size responsive), display name (linked to profile), last active, friend button (if logged in), member type badge
- **Layout:** Columns 2-4 (responsive), gap
- **Colors:** Card bg, name color + hover, meta color, button colors
- **Standard:** All 38

---

### 14. Members Carousel (`wbcom-essential/members-carousel`)

**What it does:** Same data as Members Grid but in carousel format.

**Our Spec:**
- Same query and card as Members Grid
- **Carousel:** Visible cards (responsive: 4/3/1), autoplay, dots, arrows
- **Standard:** All 38

---

### 15. Groups Grid (`wbcom-essential/groups-grid`)

**What it does:** BuddyPress group cards in a grid layout.

**Our Spec:**
- **Render:** Dynamic (`render.php` with `BP_Groups_Group::get()`)
- **Query:** Count (4-24), type (active, newest, popular, alphabetical), show hidden toggle (admins only)
- **Card:** Group avatar, group name (linked), member count, group type badge, join/leave button (if logged in), short description
- **Layout:** Columns 2-4 (responsive), gap
- **Standard:** All 38

---

### 16. Group Carousel (`wbcom-essential/group-carousel`)

**What it does:** Same data as Groups Grid but in carousel format.

**Our Spec:**
- Same query and card as Groups Grid
- **Carousel:** Visible cards (responsive: 4/3/1), autoplay, dots, arrows
- **Standard:** All 38

---

### 17. Activity Feed (`wbcom-essential/activity-feed`)

**What it does:** BuddyPress activity stream — latest site-wide or per-component activities.

**Our Spec:**
- **Render:** Dynamic (`render.php` with `bp_has_activities()`)
- **Query:** Count (5-20), component filter (all, activity, groups, friends, mentions), type filter
- **Item:** User avatar, user name, action text, timestamp (relative), content preview
- **Layout:** List (vertical), compact option (smaller avatars, less spacing)
- **Load more:** Button to load next page (AJAX)
- **Standard:** All 38

---

### 18. Profile Completion (`wbcom-essential/profile-completion`)

**What it does:** Progress indicator showing how complete the logged-in user's profile is.

**Our Spec:**
- **Render:** Dynamic (`render.php` with xprofile field checks)
- **Progress:** Percentage bar (0-100%), step checklist
- **Steps:** Avatar uploaded, cover image, profile fields filled (per field group)
- **Layout:** Horizontal bar + checklist below, or circular progress + checklist
- **Colors:** Progress bar color, incomplete step color, complete step color
- **Logged out:** Show generic "Complete your profile" CTA with login link
- **Standard:** All 38

---

## Phase 3: WooCommerce + EDD Blocks (7)

---

### 19. Product Grid (`wbcom-essential/product-grid`)

**Our Spec:**
- **Render:** Dynamic (WC_Product_Query)
- **Query:** Category, tag, on-sale, featured, stock status, count, order
- **Card:** Product image, title, price (regular + sale), rating stars, add-to-cart button
- **Layout:** Columns 2-4 (responsive)
- **Standard:** All 38

---

### 20. Product Carousel (`wbcom-essential/product-carousel`)

**Our Spec:**
- Same query and card as Product Grid
- **Carousel:** Visible cards (responsive), autoplay, dots, arrows
- **Standard:** All 38

---

### 21. Customer Reviews (`wbcom-essential/customer-reviews`)

**Our Spec:**
- **Render:** Dynamic (WC product reviews query)
- **Query:** Product ID (or latest across all), count, rating filter
- **Card:** Reviewer name, rating stars, review text, date, verified badge
- **Layout:** Carousel or grid
- **Standard:** All 38

---

### 22. Promo Banner (`wbcom-essential/promo-banner`)

**Our Spec:**
- **Render:** Dynamic
- **Content:** Background image/color, heading, subheading, CTA button, badge text
- **Layout:** Full-width, overlay text positioning (left/center/right)
- **Standard:** All 38

---

### 23-25. EDD Blocks (migrate existing 3)

Migrate `edd-account-dashboard`, `edd-checkout-enhanced`, `edd-order-success` to new standard:
- Add all 38 common denominator features
- Keep existing functionality
- Update to shared component system

---

## Phase 4: Nice-to-Have (5)

---

### 26. Login Form (`wbcom-essential/login-form`)

**Our Spec:**
- **Render:** Dynamic
- **Fields:** Username/email, password (with visibility toggle), remember me
- **Actions:** AJAX login, redirect URL, forgot password link
- **Security:** Nonce, rate limiting
- **Standard:** All 38

---

### 27. Progress Bar (`wbcom-essential/progress-bar`)

**Our Spec:**
- **Render:** Dynamic
- **Bars:** Repeater. Each: label, percentage (0-100), color
- **Animation:** Animate width on scroll (IntersectionObserver)
- **Style:** Rounded or square bar ends, striped option
- **Standard:** All 38

---

### 28. Text Rotator (`wbcom-essential/text-rotator`)

**Our Spec:**
- **Render:** Dynamic
- **Content:** Static prefix text + rotating words array + static suffix text
- **Animation:** Fade, slide-up, type (enum)
- **Speed:** Rotation interval (ms), animation duration (ms)
- **Standard:** All 38

---

### 29. Portfolio Grid (`wbcom-essential/portfolio-grid`)

**Our Spec:**
- **Render:** Dynamic (WP_Query for portfolio/project CPT or any CPT)
- **Layout:** Grid with hover overlay (title + category)
- **Filter:** Category filter bar (AJAX)
- **Lightbox:** Optional image lightbox on click
- **Standard:** All 38

---

### 30. Posts Ticker (`wbcom-essential/posts-ticker`)

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
| 2 (BuddyPress) | 6 | Dynamic (server-side BP/bbPress queries) |
| 3 (WooCommerce + EDD) | 7 | Dynamic (WC/EDD queries) |
| 4 (Nice-to-have) | 5 | Dynamic |
| **Total** | **30** | **All dynamic render** |

Every block: 38 common denominator features + block-specific features listed above.
