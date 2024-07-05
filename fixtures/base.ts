import { Application } from '../app';
import { test as base } from '@playwright/test';
import Product from '../entities/product';
import User from '../entities/user';

export type TestOptions = {
    app: Application;
    notExistingUser: User;
    notLoggedInUserWithoutAddresses: User;
    notLoggedInUserWithAddresses: User;
    loggedInUserWithoutAddresses: User;
    loggedInUserWithAddresses: User;
    productRegularPrice: Product;
    productSalePrice: Product;
};

export const test = base.extend<TestOptions>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },
    productRegularPrice: Product.productRegularPrice(),
    productSalePrice: Product.productSalePrice()
});

export const checkoutFlowTest = base.extend<TestOptions>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },
    notLoggedInUserWithoutAddresses: async ({ app, context }, use) => {
        const notExistingUser = User.notExistingUser();
        await app.authPage.open();
        await app.authPage.createAnAccount(notExistingUser.email);
        await app.personalInfoComponent.fillInPersonalInfo(notExistingUser);
        await context.clearCookies();
        await use(notExistingUser);
    },
    loggedInUserWithoutAddresses: async ({ app }, use) => {
        const notExistingUser = User.notExistingUser();
        await app.authPage.open();
        await app.authPage.createAnAccount(notExistingUser.email);
        await app.personalInfoComponent.fillInPersonalInfo(notExistingUser);
        await use(notExistingUser);
    },
    notLoggedInUserWithAddresses: async ({ app, context }, use) => {
        const notExistingUser = User.notExistingUser();
        await app.authPage.open();
        await app.authPage.createAnAccount(notExistingUser.email);
        await app.personalInfoComponent.fillInPersonalInfo(notExistingUser);
        await app.myAddressesPage.openNewAddressPage();
        await app.addressFormComponent.fillInAddressInfo(notExistingUser.deliveryAddress);
        await context.clearCookies();
        await use(notExistingUser);
    },
    loggedInUserWithAddresses: async ({ app }, use) => {
        const notExistingUser = User.notExistingUser();
        await app.authPage.open();
        await app.authPage.createAnAccount(notExistingUser.email);
        await app.personalInfoComponent.fillInPersonalInfo(notExistingUser);
        await app.myAddressesPage.openNewAddressPage();
        await app.addressFormComponent.fillInAddressInfo(notExistingUser.deliveryAddress);
        await use(notExistingUser);
    },
    notExistingUser: User.notExistingUser(),
    productRegularPrice: Product.productRegularPrice(),
    productSalePrice: Product.productSalePrice()
});
