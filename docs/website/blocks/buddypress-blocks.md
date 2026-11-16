# BuddyPress Blocks (Activity feed, member grid, group slider)

**Also called:** activity feed, community stream, member grid, member directory, members slider, group list, group slider, groups directory.

This page covers five blocks that show your community. They are **Activity Feed**, **Group Carousel** (a group slider), **Groups Grid**, **Members Carousel** (a member slider) and **Members Grid**. They appear in the block inserter under **Essential - BuddyPress**. They need BuddyPress or BuddyBoss Platform.

If BuddyPress is not active, these blocks show a notice that says "BuddyPress is required for this block".

Every block here also has the Spacing and Advanced settings described in [Blocks Overview](blocks-overview.md).

## Activity Feed

A BuddyPress activity stream with cards, type icons, relative timestamps and interaction counts.

**What it is for:** Use it to show what members are doing in your community.

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
| Colors | Accent Color | Accent for icons and links. | Theme accent |
| Colors | Card Background | Card background. | Theme surface |
| Colors | Name Color | Color of member names. | Theme text |
| Colors | Content Color | Color of the activity text. | Theme text |
| Colors | Timestamp Color | Color of the timestamp. | Theme muted text |
| Colors | Border Color | Color of the card border. | Theme border |
| Colors | Icon Background | Background of the type icon. | Theme accent, tinted |

### Tips

- The block says "No activity to show yet" if there is no activity to show.
- The feed includes a Load More button for older items.

## Group Carousel

BuddyPress groups in a Swiper carousel with autoplay, arrows, dots and a join button.

**What it is for:** Use it to show your groups in a slider, with a button to join.

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
| Style | Card Background | Card background. | Theme surface |
| Style | Group Name Color | Color of the group name. | Theme text |
| Style | Border Radius, Box Shadow | Rounds the corners and adds a shadow. | Shadow off |

### Tips

- The block says "No groups found" if no group is found.
- The join button needs the Groups component to be active.

## Groups Grid

BuddyPress groups in a responsive grid.

**What it is for:** Use it to list your groups in a grid on any page.

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
| Style | Card Background | Card background. | Theme surface |
| Style | Name Color | Color of the group name. | Theme text |
| Style | Description / Meta Color | Color of the description and details. | Theme muted text |

## Members Carousel

BuddyPress members in a Swiper carousel.

**What it is for:** Use it to show your members in a slider.

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
| Style | Card Background | Card background. | Theme surface |
| Style | Name Color | Color of the member name. | Theme text |
| Style | Meta Color | Color of the details. | Theme muted text |

### Tips

- The friend button needs the Friends component to be active.
- The block says "No members found" if no member is found.
## Members Grid

BuddyPress members in a responsive grid.

**What it is for:** Use it to list your members in a grid on any page, such as a directory.

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
| Layout | Columns (Mobile) | Columns on phones. | 2 |
| Layout | Gap (px) | Space between cards. | 24 |
| Layout | Avatar Size (px) | Size of the member avatar. | 80 |
| Style | Card Border Radius (px) | Roundness of each card. | 12 |
| Style | Card Background | Card background. | Theme surface |
| Style | Name Color | Color of the member name. | Theme text |
| Style | Meta Color | Color of the details. | Theme muted text |

### Tips

- The friend button needs the Friends component to be active.
- The block says "No members found" if no member is found.
## You'll know it worked when

View the page while BuddyPress is active. You see real members, groups or activity from your site.

## Good to know

### Why does the block show a notice instead of members?

BuddyPress or BuddyBoss Platform is not active. Turn it on and reload.

### Why is there no friend or join button?

The Friends or Groups component must be active in BuddyPress, and the visitor must be logged in.

## For developers

Each block has an internal name, used in block markup and code.

| Block | Internal name |
|-------|---------------|
| Activity Feed | `wbcom-essential/activity-feed` |
| Group Carousel | `wbcom-essential/group-carousel` |
| Groups Grid | `wbcom-essential/groups-grid` |
| Members Carousel | `wbcom-essential/members-carousel` |
| Members Grid | `wbcom-essential/members-grid` |
