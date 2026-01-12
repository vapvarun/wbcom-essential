// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: '.',
    testMatch: 'test-post-slider.spec.js',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: 1,
    reporter: 'list',
    timeout: 120000,
    use: {
        baseURL: 'https://buddyxpro.local',
        trace: 'on-first-retry',
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'off',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
