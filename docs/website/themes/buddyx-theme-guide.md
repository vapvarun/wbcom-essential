# BuddyX Theme Guide

WBcom Essential + BuddyX Theme

The ultimate combination for building community websites with WordPress and BuddyPress.

Overview

BuddyX is a free, community-focused WordPress theme designed specifically for BuddyPress sites. When combined with WBcom Essential, you get:

45 Gutenberg blocks optimized for community layouts
43 Elementor widgets with seamless theme integration
Automatic theme color inheritance
Pre-built community page templates
BuddyPress-specific blocks and widgets

Quick Setup

Step 1: Install BuddyX Theme

Go to Appearance > Themes > Add New
Search for "BuddyX"
Click Install then Activate

Step 2: Install WBcom Essential

Go to Plugins > Add New
Upload wbcom-essential.zip
Click Install Now then Activate

Step 3: Enable Theme Colors

WBcom Essential automatically detects BuddyX theme colors. To use them:

Edit any page with Gutenberg or Elementor
Add a WBcom Essential block/widget
In the Color Settings panel, enable "Use Theme Colors"
Colors will now match your BuddyX customizer settings

Recommended Blocks for BuddyX

Header Section

Build a stunning community header:

BlockPurposeBuddyX FeatureHeader BarUser navigationShows login/profile, notifications, messages, cartBrandingSite logoInherits BuddyX logo settingsSmart MenuNavigationSupports BuddyX mega menu

Example Header Layout:

[Branding] [Smart Menu] [Header Bar]

Community Homepage

BlockPurposeBest ForMembers CarouselShowcase active membersHomepage, sidebarMembers GridMember directory previewHomepage sectionsGroups CarouselFeatured groupsHomepage, community pagesGroups GridGroup directory previewCommunity hubForums ActivityRecent discussionsHomepage, dashboard

Member Pages

BlockPurposeLocationProfile CompletionEncourage profile setupDashboard, profile sidebarDashboard IntroWelcome returning usersMember dashboardMembers ListsFull member directoryMembers page

Group Pages

BlockPurposeLocationGroups ListsFull group directoryGroups pageGroup CarouselFeatured/active groupsSidebar, homepageForumsGroup discussionsGroup single page

Theme Color Variables

BuddyX defines these CSS variables that WBcom Essential blocks use:

VariableBuddyX SettingUsed For--flavor-primaryPrimary ColorButtons, links, accents--flavor-secondarySecondary ColorSecondary buttons, hover--flavor-tertiaryAccent ColorHighlights, icons--flavor-baseBackgroundBlock backgrounds--flavor-contrastText ColorContent text

Customizer Locations

Appearance > Customize > Colors
Primary Color
Secondary Color
Accent Color

Appearance > Customize > Typography
Heading Font
Body Font

Page Templates

Community Homepage

Create a community homepage using these blocks:

[Hero Section - Post Slider or Slider]
[Members Carousel - &quot;Active Members&quot;]
[Groups Grid - 3 columns, featured groups]
[Forums Activity - Recent discussions]
[CTA Box - &quot;Join Our Community&quot;]

Members Directory

[Heading - &quot;Our Members&quot;]
[Members Grid - Filterable by member type]
[Pagination]

Groups Directory

[Heading - &quot;Community Groups&quot;]
[Groups Grid - With search and filters]
[Pagination]

User Dashboard

[Dashboard Intro - Welcome message]
[Profile Completion - Progress bar]
[Forums Activity - User&#039;s recent posts]
[Members Carousel - Friends/connections]

BuddyPress-Specific Settings

Members Carousel/Grid

SettingRecommended ValueWhyPer Page8-12Balances display and performanceOrder ByactiveShows engaged membersShowAvatar, Name, Member TypeEssential infoMember TypeFilter specific typesHighlight verified/premium members

Groups Carousel/Grid

SettingRecommended ValueWhyPer Page6-9Groups have more contentOrder Byactive or popularShows thriving groupsShowAvatar, Name, Member CountSocial proofGroup TypeFilter if using typesCategorize by purpose

Header Bar

SettingRecommended for BuddyXShow SearchYes - uses BuddyX searchShow NotificationsYes - BP notificationsShow MessagesYes - BP messagesShow CartIf using WooCommerceDark Mode ToggleIf BuddyX dark mode enabled

Styling Tips

Match BuddyX Card Style

BuddyX uses rounded cards with subtle shadows. Configure blocks:

Border Radius: 8px
Box Shadow: 0 2px 8px rgba(0,0,0,0.08)
Background: var(--flavor-base)

Consistent Spacing

BuddyX uses 30px section spacing. Set block margins:

Margin Top: 30px
Margin Bottom: 30px

Typography Harmony

Use BuddyX's heading styles:

H1: 2.5rem (40px)
H2: 2rem (32px)
H3: 1.5rem (24px)

Common Patterns

Featured Members Section

&lt;!-- Gutenberg --&gt;
[columns]
  [column 2/3]
    [heading] Meet Our Community [/heading]
    [paragraph] Discover amazing people... [/paragraph]
  [/column]
  [column 1/3]
    [button] View All Members [/button]
  [/column]
[/columns]
[members-carousel slides=&quot;4&quot; order=&quot;active&quot;]

Community Stats

[columns 4]
  [counter prefix=&quot;&quot; number=&quot;1000&quot; suffix=&quot;+&quot; title=&quot;Members&quot;]
  [counter prefix=&quot;&quot; number=&quot;50&quot; suffix=&quot;+&quot; title=&quot;Groups&quot;]
  [counter prefix=&quot;&quot; number=&quot;5000&quot; suffix=&quot;+&quot; title=&quot;Discussions&quot;]
  [counter prefix=&quot;&quot; number=&quot;10000&quot; suffix=&quot;+&quot; title=&quot;Messages&quot;]
[/columns]

Call to Action

[cta-box
  title=&quot;Ready to Join?&quot;
  description=&quot;Become part of our thriving community today.&quot;
  button_text=&quot;Sign Up Free&quot;
  button_url=&quot;/register&quot;
]

Troubleshooting

Blocks Don't Match Theme Colors

Check Use Theme Colors is enabled in block settings
Clear any caching plugins
Verify BuddyX Customizer colors are set

BuddyPress Blocks Not Appearing

Ensure BuddyPress is activated
Check that required BP components are enabled
Refresh the block editor

Header Bar Not Showing User Menu

User must be logged in
Check BuddyPress profile component is active
Verify menu items are enabled in block settings

Resources

BuddyX Theme: wbcomdesigns.com/downloads/buddyx-theme/
BuddyX Documentation: docs.wbcomdesigns.com/docs/buddyx-free-theme/
BuddyPress Setup: BuddyPress Integration Guide
Support: wbcomdesigns.com/support/
