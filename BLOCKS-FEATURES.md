# Wbcom Essential - Gutenberg Blocks Feature Documentation

> Generated: December 2024
> Total Blocks: 38
> Version: 4.0.2

This document provides a comprehensive overview of all Gutenberg blocks available in the Wbcom Essential plugin, their features, controls, and capabilities.

---

## Quick Reference Table

| # | Block | Category | Key Features | Has Frontend JS |
|---|-------|----------|--------------|-----------------|
| 1 | Accordion | General | FAQ schema, animations, icons | Yes |
| 2 | Advanced Tabs | General | Layouts, URL hash, mobile accordion | Yes |
| 3 | Branding | General | Logo/title, typography | No |
| 4 | Countdown | General | Live timer, expiry message | Yes |
| 5 | Dashboard Intro | BuddyPress | User welcome, avatar | No |
| 6 | Dropdown Button | General | Animations, menu items | Yes |
| 7 | Flip Box | General | 3D flip, front/back content | Yes |
| 8 | Forums | BuddyPress | bbPress topics, avatars | No |
| 9 | Forums Activity | BuddyPress | User's discussions | No |
| 10 | Group Carousel | BuddyPress | Swiper, responsive | Yes |
| 11 | Groups Grid | BuddyPress | Responsive grid, join button | No |
| 12 | Groups Lists | BuddyPress | Filter tabs, avatars | Yes |
| 13 | Header Bar | BuddyPress | Profile, notifications, cart | Yes |
| 14 | Heading | General | Gradient, decorative lines | No |
| 15 | Login Form | General | AJAX login, PMPro | Yes |
| 16 | Members Carousel | BuddyPress | Swiper, responsive | Yes |
| 17 | Members Grid | BuddyPress | Friend button, grid | No |
| 18 | Members Lists | BuddyPress | Filter tabs, online status | Yes |
| 19 | Notification Area | General | Search, cart, messages | Yes |
| 20 | Portfolio Grid | General | Filterable, masonry | Yes |
| 21 | Post Carousel | General | 100+ attributes, advanced | Yes |
| 22 | Post Slider | General | Hero slider, animations | Yes |
| 23 | Post Timeline | General | Vertical timeline | Yes |
| 24 | Posts Carousel | General | Swiper, responsive | Yes |
| 25 | Posts Revolution | General | Magazine layouts | No |
| 26 | Posts Ticker | General | Scrolling ticker | Yes |
| 27 | Pricing Table | General | Features list, ribbon | No |
| 28 | Profile Completion | BuddyPress | Progress circle/bar | Yes |
| 29 | Progress Bar | General | Animated, stripes | Yes |
| 30 | Shape | General | Blob shapes, icons | No |
| 31 | Site Logo | General | Desktop/mobile logos | No |
| 32 | Slider | General | Multiple slides, animations | Yes |
| 33 | Smart Menu | General | Responsive menu | Yes |
| 34 | Team Carousel | General | Swiper, team members | Yes |
| 35 | Testimonial | General | Quote, rating | No |
| 36 | Testimonial Carousel | General | Multiple testimonials | Yes |
| 37 | Text Rotator | General | Animated text rotation | Yes |
| 38 | Timeline | General | Events, icons | Yes |

---

## Block Categories

- **General Widgets**: 27 blocks
- **BuddyPress Widgets**: 11 blocks
- **WooCommerce Widgets**: Skipped (WC provides these natively)

---

## Detailed Block Documentation

---

## 1. Accordion

**Name:** `wbcom-essential/accordion`
**Category:** wbcom-essential
**Icon:** list-view

### Description
Create expandable accordion sections with rich content and customization options. Supports FAQ schema markup for SEO.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Multiple items | ✅ | Repeater-based management |
| Icon support | ✅ | Dashicons or custom text |
| FAQ Schema | ✅ | SEO-friendly markup |
| Open single mode | ✅ | Only one item open at a time |
| Auto-scroll | ✅ | Scroll to opened item |
| Self-close | ✅ | Close on outside click |
| Animation speed | ✅ | Configurable open/close speed |
| Typography controls | ✅ | Title and content fonts |
| Color controls | ✅ | Title, content, border, hover colors |
| Border styling | ✅ | Width, radius, color |

### Attributes (24 total)
- `items` - Array of accordion items
- `openSingle` - Only one open at a time
- `selfClose` - Close on outside click
- `autoScroll` - Scroll to opened item
- `scrollOffset` - Scroll offset in pixels
- `scrollSpeed` - Scroll animation speed
- `openSpeed` / `closeSpeed` - Animation durations
- `enableFaqSchema` - Add FAQ schema markup
- `titleTag` - HTML tag (h1-h6, div, p)
- `titleColor` / `titleBgColor` - Title styling
- `titleHoverColor` / `titleHoverBgColor` - Hover states
- `contentColor` / `contentBgColor` - Content styling
- `borderColor` / `borderWidth` / `borderRadius` - Border styling
- `itemSpacing` - Gap between items
- `titleFontSize` / `titleFontWeight` / `titleLineHeight` - Title typography
- `contentFontSize` / `contentFontWeight` / `contentLineHeight` - Content typography

---

## 2. Advanced Tabs

**Name:** `wbcom-essential/advanced-tabs`
**Category:** wbcom-essential
**Icon:** category

### Description
A powerful tabbed interface that transforms into an accordion on mobile devices. Supports horizontal and vertical layouts.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Horizontal layout | ✅ | Default tab layout |
| Vertical layout | ✅ | Left-side tabs |
| Vertical reverse | ✅ | Right-side tabs |
| URL hash linking | ✅ | Direct link to tabs |
| Mobile accordion | ✅ | Responsive fallback |
| Icons per tab | ✅ | Dashicon support |
| Images per tab | ✅ | Media upload |
| Active state styling | ✅ | Full color control |

### Attributes (16 total)
- `tabs` - Array of tab objects
- `layout` - horizontal, vertical, vertical-reverse
- `enableUrlHash` - Enable URL hash linking
- `titleColor` / `titleActiveColor` - Tab title colors
- `titleBgColor` / `titleActiveBgColor` - Tab backgrounds
- `titleBorderColor` / `titleActiveBorderColor` - Tab borders
- `contentColor` / `contentBgColor` / `contentBorderColor` - Content area
- `iconColor` / `iconActiveColor` / `iconSize` - Icon styling
- `titleAlignment` - Text alignment
- `mobileBreakpoint` - Mobile breakpoint in pixels

---

## 3. Branding

**Name:** `wbcom-essential/branding`
**Category:** wbcom-essential
**Icon:** admin-site

### Description
Display site branding with title or logo. Pulls from WordPress Customizer settings.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Site title display | ✅ | With description |
| Custom logo | ✅ | From Customizer |
| Typography control | ✅ | Full font settings |
| Hover effects | ✅ | Color change on hover |
| Padding control | ✅ | Per-element padding |
| Border styling | ✅ | Full border control |

### Attributes (14 total)
- `brandingType` - title or logo
- `alignment` - Block alignment
- `titleColor` / `titleHoverColor` - Title colors
- `descriptionColor` - Description color
- `titlePadding` / `descriptionPadding` / `logoPadding` - Spacing
- `logoWidth` / `logoHeight` - Logo sizing
- `titleTypography` - Full typography object
- `border` - Border properties
- `borderRadius` - Corner rounding

---

## 4. Countdown

**Name:** `wbcom-essential/countdown`
**Category:** wbcom-essential
**Icon:** clock

### Description
Display a countdown timer to a specific date and time with real-time updates.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Live countdown | ✅ | Updates every second |
| Toggle units | ✅ | Days/hours/minutes/seconds |
| Custom labels | ✅ | Per-unit labels |
| Expiry message | ✅ | Shown when complete |
| Layout options | ✅ | Vertical/horizontal |
| Box styling | ✅ | Background, radius, padding |
| Typography | ✅ | Digit and label fonts |

### Attributes (20 total)
- `dueDate` - Target date/time
- `showDays` / `showHours` / `showMinutes` / `showSeconds` - Unit visibility
- `daysLabel` / `hoursLabel` / `minutesLabel` / `secondsLabel` - Labels
- `expiryMessage` - Message after countdown
- `contentLayout` - Layout direction
- `boxAlign` - Box alignment
- `boxBackground` / `boxBorderRadius` / `boxPadding` / `boxGap` - Box styling
- `digitColor` / `digitFontSize` - Number styling
- `labelColor` / `labelFontSize` - Label styling
- `messageColor` / `messageFontSize` - Expiry message styling

---

## 5. Dashboard Intro

**Name:** `wbcom-essential/dashboard-intro`
**Category:** wbcom-starter
**Icon:** dashboard

### Description
Display a personalized welcome message with user avatar and greeting for logged-in users.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| User personalization | ✅ | Display name, avatar |
| BuddyPress integration | ✅ | BP avatar fallback |
| Layout options | ✅ | Avatar left/above/right |
| Logged-out message | ✅ | Custom message |
| Container styling | ✅ | Background, padding, radius |
| Color controls | ✅ | Greeting, name, description |

### Attributes (16 total)
- `greetingText` - Text before name
- `descriptionText` - Welcome message
- `showAvatar` / `avatarSize` / `avatarBorderRadius` - Avatar settings
- `layout` - Avatar position
- `contentAlign` - Text alignment
- `greetingColor` / `nameColor` / `descriptionColor` - Text colors
- `gap` - Space between avatar and content
- `containerBgColor` / `containerPadding` / `containerBorderRadius` - Container
- `showLoggedOutMessage` / `loggedOutMessage` - Logged-out state

---

## 6. Dropdown Button

**Name:** `wbcom-essential/dropdown-button`
**Category:** wbcom-essential
**Icon:** button

### Description
A customizable dropdown button with menu items and 8 animation styles.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Multiple menu items | ✅ | Repeater-based |
| 8 animation styles | ✅ | Various effects |
| Icon support | ✅ | Before/after text |
| Size options | ✅ | Small/medium/large |
| Position options | ✅ | Top/bottom/left/right |
| Hover effects | ✅ | Full color control |

### Attributes (15 total)
- `text` - Button text
- `size` - Button size
- `buttonIcon` / `iconPosition` - Icon settings
- `buttonId` - Unique ID
- `dropdownItems` - Menu items array
- `animationStyle` - Animation effect
- `dropdownPosition` - Dropdown position
- `buttonTextColor` / `buttonBgColor` - Button colors
- `buttonHoverTextColor` / `buttonHoverBgColor` - Button hover
- `dropdownTextColor` / `dropdownBgColor` - Dropdown colors
- `dropdownHoverTextColor` / `dropdownHoverBgColor` - Dropdown hover

---

## 7. Flip Box

**Name:** `wbcom-essential/flip-box`
**Category:** wbcom-essential
**Icon:** image-flip-horizontal

### Description
A 3D flip box with front and back content revealed on hover.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| 3D flip animation | ✅ | CSS3 transforms |
| 8 flip directions | ✅ | Left/right/up/down + diagonals |
| Front content | ✅ | Icon, title, description |
| Back content | ✅ | Icon, title, description, CTA |
| CTA button | ✅ | Link with new tab option |
| Independent styling | ✅ | Colors per side |
| Animation timing | ✅ | Duration and easing |

### Attributes (26 total)
- `frontIcon` / `frontTitle` / `frontTitleTag` / `frontContent` - Front side
- `backIcon` / `backTitle` / `backTitleTag` / `backContent` - Back side
- `buttonText` / `buttonUrl` / `buttonNewTab` - CTA button
- `flipDirection` - Flip direction
- `animationDuration` / `animationTiming` - Animation
- `boxWidth` / `boxHeight` / `boxAlign` - Sizing
- `frontBackground` / `frontTitleColor` / `frontContentColor` / `frontIconColor` / `frontIconSize` - Front colors
- `backBackground` / `backTitleColor` / `backContentColor` / `backIconColor` / `backIconSize` - Back colors
- `buttonBackground` / `buttonTextColor` - Button colors
- `borderRadius` - Corner rounding

---

## 8. Forums

**Name:** `wbcom-essential/forums`
**Category:** wbcom-starter
**Icon:** format-chat

### Description
Display a list of recent bbPress forum topics with avatars, meta data, and last reply excerpts.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| bbPress integration | ✅ | Recent topics list |
| User avatars | ✅ | Topic author |
| Meta display | ✅ | Replies, freshness |
| Last reply excerpt | ✅ | Preview content |
| All forums link | ✅ | Custom text |
| Card styling | ✅ | Background, border |

### Attributes (18 total)
- `headingText` - Block heading
- `forumsCount` - Number of topics
- `rowSpace` - Spacing between items
- `showAllForumsLink` / `allForumsLinkText` - Link settings
- `showAvatar` / `avatarSize` / `avatarBorderRadius` / `avatarSpacing` - Avatar
- `showMeta` / `showMetaReplies` / `showLastReply` - Display options
- `boxBgColor` / `boxBorderColor` / `boxBorderRadius` - Container
- `titleColor` / `titleHoverColor` / `metaColor` / `lastReplyColor` - Text colors
- `allForumsLinkColor` - Link color

---

## 9. Forums Activity

**Name:** `wbcom-essential/forums-activity`
**Category:** wbcom-starter
**Icon:** format-chat

### Description
Display the logged-in user's most recent forum discussion with meta data and excerpt.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| User's discussions | ✅ | Login-gated |
| Forum title display | ✅ | Optional |
| Meta information | ✅ | Optional |
| Content excerpt | ✅ | Optional |
| View discussion button | ✅ | Custom text |
| Empty state | ✅ | Explore forums fallback |

### Attributes (20 total)
- `showForumTitle` / `showMeta` / `showExcerpt` - Display toggles
- `showViewButton` / `viewButtonText` - View button
- `showMyDiscussionsButton` / `myDiscussionsButtonText` - All discussions
- `noForumsText` / `noForumsButtonText` - Empty state
- `boxBgColor` / `boxBorderColor` / `boxBorderRadius` / `boxPadding` - Container
- `forumTitleColor` / `topicTitleColor` / `metaColor` / `excerptColor` - Text colors
- `buttonColor` / `buttonBgColor` / `buttonBorderColor` / `buttonAlign` - Button styling

---

## 10. Group Carousel

**Name:** `wbcom-essential/group-carousel`
**Category:** wbcom-essential-buddypress
**Icon:** slides

### Description
Display BuddyPress groups in a Swiper carousel with responsive breakpoints.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| BuddyPress groups | ✅ | Active/newest/popular |
| Swiper carousel | ✅ | Touch-enabled |
| Responsive slides | ✅ | Desktop/tablet/mobile |
| Autoplay | ✅ | With pause on hover |
| Navigation | ✅ | Arrows and/or dots |
| Infinite loop | ✅ | Optional |
| Card styling | ✅ | Background, shadow |

### Attributes (20 total)
- `sortType` - active, newest, popular
- `totalGroups` - Number to fetch
- `slidesToShow` / `slidesToShowTablet` / `slidesToShowMobile` - Responsive
- `slidesToScroll` - Slides per scroll
- `navigation` - both, arrows, dots, none
- `autoplay` / `pauseOnHover` / `autoplaySpeed` - Autoplay
- `infiniteLoop` / `animationSpeed` / `spaceBetween` - Carousel
- `showMeta` - Last active display
- `cardBgColor` / `cardBorderRadius` / `cardShadow` - Card styling
- `nameColor` / `metaColor` / `arrowColor` / `dotColor` - Colors

---

## 11. Groups Grid

**Name:** `wbcom-essential/groups-grid`
**Category:** wbcom-essential-buddypress
**Icon:** grid-view

### Description
Display BuddyPress groups in a responsive grid layout with join button.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| BuddyPress groups | ✅ | Sortable listing |
| Responsive grid | ✅ | Columns per breakpoint |
| Group avatar | ✅ | Optional |
| Group name | ✅ | Optional |
| Member count | ✅ | Optional |
| Join button | ✅ | Optional |
| Card styling | ✅ | Full customization |

### Attributes (20 total)
- `sortType` / `totalGroups` - Query settings
- `columns` / `columnsTablet` / `columnsMobile` / `gap` - Layout
- `showAvatar` / `showName` / `showDescription` / `showMeta` - Display
- `showMemberCount` / `showJoinButton` - Features
- `cardBgColor` / `cardBorderRadius` / `cardShadow` / `cardPadding` - Card
- `nameColor` / `metaColor` / `buttonBgColor` / `buttonTextColor` - Colors

---

## 12. Groups Lists

**Name:** `wbcom-essential/groups-lists`
**Category:** wbcom-essential-buddypress
**Icon:** groups

### Description
Display a list of BuddyPress groups with filter tabs.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Filter tabs | ✅ | By group type |
| List view | ✅ | Compact display |
| Group avatars | ✅ | Optional |
| Meta display | ✅ | Last active |
| All groups link | ✅ | Custom text |
| Tab styling | ✅ | Active/hover states |

### Attributes (20 total)
- `groupsOrder` / `groupTypes` / `groupsCount` - Query
- `showAllGroupsLink` / `showFilterTypes` - Features
- `showAvatar` / `showMeta` - Display
- `headingText` / `allGroupsLinkText` - Text
- `boxBgColor` / `boxBorderColor` / `boxBorderRadius` - Container
- `avatarSize` / `avatarBorderRadius` - Avatar
- `titleColor` / `metaColor` / `linkColor` - Text colors
- `filterNormalColor` / `filterActiveColor` / `filterActiveBorderColor` - Tabs

---

## 13. Header Bar

**Name:** `wbcom-essential/header-bar`
**Category:** wbcom-essential-buddypress
**Icon:** menu-alt3

### Description
Header bar with profile dropdown, search, notifications, messages, and cart icons.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Profile dropdown | ✅ | WordPress menu |
| Search icon | ✅ | Toggle |
| Messages icon | ✅ | With counter |
| Notifications icon | ✅ | With counter |
| Cart icon | ✅ | WooCommerce |
| User avatar | ✅ | Customizable |
| Separator | ✅ | Optional |

### Attributes (18 total)
- `alignment` / `spaceBetween` - Layout
- `showProfileDropdown` / `profileMenu` - Profile
- `showSeparator` / `showSearch` / `showMessages` / `showNotifications` / `showCart` - Features
- `iconSize` / `avatarSize` / `avatarBorderRadius` - Sizing
- `separatorColor` / `iconColor` / `counterBgColor` - Colors
- `dropdownBgColor` / `dropdownTextColor` - Dropdown
- `userNameColor` / `signInColor` / `signUpBgColor` / `signUpTextColor` - User area

---

## 14. Heading

**Name:** `wbcom-essential/heading`
**Category:** wbcom-essential
**Icon:** heading

### Description
Display heading with advanced styling options including gradients and decorative lines.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| HTML tag selection | ✅ | h1-h6, div, p |
| Gradient text | ✅ | Linear/radial |
| Text rotation | ✅ | Rotate effect |
| Text shadow | ✅ | Full control |
| Decorative lines | ✅ | Before/after heading |
| Link support | ✅ | URL with options |
| Typography | ✅ | Full control |

### Attributes (19 total)
- `headingText` / `htmlTag` / `link` - Content
- `titleColor` / `typography` / `textShadow` / `blendMode` - Text styling
- `flexDirection` / `textAlign` / `maxWidth` / `margin` / `padding` - Layout
- `gradientHeading` / `gradientColorStart` / `gradientColorEnd` / `gradientType` / `gradientDirection` - Gradient
- `rotateSwitch` / `textRotate` - Rotation
- `beforeLine` / `afterLine` - Decorative lines

---

## 15. Login Form

**Name:** `wbcom-essential/login-form`
**Category:** wbcom-essential
**Icon:** admin-users

### Description
Display a customizable login form with AJAX support and PMPro integration.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| AJAX login | ✅ | No page reload |
| Logo upload | ✅ | Custom branding |
| Title/subtitle | ✅ | HTML tag support |
| Remember me | ✅ | Optional |
| Lost password link | ✅ | Optional |
| Registration link | ✅ | Optional |
| Redirect URL | ✅ | After login |
| PMPro integration | ✅ | Fallback support |
| Logged-in message | ✅ | For authenticated users |

### Attributes (37 total)
- `showLogo` / `logoUrl` / `logoId` / `logoWidth` - Logo
- `showTitle` / `title` / `titleTag` / `showSubtitle` / `subtitle` - Headings
- `usernameLabel` / `usernamePlaceholder` / `passwordLabel` / `passwordPlaceholder` / `showLabels` - Fields
- `showRememberMe` / `rememberMeLabel` / `buttonText` - Options
- `showLostPassword` / `lostPasswordText` - Lost password
- `showRegister` / `registerText` / `registerLinkText` - Registration
- `redirectUrl` - Redirect after login
- `showLoggedInMessage` / `loggedInMessage` / `testMode` - States
- `formBgColor` / `titleColor` / `subtitleColor` / `labelColor` - Colors
- `inputBgColor` / `inputBorderColor` / `inputTextColor` / `inputFocusBorderColor` - Input
- `buttonBgColor` / `buttonTextColor` / `buttonHoverBgColor` - Button
- `linkColor` / `linkHoverColor` - Links

---

## 16. Members Carousel

**Name:** `wbcom-essential/members-carousel`
**Category:** wbcom-essential-buddypress
**Icon:** slides

### Description
Display BuddyPress members in an interactive Swiper carousel.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| BuddyPress members | ✅ | Newest/active/popular |
| Swiper carousel | ✅ | Touch-enabled |
| Responsive slides | ✅ | Per breakpoint |
| Autoplay | ✅ | With pause on hover |
| Navigation | ✅ | Arrows and dots |
| Last active | ✅ | Optional |
| Card styling | ✅ | Full customization |

### Attributes (20 total)
- `sortType` / `totalMembers` / `showLastActive` - Query
- `slidesToShow` / `slidesToShowTablet` / `slidesToShowMobile` / `slidesToScroll` - Responsive
- `navigation` / `spaceBetween` - Navigation
- `autoplay` / `pauseOnHover` / `autoplaySpeed` / `infiniteLoop` / `animationSpeed` - Autoplay
- `cardBgColor` / `cardBorderRadius` / `cardShadow` - Card
- `nameColor` / `metaColor` / `arrowColor` / `dotColor` - Colors

---

## 17. Members Grid

**Name:** `wbcom-essential/members-grid`
**Category:** wbcom-essential-buddypress
**Icon:** screenoptions

### Description
Display BuddyPress members in a responsive grid layout.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| BuddyPress members | ✅ | Sortable |
| Responsive grid | ✅ | Per breakpoint |
| Member avatar | ✅ | Optional |
| Member name | ✅ | Optional |
| Last active | ✅ | Optional |
| Friend button | ✅ | Optional |
| Card styling | ✅ | Full control |

### Attributes (17 total)
- `sortType` / `totalMembers` - Query
- `columns` / `columnsTablet` / `columnsMobile` / `gap` - Layout
- `showAvatar` / `showName` / `showLastActive` / `showFriendButton` / `avatarSize` - Display
- `cardBgColor` / `cardBorderRadius` / `cardPadding` / `cardShadow` - Card
- `nameColor` / `metaColor` - Colors

---

## 18. Members Lists

**Name:** `wbcom-essential/members-lists`
**Category:** wbcom-essential-buddypress
**Icon:** groups

### Description
Display a list of BuddyPress members with filtering options.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Profile type filters | ✅ | Tab-based |
| Online status | ✅ | Green indicator |
| Member avatars | ✅ | Optional |
| All members link | ✅ | Custom text |
| Filter styling | ✅ | Active/hover states |

### Attributes (24 total)
- `membersOrder` / `profileTypes` / `membersCount` - Query
- `rowSpace` / `alignment` - Layout
- `showAllMembersLink` / `showFilterTypes` / `showAvatar` / `showName` / `showOnlineStatus` - Display
- `headingText` / `memberLinkText` - Text
- `boxBorderColor` / `boxBorderRadius` / `boxBackgroundColor` / `allMembersLinkColor` - Container
- `filterBorderStyle` / `filterBorderColor` - Filters
- `avatarSize` / `avatarBorderRadius` / `avatarSpacing` - Avatar
- `onlineStatusColor` / `onlineStatusSize` / `nameColor` - Status and colors

---

## 19. Notification Area

**Name:** `wbcom-essential/notification-area`
**Category:** wbcom-essential
**Icon:** bell

### Description
Header notification area with search, cart, messages, notifications, and user menu.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Search toggle | ✅ | Optional |
| WooCommerce cart | ✅ | Optional |
| Messages icon | ✅ | With counter |
| Notifications icon | ✅ | With counter |
| User avatar | ✅ | Optional |
| User name | ✅ | Optional |
| Badge styling | ✅ | Counter badges |
| Dropdown menu | ✅ | Profile links |

### Attributes (16 total)
- `showSearch` / `showCart` / `showMessages` / `showNotifications` / `showAvatar` / `showUserName` - Display
- `iconSize` / `avatarSize` / `itemGap` - Sizing
- `iconColor` / `iconHoverColor` / `userNameColor` - Colors
- `badgeColor` / `badgeTextColor` - Badge
- `dropdownBgColor` / `dropdownBorderColor` - Dropdown

---

## 20. Portfolio Grid

**Name:** `wbcom-essential/portfolio-grid`
**Category:** wbcom-essential
**Icon:** grid-view

### Description
Display portfolio items in a filterable grid layout.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Portfolio items | ✅ | Repeater-based |
| Filter tabs | ✅ | Category-based |
| Responsive grid | ✅ | Per breakpoint |
| Hover overlay | ✅ | With title/description |
| Layout switcher | ✅ | Optional |
| Item links | ✅ | Clickable items |

### Attributes (15 total)
- `items` - Portfolio items array
- `filters` / `showFilters` - Filter tabs
- `layout` / `showLayoutSwitcher` - Layout options
- `columns` / `columnsTablet` / `columnsMobile` / `gap` - Grid
- `itemBackground` / `itemBorderRadius` - Item styling
- `overlayColor` / `titleColor` / `descriptionColor` - Overlay
- `filterActiveColor` / `filterTextColor` - Filter colors

---

## 21. Post Carousel

**Name:** `wbcom-essential/post-carousel`
**Category:** wbcom-essential
**Icon:** slides

### Description
The most advanced block with 100+ attributes. Display posts in a highly customizable carousel.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Query builder | ✅ | Post type, taxonomy, authors |
| Responsive columns | ✅ | Per breakpoint |
| Card layouts | ✅ | Multiple styles |
| Category badges | ✅ | Customizable |
| Author display | ✅ | Avatar and name |
| Date display | ✅ | Multiple formats |
| Excerpt | ✅ | Custom length |
| Navigation | ✅ | Per-device control |
| Autoplay | ✅ | With duration |
| Advanced styling | ✅ | 50+ color/spacing options |

### Attributes (102 total)
This block has extensive customization for:
- Query (post type, order, taxonomy, tags, authors, include/exclude)
- Display (excerpt, thumbnail, category, date, author)
- Carousel (columns, nav, dots, infinite, autoplay)
- Card layout (image position, alignment, spacing)
- Card styling (background, border, shadow, radius)
- Image styling (opacity, hover effects)
- Category/badge styling
- Title/content typography
- Author/date styling
- Navigation styling

---

## 22. Post Slider

**Name:** `wbcom-essential/post-slider`
**Category:** wbcom-essential
**Icon:** slides

### Description
Display posts in a fullscreen hero slider with animations.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Hero/fullscreen | ✅ | Configurable height |
| Transition effects | ✅ | Fade, slide |
| Background animation | ✅ | Zoom, pan |
| Text animation | ✅ | Fade effects |
| Autoplay | ✅ | With delay |
| Navigation | ✅ | Arrows and pagination |
| Post excerpt | ✅ | Optional |
| CTA button | ✅ | Read more |

### Attributes (19 total)
- `postType` / `categories` / `numberOfPosts` / `orderBy` / `order` - Query
- `showExcerpt` / `excerptLength` / `showDate` / `showButton` / `buttonText` - Display
- `sliderHeight` / `sliderHeightUnit` - Sizing
- `transition` / `transitionDuration` / `autoplay` / `autoplayDelay` - Animation
- `showNavigation` / `showPagination` / `hideNavOnHover` - Navigation
- `bgAnimation` / `bgAnimationDuration` / `textAnimation` - Effects
- `contentWidth` / `contentAlign` - Layout
- `overlayColor` / `titleColor` / `excerptColor` / `dateColor` - Colors
- `buttonBgColor` / `buttonTextColor` / `navColor` - Button/nav colors

---

## 23. Post Timeline

**Name:** `wbcom-essential/post-timeline`
**Category:** wbcom-essential
**Icon:** backup

### Description
Display WordPress posts in a vertical timeline layout.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Vertical timeline | ✅ | Two-column option |
| Post thumbnails | ✅ | Optional |
| Post excerpt | ✅ | Custom length |
| Read more button | ✅ | Custom text |
| Date formatting | ✅ | Multiple formats |
| Timeline bar | ✅ | Custom color/width |
| Timeline dots | ✅ | Custom color/size |

### Attributes (17 total)
- `postType` / `categories` / `numberOfPosts` / `orderBy` / `order` - Query
- `showThumbnail` / `showExcerpt` / `excerptLength` - Display
- `showButton` / `buttonText` - CTA
- `layout` / `dateFormat` - Layout
- `barColor` / `barWidth` / `dotColor` / `dotSize` - Timeline
- `cardBackground` / `cardBorderRadius` - Card
- `titleColor` / `excerptColor` / `dateColor` - Text colors
- `buttonBgColor` / `buttonTextColor` - Button

---

## 24. Posts Carousel

**Name:** `wbcom-essential/posts-carousel`
**Category:** wbcom-essential
**Icon:** slides

### Description
Display WordPress posts in a beautiful Swiper carousel slider.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Swiper carousel | ✅ | Touch-enabled |
| Responsive slides | ✅ | Per breakpoint |
| Post meta | ✅ | Category, author, date |
| Excerpt | ✅ | Custom length |
| Loop mode | ✅ | Optional |
| Autoplay | ✅ | With delay |
| Navigation | ✅ | Arrows and pagination |

### Attributes (20 total)
- `displayType` / `postType` / `categories` / `numberOfPosts` / `orderBy` / `order` - Query
- `showExcerpt` / `excerptLength` / `showDate` / `dateFormat` / `showAuthor` / `showCategory` - Display
- `slidesPerView` / `slidesPerViewTablet` / `slidesPerViewMobile` / `spaceBetween` - Responsive
- `showNavigation` / `showPagination` / `loop` / `autoplay` / `autoplayDelay` - Carousel
- `cardBackground` / `cardBorderRadius` - Card
- `categoryColor` / `titleColor` / `excerptColor` / `metaColor` / `navColor` - Colors

---

## 25. Posts Revolution

**Name:** `wbcom-essential/posts-revolution`
**Category:** wbcom-essential
**Icon:** grid-view

### Description
Display posts in various creative magazine-style layouts with featured post emphasis.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| 6 layout styles | ✅ | Magazine layouts |
| Featured post | ✅ | Emphasized display |
| Responsive grid | ✅ | Columns control |
| Post meta | ✅ | Author, date, category |
| Excerpt | ✅ | Optional |
| Color controls | ✅ | Full customization |

### Layout Styles
1. **Featured + Sidebar** - Large featured post with sidebar list
2. **Featured + List** - Large featured post with list below
3. **Grid** - Uniform grid of posts
4. **Split (50/50)** - Two-column equal layout
5. **Two Featured + List** - Two featured posts with list
6. **Magazine** - Complex magazine layout

### Attributes (18 total)
- `layout` / `columns` - Layout
- `showExcerpt` / `excerptLength` / `showAuthor` / `showDate` / `dateFormat` / `showCategory` - Display
- `postType` / `categories` / `postsPerPage` / `orderBy` / `order` - Query
- `categoryColor` / `categoryHoverColor` / `titleColor` / `titleHoverColor` - Category/title
- `excerptColor` / `metaColor` - Content colors
- `imageRadius` / `gap` - Spacing

---

## 26. Posts Ticker

**Name:** `wbcom-essential/posts-ticker`
**Category:** wbcom-essential
**Icon:** slides

### Description
Display posts in a scrolling news ticker format.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| 4 ticker types | ✅ | Horizontal, vertical, marquee, fade |
| Ticker label | ✅ | Custom text |
| Speed control | ✅ | Adjustable |
| Pause on hover | ✅ | Optional |
| Playback controls | ✅ | Optional |
| Post thumbnails | ✅ | Optional |
| Date display | ✅ | Optional |

### Ticker Types
1. **Horizontal** - Left-to-right scrolling
2. **Vertical** - Up/down scrolling with thumbnails
3. **Marquee** - Continuous marquee effect
4. **Fade** - Fade in/out transitions

### Attributes (17 total)
- `tickerType` / `tickerLabel` / `showLabel` - Ticker
- `speed` / `pauseOnHover` / `showControls` - Behavior
- `showThumbnail` / `showDate` / `dateFormat` - Display
- `postType` / `categories` / `postsPerPage` / `orderBy` / `order` - Query
- `labelBgColor` / `labelTextColor` - Label
- `tickerBgColor` / `textColor` / `hoverColor` - Ticker colors
- `borderColor` / `height` - Styling

---

## 27. Pricing Table

**Name:** `wbcom-essential/pricing-table`
**Category:** wbcom-essential
**Icon:** money-alt

### Description
Display pricing plans with features, pricing, and CTA buttons.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Plan title | ✅ | With description |
| Pricing display | ✅ | Prefix, price, suffix |
| Original price | ✅ | Strikethrough |
| Period text | ✅ | /month, /year, etc. |
| Features list | ✅ | Check/cross icons |
| CTA button | ✅ | Custom URL |
| Ribbon | ✅ | 3 styles (corner, vertical, horizontal) |
| Footer text | ✅ | Optional |

### Ribbon Styles
1. **Corner** - Diagonal ribbon in corner
2. **Vertical** - Side ribbon
3. **Horizontal** - Top banner

### Attributes (24 total)
- `title` / `description` / `headingTag` - Header
- `price` / `pricePrefix` / `priceSuffix` / `originalPrice` / `period` - Pricing
- `features` - Features array with text and icon
- `buttonText` / `buttonUrl` / `buttonTarget` - CTA
- `footerText` - Footer
- `showRibbon` / `ribbonText` / `ribbonStyle` - Ribbon
- `headerBackground` / `headerTextColor` - Header colors
- `containerBackground` / `priceColor` - Container
- `buttonBackground` / `buttonTextColor` - Button
- `ribbonBackground` / `ribbonTextColor` - Ribbon colors
- `borderRadius` - Styling

---

## 28. Profile Completion

**Name:** `wbcom-essential/profile-completion`
**Category:** wbcom-essential-buddypress
**Icon:** chart-pie

### Description
Display user profile completion progress with circle or linear style.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| BuddyPress integration | ✅ | Profile fields |
| Circle progress | ✅ | SVG-based |
| Linear progress | ✅ | Bar-based |
| Profile photo check | ✅ | Optional |
| Cover photo check | ✅ | Optional |
| Hide on complete | ✅ | Optional |
| Completion button | ✅ | Edit profile link |

### Progress Styles
1. **Circle** - Circular progress indicator
2. **Linear** - Horizontal progress bar

### Attributes (19 total)
- `skinStyle` / `alignment` - Layout
- `hideOnComplete` - Behavior
- `showProfileButton` / `showProfilePhoto` / `showCoverPhoto` - Features
- `showHeader` / `showCompletionIcon` / `showCompletionStatus` - Display
- `headingText` / `completionText` - Text
- `completeButtonText` / `editButtonText` - Buttons
- `progressSize` / `progressWidth` - Progress sizing
- `completionColor` / `incompleteColor` / `progressBorderColor` - Progress colors
- `numberColor` / `textColor` / `detailsBgColor` - Text/container
- `buttonColor` / `buttonBgColor` / `buttonBorderColor` - Button

---

## 29. Progress Bar

**Name:** `wbcom-essential/progress-bar`
**Category:** wbcom-essential
**Icon:** chart-bar

### Description
Display an animated progress bar with customizable styling.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Animated fill | ✅ | On load |
| Scroll animation | ✅ | Trigger on scroll |
| Stripes pattern | ✅ | Optional |
| Animated stripes | ✅ | Moving stripes |
| Percentage display | ✅ | Inside, outside, or hidden |
| Title support | ✅ | Above bar |

### Percentage Display Positions
1. **Inside** - Percentage text inside bar
2. **Outside** - Percentage text after bar
3. **Hidden** - No percentage shown

### Attributes (13 total)
- `title` / `percent` - Content
- `displayPercent` - in, out, hidden
- `showStripes` / `animateStripes` - Stripes
- `animationDuration` / `scrollAnimation` - Animation
- `barHeight` / `borderRadius` - Sizing
- `barColor` / `barBackground` - Bar colors
- `titleColor` / `percentColor` / `percentOutColor` - Text colors

---

## 30. Shape

**Name:** `wbcom-essential/shape`
**Category:** wbcom-essential
**Icon:** marker

### Description
Create custom blob shapes with 8-point border-radius control.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| 8-point control | ✅ | Custom blob shapes |
| Shape presets | ✅ | Pre-defined shapes |
| Rotation | ✅ | Rotate shape |
| Gradient support | ✅ | Two-color gradient |
| Icon overlay | ✅ | Centered icon |
| Link support | ✅ | Clickable |
| Hover animation | ✅ | Effects |

### Attributes (17 total)
- `shapePreset` / `rotation` - Shape
- `point1` through `point8` - 8 border-radius points
- `width` / `height` - Sizing
- `backgroundColor` - Solid color
- `gradientFrom` / `gradientTo` / `gradientAngle` - Gradient
- `icon` / `iconColor` / `iconSize` / `iconRotation` - Icon
- `linkUrl` / `linkNewTab` - Link
- `alignment` / `hoverAnimation` - Layout/effects

---

## 31. Site Logo

**Name:** `wbcom-essential/site-logo`
**Category:** wbcom-essential
**Icon:** format-image

### Description
Display your site logo with responsive desktop/mobile variants.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Customizer fallback | ✅ | Uses WP logo |
| Custom upload | ✅ | Override logo |
| Mobile variant | ✅ | Separate logo |
| Mobile breakpoint | ✅ | Custom breakpoint |
| Home link | ✅ | Optional |
| Max width | ✅ | Responsive sizing |

### Attributes (12 total)
- `logoSource` - customizer or custom
- `desktopLogoId` / `desktopLogoUrl` - Desktop logo
- `mobileLogoId` / `mobileLogoUrl` / `mobileBreakpoint` - Mobile logo
- `linkUrl` / `linkHome` / `linkNewTab` - Link
- `alignment` / `maxWidth` - Layout
- `backgroundColor` / `borderRadius` - Styling

---

## 32. Slider

**Name:** `wbcom-essential/slider`
**Category:** wbcom-essential
**Icon:** slides

### Description
Create beautiful sliders with images, text, animations, and navigation.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Multiple slides | ✅ | Repeater-based |
| Responsive height | ✅ | Per breakpoint |
| Autoplay | ✅ | With duration |
| Transitions | ✅ | Fade/slide |
| Per-device nav | ✅ | Show/hide per device |
| Overlay content | ✅ | Title, description |
| Slide links | ✅ | Optional per slide |

### Attributes (18 total)
- `slides` - Array of slide objects
- `sliderHeight` / `sliderHeightTablet` / `sliderHeightMobile` - Responsive heights
- `autoplay` / `autoplayDuration` / `slideTransition` - Animation
- `showDots` / `showArrows` - Navigation toggles
- `navArrowsDesktop` / `navArrowsTablet` / `navArrowsMobile` - Arrow visibility
- `navDotsDesktop` / `navDotsTablet` / `navDotsMobile` - Dots visibility
- `slideBgColor` / `titleColor` / `contentColor` - Colors

---

## 33. Smart Menu

**Name:** `wbcom-essential/smart-menu`
**Category:** wbcom-essential
**Icon:** menu

### Description
A powerful and flexible navigation menu block with extensive styling options.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| WordPress menu | ✅ | Select existing menu |
| Horizontal layout | ✅ | Standard navigation |
| Vertical layout | ✅ | Sidebar menu |
| Mobile toggle | ✅ | Hamburger menu |
| Submenu styling | ✅ | Independent colors |
| Active states | ✅ | Current page highlight |
| Transition effects | ✅ | Hover animations |

### Attributes (32 total)
- `menuId` / `menuLayout` / `menuAlign` - Menu
- `verticalMenuWidth` / `mobileBreakpoint` - Layout
- `showMobileToggle` / `mobileToggleText` / `mobileToggleAlign` / `dropdownIcon` - Mobile
- `mainMenuBackground` / `mainMenuTransitionDuration` / `mainMenuIcon` / `mainMenuIconSize` - Main menu
- `mainMenuItemColor` / `mainMenuItemBg` / `mainMenuItemColorHover` / `mainMenuItemBgHover` - Item states
- `mainMenuItemColorActive` / `mainMenuItemBgActive` - Active state
- `subMenuBg` / `subMenuItemColor` / `subMenuItemBg` - Submenu
- `subMenuItemColorHover` / `subMenuItemBgHover` / `subMenuItemColorActive` / `subMenuItemBgActive` - Submenu states
- `mobileMenuColor` / `mobileMenuBackground` / `mobileMenuWidth` - Mobile menu

---

## 34. Team Carousel

**Name:** `wbcom-essential/team-carousel`
**Category:** wbcom-essential
**Icon:** groups

### Description
Display team members in an interactive carousel.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Team members | ✅ | Repeater-based |
| Member photo | ✅ | Image upload |
| Name and role | ✅ | Per member |
| Member link | ✅ | Optional URL |
| Swiper carousel | ✅ | Touch-enabled |
| Responsive slides | ✅ | Per breakpoint |
| Navigation | ✅ | Arrows and pagination |

### Attributes (15 total)
- `members` - Array of member objects
- `slidesPerView` / `slidesPerViewTablet` / `slidesPerViewMobile` - Responsive
- `spaceBetween` / `showNavigation` / `showPagination` - Navigation
- `loop` / `autoplay` / `autoplayDelay` - Carousel
- `cardBackground` / `cardBorderRadius` - Card
- `nameColor` / `roleColor` / `navColor` - Colors

---

## 35. Testimonial

**Name:** `wbcom-essential/testimonial`
**Category:** wbcom-essential
**Icon:** format-quote

### Description
Display a customer testimonial with quote, author info, and optional rating.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Quote content | ✅ | Rich text |
| Author name | ✅ | Text field |
| Author role | ✅ | Position/company |
| Author image | ✅ | Optional |
| Star rating | ✅ | 1-5 stars |
| Layout options | ✅ | 4 variations |
| Text alignment | ✅ | Left/center/right |

### Layout Options
1. **Column** - Image above text
2. **Column Reverse** - Text above image
3. **Row** - Image left of text
4. **Row Reverse** - Image right of text

### Attributes (13 total)
- `content` / `authorName` / `authorRole` - Content
- `imageId` / `imageUrl` - Author image
- `showRating` / `rating` - Rating
- `layout` / `textAlign` - Layout
- `backgroundColor` / `borderRadius` - Container
- `quoteColor` / `nameColor` / `roleColor` / `ratingColor` - Colors

---

## 36. Testimonial Carousel

**Name:** `wbcom-essential/testimonial-carousel`
**Category:** wbcom-essential
**Icon:** format-quote

### Description
Display multiple testimonials in an interactive carousel.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Multiple testimonials | ✅ | Repeater-based |
| Quote content | ✅ | Per testimonial |
| Author info | ✅ | Name, role, image |
| Star rating | ✅ | Optional |
| Swiper carousel | ✅ | Touch-enabled |
| Responsive slides | ✅ | Per breakpoint |
| Navigation | ✅ | Arrows and pagination |

### Attributes (17 total)
- `testimonials` - Array of testimonial objects
- `slidesPerView` / `slidesPerViewTablet` / `slidesPerViewMobile` / `spaceBetween` - Responsive
- `showNavigation` / `showPagination` / `loop` / `autoplay` / `autoplayDelay` - Carousel
- `showRating` - Rating toggle
- `cardBackground` / `cardBorderRadius` - Card
- `quoteColor` / `nameColor` / `roleColor` / `ratingColor` / `navColor` - Colors

---

## 37. Text Rotator

**Name:** `wbcom-essential/text-rotator`
**Category:** wbcom-essential
**Icon:** editor-textcolor

### Description
Animated rotating text with prefix and suffix.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Rotating text | ✅ | Multiple words |
| Prefix text | ✅ | Before rotation |
| Suffix text | ✅ | After rotation |
| Animation types | ✅ | Multiple effects |
| Duration control | ✅ | Speed adjustment |
| HTML tag | ✅ | Semantic control |

### Animation Types
1. **Fade** - Fade in/out
2. **Typing** - Typewriter effect
3. **Slide Up** - Slide vertically
4. **Slide Down** - Slide down
5. **Flip** - 3D flip effect
6. **Zoom** - Scale animation

### Attributes (10 total)
- `prefixText` / `rotatingTexts` / `suffixText` - Content
- `htmlTag` / `textAlign` - Layout
- `animation` / `duration` - Animation
- `textColor` - Normal text color
- `rotatingTextColor` / `rotatingTextBg` - Rotating text styling

---

## 38. Timeline

**Name:** `wbcom-essential/timeline`
**Category:** wbcom-essential
**Icon:** backup

### Description
Display events or milestones in a vertical timeline layout.

### Features
| Feature | Status | Notes |
|---------|--------|-------|
| Timeline items | ✅ | Repeater-based |
| Icons per item | ✅ | Dashicons |
| Images per item | ✅ | Optional |
| Date display | ✅ | Custom format |
| Title and content | ✅ | Per item |
| Timeline bar | ✅ | Custom styling |
| Timeline dots | ✅ | Icon containers |
| Animation | ✅ | Scroll-triggered |

### Attributes (18 total)
- `items` - Array of timeline items
- `layout` / `showArrow` / `enableAnimation` - Layout
- `barThickness` / `barColor` - Timeline bar
- `iconContainerSize` / `iconContainerBackground` / `iconContainerBorderRadius` - Icon container
- `iconSize` / `iconColor` - Icons
- `contentBackground` / `contentBorderRadius` - Content cards
- `dateColor` / `titleColor` / `textColor` - Text colors

---

## Statistics Summary

### By Category

| Category | Blocks | Total Attributes |
|----------|--------|------------------|
| General | 27 | ~450 |
| BuddyPress | 11 | ~200 |
| **Total** | **38** | **~650** |

### By Feature Type

| Feature | Count | Blocks Using |
|---------|-------|--------------|
| Frontend JavaScript | 25 | Carousels, animations, AJAX |
| Server-Side Render | 30 | Dynamic content |
| Swiper Carousel | 8 | All carousel blocks |
| Responsive Controls | 35 | Per-device settings |
| Color Controls | 38 | All blocks |

### Common Patterns

1. **Responsive Design** - Desktop/tablet/mobile breakpoints
2. **Color Customization** - Background, text, hover states
3. **Typography Controls** - Font size, weight, line height
4. **Spacing Controls** - Gap, padding, margin
5. **Border Controls** - Width, radius, color
6. **Shadow Effects** - Box shadow options

---

## Notes for Gap Analysis

When comparing with Elementor widgets, check for:

1. **Missing Controls** - Elementor features not in blocks
2. **Missing Animations** - Entrance animations, hover effects
3. **Missing Responsive** - Tablet/mobile specific settings
4. **Missing Typography** - Advanced font controls
5. **Missing Conditions** - Show/hide logic
6. **Missing Styling** - Advanced CSS options

---

*Document generated by Claude Code for Wbcom Essential plugin analysis.*
