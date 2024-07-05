import { expect } from '@playwright/test';
import { test } from '../../../../fixtures/base';

test.describe('grid view @S90a4d820', () => {
    test('User can open product page after clicking on product block @Tcf764b7c', async ({
        productRegularPrice,
        app
    }) => {
        await app.searchPage.open();
        await app.headerComponent.searchWith(productRegularPrice.name);
        await app.searchPage.followProductByProductId(productRegularPrice.id);
        await expect(app.productPage.productNameBlock).toHaveText(productRegularPrice.name);
    });
});
