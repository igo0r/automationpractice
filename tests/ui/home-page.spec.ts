import { test } from '../../fixtures/base';
import { expect } from '@playwright/test';

test.describe('home page @Sf9e7c2ae', () => {
    test('User can search from home page @T70fb11e2', async ({ productRegularPrice, app }) => {
        await app.homePage.open();
        await app.headerComponent.searchWith(productRegularPrice.name);
        await expect(
            await app.searchPage.getProductNameBlockByProductId(productRegularPrice.id)
        ).toHaveText(productRegularPrice.name);
        await expect(
            await app.searchPage.getProductPriceBlockByProductId(productRegularPrice.id)
        ).toHaveText(productRegularPrice.priceFormatted);
    });
});
