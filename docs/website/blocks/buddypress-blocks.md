# BuddyPress Blocks

BuddyPress blocks show your community on any page: the activity stream, groups and members, as grids or carousels. They appear in the block inserter under **Essential - BuddyPress** and load only when BuddyPress or BuddyBoss Platform is active.

If BuddyPress is not active, these blocks show the notice "BuddyPress is required for this block."

Every block here also has the Spacing and Advanced settings described in [Blocks Overview](blocks-overview.md).

## Activity Feed

A BuddyPress activity stream with cards, type icons, relative timestamps and interaction counts. Block name: `wbcom-essential/activity-feed`.

### Add it

1. Open the block inserter.
2. Search for **Activity Feed**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Content | Number of Activities | How many items to load at first. | 10 |
| Content | Activity Type | All Activity, Status Updates, New Members, Friendships, Joined Group, Created Group or New Blog Post. | All Activity |
| Layout | Layout Style | Cards, Timeline or Compact. | Cards |
| Display | Show Avatar | Shows the member avatar. | On |
| Display | Avatar Size | Size of the avatar. Shown when Show Avatar is on. | 44 |
| Display | Show Type Icon | Shows an icon for the activity type. | On |
| Display | Show Action Text | Shows the action line, such as who did what. | On |
| Display | Show Content | Shows the activity text. | On |
| Display | Show Media Preview | Shows attached media. | On |
| Display | Show Timestamp | Shows how long ago it happened. | On |
| Display | Show Favorite Button | Shows the favorite button to logged-in members. | On |
| Display | Show Comment Count | Shows the number of comments. | On |
| Colors | Accent Color | Accent for icons and links. | #667eea |
| Colors | Card Background | Card background. | #ffffff |
| Colors | Name Color | Color of member names. | #1e1e2e |
| Colors | Content Color | Color of the activity text. | #4a5568 |
| Colors | Timestamp Color | Color of the timestamp. | #a0aec0 |
| Colors | Border Color | Color of the card border. | #edf2f7 |
| Colors | Icon Background | Background of the type icon. | #eef2ff |

### Tips

- If there is no activity to show, the block shows "No activity to show yet."
- The feed includes a Load More button for older items.

## Group Carousel

BuddyPress groups in a Swiper carousel with autoplay, arrows, dots and a join button. Block name: `wbcom-essential/group-carousel`.

### Add it

1. Open the block inserter.
2. Search for **Group Carousel**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Content | Total Groups | How many groups to load. | 12 |
| Content | Sort By | Most Active, Newest, Most Members, Alphabetical or Random. | Most Active |
| Content | Show Member Count | Shows the member count. | On |
| Content | Show Description | Shows the group description. | Off |
| Content | Show Join Button | Shows a Join Group button to logged-in members. | On |
| Carousel | Slides Per View (Desktop) | Cards visible on desktop. | 3 |
| Carousel | Slides Per View (Tablet) | Cards visible on tablets. | 2 |
| Carousel | Slides Per View (Mobile) | Cards visible on phones. | 1 |
| Carousel | Space Between (px) | Space between cards. | 24 |
| Carousel | Autoplay | Moves slides automatically. | On |
| Carousel | Autoplay Delay (ms) | Time between slides. | 3000 |
| Carousel | Loop | Returns to the first slide after the last. | On |
| Carousel | Show Navigation Arrows | Shows the arrows. | On |
| Carousel | Show Pagination Dots | Shows the dots. | On |
| Style | Avatar Size (px) | Size of the group avatar. | 80 |
| Style | Card Background | Card background. | #ffffff |
| Style | Group Name Color | Color of the group name. | #1e1e2e |
| Style | Border Radius, Box Shadow | Rounds the corners and adds a shadow. | Shadow off |

### Tips

- If no group is found, the block shows "No groups found."
- The join button needs the Groups component to be active.

## Groups Grid

BuddyPress groups in a responsive grid. Block name: `wbcom-essential/groups-grid`.

### Add it

1. Open the block inserter.
2. Search for **Groups Grid**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Content | Total Groups | How many groups to load. | 12 |
| Content | Sort By | Most Active, Newest, Most Popular or Alphabetical. | Most Active |
| Content | Show Description | Shows the group description. | On |
| Content | Show Member Count | Shows the member count. | On |
| Content | Show Last Active | Shows when the group was last active. | On |
| Content | Show Join Button | Shows a join button to logged-in members. | On |
| Layout | Columns (Desktop) | Columns on desktop. | 3 |
| Layout | Columns (Tablet) | Columns on tablets. | 2 |
| Layout | Columns (Mobile) | Columns on phones. | 1 |
| Layout | Gap (px) | Space between cards. | 24 |
| Layout | Avatar Size (px) | Size of the group avatar. | 80 |
| Style | Card Border Radius (px) | Roundness of each card. | 12 |
| Style | Card Background | Card background. | #ffffff |
| Style | Name Color | Color of the group name. | #1e1e2e |
| Style | Description / Meta Color | Color of the description and details. | #6c757d |

## Members Carousel

BuddyPress members in a Swiper carousel. Block name: `wbcom-essential/members-carousel`.

### Add it

1. Open the block inserter.
2. Search for **Members Carousel**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Content | Total Members | How many members to load. | 12 |
| Content | Sort By | Newest, Most Active, Most Popular or Alphabetical. | Newest |
| Content | Show Last Active | Shows when the member was last active. | On |
| Content | Show Friend Button | Shows a friend button to logged-in members. | On |
| Carousel | Slides Per View (Desktop) | Cards visible on desktop. | 4 |
| Carousel | Slides Per View (Tablet) | Cards visible on tablets. | 2 |
| Carousel | Slides Per View (Mobile) | Cards visible on phones. | 1 |
| Carousel | Space Between (px) | Space between cards. | 24 |
| Carousel | Autoplay | Moves slides automatically. | On |
| Carousel | Autoplay Delay (ms) | Time between slides. | 3000 |
| Carousel | Loop | Returns to the first slide after the last. | On |
| Carousel | Show Navigation Arrows | Shows the arrows. | On |
| Carousel | Show Pagination Dots | Shows the dots. | On |
| Style | Avatar Size (px) | Size of the member avatar. | 80 |
| Style | Card Border Radius (px) | Roundness of each card. | 12 |
| Style | Card Background | Card background. | #ffffff |
| Style | Name Color | Color of the member name. | #1e1e2e |
| Style | Meta Color | Color of the details. | #6c757d |

### Tips

- The friend button needs the Friends component to be active.
- If no member is found, the block shows "No members found."

## Members Grid

BuddyPress members in a responsive grid. Block name: `wbcom-essential/members-grid`.

### Add it

1. Open the block inserter.
2. Search for **Members Grid**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Content | Total Members | How many members to load. | 12 |
| Content | Sort By | Newest, Most Active, Most Popular or Alphabetical. | Newest |
| Content | Show Last Active | Shows when the member was last active. | On |
| Content | Show Friend Button | Shows a friend button to logged-in members. | On |
| Layout | Columns (Desktop) | Columns on desktop. | 4 |
| Layout | Columns (Tablet) | Columns on tablets. | 2 |
| Layout | Columns (Mobile) | Columns on phones. | 1 |
| Layout | Gap (px) | Space between cards. | 24 |
| Layout | Avatar Size (px) | Size of the member avatar. | 80 |
| Style | Card Border Radius (px) | Roundness of each card. | 12 |
| Style | Card Background | Card background. | #ffffff |
| Style | Name Color | Color of the member name. | #1e1e2e |
| Style | Meta Color | Color of the details. | #6c757d |

### Tips

- The friend button needs the Friends component to be active.
- If no member is found, the block shows "No members found."
