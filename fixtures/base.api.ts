import { test as base } from '@playwright/test';
import { API } from '../api/api';

export type TestOptions = {
    api: API;
};

export const test = base.extend<TestOptions>({
    api: async ({ page }, use) => {
        const api = new API(page.request);
        await use(api);
    }
});
