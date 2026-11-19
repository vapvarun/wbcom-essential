---
journey: bp-directories
plugin: wbcom-essential
priority: critical
roles: [guest, member, member2]
covers: [card:10526057418]
prerequisites:
  - "Site reachable at $SITE_URL (qa-config base_url)"
  - "Personas from bin/qa-fixtures.sh"
estimated_runtime_minutes: 10
---

# BuddyPress members and groups blocks and widgets

Community sites show their members and groups through these; a privacy leak or a deprecation flood is a support ticket per site. Acceptance lines are the **Checks:** of `### C.bp-directories` in `docs/qa/AGENT_SMOKE_RUNBOOK.md`; this file is the walk order.

## Setup

- Site: `$SITE_URL`, Reign and Twenty Twenty-Five, light and dark, 1440 and 390.
- Log in with `?autologin=<login>` (admin, alice, bob).

## Steps

### 1. Members Grid and Carousel on a page
- **Action**: front end
- **Expect**: avatars, names, last active; cards aligned at 390 (`bp.members-grid`)
- **On fail**: plugins/gutenberg/src/blocks/members-grid/render.php

### 2. Groups Grid as a member who is not in a hidden group
- **Action**: front end
- **Expect**: hidden group never listed (`bp.groups-hidden`)
- **On fail**: groups-grid render.php

### 3. Join buttons by group type, then member2 requests membership
- **Action**: front end
- **Expect**: Join Group / Request Membership / none; Request Sent after BuddyPress accepts (`bp.join-buttons`, `bp.join-state`)
- **On fail**: groups-grid render.php

### 4. Header Bar widget on BuddyPress 12+
- **Action**: front end, debug.log
- **Expect**: profile links correct, no bp_core_get_user_domain deprecation (`bp.header-bar`)
- **On fail**: includes/wbcom-essential-function.php wbcom_essential_get_user_domain
