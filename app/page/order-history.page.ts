import { BasePage } from '../abstractClasses';
import { step } from '../../misc/reporters/step';
import Order from '../../entities/order';
import { expect } from '@playwright/test';

export class OrderHistoryPage extends BasePage {
    public path = '/index.php?controller=history';
    readonly historyLinkText = this.page.locator('.history_link');
    readonly historyDateText = this.page.locator('.history_date');
    readonly historyPriceText = this.page.locator('.history_price .price');
    readonly historyMethodText = this.page.locator('.history_method');
    readonly historyStateText = this.page.locator('.history_state');

    @step()
    async assertOrderHistory(order: Order) {
        await expect(this.historyLinkText).toHaveText(order.reference);
        await expect(this.historyDateText).toHaveText(order.date);
        await expect(this.historyPriceText).toHaveText(order.totalPrice);
        await expect(this.historyMethodText).toHaveText(order.payment);
        await expect(this.historyStateText).toHaveText(order.status);
    }
}
