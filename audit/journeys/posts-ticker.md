---
journey: posts-ticker
plugin: wbcom-essential
priority: critical
roles: [admin, guest]
covers: [card:10526932897, card:10526057369]
prerequisites:
  - "Site reachable at $SITE_URL (qa-config base_url)"
  - "Personas from bin/qa-fixtures.sh"
estimated_runtime_minutes: 10
---

# Posts Ticker on phones and next to the theme

A ticker is often in the header area; if it empties on phones or resets the page's spacing, every page looks broken. Acceptance lines are the **Checks:** of `### C.ticker` in `docs/qa/AGENT_SMOKE_RUNBOOK.md`; this file is the walk order.

## Setup

- Site: `$SITE_URL`, Reign and Twenty Twenty-Five, light and dark, 1440 and 390.
- Log in with `?autologin=<login>` (admin, alice, bob).

## Steps

### 1. Elementor Posts Ticker with posts that have no featured image, at 390
- **Action**: front end
- **Expect**: every row shows its title (`ticker.phone-no-image`)
- **On fail**: plugins/elementor/assets/css/wbcom-posts-revolutions.css 450px block

### 2. Same with featured images
- **Action**: front end at 390
- **Expect**: image rows unchanged (`ticker.phone-image`)
- **On fail**: same file

### 3. Page with the ticker, a header, a form and buttons
- **Action**: front end
- **Expect**: their spacing matches the page without the ticker (`ticker.page-spacing`)
- **On fail**: plugins/elementor/assets/css/acmeticker.css
