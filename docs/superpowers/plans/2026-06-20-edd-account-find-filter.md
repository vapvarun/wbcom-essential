# EDD Account — Findability for power customers (100+ downloads / licenses)

**Problem:** The Downloads and License Keys tabs render cards with only a "Newer / Older"
prev-next pager (12/page downloads, 10/page licenses). A customer who owns 100+ products has
no way to jump to a specific item — they click "Older" ~9 times hunting. Plus the Downloads
tab resolves files + signed URLs + `license_can_download()` (a DB hit) for *every* product on
*every* render, then slices to 12 — 100+ license checks per page load for power users.

**Decisions (owner):** Instant AJAX (no reload, Astro-feel). Full toolbar on BOTH tabs.

## Contract — shared query params (read from `$_GET`; JS appends to the REST tab URL; full
reload also works, so it degrades gracefully without JS)

| Param   | Meaning | Downloads values | Licenses values |
|---------|---------|------------------|-----------------|
| `q`     | search (product name) | `stripos` over built list | title→`download_id` lookup |
| `filter`| status filter | `all`·`available`·`locked` | `all`·`active`·`expired` |
| `sort`  | order | `recent`(def)·`name` | `recent`(def)·`expiry`·`status` |
| `pg`    | page (existing) | 12/page | 10/page |

Each tab validates `filter`/`sort` against its own whitelist → default on mismatch, so switching
tabs with stale params is safe. Changing search/filter/sort resets `pg=1`; the pager preserves
`q`/`filter`/`sort`.

Licenses name-sort is intentionally NOT offered — license rows can't be ordered by product name
at the DB level without loading the whole set (breaks pagination at scale); the search box covers
"find product X". Licenses `count()` is called with the same args as `get_licenses()` so the
result count + page count stay correct under filter/search.

## Files

1. `includes/edd-account-dashboard-functions.php`
   - New helpers: `wbcom_essential_edd_tab_search()`, `…_tab_filter($allowed,$default)`,
     `…_tab_sort($allowed,$default)`, `…_render_toolbar($tab,$search,$filters,$active_filter,$sorts,$active_sort,$result_count)`.
   - Pager: preserve `q`/`filter`/`sort`; mark links for JS interception.
   - Rewrite **Downloads**: collect raw items → dedupe → prime caches → build light index
     (name/date/image/locked) → search/filter/sort → COUNT → slice 12 → resolve signed file
     URLs for the visible 12 ONLY. Wrap count+cards+pager in `[data-edd-results]`; toolbar above.
   - Rewrite **Licenses**: pass `status` (filter), `orderby`/`order` (sort), `download_id`
     (search) + `offset`/`number` to `get_licenses()` AND `count()`. Same toolbar + results region.
2. `plugins/gutenberg/src/blocks/edd-account-dashboard/view.js`
   - Wire toolbar inside the injected tab HTML: debounced live search (~250ms), filter/sort chip
     clicks, AJAX pager — all re-fetch the tab via the existing REST callback with the params
     appended, then swap ONLY `[data-edd-results]` (keeps search-input focus). Update URL via
     `history.replaceState`. Bypass the tab-switch cache when toolbar params are active.
3. `plugins/gutenberg/src/blocks/edd-account-dashboard/style.scss`
   - `.wbcom-edd-toolbar` (search field + segmented chips + sort), `.wbcom-edd-results__count`.
     Tokens only (`--wbe-*`), 40px tap targets, focus rings, `@media (max-width:640px)` stack,
     dark-mode via tokens, RTL via logical props.
4. `npm run build:blocks` → rebuild `build/blocks/edd-account-dashboard/`.

## Verify
- Seed ≥120 downloads + ≥120 licenses for `testcustomer` (extend `scripts/seed-edd-testbed.php`).
- Browser (Playwright MCP): search narrows live; filter chips; sort; pager; result count;
  390px + desktop; dark mode; keyboard + focus. Confirm Downloads no longer runs 120 license
  checks for a 12-card page (spot check via query monitor / timing).
