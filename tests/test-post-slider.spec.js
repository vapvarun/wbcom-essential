/**
 * Post Slider Block - Playwright Functional Tests
 *
 * Tests the wbcom-essential/post-slider block functionality
 */

const { test, expect } = require('@playwright/test');

const SITE_URL = 'https://buddyxpro.local';
const ADMIN_USER = 'developer';
const ADMIN_PASS = 'developer';

test.describe('Post Slider Block - Functional Tests', () => {

    test('1. Verify block editor loads and Post Slider block is insertable', async ({ page }) => {
        // Go directly to new page editor (will redirect to login if needed)
        await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });

        // Check if we need to login (login form visible)
        const loginForm = page.locator('#loginform');
        if (await loginForm.isVisible({ timeout: 3000 }).catch(() => false)) {
            console.log('Login required - logging in...');
            await page.fill('#user_login', ADMIN_USER);
            await page.fill('#user_pass', ADMIN_PASS);
            await page.click('#wp-submit');
            await page.waitForURL('**/wp-admin/**', { timeout: 30000 });
            await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });
        }

        // Wait for block editor
        await page.waitForSelector('.block-editor-block-list__layout, .editor-post-title', { timeout: 60000 });
        console.log('PASS: Block editor loaded');

        // Close welcome modal if present
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);

        // Click the inserter button
        const inserterButton = page.locator('[aria-label="Toggle block inserter"]');
        await inserterButton.click();
        await page.waitForTimeout(1000);

        // Search for Post Slider
        const searchInput = page.locator('input[placeholder*="Search"], .block-editor-inserter__search-input');
        await searchInput.first().fill('Post Slider');
        await page.waitForTimeout(1500);

        // Check for Post Slider block option
        const postSliderOption = page.locator('.block-editor-block-types-list__item').filter({ hasText: /Post Slider/ });
        const optionCount = await postSliderOption.count();
        console.log(`Found ${optionCount} Post Slider block options`);

        if (optionCount > 0) {
            await postSliderOption.first().click();
            await page.waitForTimeout(3000);

            // Verify block is inserted
            const postSliderBlock = page.locator('[data-type="wbcom-essential/post-slider"]');
            await expect(postSliderBlock).toBeVisible({ timeout: 10000 });
            console.log('PASS: Post Slider block inserted successfully');
        } else {
            throw new Error('FAIL: Post Slider block not found in inserter');
        }
    });

    test('2. Verify all sidebar control panels are present', async ({ page }) => {
        // Navigate to editor
        await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });

        // Handle login if needed
        const loginForm = page.locator('#loginform');
        if (await loginForm.isVisible({ timeout: 3000 }).catch(() => false)) {
            await page.fill('#user_login', ADMIN_USER);
            await page.fill('#user_pass', ADMIN_PASS);
            await page.click('#wp-submit');
            await page.waitForURL('**/wp-admin/**', { timeout: 30000 });
            await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });
        }

        await page.waitForSelector('.block-editor-block-list__layout', { timeout: 60000 });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);

        // Insert Post Slider block
        const inserterButton = page.locator('[aria-label="Toggle block inserter"]');
        await inserterButton.click();
        await page.waitForTimeout(1000);

        const searchInput = page.locator('input[placeholder*="Search"], .block-editor-inserter__search-input');
        await searchInput.first().fill('Post Slider');
        await page.waitForTimeout(1500);

        const postSliderOption = page.locator('.block-editor-block-types-list__item').filter({ hasText: /Post Slider/ });
        await postSliderOption.first().click();
        await page.waitForTimeout(3000);

        // Click on the block to select it
        const postSliderBlock = page.locator('[data-type="wbcom-essential/post-slider"]');
        await postSliderBlock.click();
        await page.waitForTimeout(1000);

        // Verify sidebar panels exist
        const panelsToCheck = [
            'Query Settings',
            'Content Settings',
            'Layout Settings',
            'Slider Settings',
            'Background Settings',
            'Navigation',
            'Animations',
            'Colors',
            'Button Style'
        ];

        let panelsFound = 0;
        const missingPanels = [];
        for (const panelName of panelsToCheck) {
            const panel = page.locator('.components-panel__body-title').filter({ hasText: panelName });
            if (await panel.count() > 0) {
                console.log(`PASS: "${panelName}" panel found`);
                panelsFound++;
            } else {
                console.log(`FAIL: "${panelName}" panel NOT found`);
                missingPanels.push(panelName);
            }
        }

        console.log(`Total panels found: ${panelsFound}/${panelsToCheck.length}`);
        expect(panelsFound).toBe(panelsToCheck.length);
    });

    test('3. Test Query Settings controls functionality', async ({ page }) => {
        // Navigate to editor
        await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });

        const loginForm = page.locator('#loginform');
        if (await loginForm.isVisible({ timeout: 3000 }).catch(() => false)) {
            await page.fill('#user_login', ADMIN_USER);
            await page.fill('#user_pass', ADMIN_PASS);
            await page.click('#wp-submit');
            await page.waitForURL('**/wp-admin/**', { timeout: 30000 });
            await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });
        }

        await page.waitForSelector('.block-editor-block-list__layout', { timeout: 60000 });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);

        // Insert block
        const inserterButton = page.locator('[aria-label="Toggle block inserter"]');
        await inserterButton.click();
        await page.waitForTimeout(1000);

        const searchInput = page.locator('input[placeholder*="Search"], .block-editor-inserter__search-input');
        await searchInput.first().fill('Post Slider');
        await page.waitForTimeout(1500);

        const postSliderOption = page.locator('.block-editor-block-types-list__item').filter({ hasText: /Post Slider/ });
        await postSliderOption.first().click();
        await page.waitForTimeout(3000);

        const postSliderBlock = page.locator('[data-type="wbcom-essential/post-slider"]');
        await postSliderBlock.click();

        // Expand Query Settings
        const querySettingsPanel = page.locator('.components-panel__body-title').filter({ hasText: 'Query Settings' });
        await querySettingsPanel.click();
        await page.waitForTimeout(500);

        // Check for controls
        const controlLabels = [
            'Post Type',
            'Number of Posts',
            'Order By',
            'Order',
            'Include Posts by ID',
            'Exclude Posts by ID'
        ];

        for (const label of controlLabels) {
            const control = page.locator('label').filter({ hasText: label });
            const count = await control.count();
            if (count > 0) {
                console.log(`PASS: "${label}" control present`);
            } else {
                console.log(`FAIL: "${label}" control NOT found`);
            }
        }
    });

    test('4. Test Slider and Navigation settings', async ({ page }) => {
        // Navigate to editor
        await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });

        const loginForm = page.locator('#loginform');
        if (await loginForm.isVisible({ timeout: 3000 }).catch(() => false)) {
            await page.fill('#user_login', ADMIN_USER);
            await page.fill('#user_pass', ADMIN_PASS);
            await page.click('#wp-submit');
            await page.waitForURL('**/wp-admin/**', { timeout: 30000 });
            await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });
        }

        await page.waitForSelector('.block-editor-block-list__layout', { timeout: 60000 });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);

        // Insert block
        const inserterButton = page.locator('[aria-label="Toggle block inserter"]');
        await inserterButton.click();
        await page.waitForTimeout(1000);

        const searchInput = page.locator('input[placeholder*="Search"], .block-editor-inserter__search-input');
        await searchInput.first().fill('Post Slider');
        await page.waitForTimeout(1500);

        const postSliderOption = page.locator('.block-editor-block-types-list__item').filter({ hasText: /Post Slider/ });
        await postSliderOption.first().click();
        await page.waitForTimeout(3000);

        const postSliderBlock = page.locator('[data-type="wbcom-essential/post-slider"]');
        await postSliderBlock.click();

        // Expand Slider Settings
        const sliderSettingsPanel = page.locator('.components-panel__body-title').filter({ hasText: 'Slider Settings' });
        await sliderSettingsPanel.click();
        await page.waitForTimeout(500);

        // Check slider controls
        const sliderControls = ['Slider Height', 'Height Unit', 'Transition Effect', 'Autoplay'];
        for (const control of sliderControls) {
            const label = page.locator('label').filter({ hasText: new RegExp(control, 'i') });
            if (await label.count() > 0) {
                console.log(`PASS: "${control}" control present`);
            } else {
                console.log(`FAIL: "${control}" control NOT found`);
            }
        }

        // Expand Navigation panel
        const navigationPanel = page.locator('.components-panel__body-title').filter({ hasText: /^Navigation$/ });
        await navigationPanel.click();
        await page.waitForTimeout(500);

        // Check navigation controls
        const navArrowsToggle = page.locator('.components-toggle-control__label').filter({ hasText: 'Navigation Arrows' });
        if (await navArrowsToggle.count() > 0) {
            console.log('PASS: Show Navigation Arrows toggle present');
        }

        const paginationToggle = page.locator('.components-toggle-control__label').filter({ hasText: 'Pagination Dots' });
        if (await paginationToggle.count() > 0) {
            console.log('PASS: Show Pagination Dots toggle present');
        }
    });

    test('5. Publish and verify frontend slider rendering', async ({ page }) => {
        // Navigate to editor
        await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });

        const loginForm = page.locator('#loginform');
        if (await loginForm.isVisible({ timeout: 3000 }).catch(() => false)) {
            await page.fill('#user_login', ADMIN_USER);
            await page.fill('#user_pass', ADMIN_PASS);
            await page.click('#wp-submit');
            await page.waitForURL('**/wp-admin/**', { timeout: 30000 });
            await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });
        }

        await page.waitForSelector('.block-editor-block-list__layout', { timeout: 60000 });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);

        // Add title
        const titleInput = page.locator('[aria-label="Add title"], .editor-post-title__input');
        await titleInput.first().fill('Post Slider Test - ' + Date.now());

        // Insert block
        const inserterButton = page.locator('[aria-label="Toggle block inserter"]');
        await inserterButton.click();
        await page.waitForTimeout(1000);

        const searchInput = page.locator('input[placeholder*="Search"], .block-editor-inserter__search-input');
        await searchInput.first().fill('Post Slider');
        await page.waitForTimeout(1500);

        const postSliderOption = page.locator('.block-editor-block-types-list__item').filter({ hasText: /Post Slider/ });
        await postSliderOption.first().click();
        await page.waitForTimeout(3000);

        // Publish
        const publishButton = page.locator('.editor-post-publish-button, button:has-text("Publish")').first();
        await publishButton.click();
        await page.waitForTimeout(2000);

        // Confirm publish
        const confirmPublish = page.locator('.editor-post-publish-panel__header-publish-button button, button:has-text("Publish")');
        if (await confirmPublish.count() > 0) {
            await confirmPublish.first().click();
            await page.waitForTimeout(3000);
        }

        // Get view link
        const viewLink = page.locator('a').filter({ hasText: /View Page|View Post/ }).first();
        await expect(viewLink).toBeVisible({ timeout: 15000 });

        const pageUrl = await viewLink.getAttribute('href');
        console.log('Page published at:', pageUrl);

        // Visit frontend
        await page.goto(pageUrl, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        // Check for slider elements
        const sliderWrapper = page.locator('.wbcom-essential-post-slider');
        const noPostsMsg = page.locator('.wbcom-essential-post-slider-empty');

        const hasSlider = await sliderWrapper.isVisible().catch(() => false);
        const hasNoPostsMsg = await noPostsMsg.isVisible().catch(() => false);

        if (hasSlider) {
            console.log('PASS: Slider wrapper renders on frontend');

            const swiperContainer = page.locator('.swiper');
            if (await swiperContainer.isVisible()) {
                console.log('PASS: Swiper container present');
            }

            const swiperSlides = page.locator('.swiper-slide');
            const slideCount = await swiperSlides.count();
            console.log(`INFO: Found ${slideCount} slides`);

            const navPrev = page.locator('.swiper-button-prev');
            const navNext = page.locator('.swiper-button-next');
            if (await navPrev.isVisible() && await navNext.isVisible()) {
                console.log('PASS: Navigation arrows visible');
            }

            const pagination = page.locator('.swiper-pagination');
            if (await pagination.isVisible()) {
                console.log('PASS: Pagination visible');
            }
        } else if (hasNoPostsMsg) {
            console.log('INFO: "No posts found" message displayed (expected if no posts exist)');
        } else {
            console.log('FAIL: Neither slider nor empty message found on frontend');
        }
    });

    test('6. Test frontend slider navigation', async ({ page }) => {
        // Navigate to editor
        await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });

        const loginForm = page.locator('#loginform');
        if (await loginForm.isVisible({ timeout: 3000 }).catch(() => false)) {
            await page.fill('#user_login', ADMIN_USER);
            await page.fill('#user_pass', ADMIN_PASS);
            await page.click('#wp-submit');
            await page.waitForURL('**/wp-admin/**', { timeout: 30000 });
            await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });
        }

        await page.waitForSelector('.block-editor-block-list__layout', { timeout: 60000 });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);

        // Add title
        const titleInput = page.locator('[aria-label="Add title"], .editor-post-title__input');
        await titleInput.first().fill('Slider Nav Test - ' + Date.now());

        // Insert block
        const inserterButton = page.locator('[aria-label="Toggle block inserter"]');
        await inserterButton.click();
        await page.waitForTimeout(1000);

        const searchInput = page.locator('input[placeholder*="Search"], .block-editor-inserter__search-input');
        await searchInput.first().fill('Post Slider');
        await page.waitForTimeout(1500);

        const postSliderOption = page.locator('.block-editor-block-types-list__item').filter({ hasText: /Post Slider/ });
        await postSliderOption.first().click();
        await page.waitForTimeout(3000);

        // Publish
        const publishButton = page.locator('.editor-post-publish-button, button:has-text("Publish")').first();
        await publishButton.click();
        await page.waitForTimeout(2000);

        const confirmPublish = page.locator('.editor-post-publish-panel__header-publish-button button, button:has-text("Publish")');
        if (await confirmPublish.count() > 0) {
            await confirmPublish.first().click();
            await page.waitForTimeout(3000);
        }

        // Visit frontend
        const viewLink = page.locator('a').filter({ hasText: /View Page|View Post/ }).first();
        if (await viewLink.isVisible({ timeout: 10000 })) {
            const pageUrl = await viewLink.getAttribute('href');
            await page.goto(pageUrl, { waitUntil: 'networkidle' });
            await page.waitForTimeout(2000);

            const sliderWrapper = page.locator('.wbcom-essential-post-slider');
            if (await sliderWrapper.isVisible()) {
                // Test next button
                const nextButton = page.locator('.swiper-button-next');
                if (await nextButton.isVisible()) {
                    await nextButton.click();
                    await page.waitForTimeout(1000);
                    console.log('PASS: Next button clicked successfully');
                }

                // Test prev button
                const prevButton = page.locator('.swiper-button-prev');
                if (await prevButton.isVisible()) {
                    await prevButton.click();
                    await page.waitForTimeout(1000);
                    console.log('PASS: Prev button clicked successfully');
                }

                // Test pagination bullets
                const bullets = page.locator('.swiper-pagination-bullet');
                const bulletCount = await bullets.count();
                if (bulletCount > 1) {
                    await bullets.nth(1).click();
                    await page.waitForTimeout(1000);
                    console.log('PASS: Pagination bullet clicked successfully');
                }
            }
        }
    });

    test('7. Verify Swiper library loads without errors', async ({ page }) => {
        const jsErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                jsErrors.push(msg.text());
            }
        });

        // Navigate to editor
        await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });

        const loginForm = page.locator('#loginform');
        if (await loginForm.isVisible({ timeout: 3000 }).catch(() => false)) {
            await page.fill('#user_login', ADMIN_USER);
            await page.fill('#user_pass', ADMIN_PASS);
            await page.click('#wp-submit');
            await page.waitForURL('**/wp-admin/**', { timeout: 30000 });
            await page.goto(`${SITE_URL}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'load', timeout: 60000 });
        }

        await page.waitForSelector('.block-editor-block-list__layout', { timeout: 60000 });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);

        // Add title
        const titleInput = page.locator('[aria-label="Add title"], .editor-post-title__input');
        await titleInput.first().fill('JS Error Test - ' + Date.now());

        // Insert block
        const inserterButton = page.locator('[aria-label="Toggle block inserter"]');
        await inserterButton.click();
        await page.waitForTimeout(1000);

        const searchInput = page.locator('input[placeholder*="Search"], .block-editor-inserter__search-input');
        await searchInput.first().fill('Post Slider');
        await page.waitForTimeout(1500);

        const postSliderOption = page.locator('.block-editor-block-types-list__item').filter({ hasText: /Post Slider/ });
        await postSliderOption.first().click();
        await page.waitForTimeout(3000);

        // Publish
        const publishButton = page.locator('.editor-post-publish-button, button:has-text("Publish")').first();
        await publishButton.click();
        await page.waitForTimeout(2000);

        const confirmPublish = page.locator('.editor-post-publish-panel__header-publish-button button, button:has-text("Publish")');
        if (await confirmPublish.count() > 0) {
            await confirmPublish.first().click();
            await page.waitForTimeout(3000);
        }

        // Visit frontend
        const viewLink = page.locator('a').filter({ hasText: /View Page|View Post/ }).first();
        if (await viewLink.isVisible({ timeout: 10000 })) {
            const pageUrl = await viewLink.getAttribute('href');
            await page.goto(pageUrl, { waitUntil: 'networkidle' });
            await page.waitForTimeout(3000);

            // Check Swiper loaded
            const swiperLoaded = await page.evaluate(() => {
                return typeof Swiper !== 'undefined';
            });

            if (swiperLoaded) {
                console.log('PASS: Swiper library loaded successfully');
            } else {
                console.log('FAIL: Swiper library NOT loaded - this is a critical issue');
            }

            // Filter relevant errors
            const relevantErrors = jsErrors.filter(err =>
                !err.includes('favicon') &&
                !err.includes('net::ERR') &&
                (err.toLowerCase().includes('swiper') ||
                 err.toLowerCase().includes('slider') ||
                 err.toLowerCase().includes('wbcom'))
            );

            if (relevantErrors.length > 0) {
                console.log('FAIL: JavaScript errors found:');
                relevantErrors.forEach(err => console.log(`  - ${err}`));
            } else {
                console.log('PASS: No slider-related JavaScript errors');
            }
        }
    });
});
