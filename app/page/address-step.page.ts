import { BasePage } from '../abstractClasses';
import { step } from '../../misc/reporters/step';

export class AddressStepPage extends BasePage {
    public path = '/index.php?controller=order?step=1';
    readonly proceedToCheckoutBtn = this.page.locator('[name="processAddress"]');
    readonly orderMsgInput = this.page.locator('[name="message"]');
    readonly addressesAreEqualInput = this.page.locator('#addressesAreEquals');
    readonly addNewAddressBottomBlockBtn = this.page.locator('.address_add [title="Add"]');
    readonly addNewAddressBillingBlockBtn = this.page.locator('#address_invoice_form [title="Add"]');

    @step()
    async clickProceedToShipping() {
        await this.proceedToCheckoutBtn.click();
    }

    @step()
    async useDifferentBillingAddress() {
        await this.addressesAreEqualInput.click();
    }

    @step()
    async clickAddNewAddressFromBillingBlock() {
        await this.addNewAddressBillingBlockBtn.click();
    }

    @step()
    async clickAddNewAddressFromBottomBlock() {
        await this.addNewAddressBottomBlockBtn.click();
    }

    @step()
    async setOrderMessage(text: string) {
        await this.orderMsgInput.fill(text);
    }
}
