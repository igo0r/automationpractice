import { BasePage } from '../abstractClasses';
import { step } from '../../misc/reporters/step';

export class PaymentStepPage extends BasePage {
    public path = '/index.php?controller=order';
    readonly payByWireBtn = this.page.getByText('Pay by bank wire');
    readonly payByCheckBtn = this.page.getByText('Pay by check');
    readonly confirmOrderBtn = this.page.locator('.cart_navigation [type="submit"]');
    readonly totalPriceBlock = this.page.locator('#total_price');
    readonly productNamesBlock = this.page.locator('#cart_summary .product-name a');

    @step()
    async payByCheck() {
        await this.payByCheckBtn.click();
    }

    @step()
    async payByWire() {
        await this.payByWireBtn.click();
    }

    @step()
    async confirmOrder() {
        await this.confirmOrderBtn.click();
    }
}
