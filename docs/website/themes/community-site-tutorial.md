# Community Site Tutorial

Creating a Community Site

Build a BuddyPress community site with member directories, group showcases, activity feeds, and user dashboards using WBcom Essential.

What You'll Build

A complete community site with:

Homepage for visitors (non-logged-in users)
Dashboard for members (logged-in users)
Member directory page
Group directory page
Activity page with forums

Time required: 45-60 minutes

Requirements:

WordPress 6.0+
BuddyPress 10.0+ (activated)
WBcom Essential (activated)
bbPress (optional, for forums)

Part 1: Community Homepage

For Visitors (Logged-Out)

Create a page that encourages visitors to join:

Hero Section
Add a Slider block
Slides showing community benefits
CTA: "Join the Community"

Member Showcase
Add a Heading block: "Meet Our Members"
Add a Members Carousel block
Settings:
Members per view: 4
Order by: Most Active
Show friend button: No (for visitors)
Autoplay: On

Group Discovery
Add a Heading block: "Popular Groups"
Add a Groups Grid block
Settings:
Columns: 4
Max groups: 8
Order by: Most Popular
Show join button: Yes (links to register)

Testimonials
Add a Testimonial Carousel block
Include member testimonials about the community

Final CTA
Add a CTA Box block
Heading: "Ready to Join?"
Button: "Create Free Account"

For Members (Logged-In)

Use WordPress conditional blocks or create a separate dashboard page:

Welcome Panel
Add a Dashboard Intro block
Settings:
Show avatar: Yes
Show name: Yes
Greeting: "Welcome back,"
Quick links: Edit Profile, Find Friends, Browse Groups

Profile Completion Prompt
Add a Profile Completion block (only shows if profile incomplete)
Settings:
Show percentage: Yes
Show steps: Yes
Encourage text: "Complete your profile to get more connections"

Activity Feed Teaser
Add a Forums Activity block (if bbPress active)
Settings:
Activity count: 5
Show avatars: Yes
Time format: Relative

Suggested Connections
Add a Members Grid block
Settings:
Columns: 4
Max members: 4
Order by: Random
Show friend button: Yes

Part 2: Member Directory

Create a dedicated page for browsing members.

Page Header
Add a Heading block
Text: "Community Members"
Tag: H1

Member Grid
Add a Members Grid block
Settings:
Columns: 4
Member type: All
Max members: 16 (or higher with pagination)
Order by: Newest (or let users sort)
Show last active: Yes
Show friend button: Yes
Enable pagination if you have many members

Sidebar (Optional)

Using a Columns block:

Left column (75%): Members Grid
Right column (25%): Member stats, quick links

Part 3: Group Directory

Create a page for discovering and joining groups.

Page Header
Add a Heading block
Text: "Explore Groups"
Tag: H1

Featured Groups Carousel
Add a Group Carousel block
Settings:
Groups per view: 3
Show cover image: Yes
Show description: Yes
Autoplay: Yes

All Groups Grid
Add a Heading block: "All Groups"
Add a Groups Grid block
Settings:
Columns: 3
Group type: All
Max groups: 12
Order by: Active
Show description: Yes (truncated)
Show member count: Yes
Show join button: Yes
Enable pagination

Part 4: Activity & Forums

Create a page for community discussions.

With bbPress Forums

Recent Discussions
Add a Heading block: "Recent Discussions"
Add a Forums Activity block
Settings:
Activity count: 10
Show avatars: Yes
Time format: Relative

Forum Categories
Add a Heading block: "Forum Categories"
Add a Forums block
Settings:
Layout: List
Show topic count: Yes
Show reply count: Yes
Show freshness: Yes

Without bbPress

If you don't have bbPress:

Activity Stream
Use BuddyPress's built-in activity component
Add members blocks to encourage engagement

Member Highlights
Add a Members Carousel block
Filter to most active members this week

Part 5: Site Header

Create a consistent header with community features.

Add Header Bar Block
Add a Header Bar block to your header template
Settings:
Show notifications: Yes
Show messages: Yes
Show search: Yes
Show cart: Yes (if WooCommerce active)

Configure User Menu
Add menu items:
My Profile
My Groups
Settings
Logout

Complete Site Structure

Homepage (for visitors)
├── Hero Slider
├── Members Carousel (&quot;Meet Our Members&quot;)
├── Groups Grid (&quot;Popular Groups&quot;)
├── Testimonial Carousel
└── CTA Box (&quot;Join Now&quot;)

Dashboard (for members)
├── Dashboard Intro (welcome + avatar)
├── Profile Completion (if incomplete)
├── Forums Activity (recent discussions)
└── Members Grid (suggested connections)

Member Directory
├── Heading
├── Members Grid (with pagination)
└── Optional sidebar

Group Directory
├── Heading
├── Group Carousel (featured)
└── Groups Grid (all groups)

Activity Page
├── Forums Activity
└── Forums (categories)

Header (all pages)
└── Header Bar (notifications, messages, search)

Styling for Consistency

Enable Theme Colors

For all BuddyPress blocks:

Select the block
Open Color Settings
Enable "Use Theme Colors"

This ensures all blocks match your theme's color scheme.

Consistent Avatar Sizes

Use the same avatar size across blocks:

Member Grid: 80px
Member Carousel: 80px
Activity feeds: 40px

Card Styling

Match card styles across blocks:

Same border radius
Same shadow depth
Same padding

Mobile Considerations

Column Adjustments

ElementDesktopTabletMobileMembers Grid4 cols2 cols1 colGroups Grid3 cols2 cols1 colCarousel items421

Touch-Friendly

Carousels work with swipe
Friend/Join buttons are large enough to tap
Navigation is accessible

Tips for Engagement

Highlight Active Members

Show "Most Active" members prominently to:

Encourage participation
Showcase community value
Give recognition

Make Groups Discoverable

Feature popular groups on homepage
Show member counts (social proof)
Display recent activity

Profile Completion

The Profile Completion block:

Shows only to users with incomplete profiles
Encourages users to add more information
Increases member engagement

Welcome New Members

On the dashboard:

Personalized greeting
Clear next steps
Quick links to common actions

Related Documentation

BuddyPress Integration - All BuddyPress blocks
Block Reference - Complete block settings
Building a Landing Page - Marketing pages
