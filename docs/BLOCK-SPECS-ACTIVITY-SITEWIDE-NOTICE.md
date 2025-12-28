# Block Specifications: Activity Stream & Sitewide Notice

This document provides complete specifications for two new BuddyPress blocks to be added to wbcom-essential plugin, following the established patterns from existing blocks like `members-grid`.

---

## Table of Contents

1. [Theme.json Color Integration (CRITICAL)](#0-themejson-color-integration-critical)
2. [Activity Stream Block](#1-activity-stream-block)
3. [Sitewide Notice Block](#2-sitewide-notice-block)
4. [Shared Components](#3-shared-components)
5. [Implementation Checklist](#4-implementation-checklist)

---

## 0. Theme.json Color Integration (CRITICAL)

### Problem Statement

Current wbcom-essential blocks use **hardcoded default colors** that don't integrate with the theme's color palette:

```json
// Current hardcoded defaults in members-grid/block.json
"cardBgColor": { "default": "#ffffff" },
"nameColor": { "default": "#122B46" },
"metaColor": { "default": "#A3A5A9" }
```

This causes a visual disconnect where blocks don't match the site's design.

### Solution: WordPress theme.json Color Palette Integration

All new blocks (and retrofitted existing blocks) should support WordPress color palette via `useSetting()` hook.

### Implementation Pattern

#### 1. Enable Theme Color Support in block.json

```json
{
    "supports": {
        "color": {
            "text": true,
            "background": true,
            "link": true,
            "__experimentalDefaultControls": {
                "text": false,
                "background": false
            }
        }
    }
}
```

#### 2. Use Color Palette in Editor (edit.js)

```javascript
import { useSetting } from '@wordpress/block-editor';
import { ColorPalette } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
    // Get theme color palette
    const colors = useSetting( 'color.palette' ) || [];

    // Map theme colors to block defaults
    const getThemeColor = ( slug, fallback ) => {
        const found = colors.find( c => c.slug === slug );
        return found ? found.color : fallback;
    };

    // Use theme's primary color as default
    const primaryColor = getThemeColor( 'primary', '#0073aa' );
    const backgroundColor = getThemeColor( 'base', '#ffffff' );
    const textColor = getThemeColor( 'contrast', '#1e1e1e' );
    const neutralColor = getThemeColor( 'neutral', '#6b7280' );

    return (
        <InspectorControls>
            <PanelBody title="Colors">
                <p>{ __( 'Card Background', 'wbcom-essential' ) }</p>
                <ColorPalette
                    colors={ colors }
                    value={ attributes.cardBgColor || backgroundColor }
                    onChange={ ( value ) => setAttributes( { cardBgColor: value } ) }
                />
            </PanelBody>
        </InspectorControls>
    );
}
```

#### 3. CSS Custom Properties Pattern

Instead of hardcoded colors in SCSS, use CSS custom properties that inherit from theme:

```scss
// style.scss
.wbcom-members-grid {
    // Default fallbacks that can be overridden
    --wbcom-card-bg: var(--wp--preset--color--base, #ffffff);
    --wbcom-card-text: var(--wp--preset--color--contrast, #1e1e1e);
    --wbcom-card-meta: var(--wp--preset--color--neutral, #6b7280);
    --wbcom-link-color: var(--wp--preset--color--primary, #0073aa);
    --wbcom-button-bg: var(--wp--preset--color--primary, #0073aa);
    --wbcom-button-text: var(--wp--preset--color--white, #ffffff);

    .wbcom-member-card {
        background: var(--wbcom-card-bg);
        color: var(--wbcom-card-text);
    }

    .wbcom-member-card__name {
        color: var(--wbcom-card-text);
    }

    .wbcom-member-card__meta {
        color: var(--wbcom-card-meta);
    }

    .wbcom-member-card__button {
        background: var(--wbcom-button-bg);
        color: var(--wbcom-button-text);
    }
}
```

#### 4. PHP Render with Theme Color Detection

```php
// render.php
<?php
// Get theme.json colors if no custom color set.
$global_settings = wp_get_global_settings();
$palette = $global_settings['color']['palette']['theme'] ?? array();

// Helper function to get theme color by slug.
function wbcom_get_theme_color( $palette, $slug, $fallback = '' ) {
    foreach ( $palette as $color ) {
        if ( $color['slug'] === $slug ) {
            return $color['color'];
        }
    }
    return $fallback;
}

// Use theme colors as defaults.
$primary_color    = wbcom_get_theme_color( $palette, 'primary', '#0073aa' );
$base_color       = wbcom_get_theme_color( $palette, 'base', '#ffffff' );
$contrast_color   = wbcom_get_theme_color( $palette, 'contrast', '#1e1e1e' );
$neutral_color    = wbcom_get_theme_color( $palette, 'neutral', '#6b7280' );

// Apply theme colors if user hasn't customized.
$card_bg    = $attributes['cardBgColor'] ?: $base_color;
$name_color = $attributes['nameColor'] ?: $contrast_color;
$meta_color = $attributes['metaColor'] ?: $neutral_color;
$button_bg  = $primary_color; // Always use theme primary for buttons.
```

### BuddyX Pro Integration

BuddyX Pro uses a `Theme_Json_Bridge` component that syncs Kirki customizer colors to theme.json. The wbcom-essential blocks should automatically pick up these colors via the patterns above.

**Theme.json color slugs used by BuddyX Pro:**

| Slug | Kirki Setting | Description |
|------|---------------|-------------|
| `primary` | `site_primary_color` | Site primary accent color |
| `secondary` | `site_secondary_color` | Secondary accent color |
| `base` | `body_background_color` | Body/card background |
| `contrast` | `heading_color` | Heading/text color |
| `neutral` | Computed from contrast | Muted text color |
| `white` | Hardcoded `#ffffff` | Pure white |
| `black` | Hardcoded `#000000` | Pure black |

### Retrofit Requirements for Existing Blocks

The following existing blocks need to be updated to support theme.json colors:

| Block | Status | Priority |
|-------|--------|----------|
| `members-grid` | ❌ Uses hardcoded | P1 |
| `members-lists` | ❌ Uses hardcoded | P1 |
| `groups-grid` | ❌ Uses hardcoded | P1 |
| `groups-lists` | ❌ Uses hardcoded | P1 |
| `login-form` | ❌ Uses hardcoded | P1 |
| `accordion` | Check | P2 |
| `slider` | Check | P2 |
| `heading` | Check | P2 |

### Testing Checklist

- [ ] Block uses theme primary color for buttons/links
- [ ] Block uses theme background color for cards
- [ ] Block uses theme text colors for headings/content
- [ ] Custom color picker shows theme palette first
- [ ] Block looks correct in dark mode themes
- [ ] Block respects Customizer color changes via Theme_Json_Bridge

---

## 1. Activity Stream Block

### Overview

| Property | Value |
|----------|-------|
| Block Name | `wbcom-essential/activity-stream` |
| Category | `wbcom-essential-buddypress` |
| Replaces | `bp/latest-activities` |
| Icon | `rss` or `update` |
| Priority | P2 |

### Description

Display BuddyPress activity stream in a modern, customizable layout with filtering options, responsive design, and styling controls consistent with other wbcom-essential blocks.

### File Structure

```
blocks/activity-stream/
├── activity-stream.php
└── src/
    ├── block.json
    ├── index.js
    ├── edit.js
    ├── save.js
    ├── render.php
    ├── view.js
    ├── style.scss
    ├── editor.scss
    └── components/
        └── color-control.js
```

### block.json

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "wbcom-essential/activity-stream",
    "version": "1.0.0",
    "title": "Activity Stream",
    "category": "wbcom-essential-buddypress",
    "icon": "rss",
    "description": "Display BuddyPress activity in a customizable stream layout.",
    "keywords": ["activity", "stream", "feed", "buddypress", "updates", "community"],
    "textdomain": "wbcom-essential",
    "example": {},
    "attributes": {
        "activityTypes": {
            "type": "array",
            "default": ["activity_update", "activity_comment"]
        },
        "scope": {
            "type": "string",
            "default": "all",
            "enum": ["all", "friends", "groups", "mentions", "favorites"]
        },
        "totalActivities": {
            "type": "number",
            "default": 5
        },
        "displayStyle": {
            "type": "string",
            "default": "list",
            "enum": ["list", "compact", "card"]
        },
        "showAvatar": {
            "type": "boolean",
            "default": true
        },
        "avatarSize": {
            "type": "number",
            "default": 50
        },
        "showMemberName": {
            "type": "boolean",
            "default": true
        },
        "showTimestamp": {
            "type": "boolean",
            "default": true
        },
        "timestampFormat": {
            "type": "string",
            "default": "relative",
            "enum": ["relative", "absolute"]
        },
        "showActivityContent": {
            "type": "boolean",
            "default": true
        },
        "contentLength": {
            "type": "number",
            "default": 0
        },
        "showActivityMeta": {
            "type": "boolean",
            "default": true
        },
        "showFavoriteButton": {
            "type": "boolean",
            "default": false
        },
        "showCommentButton": {
            "type": "boolean",
            "default": false
        },
        "showComments": {
            "type": "boolean",
            "default": false
        },
        "commentsCount": {
            "type": "number",
            "default": 3
        },
        "showLoadMore": {
            "type": "boolean",
            "default": false
        },
        "loadMoreStyle": {
            "type": "string",
            "default": "button",
            "enum": ["button", "infinite"]
        },
        "cardBgColor": {
            "type": "string",
            "default": "#ffffff"
        },
        "cardBorderRadius": {
            "type": "number",
            "default": 8
        },
        "cardPadding": {
            "type": "number",
            "default": 20
        },
        "cardShadow": {
            "type": "boolean",
            "default": true
        },
        "cardGap": {
            "type": "number",
            "default": 16
        },
        "nameColor": {
            "type": "string",
            "default": "#122B46"
        },
        "contentColor": {
            "type": "string",
            "default": "#4A5568"
        },
        "metaColor": {
            "type": "string",
            "default": "#A3A5A9"
        },
        "linkColor": {
            "type": "string",
            "default": "#0073aa"
        },
        "borderColor": {
            "type": "string",
            "default": "#E2E8F0"
        },
        "showBorder": {
            "type": "boolean",
            "default": false
        }
    },
    "supports": {
        "html": false,
        "align": ["wide", "full"],
        "spacing": {
            "margin": true,
            "padding": true
        }
    },
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css",
    "viewScript": "file:./view.js",
    "render": "file:./render.php"
}
```

### Activity Types Reference

```php
// BuddyPress Activity Types
$activity_types = array(
    'activity_update'       => __( 'Status Updates', 'wbcom-essential' ),
    'activity_comment'      => __( 'Activity Comments', 'wbcom-essential' ),
    'new_member'            => __( 'New Members', 'wbcom-essential' ),
    'updated_profile'       => __( 'Profile Updates', 'wbcom-essential' ),
    'new_avatar'            => __( 'Avatar Updates', 'wbcom-essential' ),
    'friendship_accepted'   => __( 'Friendships', 'wbcom-essential' ),
    'friendship_created'    => __( 'Friend Connections', 'wbcom-essential' ),
    'created_group'         => __( 'New Groups', 'wbcom-essential' ),
    'joined_group'          => __( 'Group Joins', 'wbcom-essential' ),
    'group_details_updated' => __( 'Group Updates', 'wbcom-essential' ),
    'bbp_topic_create'      => __( 'Forum Topics', 'wbcom-essential' ),
    'bbp_reply_create'      => __( 'Forum Replies', 'wbcom-essential' ),
    'new_blog_post'         => __( 'Blog Posts', 'wbcom-essential' ),
    'new_blog_comment'      => __( 'Blog Comments', 'wbcom-essential' ),
);
```

### Inspector Controls Structure

```
├── Settings Panel
│   ├── Scope (SelectControl)
│   ├── Activity Types (FormTokenField / CheckboxControl group)
│   ├── Total Activities (RangeControl: 1-50)
│   └── Display Style (ButtonGroup: list/compact/card)
│
├── Display Options Panel
│   ├── Show Avatar (Toggle)
│   ├── Avatar Size (RangeControl: 30-100) [conditional]
│   ├── Show Member Name (Toggle)
│   ├── Show Timestamp (Toggle)
│   ├── Timestamp Format (ButtonGroup) [conditional]
│   ├── Show Content (Toggle)
│   ├── Content Length (RangeControl: 0=full) [conditional]
│   └── Show Activity Meta (Toggle)
│
├── Interaction Panel
│   ├── Show Favorite Button (Toggle)
│   ├── Show Comment Button (Toggle)
│   ├── Show Comments (Toggle)
│   ├── Comments Count (RangeControl) [conditional]
│   ├── Show Load More (Toggle)
│   └── Load More Style (ButtonGroup) [conditional]
│
├── Card Style Panel
│   ├── Background Color (ColorControl)
│   ├── Border Radius (RangeControl: 0-30)
│   ├── Padding (RangeControl: 0-40)
│   ├── Card Shadow (Toggle)
│   ├── Gap Between Items (RangeControl: 0-40)
│   ├── Show Border (Toggle)
│   └── Border Color (ColorControl) [conditional]
│
└── Colors Panel
    ├── Name Color (ColorControl)
    ├── Content Color (ColorControl)
    ├── Meta Color (ColorControl)
    └── Link Color (ColorControl)
```

### render.php Template

```php
<?php
/**
 * Activity Stream Block - Server-side render.
 *
 * @package WBCOM_Essential
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Check if BuddyPress is active.
if ( ! function_exists( 'bp_is_active' ) || ! bp_is_active( 'activity' ) ) {
    return;
}

// Extract attributes with defaults.
$activity_types    = $attributes['activityTypes'] ?? array( 'activity_update' );
$scope             = $attributes['scope'] ?? 'all';
$total_activities  = $attributes['totalActivities'] ?? 5;
$display_style     = $attributes['displayStyle'] ?? 'list';
$show_avatar       = $attributes['showAvatar'] ?? true;
$avatar_size       = $attributes['avatarSize'] ?? 50;
$show_member_name  = $attributes['showMemberName'] ?? true;
$show_timestamp    = $attributes['showTimestamp'] ?? true;
$timestamp_format  = $attributes['timestampFormat'] ?? 'relative';
$show_content      = $attributes['showActivityContent'] ?? true;
$content_length    = $attributes['contentLength'] ?? 0;
$show_meta         = $attributes['showActivityMeta'] ?? true;
$show_favorite     = $attributes['showFavoriteButton'] ?? false;
$show_comment_btn  = $attributes['showCommentButton'] ?? false;
$show_comments     = $attributes['showComments'] ?? false;
$comments_count    = $attributes['commentsCount'] ?? 3;
$show_load_more    = $attributes['showLoadMore'] ?? false;
$load_more_style   = $attributes['loadMoreStyle'] ?? 'button';
$card_bg           = $attributes['cardBgColor'] ?? '#ffffff';
$card_radius       = $attributes['cardBorderRadius'] ?? 8;
$card_padding      = $attributes['cardPadding'] ?? 20;
$card_shadow       = $attributes['cardShadow'] ?? true;
$card_gap          = $attributes['cardGap'] ?? 16;
$name_color        = $attributes['nameColor'] ?? '#122B46';
$content_color     = $attributes['contentColor'] ?? '#4A5568';
$meta_color        = $attributes['metaColor'] ?? '#A3A5A9';
$link_color        = $attributes['linkColor'] ?? '#0073aa';
$border_color      = $attributes['borderColor'] ?? '#E2E8F0';
$show_border       = $attributes['showBorder'] ?? false;

// Build activity query args.
$args = array(
    'per_page' => $total_activities,
    'action'   => implode( ',', $activity_types ),
);

// Set scope.
if ( 'friends' === $scope && is_user_logged_in() ) {
    $args['scope'] = 'friends';
} elseif ( 'groups' === $scope && is_user_logged_in() ) {
    $args['scope'] = 'groups';
} elseif ( 'mentions' === $scope && is_user_logged_in() ) {
    $args['scope'] = 'mentions';
} elseif ( 'favorites' === $scope && is_user_logged_in() ) {
    $args['scope'] = 'favorites';
}

// Query activities.
$activities = bp_activity_get( $args );

// CSS custom properties.
$inline_styles = sprintf(
    '--activity-card-bg: %s; --activity-card-radius: %dpx; --activity-card-padding: %dpx; --activity-card-gap: %dpx; --activity-avatar-size: %dpx; --activity-name-color: %s; --activity-content-color: %s; --activity-meta-color: %s; --activity-link-color: %s; --activity-border-color: %s;',
    esc_attr( $card_bg ),
    absint( $card_radius ),
    absint( $card_padding ),
    absint( $card_gap ),
    absint( $avatar_size ),
    esc_attr( $name_color ),
    esc_attr( $content_color ),
    esc_attr( $meta_color ),
    esc_attr( $link_color ),
    esc_attr( $border_color )
);

// Build wrapper classes.
$wrapper_classes = array(
    'wbcom-activity-stream',
    'wbcom-activity-stream--' . esc_attr( $display_style ),
);
if ( $card_shadow ) {
    $wrapper_classes[] = 'has-shadow';
}
if ( $show_border ) {
    $wrapper_classes[] = 'has-border';
}

$wrapper_attributes = get_block_wrapper_attributes( array(
    'class' => implode( ' ', $wrapper_classes ),
    'style' => $inline_styles,
) );
?>

<div <?php echo $wrapper_attributes; ?>>
    <?php if ( ! empty( $activities['activities'] ) ) : ?>
        <div class="wbcom-activity-stream__list">
            <?php foreach ( $activities['activities'] as $activity ) : ?>
                <article class="wbcom-activity-item" data-activity-id="<?php echo esc_attr( $activity->id ); ?>">
                    <?php if ( $show_avatar ) : ?>
                        <div class="wbcom-activity-item__avatar">
                            <a href="<?php echo esc_url( bp_core_get_user_domain( $activity->user_id ) ); ?>">
                                <?php echo bp_core_fetch_avatar( array(
                                    'item_id' => $activity->user_id,
                                    'type'    => 'thumb',
                                    'width'   => $avatar_size,
                                    'height'  => $avatar_size,
                                ) ); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                    <div class="wbcom-activity-item__content">
                        <header class="wbcom-activity-item__header">
                            <?php if ( $show_member_name ) : ?>
                                <a href="<?php echo esc_url( bp_core_get_user_domain( $activity->user_id ) ); ?>" class="wbcom-activity-item__author">
                                    <?php echo esc_html( bp_core_get_user_displayname( $activity->user_id ) ); ?>
                                </a>
                            <?php endif; ?>

                            <?php if ( $show_timestamp ) : ?>
                                <time class="wbcom-activity-item__time" datetime="<?php echo esc_attr( $activity->date_recorded ); ?>">
                                    <?php
                                    if ( 'relative' === $timestamp_format ) {
                                        echo esc_html( bp_core_time_since( $activity->date_recorded ) );
                                    } else {
                                        echo esc_html( date_i18n( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), strtotime( $activity->date_recorded ) ) );
                                    }
                                    ?>
                                </time>
                            <?php endif; ?>
                        </header>

                        <?php if ( $show_content && ! empty( $activity->content ) ) : ?>
                            <div class="wbcom-activity-item__body">
                                <?php
                                $content = $activity->content;
                                if ( $content_length > 0 && strlen( strip_tags( $content ) ) > $content_length ) {
                                    $content = wp_trim_words( $content, $content_length, '...' );
                                }
                                echo wp_kses_post( $content );
                                ?>
                            </div>
                        <?php endif; ?>

                        <?php if ( $show_meta || $show_favorite || $show_comment_btn ) : ?>
                            <footer class="wbcom-activity-item__footer">
                                <?php if ( $show_meta ) : ?>
                                    <span class="wbcom-activity-item__action">
                                        <?php echo wp_kses_post( $activity->action ); ?>
                                    </span>
                                <?php endif; ?>

                                <div class="wbcom-activity-item__actions">
                                    <?php if ( $show_favorite && is_user_logged_in() ) : ?>
                                        <?php
                                        $is_favorited = bp_activity_is_favorited( $activity->id );
                                        ?>
                                        <button class="wbcom-activity-item__fav-btn <?php echo $is_favorited ? 'is-favorited' : ''; ?>"
                                                data-activity-id="<?php echo esc_attr( $activity->id ); ?>"
                                                aria-label="<?php echo $is_favorited ? esc_attr__( 'Remove from favorites', 'wbcom-essential' ) : esc_attr__( 'Add to favorites', 'wbcom-essential' ); ?>">
                                            <span class="dashicons dashicons-star-<?php echo $is_favorited ? 'filled' : 'empty'; ?>"></span>
                                        </button>
                                    <?php endif; ?>

                                    <?php if ( $show_comment_btn ) : ?>
                                        <button class="wbcom-activity-item__comment-btn"
                                                data-activity-id="<?php echo esc_attr( $activity->id ); ?>"
                                                aria-label="<?php esc_attr_e( 'Comment on activity', 'wbcom-essential' ); ?>">
                                            <span class="dashicons dashicons-admin-comments"></span>
                                            <?php
                                            $comment_count = bp_activity_get_comment_count();
                                            if ( $comment_count > 0 ) {
                                                echo '<span class="count">' . esc_html( $comment_count ) . '</span>';
                                            }
                                            ?>
                                        </button>
                                    <?php endif; ?>
                                </div>
                            </footer>
                        <?php endif; ?>

                        <?php if ( $show_comments ) : ?>
                            <div class="wbcom-activity-item__comments">
                                <?php
                                // Load activity comments.
                                if ( bp_activity_get_comment_count( $activity ) > 0 ) {
                                    bp_activity_comments( array(
                                        'activity_id' => $activity->id,
                                        'max'         => $comments_count,
                                    ) );
                                }
                                ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>

        <?php if ( $show_load_more && count( $activities['activities'] ) >= $total_activities ) : ?>
            <div class="wbcom-activity-stream__load-more">
                <button class="wbcom-activity-stream__load-more-btn"
                        data-page="1"
                        data-per-page="<?php echo esc_attr( $total_activities ); ?>"
                        data-style="<?php echo esc_attr( $load_more_style ); ?>">
                    <?php esc_html_e( 'Load More', 'wbcom-essential' ); ?>
                </button>
            </div>
        <?php endif; ?>

    <?php else : ?>
        <p class="wbcom-activity-stream__empty">
            <?php esc_html_e( 'No activity found.', 'wbcom-essential' ); ?>
        </p>
    <?php endif; ?>
</div>
```

### CSS Structure (style.scss)

```scss
// Activity Stream Block Styles
// Following wbcom-essential patterns

.wbcom-activity-stream {
    // CSS Custom Properties (set via inline styles)
    --activity-card-bg: #ffffff;
    --activity-card-radius: 8px;
    --activity-card-padding: 20px;
    --activity-card-gap: 16px;
    --activity-avatar-size: 50px;
    --activity-name-color: #122B46;
    --activity-content-color: #4A5568;
    --activity-meta-color: #A3A5A9;
    --activity-link-color: #0073aa;
    --activity-border-color: #E2E8F0;

    &__list {
        display: flex;
        flex-direction: column;
        gap: var(--activity-card-gap);
    }

    // Activity Item
    .wbcom-activity-item {
        display: flex;
        gap: 16px;
        padding: var(--activity-card-padding);
        background: var(--activity-card-bg);
        border-radius: var(--activity-card-radius);
        transition: box-shadow 0.2s ease;

        &__avatar {
            flex-shrink: 0;

            img {
                width: var(--activity-avatar-size);
                height: var(--activity-avatar-size);
                border-radius: 50%;
                object-fit: cover;
            }
        }

        &__content {
            flex: 1;
            min-width: 0;
        }

        &__header {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
        }

        &__author {
            font-weight: 600;
            color: var(--activity-name-color);
            text-decoration: none;

            &:hover {
                color: var(--activity-link-color);
            }
        }

        &__time {
            font-size: 0.875rem;
            color: var(--activity-meta-color);
        }

        &__body {
            color: var(--activity-content-color);
            line-height: 1.6;
            word-wrap: break-word;

            a {
                color: var(--activity-link-color);
            }

            img,
            video,
            iframe {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                margin-top: 12px;
            }
        }

        &__footer {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid var(--activity-border-color);
        }

        &__action {
            font-size: 0.875rem;
            color: var(--activity-meta-color);

            a {
                color: var(--activity-link-color);
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        &__actions {
            display: flex;
            gap: 12px;
        }

        &__fav-btn,
        &__comment-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 8px;
            border: none;
            background: transparent;
            color: var(--activity-meta-color);
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s ease;

            &:hover {
                background: rgba(0, 0, 0, 0.05);
                color: var(--activity-link-color);
            }

            &.is-favorited {
                color: #f59e0b;
            }

            .count {
                font-size: 0.75rem;
            }
        }

        &__comments {
            margin-top: 16px;
            padding-left: calc(var(--activity-avatar-size) + 16px);
        }
    }

    // Shadow modifier
    &.has-shadow .wbcom-activity-item {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);

        &:hover {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
        }
    }

    // Border modifier
    &.has-border .wbcom-activity-item {
        border: 1px solid var(--activity-border-color);
    }

    // Display style: Compact
    &--compact {
        .wbcom-activity-item {
            padding: 12px;
            gap: 12px;

            &__avatar img {
                width: 36px;
                height: 36px;
            }

            &__header {
                margin-bottom: 4px;
            }

            &__body {
                font-size: 0.9375rem;
            }
        }
    }

    // Display style: Card
    &--card {
        .wbcom-activity-item {
            flex-direction: column;
            text-align: center;

            &__avatar {
                margin: 0 auto 12px;
            }

            &__header {
                flex-direction: column;
                gap: 4px;
            }

            &__footer {
                justify-content: center;
            }
        }
    }

    // Load More
    &__load-more {
        margin-top: 24px;
        text-align: center;
    }

    &__load-more-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: var(--activity-link-color);
        color: #ffffff;
        border: none;
        border-radius: 6px;
        font-size: 0.9375rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            opacity: 0.9;
        }

        &.is-loading {
            opacity: 0.7;
            cursor: wait;
        }
    }

    // Empty state
    &__empty {
        padding: 40px;
        text-align: center;
        color: var(--activity-meta-color);
        background: var(--activity-card-bg);
        border-radius: var(--activity-card-radius);
    }
}

// Responsive
@media (max-width: 600px) {
    .wbcom-activity-stream {
        .wbcom-activity-item {
            flex-direction: column;

            &__avatar {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            &__comments {
                padding-left: 0;
            }
        }
    }
}
```

### view.js (Frontend JavaScript)

```javascript
/**
 * Activity Stream Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

( function() {
    'use strict';

    const init = () => {
        const blocks = document.querySelectorAll( '.wbcom-activity-stream' );

        blocks.forEach( ( block ) => {
            initFavoriteButtons( block );
            initLoadMore( block );
        } );
    };

    /**
     * Initialize favorite buttons.
     */
    const initFavoriteButtons = ( block ) => {
        const favButtons = block.querySelectorAll( '.wbcom-activity-item__fav-btn' );

        favButtons.forEach( ( btn ) => {
            btn.addEventListener( 'click', async ( e ) => {
                e.preventDefault();

                const activityId = btn.dataset.activityId;
                const isFavorited = btn.classList.contains( 'is-favorited' );

                try {
                    const response = await fetch( wbcomEssential.ajaxUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams( {
                            action: isFavorited ? 'wbcom_unfavorite_activity' : 'wbcom_favorite_activity',
                            activity_id: activityId,
                            nonce: wbcomEssential.nonce,
                        } ),
                    } );

                    const data = await response.json();

                    if ( data.success ) {
                        btn.classList.toggle( 'is-favorited' );
                        const icon = btn.querySelector( '.dashicons' );
                        if ( icon ) {
                            icon.classList.toggle( 'dashicons-star-filled' );
                            icon.classList.toggle( 'dashicons-star-empty' );
                        }
                    }
                } catch ( error ) {
                    console.error( 'Favorite action failed:', error );
                }
            } );
        } );
    };

    /**
     * Initialize load more functionality.
     */
    const initLoadMore = ( block ) => {
        const loadMoreBtn = block.querySelector( '.wbcom-activity-stream__load-more-btn' );

        if ( ! loadMoreBtn ) {
            return;
        }

        const style = loadMoreBtn.dataset.style;

        if ( style === 'infinite' ) {
            initInfiniteScroll( block, loadMoreBtn );
        } else {
            loadMoreBtn.addEventListener( 'click', () => loadMoreActivities( block, loadMoreBtn ) );
        }
    };

    /**
     * Load more activities.
     */
    const loadMoreActivities = async ( block, btn ) => {
        if ( btn.classList.contains( 'is-loading' ) ) {
            return;
        }

        btn.classList.add( 'is-loading' );
        btn.textContent = wbcomEssential.i18n?.loading || 'Loading...';

        const page = parseInt( btn.dataset.page, 10 ) + 1;
        const perPage = btn.dataset.perPage;
        const list = block.querySelector( '.wbcom-activity-stream__list' );

        try {
            const response = await fetch( wbcomEssential.ajaxUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams( {
                    action: 'wbcom_load_more_activities',
                    page: page,
                    per_page: perPage,
                    nonce: wbcomEssential.nonce,
                } ),
            } );

            const data = await response.json();

            if ( data.success && data.data.html ) {
                list.insertAdjacentHTML( 'beforeend', data.data.html );
                btn.dataset.page = page;

                if ( ! data.data.hasMore ) {
                    btn.parentElement.remove();
                }
            }
        } catch ( error ) {
            console.error( 'Load more failed:', error );
        } finally {
            btn.classList.remove( 'is-loading' );
            btn.textContent = wbcomEssential.i18n?.loadMore || 'Load More';
        }
    };

    /**
     * Initialize infinite scroll.
     */
    const initInfiniteScroll = ( block, btn ) => {
        const observer = new IntersectionObserver(
            ( entries ) => {
                entries.forEach( ( entry ) => {
                    if ( entry.isIntersecting ) {
                        loadMoreActivities( block, btn );
                    }
                } );
            },
            { rootMargin: '100px' }
        );

        observer.observe( btn );
    };

    // Initialize on DOM ready.
    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }
} )();
```

---

## 2. Sitewide Notice Block

### Overview

| Property | Value |
|----------|-------|
| Block Name | `wbcom-essential/sitewide-notice` |
| Category | `wbcom-essential-buddypress` |
| Replaces | `bp/sitewide-notices` |
| Icon | `megaphone` or `warning` |
| Priority | P2 |

### Description

Display BuddyPress sitewide notices with customizable styling, dismissible behavior, and multiple display variants. Supports both the current active notice and notice management for admins.

### File Structure

```
blocks/sitewide-notice/
├── sitewide-notice.php
└── src/
    ├── block.json
    ├── index.js
    ├── edit.js
    ├── save.js
    ├── render.php
    ├── view.js
    ├── style.scss
    ├── editor.scss
    └── components/
        └── color-control.js
```

### block.json

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "wbcom-essential/sitewide-notice",
    "version": "1.0.0",
    "title": "Sitewide Notice",
    "category": "wbcom-essential-buddypress",
    "icon": "megaphone",
    "description": "Display BuddyPress sitewide notices with customizable styling.",
    "keywords": ["notice", "alert", "announcement", "buddypress", "banner", "message"],
    "textdomain": "wbcom-essential",
    "example": {},
    "attributes": {
        "displayStyle": {
            "type": "string",
            "default": "banner",
            "enum": ["banner", "card", "minimal", "floating"]
        },
        "position": {
            "type": "string",
            "default": "inline",
            "enum": ["inline", "top-fixed", "bottom-fixed"]
        },
        "variant": {
            "type": "string",
            "default": "info",
            "enum": ["info", "success", "warning", "error", "custom"]
        },
        "showIcon": {
            "type": "boolean",
            "default": true
        },
        "customIcon": {
            "type": "string",
            "default": ""
        },
        "showDismiss": {
            "type": "boolean",
            "default": true
        },
        "dismissPersist": {
            "type": "boolean",
            "default": true
        },
        "showDate": {
            "type": "boolean",
            "default": false
        },
        "backgroundColor": {
            "type": "string",
            "default": ""
        },
        "textColor": {
            "type": "string",
            "default": ""
        },
        "borderColor": {
            "type": "string",
            "default": ""
        },
        "iconColor": {
            "type": "string",
            "default": ""
        },
        "borderRadius": {
            "type": "number",
            "default": 8
        },
        "padding": {
            "type": "number",
            "default": 16
        },
        "showBorder": {
            "type": "boolean",
            "default": true
        },
        "borderWidth": {
            "type": "number",
            "default": 1
        },
        "borderStyle": {
            "type": "string",
            "default": "solid",
            "enum": ["solid", "dashed", "left-accent"]
        },
        "animation": {
            "type": "string",
            "default": "none",
            "enum": ["none", "fade", "slide-down", "slide-up"]
        }
    },
    "supports": {
        "html": false,
        "align": ["wide", "full"],
        "spacing": {
            "margin": true,
            "padding": false
        }
    },
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css",
    "viewScript": "file:./view.js",
    "render": "file:./render.php"
}
```

### Variant Color Presets

```php
// Variant color presets.
$variant_colors = array(
    'info'    => array(
        'bg'     => '#EFF6FF',
        'text'   => '#1E40AF',
        'border' => '#3B82F6',
        'icon'   => '#3B82F6',
    ),
    'success' => array(
        'bg'     => '#F0FDF4',
        'text'   => '#166534',
        'border' => '#22C55E',
        'icon'   => '#22C55E',
    ),
    'warning' => array(
        'bg'     => '#FFFBEB',
        'text'   => '#92400E',
        'border' => '#F59E0B',
        'icon'   => '#F59E0B',
    ),
    'error'   => array(
        'bg'     => '#FEF2F2',
        'text'   => '#991B1B',
        'border' => '#EF4444',
        'icon'   => '#EF4444',
    ),
);
```

### Inspector Controls Structure

```
├── Display Panel
│   ├── Display Style (ButtonGroup: banner/card/minimal/floating)
│   ├── Position (ButtonGroup: inline/top-fixed/bottom-fixed)
│   ├── Variant (SelectControl: info/success/warning/error/custom)
│   └── Animation (SelectControl)
│
├── Content Options Panel
│   ├── Show Icon (Toggle)
│   ├── Custom Icon (TextControl) [conditional]
│   ├── Show Dismiss Button (Toggle)
│   ├── Remember Dismissal (Toggle) [conditional]
│   └── Show Date (Toggle)
│
├── Border Panel
│   ├── Show Border (Toggle)
│   ├── Border Width (RangeControl) [conditional]
│   ├── Border Style (ButtonGroup) [conditional]
│   └── Border Color (ColorControl) [conditional]
│
└── Custom Colors Panel [shown only when variant=custom]
    ├── Background Color (ColorControl)
    ├── Text Color (ColorControl)
    ├── Border Color (ColorControl)
    ├── Icon Color (ColorControl)
    ├── Border Radius (RangeControl)
    └── Padding (RangeControl)
```

### render.php Template

```php
<?php
/**
 * Sitewide Notice Block - Server-side render.
 *
 * @package WBCOM_Essential
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Check if BuddyPress Messages component is active.
if ( ! function_exists( 'bp_is_active' ) || ! bp_is_active( 'messages' ) ) {
    return;
}

// Get the active sitewide notice.
$notice = BP_Messages_Notice::get_active();

// No active notice.
if ( empty( $notice ) || empty( $notice->id ) ) {
    return;
}

// Check if user has dismissed this notice.
$user_id = get_current_user_id();
if ( $user_id && $attributes['dismissPersist'] ?? true ) {
    $dismissed = get_user_meta( $user_id, 'wbcom_dismissed_notices', true );
    if ( is_array( $dismissed ) && in_array( $notice->id, $dismissed, true ) ) {
        return;
    }
}

// Extract attributes.
$display_style   = $attributes['displayStyle'] ?? 'banner';
$position        = $attributes['position'] ?? 'inline';
$variant         = $attributes['variant'] ?? 'info';
$show_icon       = $attributes['showIcon'] ?? true;
$custom_icon     = $attributes['customIcon'] ?? '';
$show_dismiss    = $attributes['showDismiss'] ?? true;
$dismiss_persist = $attributes['dismissPersist'] ?? true;
$show_date       = $attributes['showDate'] ?? false;
$border_radius   = $attributes['borderRadius'] ?? 8;
$padding         = $attributes['padding'] ?? 16;
$show_border     = $attributes['showBorder'] ?? true;
$border_width    = $attributes['borderWidth'] ?? 1;
$border_style    = $attributes['borderStyle'] ?? 'solid';
$animation       = $attributes['animation'] ?? 'none';

// Variant color presets.
$variant_colors = array(
    'info'    => array(
        'bg'     => '#EFF6FF',
        'text'   => '#1E40AF',
        'border' => '#3B82F6',
        'icon'   => '#3B82F6',
    ),
    'success' => array(
        'bg'     => '#F0FDF4',
        'text'   => '#166534',
        'border' => '#22C55E',
        'icon'   => '#22C55E',
    ),
    'warning' => array(
        'bg'     => '#FFFBEB',
        'text'   => '#92400E',
        'border' => '#F59E0B',
        'icon'   => '#F59E0B',
    ),
    'error'   => array(
        'bg'     => '#FEF2F2',
        'text'   => '#991B1B',
        'border' => '#EF4444',
        'icon'   => '#EF4444',
    ),
);

// Get colors based on variant or custom.
if ( 'custom' === $variant ) {
    $bg_color     = $attributes['backgroundColor'] ?? '#EFF6FF';
    $text_color   = $attributes['textColor'] ?? '#1E40AF';
    $border_color = $attributes['borderColor'] ?? '#3B82F6';
    $icon_color   = $attributes['iconColor'] ?? '#3B82F6';
} else {
    $colors       = $variant_colors[ $variant ] ?? $variant_colors['info'];
    $bg_color     = $colors['bg'];
    $text_color   = $colors['text'];
    $border_color = $colors['border'];
    $icon_color   = $colors['icon'];
}

// Icon mapping.
$variant_icons = array(
    'info'    => 'info',
    'success' => 'yes-alt',
    'warning' => 'warning',
    'error'   => 'dismiss',
);
$icon = $custom_icon ?: ( $variant_icons[ $variant ] ?? 'info' );

// Build CSS custom properties.
$inline_styles = sprintf(
    '--notice-bg: %s; --notice-text: %s; --notice-border: %s; --notice-icon: %s; --notice-radius: %dpx; --notice-padding: %dpx; --notice-border-width: %dpx;',
    esc_attr( $bg_color ),
    esc_attr( $text_color ),
    esc_attr( $border_color ),
    esc_attr( $icon_color ),
    absint( $border_radius ),
    absint( $padding ),
    absint( $border_width )
);

// Build wrapper classes.
$wrapper_classes = array(
    'wbcom-sitewide-notice',
    'wbcom-sitewide-notice--' . esc_attr( $display_style ),
    'wbcom-sitewide-notice--' . esc_attr( $variant ),
    'wbcom-sitewide-notice--position-' . esc_attr( $position ),
);

if ( $show_border ) {
    $wrapper_classes[] = 'has-border';
    $wrapper_classes[] = 'border-style--' . esc_attr( $border_style );
}

if ( 'none' !== $animation ) {
    $wrapper_classes[] = 'animation--' . esc_attr( $animation );
}

$wrapper_attributes = get_block_wrapper_attributes( array(
    'class'          => implode( ' ', $wrapper_classes ),
    'style'          => $inline_styles,
    'role'           => 'alert',
    'aria-live'      => 'polite',
    'data-notice-id' => esc_attr( $notice->id ),
) );
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="wbcom-sitewide-notice__inner">
        <?php if ( $show_icon ) : ?>
            <div class="wbcom-sitewide-notice__icon">
                <span class="dashicons dashicons-<?php echo esc_attr( $icon ); ?>"></span>
            </div>
        <?php endif; ?>

        <div class="wbcom-sitewide-notice__content">
            <?php if ( ! empty( $notice->subject ) ) : ?>
                <strong class="wbcom-sitewide-notice__title">
                    <?php echo esc_html( $notice->subject ); ?>
                </strong>
            <?php endif; ?>

            <?php if ( ! empty( $notice->message ) ) : ?>
                <div class="wbcom-sitewide-notice__message">
                    <?php echo wp_kses_post( $notice->message ); ?>
                </div>
            <?php endif; ?>

            <?php if ( $show_date && ! empty( $notice->date_sent ) ) : ?>
                <time class="wbcom-sitewide-notice__date" datetime="<?php echo esc_attr( $notice->date_sent ); ?>">
                    <?php
                    printf(
                        /* translators: %s: date */
                        esc_html__( 'Posted on %s', 'wbcom-essential' ),
                        esc_html( date_i18n( get_option( 'date_format' ), strtotime( $notice->date_sent ) ) )
                    );
                    ?>
                </time>
            <?php endif; ?>
        </div>

        <?php if ( $show_dismiss ) : ?>
            <button
                type="button"
                class="wbcom-sitewide-notice__dismiss"
                aria-label="<?php esc_attr_e( 'Dismiss notice', 'wbcom-essential' ); ?>"
                data-notice-id="<?php echo esc_attr( $notice->id ); ?>"
                data-persist="<?php echo $dismiss_persist ? 'true' : 'false'; ?>">
                <span class="dashicons dashicons-no-alt"></span>
            </button>
        <?php endif; ?>
    </div>
</div>
```

### CSS Structure (style.scss)

```scss
// Sitewide Notice Block Styles
// Following wbcom-essential patterns

.wbcom-sitewide-notice {
    // CSS Custom Properties
    --notice-bg: #EFF6FF;
    --notice-text: #1E40AF;
    --notice-border: #3B82F6;
    --notice-icon: #3B82F6;
    --notice-radius: 8px;
    --notice-padding: 16px;
    --notice-border-width: 1px;

    position: relative;
    background: var(--notice-bg);
    color: var(--notice-text);
    border-radius: var(--notice-radius);

    &__inner {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: var(--notice-padding);
    }

    &__icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        color: var(--notice-icon);

        .dashicons {
            font-size: 20px;
            width: 20px;
            height: 20px;
        }
    }

    &__content {
        flex: 1;
        min-width: 0;
    }

    &__title {
        display: block;
        font-weight: 600;
        margin-bottom: 4px;
    }

    &__message {
        line-height: 1.6;

        a {
            color: inherit;
            text-decoration: underline;

            &:hover {
                text-decoration: none;
            }
        }
    }

    &__date {
        display: block;
        margin-top: 8px;
        font-size: 0.875rem;
        opacity: 0.7;
    }

    &__dismiss {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        padding: 0;
        border: none;
        background: transparent;
        color: var(--notice-text);
        cursor: pointer;
        border-radius: 4px;
        opacity: 0.6;
        transition: all 0.2s ease;

        &:hover {
            opacity: 1;
            background: rgba(0, 0, 0, 0.1);
        }

        .dashicons {
            font-size: 18px;
            width: 18px;
            height: 18px;
        }
    }

    // Border styles
    &.has-border {
        border: var(--notice-border-width) solid var(--notice-border);
    }

    &.border-style--left-accent {
        border: none;
        border-left: 4px solid var(--notice-border);
        border-radius: 0 var(--notice-radius) var(--notice-radius) 0;
    }

    // Display styles
    &--card {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    }

    &--minimal {
        background: transparent;
        border: none;

        .wbcom-sitewide-notice__inner {
            padding: 8px 0;
        }
    }

    &--floating {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    // Position styles
    &--position-top-fixed,
    &--position-bottom-fixed {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 9999;
        border-radius: 0;
        margin: 0;
    }

    &--position-top-fixed {
        top: 0;

        // Account for WP admin bar.
        .admin-bar & {
            top: 32px;

            @media screen and (max-width: 782px) {
                top: 46px;
            }
        }
    }

    &--position-bottom-fixed {
        bottom: 0;
    }

    // Animations
    &.animation--fade {
        animation: wbcom-notice-fade-in 0.3s ease-out;
    }

    &.animation--slide-down {
        animation: wbcom-notice-slide-down 0.3s ease-out;
    }

    &.animation--slide-up {
        animation: wbcom-notice-slide-up 0.3s ease-out;
    }

    &.is-dismissing {
        animation: wbcom-notice-fade-out 0.2s ease-out forwards;
    }
}

// Animations
@keyframes wbcom-notice-fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes wbcom-notice-fade-out {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes wbcom-notice-slide-down {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes wbcom-notice-slide-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

// Responsive
@media (max-width: 600px) {
    .wbcom-sitewide-notice {
        &__inner {
            flex-wrap: wrap;
        }

        &__icon {
            order: 1;
        }

        &__dismiss {
            order: 2;
            margin-left: auto;
        }

        &__content {
            order: 3;
            width: 100%;
            padding-top: 8px;
        }
    }
}
```

### view.js (Frontend JavaScript)

```javascript
/**
 * Sitewide Notice Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

( function() {
    'use strict';

    const init = () => {
        const notices = document.querySelectorAll( '.wbcom-sitewide-notice' );

        notices.forEach( ( notice ) => {
            initDismiss( notice );
        } );
    };

    /**
     * Initialize dismiss functionality.
     */
    const initDismiss = ( notice ) => {
        const dismissBtn = notice.querySelector( '.wbcom-sitewide-notice__dismiss' );

        if ( ! dismissBtn ) {
            return;
        }

        dismissBtn.addEventListener( 'click', async () => {
            const noticeId = dismissBtn.dataset.noticeId;
            const persist = dismissBtn.dataset.persist === 'true';

            // Add dismissing animation.
            notice.classList.add( 'is-dismissing' );

            // If persist, save to user meta via AJAX.
            if ( persist && wbcomEssential?.ajaxUrl ) {
                try {
                    await fetch( wbcomEssential.ajaxUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams( {
                            action: 'wbcom_dismiss_notice',
                            notice_id: noticeId,
                            nonce: wbcomEssential.nonce,
                        } ),
                    } );
                } catch ( error ) {
                    console.error( 'Failed to persist notice dismissal:', error );
                }
            } else if ( persist ) {
                // Fallback to localStorage if not logged in.
                const dismissed = JSON.parse( localStorage.getItem( 'wbcom_dismissed_notices' ) || '[]' );
                if ( ! dismissed.includes( noticeId ) ) {
                    dismissed.push( noticeId );
                    localStorage.setItem( 'wbcom_dismissed_notices', JSON.stringify( dismissed ) );
                }
            }

            // Remove notice after animation.
            setTimeout( () => {
                notice.remove();

                // Dispatch event for other scripts.
                document.dispatchEvent( new CustomEvent( 'wbcom:notice:dismissed', {
                    detail: { noticeId },
                } ) );
            }, 200 );
        } );
    };

    // Initialize on DOM ready.
    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }
} )();
```

---

## 3. Shared Components

### AJAX Handlers (PHP)

Add to `includes/ajax-handlers.php`:

```php
<?php
/**
 * AJAX handlers for wbcom-essential blocks.
 *
 * @package WBCOM_Essential
 */

/**
 * Handle activity favorite action.
 */
function wbcom_ajax_favorite_activity() {
    check_ajax_referer( 'wbcom-essential-nonce', 'nonce' );

    $activity_id = absint( $_POST['activity_id'] ?? 0 );

    if ( ! $activity_id || ! is_user_logged_in() ) {
        wp_send_json_error();
    }

    $result = bp_activity_add_user_favorite( $activity_id );

    wp_send_json_success( array( 'favorited' => $result ) );
}
add_action( 'wp_ajax_wbcom_favorite_activity', 'wbcom_ajax_favorite_activity' );

/**
 * Handle activity unfavorite action.
 */
function wbcom_ajax_unfavorite_activity() {
    check_ajax_referer( 'wbcom-essential-nonce', 'nonce' );

    $activity_id = absint( $_POST['activity_id'] ?? 0 );

    if ( ! $activity_id || ! is_user_logged_in() ) {
        wp_send_json_error();
    }

    $result = bp_activity_remove_user_favorite( $activity_id );

    wp_send_json_success( array( 'unfavorited' => $result ) );
}
add_action( 'wp_ajax_wbcom_unfavorite_activity', 'wbcom_ajax_unfavorite_activity' );

/**
 * Handle load more activities.
 */
function wbcom_ajax_load_more_activities() {
    check_ajax_referer( 'wbcom-essential-nonce', 'nonce' );

    $page     = absint( $_POST['page'] ?? 1 );
    $per_page = absint( $_POST['per_page'] ?? 5 );

    $activities = bp_activity_get( array(
        'per_page' => $per_page,
        'page'     => $page,
    ) );

    if ( empty( $activities['activities'] ) ) {
        wp_send_json_success( array(
            'html'    => '',
            'hasMore' => false,
        ) );
    }

    ob_start();
    foreach ( $activities['activities'] as $activity ) {
        // Render activity item (simplified).
        ?>
        <article class="wbcom-activity-item" data-activity-id="<?php echo esc_attr( $activity->id ); ?>">
            <div class="wbcom-activity-item__avatar">
                <?php echo bp_core_fetch_avatar( array( 'item_id' => $activity->user_id ) ); ?>
            </div>
            <div class="wbcom-activity-item__content">
                <header class="wbcom-activity-item__header">
                    <a href="<?php echo esc_url( bp_core_get_user_domain( $activity->user_id ) ); ?>" class="wbcom-activity-item__author">
                        <?php echo esc_html( bp_core_get_user_displayname( $activity->user_id ) ); ?>
                    </a>
                    <time class="wbcom-activity-item__time">
                        <?php echo esc_html( bp_core_time_since( $activity->date_recorded ) ); ?>
                    </time>
                </header>
                <?php if ( ! empty( $activity->content ) ) : ?>
                    <div class="wbcom-activity-item__body">
                        <?php echo wp_kses_post( $activity->content ); ?>
                    </div>
                <?php endif; ?>
            </div>
        </article>
        <?php
    }
    $html = ob_get_clean();

    $has_more = count( $activities['activities'] ) >= $per_page;

    wp_send_json_success( array(
        'html'    => $html,
        'hasMore' => $has_more,
    ) );
}
add_action( 'wp_ajax_wbcom_load_more_activities', 'wbcom_ajax_load_more_activities' );
add_action( 'wp_ajax_nopriv_wbcom_load_more_activities', 'wbcom_ajax_load_more_activities' );

/**
 * Handle notice dismissal.
 */
function wbcom_ajax_dismiss_notice() {
    check_ajax_referer( 'wbcom-essential-nonce', 'nonce' );

    $notice_id = absint( $_POST['notice_id'] ?? 0 );
    $user_id   = get_current_user_id();

    if ( ! $notice_id || ! $user_id ) {
        wp_send_json_error();
    }

    $dismissed = get_user_meta( $user_id, 'wbcom_dismissed_notices', true );
    if ( ! is_array( $dismissed ) ) {
        $dismissed = array();
    }

    if ( ! in_array( $notice_id, $dismissed, true ) ) {
        $dismissed[] = $notice_id;
        update_user_meta( $user_id, 'wbcom_dismissed_notices', $dismissed );
    }

    wp_send_json_success();
}
add_action( 'wp_ajax_wbcom_dismiss_notice', 'wbcom_ajax_dismiss_notice' );

/**
 * Localize script data for blocks.
 */
function wbcom_essential_localize_block_scripts() {
    wp_localize_script( 'wbcom-essential-activity-stream-view-script', 'wbcomEssential', array(
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'wbcom-essential-nonce' ),
        'i18n'    => array(
            'loading'  => __( 'Loading...', 'wbcom-essential' ),
            'loadMore' => __( 'Load More', 'wbcom-essential' ),
        ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'wbcom_essential_localize_block_scripts' );
```

---

## 4. Implementation Checklist

### Activity Stream Block

- [ ] Create directory structure `blocks/activity-stream/`
- [ ] Create `activity-stream.php` with block registration
- [ ] Create `src/block.json` with all attributes
- [ ] Create `src/index.js` entry point
- [ ] Create `src/edit.js` with all inspector controls
- [ ] Create `src/save.js` (returns null for SSR)
- [ ] Create `src/render.php` with activity query logic
- [ ] Create `src/style.scss` with all variants and modifiers
- [ ] Create `src/editor.scss` for editor-specific styles
- [ ] Create `src/view.js` for frontend interactivity
- [ ] Add AJAX handlers for favorite/unfavorite/load-more
- [ ] Test with different activity types
- [ ] Test responsive behavior
- [ ] Test with BuddyPress not active (graceful handling)
- [ ] Add to `wbcom-gutenberg.php` registration

### Sitewide Notice Block

- [ ] Create directory structure `blocks/sitewide-notice/`
- [ ] Create `sitewide-notice.php` with block registration
- [ ] Create `src/block.json` with all attributes
- [ ] Create `src/index.js` entry point
- [ ] Create `src/edit.js` with all inspector controls
- [ ] Create `src/save.js` (returns null for SSR)
- [ ] Create `src/render.php` with notice query logic
- [ ] Create `src/style.scss` with all variants and positions
- [ ] Create `src/editor.scss` for editor-specific styles
- [ ] Create `src/view.js` for dismiss functionality
- [ ] Add AJAX handler for persistent dismissal
- [ ] Test all display styles and variants
- [ ] Test fixed position with WP admin bar
- [ ] Test animation effects
- [ ] Test with no active notice (graceful handling)
- [ ] Add to `wbcom-gutenberg.php` registration

### Shared Tasks

- [ ] Create shared color-control component
- [ ] Add translations for all strings
- [ ] Update plugin version
- [ ] Build and test production assets
- [ ] Update Basecamp cards with progress
- [ ] Create documentation

---

## Basecamp Integration

When implementation is complete, update the following:

1. Create cards in **Ready for Development** column for each block
2. Move to **Ready for Testing** when complete
3. Link to this spec document in card description

---

## References

- [BuddyPress Activity API](https://developer.buddypress.org/bp-activity/)
- [BuddyPress Sitewide Notices](https://developer.buddypress.org/bp-messages/)
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [wbcom-essential members-grid block](../blocks/members-grid/) - Reference implementation
