---
journey: blocks-insert
plugin: wbcom-essential
priority: critical
roles: [admin, guest, member]
covers: [card:10526057464]
prerequisites:
  - "Site reachable at $SITE_URL (qa-config base_url)"
  - "Personas from bin/qa-fixtures.sh"
estimated_runtime_minutes: 10
---

# Every block inserts, saves and renders

A block that saves invalid markup or bleeds styles into another breaks every page an owner built with it. Acceptance lines are the **Checks:** of `### C.blocks-insert` in `docs/qa/AGENT_SMOKE_RUNBOOK.md`; this file is the walk order.

## Setup

- Site: `$SITE_URL`, Reign and Twenty Twenty-Five, light and dark, 1440 and 390.
- Log in with `?autologin=<login>` (admin, alice, bob).

## Steps

### 1. Insert all 35 blocks on one page and save
- **Action**: Block editor, then reload
- **Expect**: 0 invalid blocks (`blocks.insert-all`)
- **On fail**: plugins/gutenberg/src/blocks/<block>/save.js or deprecated.js

### 2. View the page as a visitor
- **Action**: front end at 390 and 1440
- **Expect**: every block renders, no overflow (`blocks.front-all`)
- **On fail**: block render.php / style.scss

### 3. Duplicate a block and import two without a uniqueId
- **Action**: editor and `wp post create`
- **Expect**: each keeps its own styles (`blocks.duplicate`, `blocks.no-id`)
- **On fail**: plugins/gutenberg/BlockRegistrar.php scope_blocks_without_id

### 4. Ask the editor-only REST route as a subscriber
- **Action**: GET /wbcom-essential/v1/xprofile-groups
- **Expect**: 403 (`blocks.editor-only`)
- **On fail**: plugins/gutenberg/gutenberg.php permission_callback
