import { BasePage } from '../abstractClasses';
import { step } from '../../misc/reporters/step';

export class CartPage extends BasePage {
    public path = '/index.php?controller=order';
    readonly proceedToCheckoutBtn = this.page.locator('.standard-checkout');

    @step()
    async clickProceedToCheckout() {
        await this.proceedToCheckoutBtn.click();
    }
}
