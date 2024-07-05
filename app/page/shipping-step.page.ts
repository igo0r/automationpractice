import { BasePage } from '../abstractClasses';
import { step } from '../../misc/reporters/step';

export class ShippingStepPage extends BasePage {
    public path = '/index.php?controller=order';
    readonly proceedToCheckoutBtn = this.page.locator('[name="processCarrier"]');
    readonly acceptTermsBtn = this.page.locator('#cgv');
    readonly deliveryPriceBlock = this.page.locator('div.delivery_option_price');

    @step()
    async clickProceedToPayment() {
        await this.proceedToCheckoutBtn.click();
    }

    @step()
    async acceptTerms() {
        await this.acceptTermsBtn.click();
    }
}
