# Content Blocks

Content blocks organize and present information: questions and answers, a login form, a filterable project grid, tabs and a timeline. They appear in the block inserter under **Essential - Content** and need no other plugin.

Every block here also has the Spacing and Advanced settings described in [Blocks Overview](blocks-overview.md).

## FAQ Accordion

Collapsible questions and answers. It can also output FAQPage structured data so search engines can read your FAQ. Block name: `wbcom-essential/faq-accordion`.

### Add it

1. Open the block inserter.
2. Search for **FAQ Accordion**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| FAQ Items | Item list | Select an item to edit it, or remove it. | Sample items |
| Edit Selected FAQ | Question | The question text. | Per item |
| Edit Selected FAQ | Answer | The answer text. | Per item |
| Layout | Icon Style | Chevron, Plus or Arrow icon on each question. | Chevron |
| Layout | Allow Multiple Open | Lets more than one item stay open at once. | Off |
| Layout | Open First Item | Opens the first FAQ when the page loads. | On |
| Layout | Enable FAQ Schema (JSON-LD) | Outputs FAQPage structured data for SEO. | On |
| Style | Question Color | Color of the question text. | #1e1e2e |
| Style | Question Background | Background of each question row. | #f8f9fa |
| Style | Answer Color | Color of the answer text. | #6c757d |
| Style | Border Color | Color of the item borders. | #e9ecef |
| Style | Icon Color | Color of the icon. | #667eea |
| Style | Border Radius, Box Shadow | Rounds the block corners and adds a shadow. | Shadow off |

## Login Form

A WordPress login form with your own button text, colors and redirect. Block name: `wbcom-essential/login-form`.

### Add it

1. Open the block inserter.
2. Search for **Login Form**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Form Settings | Button Text | Label of the login button. | Log In |
| Form Settings | Redirect URL (after login) | Where visitors go after logging in. Leave blank to return to the current page. | Blank |
| Form Settings | Show "Remember Me" | Shows the remember-me checkbox. | On |
| Form Settings | Show Register Link | Shows a link to the registration page. | On |
| Form Settings | Show Lost Password Link | Shows a link to the password reset page. | On |
| Form Settings | Logged-In Message | Text shown instead of the form to logged-in visitors. | You are already logged in. |
| Style | Form Background | Background of the form. | #ffffff |
| Style | Label Color | Color of the field labels. | #1e1e2e |
| Style | Button Background | Background of the login button. | #667eea |
| Style | Button Text Color | Text color of the login button. | #ffffff |
| Style | Link Color | Color of the register and lost-password links. | #667eea |
| Style | Border Radius, Box Shadow | Rounds the form corners and adds a shadow. | Shadow off |

### Tips

- Logged-in visitors see the Logged-In Message instead of the form.
- The register link appears only when your site allows new users to register (Settings > General > Membership).

## Portfolio Grid

A grid of posts or custom post types with a category filter bar, hover effects and responsive columns. Block name: `wbcom-essential/portfolio-grid`.

### Add it

1. Open the block inserter.
2. Search for **Portfolio Grid**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Query Settings | Post Type | The post type to list. | Post |
| Query Settings | Posts Per Page | How many items to show. | 9 |
| Layout | Columns (Desktop) | Columns on desktop. | 3 |
| Layout | Columns (Tablet) | Columns on tablets. | 2 |
| Layout | Columns (Mobile) | Columns on phones. | 1 |
| Layout | Gap (px) | Space between cards. | 16 |
| Layout | Image Ratio | 1:1 (Square), 4:3, 3:2, 16:9 or 3:4 (Portrait). | 1:1 |
| Card Settings | Show Filter Bar | Shows category tabs above the grid. | On |
| Card Settings | Show Category Badge | Shows the category on each card. | On |
| Card Settings | Show Excerpt | Shows the excerpt on each card. | Off |
| Card Settings | Hover Effect | Overlay, Zoom or Slide Up. | Overlay |
| Card Settings | Card Border Radius (px) | Roundness of each card. | 8 |
| Style | Overlay Color | Color of the hover overlay. | rgba(102, 126, 234, 0.85) |
| Style | Title Color (on hover) | Title color over the overlay. | #ffffff |
| Style | Filter Active Color | Color of the selected filter tab. | #667eea |
| Style | Box Shadow, Border Radius | Adds a shadow and rounds the block corners. | Shadow off |

### Tips

- The filter bar is built from the categories of the items shown.
- If no items match, the block shows "No portfolio items found."

## Tabs

Click-to-switch content panels with an underline or boxed style. The tab list works with a keyboard and screen readers. Block name: `wbcom-essential/tabs`.

### Add it

1. Open the block inserter.
2. Search for **Tabs**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Tab Items | Tab list | Select a tab to edit it, or remove it. | Sample tabs |
| Edit Selected Tab | Tab Title | Label on the tab. | Per tab |
| Edit Selected Tab | Tab Content | Content shown when the tab is active. | Per tab |
| Layout | Tab Style | Underline or Boxed. | Underline |
| Layout | Tab Alignment | Left, Center or Right. | Left |
| Style | Active Tab Color | Color of the selected tab. | #667eea |
| Style | Inactive Tab Color | Color of the other tabs. | #6c757d |
| Style | Content Background | Background of the content area. | #ffffff |
| Style | Border Color | Color of the borders. | #e9ecef |
| Style | Border Radius, Box Shadow | Rounds the block corners and adds a shadow. | Shadow off |

## Timeline

A vertical timeline with icon dots, date labels and cards. Block name: `wbcom-essential/timeline`.

### Add it

1. Open the block inserter.
2. Search for **Timeline**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Timeline Items | Item list | Select an item to edit it, or remove it. | Sample items |
| Edit Selected Item | Date / Year | Label shown with the item. | Per item |
| Edit Selected Item | Icon / Emoji | Character shown in the dot. | Per item |
| Edit Selected Item | Title | Item heading. | Per item |
| Edit Selected Item | Description | Item text. | Per item |
| Layout | Timeline Layout | Alternating (left and right), Left (all on right of line) or Right (all on left of line). | Alternating |
| Layout | Dot Size (px) | Size of each dot. | 40 |
| Style | Line Color | Color of the vertical line. | #e9ecef |
| Style | Dot Color | Color of the dots. | #667eea |
| Style | Card Background | Background of each card. | #ffffff |
| Style | Date Color | Color of the date label. | #667eea |
| Style | Title Color | Color of the item title. | #1e1e2e |
| Style | Description Color | Color of the item text. | #6c757d |
| Style | Border Radius, Box Shadow | Rounds the block corners and adds a shadow. | Shadow off |
