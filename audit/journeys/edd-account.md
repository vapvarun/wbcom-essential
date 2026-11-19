---
journey: edd-account
plugin: wbcom-essential
priority: critical
roles: [guest, member, member2]
covers: []
prerequisites:
  - "Site reachable at $SITE_URL (qa-config base_url)"
  - "Personas from bin/qa-fixtures.sh"
estimated_runtime_minutes: 10
---

# EDD account dashboard and order pages

Buyers see their orders and licences here; another buyer's data must never show. Acceptance lines are the **Checks:** of `### C.edd-account` in `docs/qa/AGENT_SMOKE_RUNBOOK.md`; this file is the walk order.

## Setup

- Site: `$SITE_URL`, Reign and Twenty Twenty-Five, light and dark, 1440 and 390.
- Log in with `?autologin=<login>` (admin, alice, bob).

## Steps

### 1. Account Dashboard as member
- **Action**: front end
- **Expect**: own purchases, licences, subscriptions (`edd.own-orders`)
- **On fail**: includes/edd-account-dashboard-functions.php

### 2. REST purchases tab as member2 and as a visitor
- **Action**: GET /wbcom/v1/edd-account/purchases
- **Expect**: member2 sees only their own; visitor 401 (`edd.other-orders`, `edd.guest`)
- **On fail**: permission_callback is_user_logged_in

### 3. Order Success with another buyer's key
- **Action**: front end
- **Expect**: no order details (`edd.order-success`)
- **On fail**: edd-order-success render.php
