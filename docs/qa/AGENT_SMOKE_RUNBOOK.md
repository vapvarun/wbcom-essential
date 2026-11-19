# Wbcom Essential - agent smoke runbook

The journeys QA walks before every release and after every batch of fixes. Each journey is a
`### <id>` section with a **Checks:** list; `php bin/check-journey-depth.php` enforces the
format and that every escape in `audit/escapes.json` has a check tagged `card:<id>`.

Check line format: `` - `id` @role #surface +state !refuse card:<id>: what to do -> what must be true ``.
Roles are qa-config personas (admin, member, member2) or guest. Surfaces: ui, admin, rest, cli, email, block.

## Setup

- Site: `base_url` in `docs/qa/qa-config.json` (bench http://localhost:10048), Wbcom Essential active, Elementor active
  for E.* journeys, BuddyPress for C.bp-*, EDD for C.edd-*, WooCommerce for C.woo-*.
- Personas: `WP_PATH=<site root> bash bin/qa-fixtures.sh`; log in with `?autologin=<login>`.
- Every journey: 1440 and 390, light and dark, on Reign and on Twenty Twenty-Five. No console errors from
  Essential files, no new Essential lines in debug.log.

## Journeys

### C.blocks-insert

Every block inserts, saves and renders.

**Checks:**
- `blocks.insert-all` @admin #block: Insert each of the 35 blocks on one page and save -> 0 invalid blocks after reload.
- `blocks.front-all` @guest #ui: View that page -> every block renders; nothing overflows at 390.
- `blocks.duplicate` @admin #block card:10526057464: Duplicate a Hero, change the copy's background, save -> the original keeps its own background.
- `blocks.no-id` @admin #cli +imported card:10526057464: Insert two Hero blocks without a uniqueId through `wp post create` markup, give them different backgrounds -> each shows its own background on the front end.
- `blocks.editor-only` @member #rest !refuse: As a subscriber, GET `/wbcom-essential/v1/xprofile-groups` -> 403.

### C.theme-fit

Blocks and widgets follow the theme unless the owner picks a colour.

**Depth note:** presentation only; nothing here takes a request a role could be refused.

**Checks:**
- `fit.reign-dark` @guest #ui +dark: Reign dark mode, the all-blocks page -> text reaches 4.5:1, no white panels.
- `fit.tt5` @guest #ui: Twenty Twenty-Five, same page -> blocks keep their spacing; theme paragraph and link styles do not leak into dynamic blocks.
- `fit.owner-colour` @admin #block: Pick a custom colour on a CTA, save -> the front end shows exactly that colour in light and dark.
- `fit.placeholder-dark` @guest #ui +dark card:10528307412: Post Carousel posts and Product Grid / Carousel products with no image, in dark mode -> the placeholder tile uses the theme's dark surface, no white or #f0f0f0 tile.

### C.ticker

Posts Ticker block and Elementor widget.

**Depth note:** shows published posts to everyone; who may edit it is covered by E.defaults (`defaults.editor-only`).

**Checks:**
- `ticker.phone-no-image` @guest #ui +narrow card:10526932897: Elementor Posts Ticker (newsticker type 1) with posts that have no featured image, at 390 -> every row shows its title.
- `ticker.phone-image` @guest #ui +narrow: Same with featured images -> rows show the image; title hidden as before.
- `ticker.page-spacing` @guest #ui card:10526057369: A page with the ticker widget plus a header, a form and buttons -> their margins and padding match the same page without the ticker.
- `ticker.padding` @admin #block: Give the Posts Ticker block 40px padding -> the bar stays inside its container; first headline not cut.
- `woo.testimonial-phone` @guest #ui +narrow card:10528307821: WC Testimonial and Customer Review widgets on defaults at 390 -> one card per row (two at tablet width).

### E.defaults

Elementor widgets dropped in with default settings.

**Checks:**
- `defaults.shape-icon` @admin #ui card:10526933067: Add a Shape widget with defaults -> the down arrow icon shows (not 0px wide).
- `defaults.no-placeholder` @guest #ui: Widgets left on defaults never publish placeholder copy to visitors.
- `defaults.smart-menu` @admin #ui +empty card:10528306878: Smart Menu with no menu chosen, on a site that has menus -> nothing printed for visitors (not the site's first menu); the editor shows "choose a menu".
- `defaults.placeholder-sweep` @guest #ui card:10528306878: Add Banner, Dropdown Button, and Slider / Team Carousel / Portfolio items without an image, all on defaults -> no placeholder.png, no "Menu Item #1", nothing empty printed for visitors.
- `defaults.editor-only` @member #admin !refuse: A subscriber cannot open the Elementor editor for that page.

### C.bp-directories

BuddyPress members and groups blocks and widgets.

**Checks:**
- `bp.members-grid` @guest #ui: Members Grid and Members Carousel on a page -> avatars, names and last active show; cards line up at 390.
- `bp.groups-hidden` @member #ui !refuse: Groups Grid -> a hidden group the member is not in is never listed.
- `bp.join-buttons` @member #ui: Public group shows Join Group, private shows Request Membership, hidden shows none.
- `bp.join-state` @member2 #ui: After member2 requests membership -> Request Sent shows once BuddyPress accepts it.
- `bp.header-bar` @member #ui card:10526057418: Header Bar widget with BuddyPress 12+ -> avatar and messages links go to the member's profile; debug.log gets no bp_core_get_user_domain deprecation.

### C.edd-account

EDD Account Dashboard, checkout and order success blocks.

**Checks:**
- `edd.own-orders` @member #ui: Account Dashboard shows the member's own orders, licences and subscriptions.
- `edd.other-orders` @member2 #rest !refuse: member2 asks `/wbcom/v1/edd-account/purchases` -> only member2's own data.
- `edd.guest` @guest #rest !refuse: A visitor asks `/wbcom/v1/edd-account/purchases` -> 401.
- `edd.order-success` @guest #ui !refuse: Order Success with another buyer's order key -> no order details.
- `edd.dark` @member #ui +dark: Account buttons readable in dark mode.

### C.login

Login Form block and widget.

**Checks:**
- `login.ok` @member #ui: Correct password signs in and lands where the block says.
- `login.wrong` @guest #ui !refuse: Elementor Login Form (AJAX): unknown user and wrong password give the same message. Login Form block: it posts to WordPress's wp-login.php, so the messages are WordPress core's own (core tells them apart); check the error shows and nothing else leaks. With LearnDash active a failed block login lands on `?login=failed` with no message: that is LearnDash's redirect, not Essential.
- `login.lockout` @guest #ui +repeated !refuse: Too many failures -> locked out with a calm message.

### R.release

Release package and translations.

**Checks:**
- `release.pot` @admin #cli card:regression-4.7.3-pot: `wp i18n make-pot` into a temp file -> no msgid missing from languages/wbcom-essential.pot (wppqa release:pot passes).
- `release.locales` @admin #cli: Every shipped .po has 0 untranslated and 0 fuzzy entries, and block JSON files exist for each locale.
- `release.zip` @admin #cli: Install the built zip on a clean site -> activates with no notice, all blocks register.

## Report

Write `docs/qa/walks/<journey-id>.json` per journey walked, with each check's result, the commit, and any
proposed new check. A journey's **Verified:** stamp needs its walk record at the same commit.
