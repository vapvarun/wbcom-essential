# Design and content widgets (General widgets)

**Also called:** hero banner, slider, testimonial slider, pricing table, FAQ, tabs, countdown timer, team slider, login form, timeline, post slider, menu.

This page covers the 27 widgets that work on any WordPress site with Elementor 3.5 or higher. They include sliders, pricing tables, testimonials, FAQ lists, tabs, timelines, post carousels, a countdown and a login form. Find them in the Elementor panel under the **Wbcom Essential** category. You do not need BuddyPress, bbPress or WooCommerce for them.

One widget is the exception. Header Notification Area appears only when the Reign theme is active.

## Accordion

Use it for a list of questions and answers (FAQ) where each answer opens when a visitor clicks the question. It can also output FAQ data for search engines.

### Content settings

| Setting | What it does |
|---------|--------------|
| Content > Accordion Items | Repeater of items. Each item has a Prefix (Icon or Text), Title, Content and an Opened by default switch. |
| Content > Block close event on click | On/off switch that blocks the close event when you click an item. |
| Settings > Title HTML Tag | Heading tag used for each title. |
| Settings > Url Sharing | Lets visitors link straight to an item. |
| Settings > Open Single | Keeps only one item open at a time. |
| Settings > Enable FAQ Schema | Outputs FAQ structured data for the items. |
| Settings > Self Close | On/off switch for the accordion self-close behaviour. |
| Settings > Auto Scroll | Scrolls to the opened item, with Scroll Offset and Scroll Speed. |
| Settings > Open Speed, Close Speed | Animation timing for opening and closing. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Accordion | Border, radius, shadow and background in Normal and Hover states, plus margin. |
| Title | Typography, arrow size and thickness, and colours, background and border in Normal and Hover states. |
| Prefix | Size, container width and height, colours and background, radius and margin. |
| Content | Colour, background, border and padding. |

## Branding

Use it to show your site name and tagline, or your logo, and link them to your home page.

### Content settings

| Setting | What it does |
|---------|--------------|
| Branding Type | Choose Title or Logo. The logo option needs a theme that supports a custom logo. |
| Alignment | Aligns the branding block. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Brand | Title colour, hover colour, typography and padding. |
| Description Options | Description colour, typography and padding. |
| Branding Border | Border and border radius. |

## Countdown

Use it for a countdown timer (days, hours, minutes, seconds) to a sale, launch or event.

### Content settings

| Setting | What it does |
|---------|--------------|
| Due Date | The date and time the countdown runs to. |
| Days, Hours, Minutes, Seconds | Show or hide each unit and edit its label. |
| Message After Expire | Text shown when the countdown ends. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Boxes | Width, height, alignment, background, border, shadow, padding and margin of the unit boxes. |
| Content | Layout, digit and label typography, colours and text shadow, plus the expired message style. |
| Days, Hours, Minutes, Seconds | Background, digit and label colours and shadows for each unit. |

## Dropdown Button

Use it for a button that opens a short list of links when clicked.

### Content settings

| Setting | What it does |
|---------|--------------|
| Button | Button text, size, alignment, text alignment, dropdown text alignment, icon, icon position and button ID. |
| Dropdown Items | Repeater of Menu Items. Each item has an icon, icon position, title and link. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Button | Animation, text and background colours, border, radius, shadow, icon spacing, padding and width in Normal and Hover states. |
| Dropdown | Radius, shadow, text, background and separator colours, position, width, padding and margin. |

## Flip Box

Use it for a card that turns over on hover to show more on its back, like a feature box.

### Content settings

| Setting | What it does |
|---------|--------------|
| Front | Icon, title, title HTML tag and content for the front face. |
| Back | Icon, title, title HTML tag and content for the back face. |
| Button | Button text, link, size, alignment, icon, icon position and button ID. |
| Animation | Animation direction, duration and timing, with a custom timing option. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Box | Alignment, maximum width and minimum height. |
| Front, Back | Alignment, padding, background and overlay, border, radius, plus icon, title and content styling for each face. |
| Button | Animation, colours, border, radius, shadow, padding and width in Normal and Hover states. |

## Heading

Use it for a styled page heading, with optional gradient text and lines on either side.

### Content settings

| Setting | What it does |
|---------|--------------|
| Heading Text | The heading text. |
| HTML Tag | Heading tag. |
| Link | Optional link on the heading. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Heading | Text colour, blend mode, before/after layout, alignment, maximum width, margin, padding, gradient heading, background and rotate text. |
| Before, After | Width, height, colour, alignment, margin, radius and shadow of the decorative line. |

## Login Form

Use it to put a sign-in form on any page, with optional lost password and register links.

### Content settings

| Setting | What it does |
|---------|--------------|
| Login Form | Logo, title, sub title and their HTML tags, plus labels for Username, Password, Remember Me, Register, Lost Password and the button. |
| Additional Options | Redirect After Login, show or hide Lost Password, Register and Remember Me, Logged in Message and Test Mode. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Form Container | Width, alignment, row gap, background, border, radius, shadow, padding and margin. |
| Logo, Title, Sub Title, Labels | Size, colour, alignment and spacing for each part. |
| Input & Textarea | Width, alignment, text, placeholder, background, border, radius and shadow in Normal and Focus states. |
| Submit Button | Alignment, colours, border, radius, shadow, padding, margin and width in Normal and Hover states. |
| Links, Logged in Message | Link colours and alignment, and the message colour, alignment and padding. |

### Tips

- Use Test Mode to see the form while you are logged in.
- The form includes a hidden spam trap field. Visitors never see it, and a login that fills it in is rejected. See [Login Security](../features/login-security.md).
- A wrong password and an unknown username give the same message, "The username or password is incorrect. Please try again.", so the form does not reveal which usernames exist.

## Header Notification Area

Use it for the row of header icons (search, cart, messages, friend requests, notifications, your avatar). Reign theme only.

### Content settings

| Setting | What it does |
|---------|--------------|
| Enable Search Form | Shows the search icon. |
| Enable Cart Icon | Shows the cart. Needs WooCommerce or Easy Digital Downloads. |
| Enable User Message Icon | Shows messages. Needs BuddyPress with the Messages component. |
| Enable Connections Icon | Shows friend requests. Needs BuddyPress with the Friends component. |
| Enable Notification Icon | Shows notifications. Needs BuddyPress with the Notifications component. |
| Display User Avatar | Shows the user avatar and menu. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Notification Area | Icon colour and hover colour, user name colour and hover colour, line height and counter top space. |

## Portfolio Grid

Use it for a gallery of your work that visitors can filter by category and switch between grid and list.

### Content settings

| Setting | What it does |
|---------|--------------|
| Grid Items | Repeater of Portfolio Items (image, title, info, link and filter IDs), column width and height, title and info HTML tags, image size, default layout and Show Layout Switcher. |
| Filters | Repeater of filters (name and ID), a default filter and Show Menu. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Grid Item | Background, border, radius and shadow. |
| Grid View | Hover animation, item width, gap, text box placement, height, alignment, overlay, and title and info typography, colours and margins. |
| List View | Image width, gap, text alignment and padding, and title and info styling. |
| Toolbar, Filters | Background, border, padding and margin, and filter colours in Normal and Hover states. |
| Mobile Menu Icon, Layout Menu | Icon size, colours, border, radius and spacing. |

## Post Carousel

Use it for a sliding row of post cards, such as latest news or related articles.

### Content settings

| Setting | What it does |
|---------|--------------|
| Posts | Post type, order, order by, categories, tags, authors, maximum number, include and exclude by ID, excerpt length, and switches for thumbnail, categories, date and author. |
| Carousel Settings | Columns, thumbnail size, arrows, dots, infinite loop, autoplay with duration, and adaptive height. |
| Responsive | Hide arrows, dots, categories, excerpt and card footer on desktop, tablet or mobile. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Card, Card Image, Card Body, Card Footer | Layout, image ratio, alignment, colours, border, radius, shadow and spacing. |
| Categories, Title, Excerpt, Author, Date | Typography, colour and spacing for each element. |
| Navigation Arrows, Navigation Dots | Size, colours, border and position. |

## Post Slider

Use it for a large hero slider that shows one post at a time with its picture and title.

### Content settings

| Setting | What it does |
|---------|--------------|
| Posts | Query options (post type, order, categories, tags, authors, maximum, include and exclude), date, button and its text, excerpt length, background image and text animation. |
| Slider Settings | Default image, slider height, autoplay with duration, and slide transition with its duration. |
| Slider Navigation | Show navigation only on hover, dots, thumbnail mode and arrows, each with Hide On Desktop, Tablet and Mobile. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Slide, Text Box | Background, overlay, image position, repeat and size, and text box width, padding, margin and border. |
| Button, Divider | Colours, typography, border and spacing. |
| Navigation Arrows, Thumbnails, Dots, Loader | Size, colours, position and loader appearance. |

## Post Timeline

Use it to show posts one after another down a vertical line, newest first, with a Load More button.

### Content settings

| Setting | What it does |
|---------|--------------|
| Posts | Query options (post type, order, categories, tags, authors, maximum, include and exclude), excerpt length, thumbnail options, Display Read More Button with its text, and Load More with its text and Disabled Button Text. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Timeline | Layout, padding, bar thickness and bar colour. |
| Post Image, Content, Date | Thumbnail size, opacity, filters, typography and colours. |
| Read More Button, Load More Button | Colours, border, radius and spacing in Normal and Hover states. |

## Posts Carousel

Use it for a simple sliding row of your latest posts.

### Content settings

| Setting | What it does |
|---------|--------------|
| Content | Post Display Type, Show Excerpt, Excerpt Length and Date Format. |
| Carousel Settings | Number Item Show, Navigation, Pagination and Autoplay in milliseconds (0 turns it off). |
| QUERY | Source, All Posts or Sticky posts, post type source, categories, order, order by and Number Posts. |
| Animations | Animate, Animate Effects and Animate Delay. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Style | Custom Style switch with main, hover, heading, content and background hover colours. |
| Spacing | Padding and margin. |

## Posts Revolution

Use it for a grid of your posts in a choice of display styles, with page numbers.

### Content settings

| Setting | What it does |
|---------|--------------|
| Content | Post Display, Show Excerpt, Excerpt Length, Date Format and Columns. |
| QUERY | Source, All Posts or Sticky posts, post type source, categories, order, order by, Pagination, Number Posts, Pagination Type and Number Posts For Page. |
| Animations | Animate, Animate Effects and Animate Delay. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Style | Custom Style switch with main and hover colours. |
| Spacing | Padding and margin. |

## Posts Ticker

Use it for a scrolling headline bar (news ticker) that shows your latest posts.

### Content settings

| Setting | What it does |
|---------|--------------|
| Content | News Ticker Type, Item Views, Date Format, Ticker Label, Ticker Type and Ticker Speed. |
| QUERY | Source, All Posts or Sticky posts, post type source, categories, order, order by and Number Posts. |
| Animations | Animate, Animate Effects and Animate Delay. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Style | Custom Style switch with main, hover and ticker label background colours. |
| Spacing | Padding and margin. |

## Pricing Table

Use it to show a plan or product price with its feature list and a sign-up button (a pricing box or plan card).

### Content settings

| Setting | What it does |
|---------|--------------|
| Header | Icon, title, description and heading tag. |
| Ribbon | Show Ribbon, text, style and horizontal alignment. |
| Pricing | Price prefix, price, price suffix, original price and period. |
| Features | List Items with text, icon and icon colour. |
| Footer | Button text, link, size, button ID and additional info. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Container | Zoom, text alignment, maximum width, background, border, radius, shadow, padding and margin. |
| Header, Header Icon, Ribbon | Alignment, colours, typography, border and spacing. |
| Pricing, Features, Button, Footer | Typography, colours and spacing for each part. |

## Progress Bar

Use it to show a skill or goal as a filled bar with a percentage.

### Content settings

| Setting | What it does |
|---------|--------------|
| Progress Bar | Title, Percent, Display Percent, Animated Stripes, Animation Duration (ms) and Scroll Based Animation. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Progress Bar | Overflow, background colour, border, shadow, radius and padding of the track. |
| Bar | Fill colours and typography. |
| Text | Title and percentage typography and colours. |

## Shape

Use it for a decorative shape on the page, such as a slanted block or badge, with an optional icon and link.

### Content settings

| Setting | What it does |
|---------|--------------|
| Shape | Point 1 to Point 8 and Rotate. |
| Icon | Icon, Link to and Hover Animation. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Shape | Width, height, background, border, shadow and alignment. |
| Icon | Icon colour, size, SVG width and height, and rotate. |

## Site Logo

Use it to show your logo, with a different logo for mobile if you want.

### Content settings

| Setting | What it does |
|---------|--------------|
| Site Logo | Source, then Desktop and Mobile logo and image size, Link, and Mobile Breakpoint. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Site Logo | Alignment, maximum width, width, background, border, radius, shadow, padding and margin. |

## Slider

Use it for a full-width banner slider (a hero banner) with a picture, headline, text and buttons on each slide.

### Content settings

| Setting | What it does |
|---------|--------------|
| Slides | Repeater of slides. Each has a background image with position, repeat and size, title, content, link, alignment, and background and text animation. |
| Slider Settings | Slider height, autoplay with duration, and slide transition with its duration. |
| Slider Navigation | Show navigation only on hover, dots, thumbnail mode and arrows, each with Hide On Desktop, Tablet and Mobile. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Slide, Text Box | Background and overlay colours, and text box width, padding, margin, border, radius and shadow. |
| Button (Primary), Button (Secondary), Divider | Colours, typography, border and spacing. |
| Navigation Arrows, Thumbnails, Dots, Loader | Size, colours, position and loader appearance. |

## Smart Menu

Use it to show one of your WordPress menus across the page or down the side, with a mobile menu button.

### Content settings

| Setting | What it does |
|---------|--------------|
| Smart Menu | Select a Menu, Menu Layout, horizontal alignment, width, Mobile Breakpoint, Mobile Menu Toggle with its text and alignment, and Collapsible Behavior. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Menu Container | Background, border, radius, shadow, transition duration, padding and margin. |
| Main Menu Items, Sub Menus, Sub Menu Items | Typography, dropdown icon, colours and spacing. |
| Mobile Menu Toggle | Toggle colours, size and spacing. |

## Tabs

Use it to put content under tabs so visitors click a tab title to switch between sections.

### Content settings

| Setting | What it does |
|---------|--------------|
| Content | Repeater of Tabs with icon, title, image and content, plus Url Sharing. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Title | Colour, border colour and background in Normal and Active states, layout, alignment, width and text alignment. |
| Icon, Content, Image | Size, colour, spacing and border. |

## Team Carousel

Use it for a sliding row of your team members with photo, name and role.

### Content settings

| Setting | What it does |
|---------|--------------|
| Team | Repeater of Team Members. Each has a thumbnail, name, info and a link, which can open a lightbox with an image, video URL or content. |
| Carousel Settings | Columns, arrows, dots, infinite loop, autoplay and autoplay duration. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Thumbnail | Size, maximum thumb size, alignment, background, opacity and CSS filters in Normal and Hover states, border, radius and shadow. |
| Carousel, Box Content | Overflow, spacing, content placement, alignment and animation. |
| Title, Subtitle, Icon, Lightbox | Typography, colours and spacing. |
| Navigation Arrows, Navigation Dots | Size, colours and position. |

## Testimonial

Use it to show one customer quote with the person's name and photo.

### Content settings

| Setting | What it does |
|---------|--------------|
| Testimonials | Name, Info, Thumbnail and Content. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Testimonial | Flex direction, maximum width, background, border, radius, shadow, item margin and padding. |
| Author Info, Content, Content Arrow | Layout, typography, colours and the speech arrow. |
| Name, Info, Thumbnail | Typography, colours and image styling. |

## Testimonial Carousel

Use it for a testimonial slider that cycles through several customer quotes.

### Content settings

| Setting | What it does |
|---------|--------------|
| Testimonials | Repeater with title, subtitle, thumbnail and content. |
| Carousel Settings | Columns, arrows, dots, infinite loop, autoplay and autoplay duration. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Testimonial | Flex direction, maximum width, background, border, radius, shadow, spacing, item margin and padding. |
| Author Info, Content, Content Arrow, Name, Info, Thumbnail | Layout, typography, colours and image styling. |
| Navigation Arrows, Navigation Dots | Size, colours and position. |

## Text Rotator

Use it for a headline where one word changes in turn, such as "We build fast / beautiful / secure sites".

### Content settings

| Setting | What it does |
|---------|--------------|
| Prefix Text | Text before the rotating part. |
| Animated Texts | Repeater of the words that rotate. |
| Suffix Text | Text after the rotating part. |
| Settings | HTML Tag, Text Align, Animation and Animation Duration. |

### Style settings

| Setting | What it does |
|---------|--------------|
| General | Text colour, background, border, margin, padding and typography for the fixed text. |
| Animated Text | The same options for the rotating text. |

## Timeline

Use it to show steps or history (your story, milestones) down a vertical line.

### Content settings

| Setting | What it does |
|---------|--------------|
| Content | Repeater of Items. Each has an icon or image, text alignment, date, HTML tag, title and content. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Timeline | Layout, padding, bar thickness and colour, icon container size, background, border, radius, shadow and icon size. |
| Content | Typography, colours, background and spacing for the item content. |

## Related

- [Widgets Overview](widgets-overview.md)
- [BuddyPress Widgets](buddypress-widgets.md)
- [WooCommerce Widgets](woocommerce-widgets.md)
