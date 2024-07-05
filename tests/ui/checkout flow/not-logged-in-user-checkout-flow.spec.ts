import { checkoutFlowTest as test } from '../../../fixtures/base';
import { expect } from '@playwright/test';
import Address from '../../../entities/address';
import Order from '../../../entities/order';
import { getCurrentFormattedDate } from '../../../helpers/date';

test.describe('not logged-in existing user checkout flow @Sfe75ef43', () => {
    test('Not logged-in user without address with different billing and delivery addresses with 2 items in cart purchase with bank wire @Tf3f46e23', async ({
        app,
        notLoggedInUserWithoutAddresses,
        productRegularPrice,
        productSalePrice
    }) => {
        const totalPriceFormatted = `$${productRegularPrice.price + productSalePrice.price + productRegularPrice.deliveryPrice}`;
        await app.productPage.open(productRegularPrice.url);
        await app.productPage.clickAddToCart();
        await app.productPage.open(productSalePrice.url);
        await app.productPage.clickAddToCart();
        await app.addedToCartComponent.clickProceedToCheckout();
        await app.cartPage.clickProceedToCheckout();
        await app.authPage.signIn(notLoggedInUserWithoutAddresses);
        await app.addressFormComponent.fillInAddressInfo(notLoggedInUserWithoutAddresses.deliveryAddress);
        await app.addressStepPage.useDifferentBillingAddress();
        await app.addressStepPage.clickAddNewAddressFromBillingBlock();
        await app.addressFormComponent.fillInAddressInfo(notLoggedInUserWithoutAddresses.billingAddress);
        await app.addressFormComponent.assertDeliveryAddress(
            notLoggedInUserWithoutAddresses.deliveryAddress
        );
        await app.addressFormComponent.assertBillingAddress(
            notLoggedInUserWithoutAddresses.billingAddress
        );
        await app.addressStepPage.setOrderMessage('This is test order');
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
    test('Not logged-in user with address with the same billing and delivery addresses with 1 sale item in cart purchase with bank wire @T750a2049', async ({
        app,
        notLoggedInUserWithAddresses,
        productSalePrice
    }) => {
        await app.productPage.open(productSalePrice.url);
        await app.productPage.clickAddToCart();
        await app.addedToCartComponent.clickProceedToCheckout();
        await app.cartPage.clickProceedToCheckout();
        await app.authPage.signIn(notLoggedInUserWithAddresses);
        await app.addressStepPage.clickAddNewAddressFromBottomBlock();
        const newAddress = Address.getDefault();
        await app.addressFormComponent.fillInAddressInfo(newAddress);
        await app.addressFormComponent.assertDeliveryAddress(
            notLoggedInUserWithAddresses.deliveryAddress
        );
        await app.addressFormComponent.assertBillingAddress(notLoggedInUserWithAddresses.deliveryAddress);
        await app.addressStepPage.clickProceedToShipping();
        await expect(await app.shippingStepPage.deliveryPriceBlock).toContainText(
            productSalePrice.deliveryPriceFormatted
        );
        await app.shippingStepPage.acceptTerms();
        await app.shippingStepPage.clickProceedToPayment();
        await expect(await app.paymentStepPage.productNamesBlock).toHaveText([productSalePrice.name]);
        await expect(await app.paymentStepPage.totalPriceBlock).toHaveText(
            productSalePrice.totalPriceFormatted
        );
        await app.paymentStepPage.payByWire();
        await app.paymentStepPage.confirmOrder();
        await expect(app.alertBannerComponent.successMessageBlock).toHaveText(
            'Your order on My Shop is complete.'
        );
        await expect(app.orderConfirmationStepPage.totalAmount).toHaveText(
            productSalePrice.totalPriceFormatted
        );
        const orderReference = await app.orderConfirmationStepPage.getOrderReference();
        await app.orderHistoryPage.open();
        await app.orderHistoryPage.assertOrderHistory(
            new Order(
                orderReference,
                getCurrentFormattedDate(),
                productSalePrice.totalPriceFormatted,
                'Bank wire',
                'Awaiting bank wire payment'
            )
        );
    });
});
