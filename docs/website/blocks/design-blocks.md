# Design Blocks (Flip card, progress bars, counters, rotating text)

**Also called:** flip card, hover card, skill bars, percentage bars, number counter, animated numbers, rotating headline, typing text.

This page covers four blocks that add motion to a page. They are **Flip Box** (a flip card), **Progress Bar** (skill bars), **Stats Counter** (counting numbers) and **Text Rotator** (a headline with changing words). They appear in the block inserter under **Essential - Design** and need no other plugin.

Every block here also has the Spacing and Advanced settings described in [Blocks Overview](blocks-overview.md).

## Flip Box

A card that flips on hover to show a back face with a title, description and button.

**What it is for:** Use it for a feature, team member or offer card that shows more on hover.

### Add it

1. Open the block inserter.
2. Search for **Flip Box**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Front Face | Icon / Emoji | Paste an emoji or icon character shown on the front. | ⚡ |
| Front Face | Title | Heading on the front. | Front Title |
| Front Face | Description | Text under the title on the front. | Hover to see the back |
| Front Face | Background Color | Front background. | #667eea |
| Front Face | Text Color | Front text. | #ffffff |
| Back Face | Title | Heading on the back. | Back Title |
| Back Face | Description | Text on the back. | This is the back of the card |
| Back Face | Button Text | Label of the back button. | Learn More |
| Back Face | Button URL | Where the back button links. | # |
| Back Face | Background Color | Back background. | #764ba2 |
| Back Face | Text Color | Back text. | #ffffff |
| Layout | Flip Direction | Horizontal (left to right) or Vertical (top to bottom). | Horizontal |
| Layout | Card Height (px) | Height of the card. | 300 |
| Style | Border Radius, Box Shadow | Rounds the corners and adds a shadow. | Shadow off |

## Progress Bar

Horizontal progress bars that fill when they scroll into view. Use them for skills, goals or any percentage.

**What it is for:** Use it to show skills, goals or any percentage as filling bars.

### Add it

1. Open the block inserter.
2. Search for **Progress Bar**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Progress Bars | Label | Name shown for each bar. | Sample bars |
| Progress Bars | Percentage | How full the bar is. | Per bar |
| Progress Bars | Bar Color | Fill color of each bar. | Per bar |
| Progress Bars | Remove bar | Deletes a bar from the list. | - |
| Layout | Bar Height (px) | Thickness of each bar. | 12 |
| Layout | Bar Border Radius (px) | Roundness of each bar. | 6 |
| Layout | Show Label | Shows the bar name. | On |
| Layout | Show Percentage | Shows the percentage number. | On |
| Layout | Animate on Scroll | Fills the bar when it scrolls into view. | On |
| Style | Track Color | Color of the empty track. | #e9ecef |
| Style | Label Color | Color of the bar name. | #1e1e2e |
| Style | Percentage Color | Color of the percentage number. | #6c757d |
| Style | Border Radius, Box Shadow | Rounds the block corners and adds a shadow. | Shadow off |

## Stats Counter

Numbers that count up when they scroll into view, shown in a responsive grid.

**What it is for:** Use it to show big numbers, such as customers served or years in business.

### Add it

1. Open the block inserter.
2. Search for **Stats Counter**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Stats | Number | The value the counter counts up to. | Per stat |
| Stats | Prefix | Text before the number, such as a currency sign. | Empty |
| Stats | Suffix | Text after the number, such as + or %. | Empty |
| Stats | Label | Caption under the number. | Per stat |
| Stats | Remove stat | Deletes a stat from the list. | - |
| Layout | Columns | Number of columns in the grid. | 4 |
| Layout | Animation Duration (ms) | How long the count-up takes. | 2000 |
| Style | Number Color | Color of the numbers. | #1e1e2e |
| Style | Label Color | Color of the captions. | #6c757d |
| Style | Separator Color | Color of the divider between stats. | #e9ecef |
| Style | Border Radius, Box Shadow | Rounds the block corners and adds a shadow. | Shadow off |

## Text Rotator

A headline where one phrase changes in turn. Pick a fade, slide or typing effect.

**What it is for:** Use it for a headline where one phrase swaps for another, such as designers then makers.

### Add it

1. Open the block inserter.
2. Search for **Text Rotator**.
3. Select it to insert it into the page.

### Settings

| Panel | Setting | What it does | Default |
|-------|---------|--------------|---------|
| Content | Before Text | Fixed text before the rotating phrase. | We are |
| Content | Rotating Texts | The phrases that rotate, one entry each. Each entry rotates in sequence. | Sample phrases |
| Content | After Text | Fixed text after the rotating phrase. | designers. |
| Animation | Animation Type | Fade, Slide or Typing. | Fade |
| Animation | Speed (ms per word) | Time each phrase stays before changing. | 2000 |
| Style | Font Size (Desktop, px) | Text size on desktop. | 36 |
| Style | Font Size (Tablet, px) | Text size on tablets. | 28 |
| Style | Font Size (Mobile, px) | Text size on phones. | 22 |
| Style | Text Align | Left, Center or Right. | Center |
| Style | Text Color | Color of the fixed text. | #1e1e2e |
| Style | Rotating Text Color | Color of the rotating phrase. | #667eea |
| Style | Border Radius, Box Shadow | Rounds the block corners and adds a shadow. | Shadow off |

## You'll know it worked when

Add the block, then view the page. The card flips on hover. Bars and numbers animate as they scroll into view. The headline words change in turn.

## Good to know

### How do I stop the animation?

Turn off **Animate on Scroll** in Progress Bar. The bars then show full from the start.

### Can I use my own icon on the Flip Box?

Yes. Paste an emoji or an icon character into **Icon / Emoji**.

## For developers

Each block has an internal name, used in block markup and code.

| Block | Internal name |
|-------|---------------|
| Flip Box | `wbcom-essential/flip-box` |
| Progress Bar | `wbcom-essential/progress-bar` |
| Stats Counter | `wbcom-essential/stats-counter` |
| Text Rotator | `wbcom-essential/text-rotator` |
