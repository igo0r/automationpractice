import { step } from '../../misc/reporters/step';
import { BaseComponent } from '../abstractClasses';

export class AddedToCartComponent extends BaseComponent {
    readonly proceedToCheckoutBtn = this.page.getByText('Proceed to checkout');
    @step()
    async clickProceedToCheckout() {
        await this.proceedToCheckoutBtn.click();
    }
}
