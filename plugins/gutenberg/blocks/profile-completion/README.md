# Profile Completion Block

BuddyPress Profile Completion block showing member profile progress with two skin styles (circle and linear).

## Features Implemented

### Layout Options
- Skin style: Circle or Linear
- Alignment: Left, Center, Right
- Profile field group toggles (dynamically loaded from BuddyPress)
- Profile photo and cover photo toggles
- Hide widget at 100% completion option

### Content Options
- Heading text (linear skin only)
- Completion text
- Profile complete button with customizable text
- Edit profile button text (shown at 100%)

### Styling Options

#### Box Styling (Linear Skin)
- Width (20-100%)
- Background color
- Border type (solid, dashed, dotted, double, none)
- Border width
- Border color
- Border radius

#### Progress Graph
- Spacing (margin/padding)
- Border width for progress bar/ring
- Typography controls for heading, value, and info text
- Colors for completion, incomplete, progress border, number, and text

#### Details Dropdown
- Show/hide header (circle skin)
- Show/hide completion icon
- Show/hide completion status
- Box shadow
- Typography

#### Button Styling
- Normal and hover states for:
  - Color
  - Background color
  - Border color
- Padding
- Border width and radius
- Spacing

## Files Structure

```
profile-completion/
├── profile-completion.php  # Block registration (requires BuddyPress)
├── src/
│   ├── block.json          # Block metadata and attributes
│   ├── index.js            # Block registration
│   ├── edit.js             # Editor component
│   ├── save.js             # Save component (null for SSR)
│   ├── render.php          # Server-side render with profile calculation
│   ├── view.js             # Frontend JavaScript (dropdown toggle)
│   ├── style.scss          # Frontend + Editor styles
│   └── editor.scss         # Editor-only styles
└── README.md               # This file
```

## Profile Calculation Logic

The block calculates profile completion based on:

1. **Profile Fields**: Loops through all selected BuddyPress xProfile field groups
2. **Profile Photo**: Checks if avatar is uploaded (if enabled)
3. **Cover Photo**: Checks if cover image is uploaded (if enabled)
4. **Repeater Groups**: Handles repeater field groups correctly (only counts first set)

Formula: `(completed_fields / total_fields) * 100`

## Dependencies

- **Required**: BuddyPress plugin active
- **Functions Used**:
  - `bp_xprofile_get_groups()`
  - `bp_get_user_has_avatar()`
  - `bp_attachments_get_user_has_cover_image()`
  - `bp_disable_avatar_uploads()`
  - `bp_disable_cover_image_uploads()`
  - `bp_loggedin_user_domain()`
  - `bp_get_profile_slug()`

## Usage

Block only displays when:
- User is logged in
- At least one profile group OR photo type is selected
- Profile completion data is available

## Browser Compatibility

Circle progress uses CSS animations with vendor prefixes:
- `-webkit-` prefixes for Safari/Chrome
- Standard prefixes for modern browsers
- Keyframe animations for 0-100% progress

## Notes

- Block uses server-side rendering for real-time profile data
- JavaScript handles dropdown toggle and progress ring animation
- Fully responsive with mobile-specific styles
- RTL support included
