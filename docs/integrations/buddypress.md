# BuddyPress Integration

WBcom Essential provides **11 blocks** and **11 widgets** specifically designed for BuddyPress community sites. Display members, groups, activity feeds, and forums with full customization.

---

## Requirements

- WordPress 6.0+
- BuddyPress 10.0+ (blocks appear only when BuddyPress is active)
- bbPress (optional, for forums blocks)

---

## Available Blocks

### Member Blocks

Display your community members in different layouts.

| Block | Best For |
|-------|----------|
| **Members Grid** | Member directories, homepage showcases |
| **Members Lists** | Compact member listings, sidebars |
| **Members Carousel** | Featured members, homepage highlights |

### Group Blocks

Showcase BuddyPress groups.

| Block | Best For |
|-------|----------|
| **Groups Grid** | Group directories, discovery pages |
| **Groups Lists** | Sidebar group listings |
| **Group Carousel** | Featured groups, homepage sections |

### Activity & Forums

Display community activity and discussions.

| Block | Best For |
|-------|----------|
| **Forums** | Forum listings, discussion boards |
| **Forums Activity** | Recent discussions, activity feeds |
| **Dashboard Intro** | Welcome panels, user dashboards |

### User Interface

Navigation and user status elements.

| Block | Best For |
|-------|----------|
| **Header Bar** | Site headers with notifications/messages |
| **Profile Completion** | Encourage profile completion |

---

## Members Grid

Display community members in a customizable grid layout.

### Settings

| Setting | Options | Purpose |
|---------|---------|---------|
| Columns | 1-6 | Grid density |
| Member Type | All, Friends, Popular | Filter members |
| Max Members | 1-50 | Limit display |
| Order By | Active, Newest, Popular | Sorting |
| Show Last Active | Yes/No | Activity indicator |
| Show Friend Button | Yes/No | Quick action |

### Use Cases

**Member Directory Page**

A full-page member listing for your community:

1. Add Members Grid block
2. Set columns to 4
3. Enable pagination
4. Show last active dates
5. Add friend buttons for logged-in users

**Homepage Featured Members**

Highlight active community members:

1. Add Members Grid block
2. Set columns to 4
3. Set max members to 8
4. Order by "Most Active"
5. Hide pagination

**Sidebar Widget**

Compact member listing in sidebar:

1. Add Members Grid block
2. Set columns to 1
3. Set max members to 5
4. Use list layout style

---

## Members Carousel

Scrolling carousel of member profiles.

### Settings

| Setting | Options | Purpose |
|---------|---------|---------|
| Members Per View | 1-6 | Visible at once |
| Autoplay | Yes/No | Auto-scroll |
| Autoplay Speed | 2000-10000ms | Scroll interval |
| Show Navigation | Yes/No | Arrow buttons |
| Show Pagination | Yes/No | Dot indicators |
| Loop | Yes/No | Continuous scroll |

### Use Cases

**Homepage Hero Section**

1. Add Members Carousel block
2. Set 4 members per view
3. Enable autoplay at 5 seconds
4. Show navigation arrows
5. Filter to "Most Popular" members

**Testimonial Alternative**

Show real community members as social proof:

1. Add Members Carousel block
2. Set 1 member per view
3. Show larger avatars
4. Include member bio/description
5. Enable autoplay

---

## Groups Grid

Display BuddyPress groups in grid format.

### Settings

| Setting | Options | Purpose |
|---------|---------|---------|
| Columns | 1-6 | Grid density |
| Group Type | All, Public, Private | Filter groups |
| Max Groups | 1-50 | Limit display |
| Order By | Active, Newest, Popular, Alphabetical | Sorting |
| Show Description | Yes/No | Group details |
| Show Member Count | Yes/No | Group size |
| Show Join Button | Yes/No | Quick action |

### Use Cases

**Group Directory**

Full listing of community groups:

1. Add Groups Grid block
2. Set columns to 3
3. Show descriptions (truncated)
4. Show member counts
5. Enable pagination
6. Add join buttons

**Homepage Featured Groups**

Highlight popular groups:

1. Add Groups Grid block
2. Set columns to 4
3. Set max groups to 8
4. Order by "Most Active"
5. Hide pagination

---

## Group Carousel

Scrolling carousel of BuddyPress groups.

### Settings

| Setting | Options | Purpose |
|---------|---------|---------|
| Groups Per View | 1-6 | Visible at once |
| Autoplay | Yes/No | Auto-scroll |
| Show Cover Image | Yes/No | Visual appeal |
| Show Description | Yes/No | Group details |

### Use Cases

**Discover Groups Section**

1. Add Group Carousel block
2. Set 3 groups per view
3. Show cover images
4. Enable autoplay
5. Filter to public groups only

---

## Profile Completion

Encourage users to complete their profiles with a visual progress indicator.

### Settings

| Setting | Options | Purpose |
|---------|---------|---------|
| Show Percentage | Yes/No | Numeric progress |
| Show Steps | Yes/No | What's missing |
| Style | Bar, Circle, Steps | Visual style |
| Encourage Text | Custom | Motivation message |

### Use Cases

**User Dashboard**

1. Add Profile Completion block to member dashboard template
2. Show percentage and steps
3. Add custom message: "Complete your profile to unlock all features"
4. Link steps to profile edit sections

**Sidebar Reminder**

1. Add Profile Completion block to sidebar
2. Show circular progress indicator
3. Hide completed users (show only incomplete)

---

## Header Bar

Navigation bar with BuddyPress notifications, messages, and user menu.

### Settings

| Setting | Options | Purpose |
|---------|---------|---------|
| Show Notifications | Yes/No | BP notifications |
| Show Messages | Yes/No | BP messages |
| Show Search | Yes/No | Site search |
| Show Cart | Yes/No | WooCommerce cart |
| User Menu Items | Customizable | Dropdown links |

### Use Cases

**Main Site Header**

1. Add Header Bar to header template
2. Enable notifications and messages
3. Add user menu with: Profile, Settings, Logout
4. Enable search
5. Enable cart (if WooCommerce active)

---

## Forums

Display bbPress forums (requires bbPress plugin).

### Settings

| Setting | Options | Purpose |
|---------|---------|---------|
| Forum Layout | List, Grid | Display style |
| Show Topic Count | Yes/No | Forum activity |
| Show Reply Count | Yes/No | Engagement |
| Show Freshness | Yes/No | Recent activity |

### Use Cases

**Community Discussion Page**

1. Add Forums block
2. Use list layout
3. Show all counts
4. Show freshness dates
5. Link to individual forums

---

## Forums Activity

Recent forum activity feed.

### Settings

| Setting | Options | Purpose |
|---------|---------|---------|
| Activity Count | 1-20 | Items to show |
| Show Avatars | Yes/No | User identification |
| Time Format | Relative/Absolute | "2 hours ago" vs date |
| Forum Filter | All/Specific | Filter by forum |

### Use Cases

**Sidebar Recent Discussions**

1. Add Forums Activity block
2. Set count to 5
3. Show avatars
4. Use relative time format

**Activity Dashboard**

1. Add Forums Activity block
2. Set count to 10
3. Show all forums
4. Include topic previews

---

## Dashboard Intro

Welcome panel for logged-in users.

### Settings

| Setting | Options | Purpose |
|---------|---------|---------|
| Greeting Text | Custom | "Welcome back," etc |
| Show Avatar | Yes/No | User photo |
| Show Name | Yes/No | Personalization |
| Custom Message | Custom | Additional info |
| Quick Links | Customizable | Action buttons |

### Use Cases

**Member Dashboard**

1. Add Dashboard Intro block
2. Set greeting to "Welcome back,"
3. Show avatar and name
4. Add quick links: Edit Profile, View Activity, Find Friends

**Community Homepage**

1. Add Dashboard Intro block (logged-in users only)
2. Show personalized greeting
3. Add stats: friend count, group count
4. Include "What's new" teaser

---

## Building a Complete Community Page

### Step 1: Homepage for Logged-Out Users

1. Hero section with site description
2. Members Carousel showing active members
3. Groups Grid showing popular groups
4. Call-to-action to register

### Step 2: Homepage for Logged-In Users

1. Dashboard Intro with greeting
2. Profile Completion (if incomplete)
3. Activity feed from friends
4. Suggested groups to join

### Step 3: Member Directory

1. Search/filter controls
2. Members Grid with pagination
3. Sidebar with member types filter

### Step 4: Group Directory

1. Search/filter controls
2. Groups Grid with pagination
3. Sidebar with group type filter

---

## Styling Tips

### Enable Theme Colors

All BuddyPress blocks support the "Use Theme Colors" toggle:

1. Select any BP block
2. Find Color Settings in sidebar
3. Enable "Use Theme Colors"
4. Block inherits your theme's color scheme

### Match BuddyX Theme

If using BuddyX theme, blocks automatically match the theme styling. Enable Theme Colors for best results.

### Custom Styling

Add custom CSS classes to blocks for additional styling:

```css
/* Example: Larger avatars */
.my-large-avatars .bp-avatar {
  width: 120px;
  height: 120px;
}
```

---

## Troubleshooting

### Blocks Not Appearing

BuddyPress blocks only show when BuddyPress is active:

1. Go to Plugins → Confirm BuddyPress is activated
2. Refresh the block editor
3. Search for "Starter Pack - BuddyPress" category

### Forums Blocks Not Working

Forums blocks require bbPress:

1. Install and activate bbPress plugin
2. Configure at least one forum
3. Forums blocks will then appear

### No Members/Groups Showing

1. Check that you have members registered
2. Check that groups exist and are public
3. Verify your filter settings aren't too restrictive

---

## Elementor Widgets (11)

All BuddyPress functionality is also available as Elementor widgets. Use these if you prefer Elementor over the block editor.

### Widget Overview

| Widget | Purpose | Block Equivalent |
|--------|---------|------------------|
| **Dashboard Intro** | Welcome panel for logged-in users | `dashboard-intro` |
| **Forums** | bbPress forum listings | `forums` |
| **Forums Activity** | Recent forum discussions | `forums-activity` |
| **Group Carousel** | Groups in scrolling carousel | `group-carousel` |
| **Groups Grid** | Groups in grid layout | `groups-grid` |
| **Groups Lists** | Groups in list format | `groups-lists` |
| **Header Bar** | Navigation with notifications/messages | `header-bar` |
| **Members Grid** | Members in grid layout | `members-grid` |
| **Members Lists** | Members in list format | `members-lists` |
| **Members Carousel** | Members in scrolling carousel | `members-carousel` |
| **Profile Completion** | Profile progress indicator | `profile-completion` |

### Using BuddyPress Widgets

1. Edit any page with Elementor
2. Open the widget panel
3. Search for "BuddyPress" or "Members"
4. Drag the widget to your page
5. Configure in the left panel

### Members Grid Widget

Display community members with advanced Elementor controls.

**Content Settings:**
- Member Type: All, Friends, Popular, Recently Active
- Max Members: Number to display
- Columns: 1-6
- Order By: Active, Newest, Popular, Alphabetical

**Style Settings:**
- Card background, border, shadow
- Avatar size and border radius
- Name typography and color
- Meta text styling
- Button colors

### Members Carousel Widget

**Content Settings:**
- Member selection criteria
- Slides per view
- Autoplay and speed
- Navigation arrows and dots

**Style Settings:**
- Card styling
- Avatar treatment
- Typography controls
- Navigation arrow colors

### Groups Grid Widget

**Content Settings:**
- Group Type: All, Public, Private, Hidden
- Max Groups: Number to display
- Columns: 1-6
- Order By: Active, Newest, Popular, Alphabetical
- Show: Description, Member Count, Join Button

**Style Settings:**
- Card design
- Cover image aspect ratio
- Typography
- Button styling

### Group Carousel Widget

**Content Settings:**
- Group selection criteria
- Groups per view
- Show cover images
- Autoplay settings

**Style Settings:**
- Card backgrounds
- Image treatment
- Navigation styling

### Header Bar Widget

**Content Settings:**
- Show Notifications: Yes/No
- Show Messages: Yes/No
- Show Search: Yes/No
- Show Cart: Yes/No (WooCommerce)
- User Menu Items: Customizable dropdown

**Style Settings:**
- Icon sizes and colors
- Badge styling
- Dropdown design
- Spacing controls

### Profile Completion Widget

**Content Settings:**
- Style: Bar, Circle, or Steps
- Show Percentage: Yes/No
- Show Incomplete Steps: Yes/No
- Custom Encourage Text

**Style Settings:**
- Progress bar colors
- Typography
- Step indicator styling

### Dashboard Intro Widget

**Content Settings:**
- Greeting Text
- Show Avatar: Yes/No
- Show Name: Yes/No
- Custom Message
- Quick Links (repeater)

**Style Settings:**
- Box styling
- Avatar size
- Typography
- Button design

### Forums Widget

Requires bbPress plugin.

**Content Settings:**
- Forum Layout: List or Grid
- Show Topic Count: Yes/No
- Show Reply Count: Yes/No
- Show Freshness: Yes/No

**Style Settings:**
- Forum item styling
- Typography
- Icon colors

### Forums Activity Widget

**Content Settings:**
- Activity Count: 1-20
- Show Avatars: Yes/No
- Time Format: Relative or Absolute
- Forum Filter: All or Specific

**Style Settings:**
- Activity item design
- Avatar size
- Typography

---

## Blocks vs Widgets: Which to Choose?

| Use Gutenberg Blocks When... | Use Elementor Widgets When... |
|------------------------------|-------------------------------|
| Building with block editor | Building with Elementor |
| Creating Full Site Editing templates | Need advanced styling controls |
| Want native WordPress experience | Already using Elementor site-wide |
| Prefer simpler interface | Need precise design control |

Both options have identical functionality - choose based on your preferred editor.

---

## Related Documentation

- [Getting Started](../getting-started.md)
- [Theme Colors Guide](../features/theme-colors.md)
- [Block Reference](../blocks-guide.md)
- [Elementor Widgets Guide](../widgets-guide.md)
