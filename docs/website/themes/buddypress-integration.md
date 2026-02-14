# BuddyPress Integration

BuddyPress Integration

WBcom Essential provides 11 blocks and 11 widgets specifically designed for BuddyPress community sites. Display members, groups, activity feeds, and forums with full customization.

Requirements

WordPress 6.0+
BuddyPress 10.0+ (blocks appear only when BuddyPress is active)
bbPress (optional, for forums blocks)

Available Blocks

Member Blocks

Display your community members in different layouts.

BlockBest ForMembers GridMember directories, homepage showcasesMembers ListsCompact member listings, sidebarsMembers CarouselFeatured members, homepage highlights

Group Blocks

Showcase BuddyPress groups.

BlockBest ForGroups GridGroup directories, discovery pagesGroups ListsSidebar group listingsGroup CarouselFeatured groups, homepage sections

Activity & Forums

Display community activity and discussions.

BlockBest ForForumsForum listings, discussion boardsForums ActivityRecent discussions, activity feedsDashboard IntroWelcome panels, user dashboards

User Interface

Navigation and user status elements.

BlockBest ForHeader BarSite headers with notifications/messagesProfile CompletionEncourage profile completion

Members Grid

Display community members in a customizable grid layout.

Settings

SettingOptionsPurposeColumns1-6Grid densityMember TypeAll, Friends, PopularFilter membersMax Members1-50Limit displayOrder ByActive, Newest, PopularSortingShow Last ActiveYes/NoActivity indicatorShow Friend ButtonYes/NoQuick action

Use Cases

Member Directory Page

A full-page member listing for your community:

Add Members Grid block
Set columns to 4
Enable pagination
Show last active dates
Add friend buttons for logged-in users

Homepage Featured Members

Highlight active community members:

Add Members Grid block
Set columns to 4
Set max members to 8
Order by "Most Active"
Hide pagination

Sidebar Widget

Compact member listing in sidebar:

Add Members Grid block
Set columns to 1
Set max members to 5
Use list layout style

Members Carousel

Scrolling carousel of member profiles.

Settings

SettingOptionsPurposeMembers Per View1-6Visible at onceAutoplayYes/NoAuto-scrollAutoplay Speed2000-10000msScroll intervalShow NavigationYes/NoArrow buttonsShow PaginationYes/NoDot indicatorsLoopYes/NoContinuous scroll

Use Cases

Homepage Hero Section

Add Members Carousel block
Set 4 members per view
Enable autoplay at 5 seconds
Show navigation arrows
Filter to "Most Popular" members

Testimonial Alternative

Show real community members as social proof:

Add Members Carousel block
Set 1 member per view
Show larger avatars
Include member bio/description
Enable autoplay

Groups Grid

Display BuddyPress groups in grid format.

Settings

SettingOptionsPurposeColumns1-6Grid densityGroup TypeAll, Public, PrivateFilter groupsMax Groups1-50Limit displayOrder ByActive, Newest, Popular, AlphabeticalSortingShow DescriptionYes/NoGroup detailsShow Member CountYes/NoGroup sizeShow Join ButtonYes/NoQuick action

Use Cases

Group Directory

Full listing of community groups:

Add Groups Grid block
Set columns to 3
Show descriptions (truncated)
Show member counts
Enable pagination
Add join buttons

Homepage Featured Groups

Highlight popular groups:

Add Groups Grid block
Set columns to 4
Set max groups to 8
Order by "Most Active"
Hide pagination

Group Carousel

Scrolling carousel of BuddyPress groups.

Settings

SettingOptionsPurposeGroups Per View1-6Visible at onceAutoplayYes/NoAuto-scrollShow Cover ImageYes/NoVisual appealShow DescriptionYes/NoGroup details

Use Cases

Discover Groups Section

Add Group Carousel block
Set 3 groups per view
Show cover images
Enable autoplay
Filter to public groups only

Profile Completion

Encourage users to complete their profiles with a visual progress indicator.

Settings

SettingOptionsPurposeShow PercentageYes/NoNumeric progressShow StepsYes/NoWhat's missingStyleBar, Circle, StepsVisual styleEncourage TextCustomMotivation message

Use Cases

User Dashboard

Add Profile Completion block to member dashboard template
Show percentage and steps
Add custom message: "Complete your profile to unlock all features"
Link steps to profile edit sections

Sidebar Reminder

Add Profile Completion block to sidebar
Show circular progress indicator
Hide completed users (show only incomplete)

Header Bar

Navigation bar with BuddyPress notifications, messages, and user menu.

Settings

SettingOptionsPurposeShow NotificationsYes/NoBP notificationsShow MessagesYes/NoBP messagesShow SearchYes/NoSite searchShow CartYes/NoWooCommerce cartUser Menu ItemsCustomizableDropdown links

Use Cases

Main Site Header

Add Header Bar to header template
Enable notifications and messages
Add user menu with: Profile, Settings, Logout
Enable search
Enable cart (if WooCommerce active)

Forums

Display bbPress forums (requires bbPress plugin).

Settings

SettingOptionsPurposeForum LayoutList, GridDisplay styleShow Topic CountYes/NoForum activityShow Reply CountYes/NoEngagementShow FreshnessYes/NoRecent activity

Use Cases

Community Discussion Page

Add Forums block
Use list layout
Show all counts
Show freshness dates
Link to individual forums

Forums Activity

Recent forum activity feed.

Settings

SettingOptionsPurposeActivity Count1-20Items to showShow AvatarsYes/NoUser identificationTime FormatRelative/Absolute"2 hours ago" vs dateForum FilterAll/SpecificFilter by forum

Use Cases

Sidebar Recent Discussions

Add Forums Activity block
Set count to 5
Show avatars
Use relative time format

Activity Dashboard

Add Forums Activity block
Set count to 10
Show all forums
Include topic previews

Dashboard Intro

Welcome panel for logged-in users.

Settings

SettingOptionsPurposeGreeting TextCustom"Welcome back," etcShow AvatarYes/NoUser photoShow NameYes/NoPersonalizationCustom MessageCustomAdditional infoQuick LinksCustomizableAction buttons

Use Cases

Member Dashboard

Add Dashboard Intro block
Set greeting to "Welcome back,"
Show avatar and name
Add quick links: Edit Profile, View Activity, Find Friends

Community Homepage

Add Dashboard Intro block (logged-in users only)
Show personalized greeting
Add stats: friend count, group count
Include "What's new" teaser

Building a Complete Community Page

Step 1: Homepage for Logged-Out Users

Hero section with site description
Members Carousel showing active members
Groups Grid showing popular groups
Call-to-action to register

Step 2: Homepage for Logged-In Users

Dashboard Intro with greeting
Profile Completion (if incomplete)
Activity feed from friends
Suggested groups to join

Step 3: Member Directory

Search/filter controls
Members Grid with pagination
Sidebar with member types filter

Step 4: Group Directory

Search/filter controls
Groups Grid with pagination
Sidebar with group type filter

Styling Tips

Enable Theme Colors

All BuddyPress blocks support the "Use Theme Colors" toggle:

Select any BP block
Find Color Settings in sidebar
Enable "Use Theme Colors"
Block inherits your theme's color scheme

Match BuddyX Theme

If using BuddyX theme, blocks automatically match the theme styling. Enable Theme Colors for best results.

Custom Styling

Add custom CSS classes to blocks for additional styling:

/* Example: Larger avatars */
.my-large-avatars .bp-avatar {
  width: 120px;
  height: 120px;
}

Troubleshooting

Blocks Not Appearing

BuddyPress blocks only show when BuddyPress is active:

Go to Plugins → Confirm BuddyPress is activated
Refresh the block editor
Search for "Starter Pack - BuddyPress" category

Forums Blocks Not Working

Forums blocks require bbPress:

Install and activate bbPress plugin
Configure at least one forum
Forums blocks will then appear

No Members/Groups Showing

Check that you have members registered
Check that groups exist and are public
Verify your filter settings aren't too restrictive

Elementor Widgets (11)

All BuddyPress functionality is also available as Elementor widgets. Use these if you prefer Elementor over the block editor.

Widget Overview

WidgetPurposeBlock EquivalentDashboard IntroWelcome panel for logged-in usersdashboard-introForumsbbPress forum listingsforumsForums ActivityRecent forum discussionsforums-activityGroup CarouselGroups in scrolling carouselgroup-carouselGroups GridGroups in grid layoutgroups-gridGroups ListsGroups in list formatgroups-listsHeader BarNavigation with notifications/messagesheader-barMembers GridMembers in grid layoutmembers-gridMembers ListsMembers in list formatmembers-listsMembers CarouselMembers in scrolling carouselmembers-carouselProfile CompletionProfile progress indicatorprofile-completion

Using BuddyPress Widgets

Edit any page with Elementor
Open the widget panel
Search for "BuddyPress" or "Members"
Drag the widget to your page
Configure in the left panel

Members Grid Widget

Display community members with advanced Elementor controls.

Content Settings:

Member Type: All, Friends, Popular, Recently Active
Max Members: Number to display
Columns: 1-6
Order By: Active, Newest, Popular, Alphabetical

Style Settings:

Card background, border, shadow
Avatar size and border radius
Name typography and color
Meta text styling
Button colors

Members Carousel Widget

Content Settings:

Member selection criteria
Slides per view
Autoplay and speed
Navigation arrows and dots

Style Settings:

Card styling
Avatar treatment
Typography controls
Navigation arrow colors

Groups Grid Widget

Content Settings:

Group Type: All, Public, Private, Hidden
Max Groups: Number to display
Columns: 1-6
Order By: Active, Newest, Popular, Alphabetical
Show: Description, Member Count, Join Button

Style Settings:

Card design
Cover image aspect ratio
Typography
Button styling

Group Carousel Widget

Content Settings:

Group selection criteria
Groups per view
Show cover images
Autoplay settings

Style Settings:

Card backgrounds
Image treatment
Navigation styling

Header Bar Widget

Content Settings:

Show Notifications: Yes/No
Show Messages: Yes/No
Show Search: Yes/No
Show Cart: Yes/No (WooCommerce)
User Menu Items: Customizable dropdown

Style Settings:

Icon sizes and colors
Badge styling
Dropdown design
Spacing controls

Profile Completion Widget

Content Settings:

Style: Bar, Circle, or Steps
Show Percentage: Yes/No
Show Incomplete Steps: Yes/No
Custom Encourage Text

Style Settings:

Progress bar colors
Typography
Step indicator styling

Dashboard Intro Widget

Content Settings:

Greeting Text
Show Avatar: Yes/No
Show Name: Yes/No
Custom Message
Quick Links (repeater)

Style Settings:

Box styling
Avatar size
Typography
Button design

Forums Widget

Requires bbPress plugin.

Content Settings:

Forum Layout: List or Grid
Show Topic Count: Yes/No
Show Reply Count: Yes/No
Show Freshness: Yes/No

Style Settings:

Forum item styling
Typography
Icon colors

Forums Activity Widget

Content Settings:

Activity Count: 1-20
Show Avatars: Yes/No
Time Format: Relative or Absolute
Forum Filter: All or Specific

Style Settings:

Activity item design
Avatar size
Typography

Blocks vs Widgets: Which to Choose?

Use Gutenberg Blocks When...Use Elementor Widgets When...Building with block editorBuilding with ElementorCreating Full Site Editing templatesNeed advanced styling controlsWant native WordPress experienceAlready using Elementor site-widePrefer simpler interfaceNeed precise design control

Both options have identical functionality - choose based on your preferred editor.

Related Documentation

Getting Started
Theme Colors Guide
Block Reference
Elementor Widgets Guide
