# Wbcom Essential: surface map

> One row per behaviour: every surface that implements it (views, templates, shortcodes, blocks, editors,
> Quick/Bulk Edit, REST, import, email). Add the row for the behaviour a card or audit touches; never the whole
> map at once. Standard: `~/.claude/skills/wp-card-qa/SKILL.md` ("Per-plugin data").

| Behaviour | Surface | file:line | Grep that re-verifies it | Last checked |
|---|---|---|---|---|
| Block style scope (per-block uniqueId, render-time scope for blocks saved without one) | every wbcom-essential/* block: editor, saved markup, REST/CLI/import, front end | plugins/gutenberg/BlockRegistrar.php:83 | `grep -n "scope_blocks_without_id" plugins/gutenberg/BlockRegistrar.php` | 2026-11-19 |
| Posts Ticker phone layout (rows with and without a featured image) | Elementor Posts Ticker (newsticker type 1) | plugins/elementor/assets/css/wbcom-posts-revolutions.css:1737 | `grep -n "has(.mega-thumb)" plugins/elementor/assets/css/wbcom-posts-revolutions.css` | 2026-11-19 |
| Posts Ticker stylesheet scope | Elementor Posts Ticker (acme ticker) | plugins/elementor/assets/css/acmeticker.css:1 | `grep -nE '^(\*|a|html|body)[ ,{]' plugins/elementor/assets/css/acmeticker.css` (must be empty) | 2026-11-19 |
| Elementor icon defaults (Font Awesome class) | Shape, Slider, Post Carousel, Team Carousel, Pricing Table, Timeline widgets | plugins/elementor/widgets/General/Shape.php:284 | `grep -rnE "'value' *=> *'fa[srbl]? +[a-z]" plugins/elementor/widgets` | 2026-11-19 |
| Member profile URL (BuddyPress 12+ safe) | Header Bar, member avatar links, messages dropdown | includes/wbcom-essential-function.php:224 | `grep -rn "bp_core_get_user_domain(" --include='*.php' plugins includes` | 2026-11-19 |
