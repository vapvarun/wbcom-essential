# Theme Colors

Wbcom Essential blocks can pick up colours from your theme. This page explains what works today and how to set it up.

## Use Theme Colors toggle

The **Use Theme Colors** toggle is available on the **Category Grid** block. Other blocks do not have this toggle; they use their own colour settings.

1. Select a Category Grid block in the editor.
2. Open the block settings and expand **Color Settings**.
3. Turn on **Use Theme Colors**.

With the toggle on, the card background comes from your theme. The custom colour pickers for card background, category name, post count and overlay disappear. With the toggle off, you choose those colours yourself.

## Theme variables

Several blocks read these CSS variables from your theme. If your theme does not define them, the block uses a built-in fallback colour.

| Variable | Used for | Blocks |
|----------|----------|--------|
| `--wbcom-color-primary` | Accent and focus colour | Category Grid, Groups Grid, Members Grid, Members Carousel, Group Carousel, Activity Feed |
| `--wbcom-card-bg` | Card background | Category Grid, EDD Checkout Recommendations |
| `--wbcom-color-base` | Background fallback | Category Grid |
| `--wbcom-link-color` | Links and accents | Product Catalog, EDD Checkout Recommendations, EDD Checkout Trust Badges |
| `--wbcom-link-hover-color` | Accent hover colour | The shared design tokens |
| `--wbcom-heading-color` | Headings | EDD Checkout Recommendations, EDD Checkout Trust Badges |
| `--wbcom-text-color` | Body text | EDD Checkout Recommendations, EDD Checkout Trust Badges |

The Reign, BuddyX and BuddyX Pro themes are built to work with these blocks. On other themes, add the variables you want to your theme CSS:

```css
:root {
  --wbcom-color-primary: #1d76da;
  --wbcom-link-color: #1d76da;
  --wbcom-heading-color: #222222;
  --wbcom-text-color: #333333;
  --wbcom-card-bg: #ffffff;
}
```

## Shared design tokens

The plugin also loads a set of `--wbe-` design tokens on pages that use its blocks. They cover spacing, radius, shadows, font sizes and a neutral colour palette. The accent colour token follows `--wbcom-link-color`, then `--wbcom-link-hover-color` on hover.

## Custom colours

Most blocks have their own colour pickers in the block settings. Use them when you want a block to stand out from your theme.

## Troubleshooting

| Problem | What to try |
|---------|-------------|
| The Use Theme Colors toggle is missing | Only the Category Grid block has it. |
| Colours do not change | Clear any caching plugin cache and reload the page. |
| Colours look wrong | Check that your theme defines the variable as a valid colour. Inspect the block in your browser's developer tools to see which value applies. |

## Related

- [Blocks Overview](../blocks/blocks-overview.md)
- [Blog Blocks](../blocks/blog-blocks.md)
- [Responsive Design](responsive-design.md)
