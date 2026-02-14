# BuddyX Pro Theme Guide

WBcom Essential + BuddyX Pro Theme

Premium community building with advanced features, layouts, and integrations.

Overview

BuddyX Pro is the premium version of BuddyX, offering advanced customization options, multiple layout styles, and exclusive features. Combined with WBcom Essential:

All 45 blocks with full feature set
Premium header and layout options
LearnDash LMS integration
Advanced WooCommerce features
Multiple member directory layouts
Exclusive theme color schemes

Premium Features

What BuddyX Pro Adds

FeatureFree BuddyXBuddyX ProLayout Options15+Header StylesBasicAdvanced BuilderMember LayoutsGridGrid, List, Card, CompactGroup LayoutsGridGrid, List, CardDark ModeBasicFull with toggleColor SchemesCustom10+ Pre-builtLearnDashBasicFull IntegrationWooCommerceBasicAdvanced Features

Quick Setup

Step 1: Install BuddyX Pro

Purchase from WBcom Designs
Download the theme zip file
Go to Appearance > Themes > Add New > Upload
Upload and activate BuddyX Pro

Step 2: Install WBcom Essential

Go to Plugins > Add New
Upload wbcom-essential.zip
Activate the plugin

Step 3: Import Demo Content (Recommended)

Go to Appearance > BuddyX Pro > Demo Import
Choose a demo layout
Import to get pre-configured pages

Step 4: Configure Theme Colors

Appearance > Customize > Colors
Choose a pre-built scheme or customize
WBcom Essential blocks will inherit these colors

Advanced Header Building

BuddyX Pro offers an advanced header builder. Combine with WBcom Essential:

Header Elements Available

ElementWBcom Essential BlockPro FeatureLogoBranding / Site LogoMultiple logo optionsMenuSmart MenuMega menu builderUser AreaHeader BarAdvanced stylingSearchHeader Bar searchAjax searchCartHeader Bar cartMini cart dropdownDark ModeHeader Bar toggleFull dark mode

Recommended Header Layout

Layout 1: Full Width Community

[Row 1: Top Bar]
[Branding] | [Contact Info] | [Social Icons]

[Row 2: Main Header]
[Branding] | [Smart Menu] | [Header Bar]

Layout 2: Centered Logo

[Row 1]
[Smart Menu Left] | [Branding Center] | [Header Bar Right]

Layout 3: Stacked

[Row 1: Branding Centered]
[Row 2: Smart Menu + Header Bar]

Member Directory Layouts

BuddyX Pro offers multiple member directory styles. Match them with blocks:

Grid Layout

[Members Grid columns=&quot;4&quot; show_avatar show_name show_member_type]

List Layout

[Members Lists layout=&quot;list&quot; show_avatar show_name show_bio show_last_active]

Card Layout (Pro Exclusive)

[Members Grid layout=&quot;card&quot; show_cover show_avatar show_name show_stats]

Compact Layout

[Members Grid layout=&quot;compact&quot; columns=&quot;6&quot; show_avatar show_name]

LearnDash Integration

BuddyX Pro has built-in LearnDash support. Combine with WBcom Essential:

Course Showcase

[Post Carousel post_type=&quot;sfwd-courses&quot; posts_per_view=&quot;3&quot;]

Student Progress

[Progress Bar title=&quot;Course Progress&quot; percentage=&quot;75&quot;]

Learning Dashboard

[Dashboard Intro message=&quot;Welcome back, learner!&quot;]
[Post Carousel post_type=&quot;sfwd-courses&quot; meta_key=&quot;_sfwd-course_current&quot; show_progress=&quot;true&quot;]

WooCommerce Integration

Product Showcase

[Product Grid columns=&quot;4&quot; category=&quot;featured&quot; show_price show_rating]

Mini Cart in Header

[Header Bar show_cart=&quot;true&quot; cart_style=&quot;dropdown&quot;]

Membership Products

[Pricing Table
  title=&quot;Premium Member&quot;
  price=&quot;$9.99&quot;
  period=&quot;/month&quot;
  features=&quot;Access all groups, Premium badge, Priority support&quot;
  button_text=&quot;Subscribe Now&quot;
]

Premium Color Schemes

BuddyX Pro includes pre-built color schemes:

SchemePrimarySecondaryBest ForDefault#2271b1#1d2327ProfessionalDark#1a1a2e#16213eGaming, TechStarter#007cba#00a0d2Modern, CleanStarter Light#0073aa#00a0d2Bright, FriendlyDeveloper#23282d#0073aaTechnical

Using with Blocks

Select scheme in Appearance > Customize > Colors
Enable Use Theme Colors in block settings
Blocks automatically use scheme colors

Exclusive Pro Layouts

Social Network Homepage

[Hero: Slider with community images]

[Section: Stats]
[Columns 4]
  [Counter: Members] [Counter: Groups] [Counter: Posts] [Counter: Active Today]
[/Columns]

[Section: Activity Feed]
[Columns 2/3 + 1/3]
  [Forums Activity limit=&quot;10&quot;]
  [Sidebar: Members Carousel + Groups Carousel]
[/Columns]

[Section: Featured Groups]
[Groups Grid columns=&quot;3&quot; featured=&quot;true&quot;]

[Section: CTA]
[CTA Box: Join the community]

Learning Community

[Hero: Course promotion slider]

[Section: Popular Courses]
[Post Carousel post_type=&quot;sfwd-courses&quot;]

[Section: Instructors]
[Team Carousel - showing course authors]

[Section: Student Testimonials]
[Testimonial Carousel]

[Section: Pricing]
[Pricing Table x3 - Free/Pro/Enterprise]

Social Marketplace

[Header Bar with cart]

[Hero: Featured products slider]

[Section: Categories]
[Icon Boxes - Product categories]

[Section: New Products]
[Product Grid columns=&quot;4&quot; orderby=&quot;date&quot;]

[Section: Community]
[Members Carousel - Top sellers]

[Section: Reviews]
[Testimonial Carousel - Customer reviews]

Advanced Customization

Custom CSS Variables

BuddyX Pro exposes additional CSS variables:

/* Header */
--flavor-header-bg
--flavor-header-text
--flavor-header-link

/* Sidebar */
--flavor-sidebar-bg
--flavor-sidebar-widget-bg

/* Cards */
--flavor-card-bg
--flavor-card-border
--flavor-card-shadow

/* Typography */
--flavor-heading-font
--flavor-body-font

Block Custom Styling

Add custom classes in block Advanced tab:

buddyx-card-hover  /* Adds BuddyX hover effect */
buddyx-shadow      /* Adds BuddyX shadow style */
buddyx-rounded     /* Uses BuddyX border radius */

Performance Optimization

Recommended Settings

SettingValueLocationLazy Load ImagesOnCustomizer > PerformanceMinify CSS/JSOnOr use caching pluginCarousel Items4-6Block settingsPosts Per Page10-12Block settings

Caching Compatibility

BuddyX Pro works with:

WP Super Cache
W3 Total Cache
LiteSpeed Cache
WP Rocket

Note: Exclude logged-in users for BuddyPress dynamic content.

Support & Resources

BuddyX Pro Theme: wbcomdesigns.com/downloads/buddyx-pro-theme/
Documentation: docs.wbcomdesigns.com/docs/buddyx-theme/
Video Tutorials: YouTube Channel
Premium Support: Support Portal
