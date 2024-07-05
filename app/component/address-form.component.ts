import { step } from '../../misc/reporters/step';
import { BaseComponent } from '../abstractClasses';
import User from '../../entities/user';
import Address from '../../entities/address';
import { expect } from '@playwright/test';

export class AddressFormComponent extends BaseComponent {
    readonly firstNameInput = this.page.locator('#firstname');
    readonly lastNameInput = this.page.locator('#lastname');
    readonly addressInput = this.page.locator('#address1');
    readonly cityInput = this.page.locator('#city');
    readonly stateInput = this.page.locator('#id_state');
    readonly postcodeInput = this.page.locator('#postcode');
    readonly countryInput = this.page.locator('#id_country');
    readonly phoneInput = this.page.locator('#phone');
    readonly aliasInput = this.page.locator('#alias');
    readonly submitAddressBtn = this.page.locator('#submitAddress');

    @step()
    async assertDeliveryAddress(address: Address) {
        await this.assertAddress(address, 'address_delivery');
    }

    @step()
    async assertBillingAddress(address: Address) {
        await this.assertAddress(address, 'address_invoice');
    }

    @step()
    async fillInAddressInfo(address: Address) {
        await this.firstNameInput.fill(address.firstName);
        await this.lastNameInput.fill(address.lastName);
        await this.addressInput.fill(address.address);
        await this.cityInput.fill(address.city);
        await this.countryInput.selectOption(address.country);
        await this.stateInput.selectOption(address.state);
        await this.postcodeInput.fill(address.postcode);
        await this.phoneInput.fill(address.phone);
        await this.aliasInput.fill(address.addressAlias);

        await this.submitAddressBtn.click();
    }

    async assertAddress(address: Address, type: 'address_delivery' | 'address_invoice') {
        await expect(await this.page.locator(`#${type} .address_firstname`)).toHaveText(
            `${address.firstName} ${address.lastName}`
        );
        await expect(await this.page.locator(`#${type} .address_address1`)).toHaveText(address.address);
        await expect(await this.page.locator(`#${type} .address_city`)).toHaveText(
            `${address.city}, ${address.state} ${address.postcode}`
        );
        await expect(await this.page.locator(`#${type} .address_country_name`)).toHaveText(
            address.country
        );
        await expect(await this.page.locator(`#${type} .address_phone`)).toHaveText(address.phone);
    }
}
