import { checkoutFlowTest as test } from '../../../fixtures/base';
import { expect } from '@playwright/test';
import Order from '../../../entities/order';
import { getCurrentFormattedDate } from '../../../helpers/date';

test.describe('new user checkout flow @S159d023a', () => {
    test('New user with the same delivery and billing addresses with 1 item in cart purchase with bank wire @T145fb175', async ({
        app,
        notExistingUser,
        productRegularPrice
    }) => {
        await app.productPage.open(productRegularPrice.url);
        await app.productPage.clickAddToCart();
        await app.addedToCartComponent.clickProceedToCheckout();
        await app.cartPage.clickProceedToCheckout();
        await app.authPage.createAnAccount(notExistingUser.email);
        await app.personalInfoComponent.fillInPersonalInfo(notExistingUser);
        await app.addressFormComponent.fillInAddressInfo(notExistingUser.deliveryAddress);
        await app.addressFormComponent.assertDeliveryAddress(notExistingUser.deliveryAddress);
        await app.addressFormComponent.assertBillingAddress(notExistingUser.deliveryAddress);
        await app.addressStepPage.clickProceedToShipping();
        await expect(await app.shippingStepPage.deliveryPriceBlock).toContainText(
            productRegularPrice.deliveryPriceFormatted
        );
        await app.shippingStepPage.acceptTerms();
        await app.shippingStepPage.clickProceedToPayment();
        await expect(await app.paymentStepPage.productNamesBlock).toHaveText([productRegularPrice.name]);
        await expect(await app.paymentStepPage.totalPriceBlock).toHaveText(
            productRegularPrice.totalPriceFormatted
        );
        await app.paymentStepPage.payByWire();
        await app.paymentStepPage.confirmOrder();
        await expect(app.alertBannerComponent.successMessageBlock).toHaveText(
            'Your order on My Shop is complete.'
        );
        await expect(app.orderConfirmationStepPage.totalAmount).toHaveText(
            productRegularPrice.totalPriceFormatted
        );

        const orderReference = await app.orderConfirmationStepPage.getOrderReference();
        await app.orderHistoryPage.open();
        await app.orderHistoryPage.assertOrderHistory(
            new Order(
                orderReference,
                getCurrentFormattedDate(),
                productRegularPrice.totalPriceFormatted,
                'Bank wire',
                'Awaiting bank wire payment'
            )
        );
    });
});
