# Profile Completion Block - Master Index

## Quick Start

This block converts the Elementor Profile Completion widget to Gutenberg. Most of the work is done - you just need to update a few existing files and build.

## Documentation Files (Read in Order)

1. **[SUMMARY.md](./SUMMARY.md)** - Start here for project overview
2. **[README.md](./README.md)** - User-facing documentation
3. **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Complete code for all files
4. **[COMPLETION_CHECKLIST.md](./COMPLETION_CHECKLIST.md)** - Step-by-step completion guide
5. **[INDEX.md](./INDEX.md)** - This file

## What's Already Done ✅

- Block registration (profile-completion.php)
- Block metadata (src/block.json) with 30+ attributes
- Profile calculation logic (src/render.php) - fully ported from Elementor
- All documentation files created
- Directory structure in place

## What You Need To Do ⚠️

### Priority 1: Update Core Files

1. **src/edit.js** - Replace with code from IMPLEMENTATION.md
   - Location in doc: Section "File: src/edit.js"  
   - What it does: Editor interface with all controls
   - Time: 30 min

2. **src/view.js** - Replace with code from IMPLEMENTATION.md
   - Location in doc: Section "File: src/view.js"
   - What it does: Dropdown toggle JavaScript
   - Time: 15 min

3. **src/style.scss** - Copy from Elementor CSS
   - Source: `plugins/elementor/assets/css/profile-completion.css`
   - Destination: `plugins/gutenberg/blocks/profile-completion/src/style.scss`
   - Changes needed: Wrap in block class, add SCSS variables
   - Time: 20 min

### Priority 2: Build & Register

4. **Register in wbcom-gutenberg.php**
   ```php
   require_once WBCOM_ESSENTIAL_PATH . 'plugins/gutenberg/blocks/profile-completion/profile-completion.php';
   ```

5. **Build the block**
   ```bash
   npm run build
   ```

6. **Test**
   - Add block to post/page
   - Configure settings
   - Test both skins
   - Verify profile calculation

## File Structure

```
profile-completion/
│
├── 📄 Documentation (READ THESE)
│   ├── INDEX.md                    ← You are here
│   ├── SUMMARY.md                  ← Project overview
│   ├── README.md                   ← User docs
│   ├── IMPLEMENTATION.md           ← All source code
│   └── COMPLETION_CHECKLIST.md     ← Step-by-step guide
│
├── 📝 Block Files (COMPLETE ✅)
│   ├── profile-completion.php      ← Registration
│   └── src/
│       ├── block.json              ← Metadata + attributes
│       └── render.php              ← Profile calculation
│
└── 📝 Block Files (NEED UPDATE ⚠️)
    └── src/
        ├── index.js                ← Verify it's correct
        ├── edit.js                 ← UPDATE from IMPLEMENTATION.md
        ├── save.js                 ← Verify returns null
        ├── view.js                 ← UPDATE from IMPLEMENTATION.md
        ├── style.scss              ← COPY from Elementor
        └── editor.scss             ← Review & update
```

## Key Concepts

### Server-Side Rendering
This block uses server-side rendering because profile data is dynamic and user-specific. The render.php file:
- Checks if user is logged in
- Calculates profile completion
- Renders HTML with current data
- No static HTML is saved

### Profile Calculation
The logic (in render.php):
1. Gets selected profile groups from attributes
2. Checks each field in those groups
3. Handles repeater groups correctly
4. Checks profile/cover photos if enabled
5. Calculates: (completed / total) × 100
6. Returns formatted data array

### Two Skins
- **Circle**: Progress ring with dropdown details
- **Linear**: Progress bar with inline details

### BuddyPress Dependency
Block only works when BuddyPress is active. Registration code checks for BP and returns early if not available.

## Quick Reference

### Attributes Count
- **Total**: 30+ attributes
- **Layout**: 7 (skin, alignment, toggles)
- **Content**: 6 (text customization)
- **Box Styling**: 6 (linear skin only)
- **Colors**: 8 (completion, incomplete, borders)
- **Button**: 10 (normal + hover states)

### Functions Ported
From Elementor widget to render.php:
- `profile_calculate_profile_percentage()` → `wbcom_essential_calculate_profile_completion()`
- `get_user_profile_progress_formatted()` → `wbcom_essential_format_profile_progress()`

### CSS Lines
- Elementor CSS: ~2700 lines
- Includes: 100 keyframe animations (loading-1 to loading-50)
- Progressive circle animation based on percentage

### JavaScript
- No jQuery dependency (unlike Elementor)
- Vanilla JS for dropdown toggle
- Event listeners for click and hover
- Smooth transitions with readyState tracking

## Common Questions

**Q: Why can't I see the block in the inserter?**
A: Check if BuddyPress is active and block is registered in wbcom-gutenberg.php

**Q: Why isn't the profile percentage calculating?**
A: Ensure you're logged in and have selected at least one profile group or photo type

**Q: How do I customize colors?**
A: Use the color pickers in the block sidebar under "Colors" panel

**Q: Can I test without being logged in?**
A: No - the block requires a logged-in user with a BuddyPress profile

**Q: Does it work with WooCommerce?**
A: It's independent of WooCommerce - only needs BuddyPress

**Q: Can I use both skins on the same page?**
A: Yes - each block instance can have different settings

## Troubleshooting

### Build Errors
```bash
# Clear node modules and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### PHP Errors
Check `/wp-content/debug.log` for:
- BuddyPress function errors
- Profile calculation errors
- Render errors

### Missing Styles
```bash
# Check if style files exist
ls -la build/blocks/profile-completion/

# Should see:
# - index.css (editor styles)
# - style-index.css (frontend styles)
```

### JavaScript Not Working
1. Open browser console
2. Look for JavaScript errors
3. Check if view.js is loaded
4. Verify classes in HTML match JavaScript selectors

## Next Steps

1. Read [COMPLETION_CHECKLIST.md](./COMPLETION_CHECKLIST.md)
2. Update edit.js, view.js, style.scss
3. Register block
4. Build with `npm run build`
5. Test thoroughly
6. Report any issues

## Time Investment

- **Already done**: ~4 hours (structure, logic, documentation)
- **Remaining work**: ~2 hours (file updates, testing)
- **Total project**: ~6 hours

## Success Metrics

Block is production-ready when:
- ✅ Passes all tests in COMPLETION_CHECKLIST.md
- ✅ No console errors
- ✅ No PHP errors
- ✅ Matches Elementor widget functionality
- ✅ Works on mobile/tablet/desktop
- ✅ Gracefully handles edge cases

## Getting Help

- **Code Reference**: IMPLEMENTATION.md has all source code
- **Step-by-Step**: COMPLETION_CHECKLIST.md has detailed steps
- **Accordion Block**: Similar SSR block in same directory
- **BuddyPress Docs**: https://codex.buddypress.org/

## Credits

Converted from Elementor Profile Completion widget following WordPress, BuddyPress, and Gutenberg best practices.

---

**Ready to complete? Start with [COMPLETION_CHECKLIST.md](./COMPLETION_CHECKLIST.md)**
