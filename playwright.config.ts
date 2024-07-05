import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    timeout: 90000,
    expect: {
        timeout: 30000
    },
    testDir: './tests',
    fullyParallel: true,
    reporter: 'html',
    /*reporter: [
        ['html'],
        [
            '@testomatio/reporter/lib/adapter/playwright.js',
            {
                apiKey: process.env.TESTOMATIO
            }
        ]
    ],*/
    use: {
        baseURL: 'http://www.automationpractice.pl/index.php',
        trace: 'on-first-retry',
        video: 'on-first-retry',
        screenshot: { mode: 'only-on-failure', fullPage: true },
        viewport: { width: 1980, height: 1020 }
    },
    projects: [
        {
            name: 'chromium',
            testMatch: '**/ui/**/*.spec.ts',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1980, height: 1020 }
            }
        },
        {
            name: 'api',
            testMatch: '**/api/**/*.spec.ts',
            use: {
                baseURL: 'https://api.limehome.com/'
            }
        }
    ]
});
