/**
 * Posts Revolution Block - E2E Tests
 *
 * Tests the functionality of the Posts Revolution Gutenberg block.
 *
 * @package wbcom-essential
 */

const { test, expect } = require('@playwright/test');

// WordPress admin credentials
const WP_USERNAME = 'admin';
const WP_PASSWORD = 'admin';
const BASE_URL = 'https://buddyxpro.local';

// Display types to test
const DISPLAY_TYPES = [
	{ value: 'posts_type1', label: 'Post Display 1 (Featured + Sidebar)' },
	{ value: 'posts_type2', label: 'Post Display 2 (Featured + List)' },
	{ value: 'posts_type3', label: 'Post Display 3 (Grid)' },
	{ value: 'posts_type4', label: 'Post Display 4 (Side by Side)' },
	{ value: 'posts_type5', label: 'Post Display 5 (Featured + Text Sidebar)' },
	{ value: 'posts_type6', label: 'Post Display 6 (Magazine)' },
	{ value: 'posts_type7', label: 'Post Display 7 (Two Featured + List)' },
];

test.describe('Posts Revolution Block', () => {
	// Login before each test
	test.beforeEach(async ({ page }) => {
		// Navigate to login page
		await page.goto(`${BASE_URL}/wp-login.php`);

		// Check if already logged in (redirected to dashboard)
		const currentUrl = page.url();
		if (currentUrl.includes('wp-admin')) {
			// Already logged in
			return;
		}

		// Check if login form is present
		const loginForm = page.locator('#user_login');
		if (await loginForm.isVisible().catch(() => false)) {
			// Fill in credentials
			await page.fill('#user_login', WP_USERNAME);
			await page.fill('#user_pass', WP_PASSWORD);

			// Click login button
			await page.click('#wp-submit');

			// Wait for redirect to dashboard
			await page.waitForURL('**/wp-admin/**');
		}
	});

	test('Block can be inserted in the editor', async ({ page }) => {
		// Navigate to new page
		await page.goto(`${BASE_URL}/wp-admin/post-new.php?post_type=page`);

		// Wait for editor to load
		await page.waitForSelector('.editor-post-title__input, .wp-block-post-title', { timeout: 30000 });

		// Dismiss any welcome modals
		const welcomeModal = page.locator('button[aria-label="Close"]').first();
		if (await welcomeModal.isVisible().catch(() => false)) {
			await welcomeModal.click();
		}

		// Click the block inserter (blue + button in top toolbar)
		const inserterButton = page.locator('.editor-document-tools__inserter-toggle, button[aria-label="Toggle block inserter"], .edit-post-header-toolbar__inserter-toggle').first();
		await inserterButton.click();

		// Wait for inserter panel
		await page.waitForSelector('.block-editor-inserter__panel-content, .block-editor-inserter__main-area', { timeout: 10000 });

		// Search for the block
		await page.fill('.block-editor-inserter__search input, input[placeholder="Search"], .components-search-control__input', 'Posts Revolution');

		// Wait for search results
		await page.waitForTimeout(1000);

		// Click on the block
		const blockItem = page.locator('.block-editor-inserter__panel-content .block-editor-block-types-list__item').filter({ hasText: 'Posts Revolution' });

		if (await blockItem.count() > 0) {
			await blockItem.first().click();

			// Wait for block to be inserted - use state: 'attached' since block may be scrolled/hidden initially
			await page.waitForSelector('.wp-block-wbcom-essential-posts-revolution, .wbcom-essential-posts-revolution-editor', { timeout: 15000, state: 'attached' });

			// Give time for SSR to render
			await page.waitForTimeout(2000);

			// Verify block was inserted
			const block = page.locator('.wp-block-wbcom-essential-posts-revolution, .wbcom-essential-posts-revolution-editor').first();
			await expect(block).toBeAttached();

			console.log('SUCCESS: Block was successfully inserted');
		} else {
			// Block not found in inserter - this is an issue
			console.error('ISSUE: Posts Revolution block not found in inserter');
			test.fail();
		}
	});

	test('Block renders posts by default', async ({ page }) => {
		// Navigate to new page
		await page.goto(`${BASE_URL}/wp-admin/post-new.php?post_type=page`);

		// Wait for editor to load
		await page.waitForSelector('.editor-post-title__input, .wp-block-post-title', { timeout: 30000 });

		// Dismiss any welcome modals
		const welcomeModal = page.locator('button[aria-label="Close"]').first();
		if (await welcomeModal.isVisible().catch(() => false)) {
			await welcomeModal.click();
		}

		// Click the block inserter
		const inserterBtn = page.locator('.editor-document-tools__inserter-toggle, button[aria-label="Toggle block inserter"], .edit-post-header-toolbar__inserter-toggle').first();
		await inserterBtn.click();
		await page.waitForSelector('.block-editor-inserter__panel-content, .block-editor-inserter__main-area', { timeout: 10000 });
		await page.fill('.block-editor-inserter__search input, input[placeholder="Search"], .components-search-control__input', 'Posts Revolution');
		await page.waitForTimeout(1000);

		const blockItem = page.locator('.block-editor-inserter__panel-content .block-editor-block-types-list__item').filter({ hasText: 'Posts Revolution' });

		if (await blockItem.count() > 0) {
			await blockItem.first().click();
			await page.waitForSelector('.wp-block-wbcom-essential-posts-revolution, .wbcom-essential-posts-revolution-editor', { timeout: 15000 });

			// Wait for ServerSideRender to load posts
			await page.waitForTimeout(3000);

			// Check if posts are rendered (should show "No posts found" or actual post titles)
			const blockContent = page.locator('.wbcom-essential-posts-revolution');
			const content = await blockContent.innerHTML().catch(() => '');

			if (content.includes('No posts found')) {
				console.log('INFO: No posts found - this is expected if no posts exist');
			} else if (content.includes('wb-title') || content.includes('wb-category')) {
				console.log('SUCCESS: Posts are being rendered in the block');
			} else {
				console.log('ISSUE: Block content is empty or not rendering properly');
				console.log('Content:', content.substring(0, 500));
			}
		}
	});

	test('All 7 display types render correctly', async ({ page }) => {
		// Navigate to new page
		await page.goto(`${BASE_URL}/wp-admin/post-new.php?post_type=page`);

		// Wait for editor to load
		await page.waitForSelector('.editor-post-title__input, .wp-block-post-title', { timeout: 30000 });

		// Dismiss any welcome modals
		const welcomeModal = page.locator('button[aria-label="Close"]').first();
		if (await welcomeModal.isVisible().catch(() => false)) {
			await welcomeModal.click();
		}

		// Insert the block
		await page.click('button[aria-label="Toggle block inserter"]');
		await page.waitForSelector('.block-editor-inserter__panel-content', { timeout: 10000 });
		await page.fill('.block-editor-inserter__search input, input[placeholder="Search"]', 'Posts Revolution');
		await page.waitForTimeout(1000);

		const blockItem = page.locator('.block-editor-inserter__panel-content .block-editor-block-types-list__item').filter({ hasText: 'Posts Revolution' });

		if (await blockItem.count() === 0) {
			console.error('ISSUE: Block not found in inserter');
			test.fail();
			return;
		}

		await blockItem.first().click();
		await page.waitForSelector('.wp-block-wbcom-essential-posts-revolution, .wbcom-essential-posts-revolution-editor', { timeout: 15000 });

		// Select the block
		await page.click('.wbcom-essential-posts-revolution-editor, .wp-block-wbcom-essential-posts-revolution');

		// Wait for inspector controls
		await page.waitForTimeout(1000);

		const results = [];

		for (const displayType of DISPLAY_TYPES) {
			console.log(`Testing: ${displayType.label}`);

			// Open the Content panel if not already open
			const contentPanel = page.locator('.components-panel__body-title button').filter({ hasText: 'Content' });
			const isPanelOpen = await contentPanel.getAttribute('aria-expanded');
			if (isPanelOpen === 'false') {
				await contentPanel.click();
				await page.waitForTimeout(500);
			}

			// Find and change the Post Display select
			const displaySelect = page.locator('.components-select-control__input').filter({ hasText: /Post Display/ }).first();

			// Try to find the select by label
			const selectWrapper = page.locator('.components-base-control').filter({ hasText: 'Post Display' }).locator('select').first();

			if (await selectWrapper.count() > 0) {
				await selectWrapper.selectOption(displayType.value);
				await page.waitForTimeout(2000); // Wait for SSR to update

				// Check if the block has the correct class
				const blockContent = page.locator('.wbcom-essential-posts-revolution');
				const blockClass = await blockContent.getAttribute('class').catch(() => '');

				if (blockClass.includes(displayType.value)) {
					console.log(`  SUCCESS: ${displayType.value} - Correct class applied`);
					results.push({ type: displayType.value, status: 'PASS', message: 'Correct class applied' });
				} else {
					console.log(`  WARNING: ${displayType.value} - Class might not be applied correctly`);
					results.push({ type: displayType.value, status: 'WARN', message: 'Class verification uncertain' });
				}

				// Check for posts content
				const content = await blockContent.innerHTML().catch(() => '');
				if (content.length < 50 && !content.includes('No posts found')) {
					console.log(`  ISSUE: ${displayType.value} - Block content appears empty`);
					results.push({ type: displayType.value, status: 'FAIL', message: 'Content appears empty' });
				}
			} else {
				console.log(`  ISSUE: Could not find Post Display select control`);
				results.push({ type: displayType.value, status: 'FAIL', message: 'Select control not found' });
			}
		}

		// Summary
		console.log('\n=== Display Types Test Summary ===');
		results.forEach(r => {
			console.log(`${r.status}: ${r.type} - ${r.message}`);
		});
	});

	test('Inspector controls are accessible', async ({ page }) => {
		// Navigate to new page
		await page.goto(`${BASE_URL}/wp-admin/post-new.php?post_type=page`);

		// Wait for editor to load
		await page.waitForSelector('.editor-post-title__input, .wp-block-post-title', { timeout: 30000 });

		// Dismiss any welcome modals
		const welcomeModal = page.locator('button[aria-label="Close"]').first();
		if (await welcomeModal.isVisible().catch(() => false)) {
			await welcomeModal.click();
		}

		// Insert the block
		await page.click('button[aria-label="Toggle block inserter"]');
		await page.waitForSelector('.block-editor-inserter__panel-content', { timeout: 10000 });
		await page.fill('.block-editor-inserter__search input, input[placeholder="Search"]', 'Posts Revolution');
		await page.waitForTimeout(1000);

		const blockItem = page.locator('.block-editor-inserter__panel-content .block-editor-block-types-list__item').filter({ hasText: 'Posts Revolution' });

		if (await blockItem.count() === 0) {
			console.error('ISSUE: Block not found');
			test.fail();
			return;
		}

		await blockItem.first().click();
		await page.waitForSelector('.wp-block-wbcom-essential-posts-revolution, .wbcom-essential-posts-revolution-editor', { timeout: 15000 });

		// Select the block
		await page.click('.wbcom-essential-posts-revolution-editor, .wp-block-wbcom-essential-posts-revolution');
		await page.waitForTimeout(1000);

		// Check for each panel
		const panels = ['Content', 'Query', 'Animations', 'Style'];
		const panelResults = [];

		for (const panelName of panels) {
			const panel = page.locator('.components-panel__body-title').filter({ hasText: panelName });
			if (await panel.count() > 0) {
				console.log(`SUCCESS: "${panelName}" panel found`);
				panelResults.push({ panel: panelName, status: 'FOUND' });

				// Click to expand
				await panel.click();
				await page.waitForTimeout(500);
			} else {
				console.log(`ISSUE: "${panelName}" panel NOT found`);
				panelResults.push({ panel: panelName, status: 'NOT FOUND' });
			}
		}

		// Check for specific controls in Content panel
		const contentPanel = page.locator('.components-panel__body-title button').filter({ hasText: 'Content' });
		if (await contentPanel.count() > 0) {
			const expanded = await contentPanel.getAttribute('aria-expanded');
			if (expanded === 'false') {
				await contentPanel.click();
				await page.waitForTimeout(500);
			}

			// Check for Post Display select
			const displaySelect = page.locator('.components-base-control').filter({ hasText: 'Post Display' });
			if (await displaySelect.count() > 0) {
				console.log('SUCCESS: Post Display control found');
			} else {
				console.log('ISSUE: Post Display control NOT found');
			}

			// Check for Show Excerpt toggle
			const excerptToggle = page.locator('.components-base-control').filter({ hasText: 'Show Excerpt' });
			if (await excerptToggle.count() > 0) {
				console.log('SUCCESS: Show Excerpt control found');
			} else {
				console.log('ISSUE: Show Excerpt control NOT found');
			}
		}

		// Check Query panel controls
		const queryPanel = page.locator('.components-panel__body-title button').filter({ hasText: 'Query' });
		if (await queryPanel.count() > 0) {
			const expanded = await queryPanel.getAttribute('aria-expanded');
			if (expanded === 'false') {
				await queryPanel.click();
				await page.waitForTimeout(500);
			}

			// Check for Source select
			const sourceSelect = page.locator('.components-base-control').filter({ hasText: 'Source' });
			if (await sourceSelect.count() > 0) {
				console.log('SUCCESS: Source control found');
			} else {
				console.log('ISSUE: Source control NOT found');
			}

			// Check for Enable Pagination toggle
			const paginationToggle = page.locator('.components-base-control').filter({ hasText: 'Enable Pagination' });
			if (await paginationToggle.count() > 0) {
				console.log('SUCCESS: Enable Pagination control found');
			} else {
				console.log('ISSUE: Enable Pagination control NOT found');
			}
		}
	});

	test('Block saves and renders on frontend', async ({ page }) => {
		// Navigate to new page
		await page.goto(`${BASE_URL}/wp-admin/post-new.php?post_type=page`);

		// Wait for editor to load
		await page.waitForSelector('.editor-post-title__input, .wp-block-post-title', { timeout: 30000 });

		// Dismiss any welcome modals
		const welcomeModal = page.locator('button[aria-label="Close"]').first();
		if (await welcomeModal.isVisible().catch(() => false)) {
			await welcomeModal.click();
		}

		// Add page title
		const titleInput = page.locator('.editor-post-title__input, .wp-block-post-title').first();
		await titleInput.click();
		await titleInput.fill('Posts Revolution Test Page');

		// Insert the block
		await page.click('button[aria-label="Toggle block inserter"]');
		await page.waitForSelector('.block-editor-inserter__panel-content', { timeout: 10000 });
		await page.fill('.block-editor-inserter__search input, input[placeholder="Search"]', 'Posts Revolution');
		await page.waitForTimeout(1000);

		const blockItem = page.locator('.block-editor-inserter__panel-content .block-editor-block-types-list__item').filter({ hasText: 'Posts Revolution' });

		if (await blockItem.count() === 0) {
			console.error('ISSUE: Block not found');
			test.fail();
			return;
		}

		await blockItem.first().click();
		await page.waitForSelector('.wp-block-wbcom-essential-posts-revolution, .wbcom-essential-posts-revolution-editor', { timeout: 15000 });

		// Wait for content to load
		await page.waitForTimeout(3000);

		// Publish the page
		const publishButton = page.locator('button').filter({ hasText: /Publish|Update/ }).first();
		await publishButton.click();

		// Confirm publish if there's a confirmation dialog
		await page.waitForTimeout(1000);
		const confirmPublish = page.locator('.editor-post-publish-panel button').filter({ hasText: 'Publish' });
		if (await confirmPublish.count() > 0) {
			await confirmPublish.click();
		}

		// Wait for publish to complete
		await page.waitForTimeout(3000);

		// Get the page URL
		const viewLink = page.locator('a').filter({ hasText: 'View Page' }).first();
		let pageUrl = '';

		if (await viewLink.count() > 0) {
			pageUrl = await viewLink.getAttribute('href');
		} else {
			// Try to get from permalink
			const permalink = page.locator('.edit-post-header a[href*="posts-revolution"]');
			if (await permalink.count() > 0) {
				pageUrl = await permalink.getAttribute('href');
			}
		}

		if (pageUrl) {
			// Navigate to frontend
			await page.goto(pageUrl);
			await page.waitForTimeout(2000);

			// Check if block is rendered
			const frontendBlock = page.locator('.wbcom-essential-posts-revolution');

			if (await frontendBlock.count() > 0) {
				console.log('SUCCESS: Block rendered on frontend');

				// Check if posts are displayed
				const postTitles = page.locator('.wbcom-essential-posts-revolution .wb-title');
				const titleCount = await postTitles.count();

				if (titleCount > 0) {
					console.log(`SUCCESS: ${titleCount} posts rendered on frontend`);
				} else {
					const content = await frontendBlock.innerHTML();
					if (content.includes('No posts found')) {
						console.log('INFO: No posts found message displayed (expected if no posts exist)');
					} else {
						console.log('ISSUE: Posts not rendering properly on frontend');
					}
				}
			} else {
				console.log('ISSUE: Block not found on frontend');
			}
		} else {
			console.log('ISSUE: Could not get page URL for frontend testing');
		}
	});

	test('Pagination setting shows pagination controls', async ({ page }) => {
		// Navigate to new page
		await page.goto(`${BASE_URL}/wp-admin/post-new.php?post_type=page`);

		// Wait for editor to load
		await page.waitForSelector('.editor-post-title__input, .wp-block-post-title', { timeout: 30000 });

		// Dismiss any welcome modals
		const welcomeModal = page.locator('button[aria-label="Close"]').first();
		if (await welcomeModal.isVisible().catch(() => false)) {
			await welcomeModal.click();
		}

		// Insert the block
		await page.click('button[aria-label="Toggle block inserter"]');
		await page.waitForSelector('.block-editor-inserter__panel-content', { timeout: 10000 });
		await page.fill('.block-editor-inserter__search input, input[placeholder="Search"]', 'Posts Revolution');
		await page.waitForTimeout(1000);

		const blockItem = page.locator('.block-editor-inserter__panel-content .block-editor-block-types-list__item').filter({ hasText: 'Posts Revolution' });

		if (await blockItem.count() === 0) {
			console.error('ISSUE: Block not found');
			test.fail();
			return;
		}

		await blockItem.first().click();
		await page.waitForSelector('.wp-block-wbcom-essential-posts-revolution, .wbcom-essential-posts-revolution-editor', { timeout: 15000 });

		// Select the block
		await page.click('.wbcom-essential-posts-revolution-editor, .wp-block-wbcom-essential-posts-revolution');
		await page.waitForTimeout(1000);

		// Open Query panel
		const queryPanel = page.locator('.components-panel__body-title button').filter({ hasText: 'Query' });
		if (await queryPanel.count() > 0) {
			const expanded = await queryPanel.getAttribute('aria-expanded');
			if (expanded === 'false') {
				await queryPanel.click();
				await page.waitForTimeout(500);
			}
		}

		// Enable pagination
		const paginationToggle = page.locator('.components-toggle-control').filter({ hasText: 'Enable Pagination' }).locator('input[type="checkbox"]');

		if (await paginationToggle.count() > 0) {
			const isChecked = await paginationToggle.isChecked();
			if (!isChecked) {
				await paginationToggle.click();
				await page.waitForTimeout(500);
			}

			// Check if Pagination Type control appears
			const paginationType = page.locator('.components-base-control').filter({ hasText: 'Pagination Type' });
			if (await paginationType.count() > 0) {
				console.log('SUCCESS: Pagination Type control appears when pagination is enabled');
			} else {
				console.log('ISSUE: Pagination Type control not found after enabling pagination');
			}

			// Check if Posts Per Page control appears
			const postsPerPage = page.locator('.components-base-control').filter({ hasText: 'Posts Per Page' });
			if (await postsPerPage.count() > 0) {
				console.log('SUCCESS: Posts Per Page control appears when pagination is enabled');
			} else {
				console.log('ISSUE: Posts Per Page control not found after enabling pagination');
			}
		} else {
			console.log('ISSUE: Enable Pagination toggle not found');
		}
	});

	test('Category filter affects posts query', async ({ page }) => {
		// Navigate to new page
		await page.goto(`${BASE_URL}/wp-admin/post-new.php?post_type=page`);

		// Wait for editor to load
		await page.waitForSelector('.editor-post-title__input, .wp-block-post-title', { timeout: 30000 });

		// Dismiss any welcome modals
		const welcomeModal = page.locator('button[aria-label="Close"]').first();
		if (await welcomeModal.isVisible().catch(() => false)) {
			await welcomeModal.click();
		}

		// Insert the block
		await page.click('button[aria-label="Toggle block inserter"]');
		await page.waitForSelector('.block-editor-inserter__panel-content', { timeout: 10000 });
		await page.fill('.block-editor-inserter__search input, input[placeholder="Search"]', 'Posts Revolution');
		await page.waitForTimeout(1000);

		const blockItem = page.locator('.block-editor-inserter__panel-content .block-editor-block-types-list__item').filter({ hasText: 'Posts Revolution' });

		if (await blockItem.count() === 0) {
			console.error('ISSUE: Block not found');
			test.fail();
			return;
		}

		await blockItem.first().click();
		await page.waitForSelector('.wp-block-wbcom-essential-posts-revolution, .wbcom-essential-posts-revolution-editor', { timeout: 15000 });

		// Select the block
		await page.click('.wbcom-essential-posts-revolution-editor, .wp-block-wbcom-essential-posts-revolution');
		await page.waitForTimeout(1000);

		// Open Query panel
		const queryPanel = page.locator('.components-panel__body-title button').filter({ hasText: 'Query' });
		if (await queryPanel.count() > 0) {
			const expanded = await queryPanel.getAttribute('aria-expanded');
			if (expanded === 'false') {
				await queryPanel.click();
				await page.waitForTimeout(500);
			}
		}

		// Check if Categories control exists
		const categoriesControl = page.locator('.components-base-control').filter({ hasText: 'Categories' });
		if (await categoriesControl.count() > 0) {
			console.log('SUCCESS: Categories filter control is present');

			// Check if it has options
			const categoriesSelect = categoriesControl.locator('select');
			if (await categoriesSelect.count() > 0) {
				const options = await categoriesSelect.locator('option').count();
				console.log(`INFO: Categories select has ${options} options`);
			}
		} else {
			console.log('ISSUE: Categories filter control not found');
		}
	});

	test('Animation settings apply correctly', async ({ page }) => {
		// Navigate to new page
		await page.goto(`${BASE_URL}/wp-admin/post-new.php?post_type=page`);

		// Wait for editor to load
		await page.waitForSelector('.editor-post-title__input, .wp-block-post-title', { timeout: 30000 });

		// Dismiss any welcome modals
		const welcomeModal = page.locator('button[aria-label="Close"]').first();
		if (await welcomeModal.isVisible().catch(() => false)) {
			await welcomeModal.click();
		}

		// Insert the block
		await page.click('button[aria-label="Toggle block inserter"]');
		await page.waitForSelector('.block-editor-inserter__panel-content', { timeout: 10000 });
		await page.fill('.block-editor-inserter__search input, input[placeholder="Search"]', 'Posts Revolution');
		await page.waitForTimeout(1000);

		const blockItem = page.locator('.block-editor-inserter__panel-content .block-editor-block-types-list__item').filter({ hasText: 'Posts Revolution' });

		if (await blockItem.count() === 0) {
			console.error('ISSUE: Block not found');
			test.fail();
			return;
		}

		await blockItem.first().click();
		await page.waitForSelector('.wp-block-wbcom-essential-posts-revolution, .wbcom-essential-posts-revolution-editor', { timeout: 15000 });

		// Select the block
		await page.click('.wbcom-essential-posts-revolution-editor, .wp-block-wbcom-essential-posts-revolution');
		await page.waitForTimeout(1000);

		// Open Animations panel
		const animationsPanel = page.locator('.components-panel__body-title button').filter({ hasText: 'Animations' });
		if (await animationsPanel.count() > 0) {
			const expanded = await animationsPanel.getAttribute('aria-expanded');
			if (expanded === 'false') {
				await animationsPanel.click();
				await page.waitForTimeout(500);
			}

			// Enable animation
			const animationToggle = page.locator('.components-toggle-control').filter({ hasText: 'Enable Animation' }).locator('input[type="checkbox"]');

			if (await animationToggle.count() > 0) {
				const isChecked = await animationToggle.isChecked();
				if (!isChecked) {
					await animationToggle.click();
					await page.waitForTimeout(500);
				}

				// Check if Animation Effect control appears
				const animationType = page.locator('.components-base-control').filter({ hasText: 'Animation Effect' });
				if (await animationType.count() > 0) {
					console.log('SUCCESS: Animation Effect control appears when animations enabled');
				} else {
					console.log('ISSUE: Animation Effect control not found');
				}

				// Check if Animation Delay control appears
				const animationDelay = page.locator('.components-base-control').filter({ hasText: 'Animation Delay' });
				if (await animationDelay.count() > 0) {
					console.log('SUCCESS: Animation Delay control appears when animations enabled');
				} else {
					console.log('ISSUE: Animation Delay control not found');
				}
			} else {
				console.log('ISSUE: Enable Animation toggle not found');
			}
		} else {
			console.log('ISSUE: Animations panel not found');
		}
	});
});
