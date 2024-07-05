import { BasePage } from '../abstractClasses';
import { step } from '../../misc/reporters/step';

export class SearchPage extends BasePage {
    public path = '/index.php?controller=search';

    @step()
    async getProductNameBlockByProductId(productId: number) {
        let productBlock = await this.getProductBlock(productId);
        return productBlock.locator('.product-name');
    }

    @step()
    async followProductByProductId(productId: number) {
        let productBlock = await this.getProductNameBlockByProductId(productId);
        await productBlock.click();
    }

    @step()
    async getProductPriceBlockByProductId(productId: number) {
        let productBlock = await this.getProductBlock(productId);
        return productBlock.locator('.right-block .price');
    }

    @step()
    async getProductBlock(productId: number) {
        return this.page
            .locator('.product-container')
            .filter({ has: this.page.locator(`a.product-name[href*="id_product=${productId}"]`) });
    }
}
