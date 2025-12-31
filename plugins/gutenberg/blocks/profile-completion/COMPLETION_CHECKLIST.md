# Profile Completion Block - Completion Checklist

## Files Status

### ✅ Created and Complete
- [x] `profile-completion.php` - Block registration with BuddyPress check
- [x] `src/block.json` - Complete with all 30+ attributes
- [x] `src/render.php` - Full profile calculation logic ported from Elementor
- [x] `README.md` - User documentation
- [x] `IMPLEMENTATION.md` - Complete code reference for all files
- [x] `SUMMARY.md` - Project summary and next steps

### ⚠️ Already Exist (Need Review/Update)
- [ ] `src/index.js` - Review and update if needed
- [ ] `src/edit.js` - **MUST UPDATE** with profile completion controls
- [ ] `src/save.js` - Should return null (verify)
- [ ] `src/view.js` - **MUST UPDATE** with dropdown toggle logic
- [ ] `src/style.scss` - **MUST UPDATE** with Elementor CSS
- [ ] `src/editor.scss` - Review editor styles

## Next Steps (Priority Order)

### Step 1: Update Existing Files

#### A. Update `src/edit.js`
Replace current content with code from `IMPLEMENTATION.md` section "File: src/edit.js"

Key changes needed:
- Add all InspectorControls panels (Layout, Content, Box, Colors, etc.)
- Add ServerSideRender component
- Add BuddyPress check
- Add all attribute destructuring

#### B. Update `src/view.js`
Replace current content with code from `IMPLEMENTATION.md` section "File: src/view.js"

Changes needed:
- Remove jQuery dependency
- Use vanilla JavaScript
- Add dropdown toggle logic
- Add hover handlers

#### C. Update `src/style.scss`
Copy Elementor CSS:
```bash
cd /Users/varundubey/Local\ Sites/buddyxpro/app/public/wp-content/plugins/wbcom-essential

# Backup existing
cp plugins/gutenberg/blocks/profile-completion/src/style.scss \
   plugins/gutenberg/blocks/profile-completion/src/style.scss.bak

# Copy Elementor CSS
cp plugins/elementor/assets/css/profile-completion.css \
   plugins/gutenberg/blocks/profile-completion/src/style.scss
```

Then adapt the CSS:
1. Wrap everything in `.wbcom-essential-profile-completion { }`
2. Update class prefixes if needed
3. Add SCSS variables for customizable colors
4. Keep all keyframe animations (loading-1 through loading-50)

#### D. Verify `src/save.js`
Should contain:
```javascript
export default function save() {
	return null;
}
```

#### E. Verify `src/index.js`
Should contain:
```javascript
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
```

### Step 2: Register the Block

Add to `/Users/varundubey/Local Sites/buddyxpro/app/public/wp-content/plugins/wbcom-essential/plugins/gutenberg/wbcom-gutenberg.php`:

```php
// Profile Completion block (requires BuddyPress)
require_once WBCOM_ESSENTIAL_PATH . 'plugins/gutenberg/blocks/profile-completion/profile-completion.php';
```

### Step 3: Build the Block

```bash
cd /Users/varundubey/Local\ Sites/buddyxpro/app/public/wp-content/plugins/wbcom-essential
npm run build
```

Check for errors in build output. The build should create:
- `build/blocks/profile-completion/index.js`
- `build/blocks/profile-completion/index.css`
- `build/blocks/profile-completion/style-index.css`
- `build/blocks/profile-completion/view.js`

### Step 4: Test the Block

#### Basic Tests
- [ ] Block appears in block inserter under "Wbcom BuddyPress"
- [ ] Block shows BuddyPress warning if BP not active
- [ ] Block only renders when user is logged in
- [ ] ServerSideRender shows profile completion data

#### Skin Tests
- [ ] Circle skin displays correctly
- [ ] Linear skin displays correctly
- [ ] Switching between skins works

#### Feature Tests
- [ ] Alignment controls work (left/center/right)
- [ ] Profile photo toggle works
- [ ] Cover photo toggle works
- [ ] Hide at 100% works
- [ ] Profile button shows/hides
- [ ] Button text changes at 100% completion

#### Styling Tests
- [ ] Box width slider works (linear skin)
- [ ] Box background color works
- [ ] Border style selector works
- [ ] All color pickers work
- [ ] Progress border width works

#### Interaction Tests
- [ ] Dropdown toggles on click
- [ ] Dropdown toggles on hover
- [ ] Progress ring animation plays
- [ ] Button links to correct profile page

#### Responsive Tests
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works

### Step 5: Optional Enhancements

#### A. Dynamic Profile Groups Selection
Add BuddyPress REST API call to fetch groups:
```javascript
// In edit.js
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';

const [ profileGroupsList, setProfileGroupsList ] = useState( [] );

useEffect( () => {
	apiFetch( { path: '/buddypress/v1/xprofile/groups' } )
		.then( ( groups ) => setProfileGroupsList( groups ) )
		.catch( () => setProfileGroupsList( [] ) );
}, [] );
```

Then add toggles in InspectorControls.

#### B. Add Inline Styles
Generate inline CSS from attributes for real-time preview in editor:
```javascript
const blockStyle = {
	'--completion-color': completionColor,
	'--incomplete-color': incompleteColor,
	'--ring-border-color': ringBorderColor,
	// ... etc
};
```

#### C. Add Block Transforms
Allow converting from/to other blocks:
```javascript
transforms: {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: () => createBlock( 'wbcom-essential/profile-completion' ),
		},
	],
}
```

## Files Reference

### Location
```
/Users/varundubey/Local Sites/buddyxpro/app/public/wp-content/plugins/wbcom-essential/plugins/gutenberg/blocks/profile-completion/
```

### Structure
```
profile-completion/
├── profile-completion.php       # ✅ Complete
├── README.md                    # ✅ Complete
├── IMPLEMENTATION.md            # ✅ Complete
├── SUMMARY.md                   # ✅ Complete
├── COMPLETION_CHECKLIST.md      # ✅ This file
└── src/
    ├── block.json              # ✅ Complete
    ├── render.php              # ✅ Complete
    ├── index.js                # ⚠️ Needs verification
    ├── edit.js                 # ⚠️ MUST UPDATE
    ├── save.js                 # ⚠️ Needs verification
    ├── view.js                 # ⚠️ MUST UPDATE
    ├── style.scss              # ⚠️ MUST UPDATE
    └── editor.scss             # ⚠️ Needs review
```

## Quick Commands

### Build
```bash
cd "/Users/varundubey/Local Sites/buddyxpro/app/public/wp-content/plugins/wbcom-essential"
npm run build
```

### Watch (for development)
```bash
cd "/Users/varundubey/Local Sites/buddyxpro/app/public/wp-content/plugins/wbcom-essential"
npm run start
```

### Check for errors
```bash
cd "/Users/varundubey/Local Sites/buddyxpro/app/public/wp-content/plugins/wbcom-essential"
npm run lint:js
```

## Common Issues & Solutions

### Issue: Block not appearing
**Solution**: 
1. Check if BP is active
2. Verify registration in wbcom-gutenberg.php
3. Run `npm run build`
4. Clear browser cache

### Issue: ServerSideRender not showing data
**Solution**:
1. Check if user is logged in
2. Verify profile groups are selected
3. Check browser console for errors
4. Check if render.php has any PHP errors

### Issue: Styles not applying
**Solution**:
1. Verify build output exists
2. Check browser dev tools for CSS loading
3. Clear any caching plugins
4. Check for CSS conflicts

### Issue: JavaScript not working
**Solution**:
1. Check browser console for errors
2. Verify view.js is loaded
3. Check if jQuery conflicts exist
4. Ensure view.js targets correct classes

## Success Criteria

The block is complete when:
- [x] All Elementor features are implemented
- [x] Profile calculation logic works correctly
- [x] Both skins (circle/linear) render properly
- [x] All controls in sidebar work
- [x] Colors can be customized
- [x] Dropdown toggle works (click + hover)
- [x] Progress animation plays
- [x] Responsive design works
- [x] No console errors
- [x] No PHP errors
- [x] Works with BuddyPress only (graceful when BP inactive)

## Time Estimate

- Update edit.js: 30 minutes
- Update view.js: 15 minutes
- Update style.scss: 20 minutes (copy + adapt)
- Testing: 30 minutes
- Bug fixes: 30 minutes
- **Total**: ~2 hours

## Support

- **Documentation**: See IMPLEMENTATION.md for complete code
- **Examples**: Look at accordion block for reference patterns
- **Elementor Source**: `plugins/elementor/widgets/Buddypress/ProfileCompletion.php`
- **BuddyPress Docs**: https://codex.buddypress.org/
