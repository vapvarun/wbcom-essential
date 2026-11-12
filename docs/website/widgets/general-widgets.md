# General Widgets

The 27 general widgets work on any WordPress site that runs Elementor 3.0 or higher. They appear in the Elementor panel under the **Wbcom Essential** category. You do not need BuddyPress, bbPress or WooCommerce for them.

The one exception is Header Notification Area, which only appears when the Reign theme is active.

## Accordion

Collapsible panels with an optional icon or text prefix, and optional FAQ schema output for search engines.

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

Shows your site title and tagline, or your site logo, linked to the home page.

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

A countdown to a due date, with separate boxes for days, hours, minutes and seconds.

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

A button that opens a list of links.

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

A card that flips to show a back face.

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

A heading with optional gradient text, rotation and decorative lines before and after.

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

A login form with optional logo, titles, lost password and register links.

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

## Header Notification Area

Reign theme only. This widget does not appear on other themes, because it loads only when Reign is active and uses Reign's own header icon parts. It shows header icons for search, cart, messages, connections, notifications and the user menu.

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

A filterable grid or list of portfolio items with an optional layout switcher.

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

A carousel of post cards with query, card and navigation options.

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

A slider that shows one post at a time, with optional thumbnails.

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

Posts shown on a vertical timeline, with optional Read More and Load More buttons.

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

A carousel of posts with query and animation options.

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

A grid of posts in several display types, with optional pagination.

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

A scrolling news ticker with a label.

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

A pricing card with header, ribbon, price, feature list and footer button.

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

Animated progress bars with a title and percentage.

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

A decorative shape defined by eight corner points, with an optional icon and link.

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

Shows a logo from your site settings or a custom image, with separate desktop and mobile logos.

### Content settings

| Setting | What it does |
|---------|--------------|
| Site Logo | Source, then Desktop and Mobile logo and image size, Link, and Mobile Breakpoint. |

### Style settings

| Setting | What it does |
|---------|--------------|
| Site Logo | Alignment, maximum width, width, background, border, radius, shadow, padding and margin. |

## Slider

An image slider with a title, text and buttons on each slide.

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

Displays a WordPress menu in a horizontal or vertical layout with a mobile toggle.

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

Tabbed content with an icon, title, image or content in each tab.

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

A carousel of team members with thumbnail, name, info and an optional link or lightbox.

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

A single testimonial with name, info, thumbnail and content.

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

A carousel of testimonials.

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

A line of text where one part rotates through a list of words.

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

A vertical timeline with icons, images, dates, titles and content.

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
