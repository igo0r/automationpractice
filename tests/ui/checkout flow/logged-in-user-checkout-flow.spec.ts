import { checkoutFlowTest as test } from '../../../fixtures/base';
import { expect } from '@playwright/test';
import Order from '../../../entities/order';
import { getCurrentFormattedDate } from '../../../helpers/date';

test.describe('logged-in user checkout flow @S059c46a3', () => {
    test('Logged-in user without address with the same delivery and billing addresses with 1 item 2 quantities in cart purchase with bank wire @T3bb5aab1', async ({
        app,
        loggedInUserWithoutAddresses,
        productRegularPrice
    }) => {
        const totalPriceFormatted = `$${2 * productRegularPrice.price + productRegularPrice.deliveryPrice}`;
        await app.productPage.open(productRegularPrice.url);
        await app.productPage.setQuantity(2);
        await app.productPage.clickAddToCart();
        await app.addedToCartComponent.clickProceedToCheckout();
        await app.cartPage.clickProceedToCheckout();
        await app.addressFormComponent.fillInAddressInfo(loggedInUserWithoutAddresses.deliveryAddress);
        await app.addressFormComponent.assertDeliveryAddress(
            loggedInUserWithoutAddresses.deliveryAddress
        );
        await app.addressFormComponent.assertBillingAddress(loggedInUserWithoutAddresses.deliveryAddress);
        await app.addressStepPage.clickProceedToShipping();
        await expect(await app.shippingStepPage.deliveryPriceBlock).toContainText(
            productRegularPrice.deliveryPriceFormatted
        );
        await app.shippingStepPage.acceptTerms();
        await app.shippingStepPage.clickProceedToPayment();
        await expect(await app.paymentStepPage.productNamesBlock).toHaveText([productRegularPrice.name]);
        await expect(await app.paymentStepPage.totalPriceBlock).toHaveText(totalPriceFormatted);
        await app.paymentStepPage.payByWire();
        await app.paymentStepPage.confirmOrder();
        await expect(app.alertBannerComponent.successMessageBlock).toHaveText(
            'Your order on My Shop is complete.'
        );
        await expect(app.orderConfirmationStepPage.totalAmount).toHaveText(totalPriceFormatted);

        const orderReference = await app.orderConfirmationStepPage.getOrderReference();
        await app.orderHistoryPage.open();
        await app.orderHistoryPage.assertOrderHistory(
            new Order(
                orderReference,
                getCurrentFormattedDate(),
                totalPriceFormatted,
                'Bank wire',
                'Awaiting bank wire payment'
            )
        );
    });
    test('Logeed-in user with address with the same delivery and billing addresses with 2 items with 2 quantities in the cart purchase with check @T74e3bcc5', async ({
        app,
        loggedInUserWithAddresses,
        productSalePrice,
        productRegularPrice
    }) => {
        const totalPriceFormatted = `$${2 * productRegularPrice.price + 2 * productSalePrice.price + productRegularPrice.deliveryPrice}`;
        await app.productPage.open(productRegularPrice.url);
        await app.productPage.setQuantity(2);
        await app.productPage.clickAddToCart();
        await app.productPage.open(productSalePrice.url);
        await app.productPage.setQuantity(2);
        await app.productPage.clickAddToCart();
        await app.addedToCartComponent.clickProceedToCheckout();
        await app.cartPage.clickProceedToCheckout();
        await app.addressFormComponent.assertDeliveryAddress(loggedInUserWithAddresses.deliveryAddress);
        await app.addressFormComponent.assertBillingAddress(loggedInUserWithAddresses.deliveryAddress);
        await app.addressStepPage.clickProceedToShipping();
        await expect(await app.shippingStepPage.deliveryPriceBlock).toContainText(
            productRegularPrice.deliveryPriceFormatted
        );
        await app.shippingStepPage.acceptTerms();
        await app.shippingStepPage.clickProceedToPayment();
        await expect(await app.paymentStepPage.productNamesBlock).toHaveText([
            productRegularPrice.name,
            productSalePrice.name
        ]);
        await expect(await app.paymentStepPage.totalPriceBlock).toHaveText(totalPriceFormatted);
        await app.paymentStepPage.payByCheck();
        await app.paymentStepPage.confirmOrder();
        await expect(app.alertBannerComponent.successMessageBlock).toHaveText(
            'Your order on My Shop is complete.'
        );
        await expect(app.orderConfirmationStepPage.totalAmount).toHaveText(totalPriceFormatted);

        const orderReference = await app.orderConfirmationStepPage.getOrderReference();
        await app.orderHistoryPage.open();
        await app.orderHistoryPage.assertOrderHistory(
            new Order(
                orderReference,
                getCurrentFormattedDate(),
                totalPriceFormatted,
                'Payment by check',
                'Awaiting cheque payment'
            )
        );
    });
});
