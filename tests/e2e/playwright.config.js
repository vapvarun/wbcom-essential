/**
 * Playwright configuration for Posts Revolution block testing
 */

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
	testDir: '.',
	timeout: 60000,
	retries: 0,
	use: {
		baseURL: 'https://buddyxpro.local',
		ignoreHTTPSErrors: true,
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
		trace: 'retain-on-failure',
	},
	projects: [
		{
			name: 'chromium',
			use: {
				browserName: 'chromium',
				viewport: { width: 1280, height: 720 },
			},
		},
	],
	reporter: [
		['list'],
		['html', { outputFolder: 'test-results/html-report', open: 'never' }],
	],
});
