import { BasePage } from '../abstractClasses';
import { step } from '../../misc/reporters/step';

export class OrderConfirmationStepPage extends BasePage {
    public path = '/index.php?controller=order-confirmation&id_cart=95355&id_module=3';
    readonly totalAmount = this.page.locator('.box .price');
    readonly successBlock = this.page.locator('.box');

    /**
     * Extract the order reference f.e. LWWQFPQNG from order success page
     */
    async getOrderReference(): Promise<string> {
        const textContent = await this.successBlock.textContent();
        if (!textContent) {
            throw new Error('Expected to find success order block text on success page');
        }
        const referenceRegex = /order reference (\w+)/;
        const match = textContent.match(referenceRegex);
        if (match) {
            return match[1];
        } else {
            throw new Error('Order reference not found in the text block of success order page');
        }
    }
}
