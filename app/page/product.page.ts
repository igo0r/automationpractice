import { BasePage } from '../abstractClasses';
import { step } from '../../misc/reporters/step';

export class ProductPage extends BasePage {
    public path = '/';
    readonly addToCartBtn = this.page.locator('#add_to_cart');
    readonly quantityInput = this.page.locator('#quantity_wanted');
    readonly proceedToCheckoutBtn = this.page.getByText('Proceed to checkout');
    readonly productNameBlock = this.page.locator('[itemprop="name"]');

    @step()
    async setQuantity(quantity: number) {
        await this.quantityInput.fill(quantity.toString());
    }
    @step()
    async clickAddToCart() {
        await this.addToCartBtn.click();
        await this.proceedToCheckoutBtn.waitFor({ state: 'visible' });
    }
}
