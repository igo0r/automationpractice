import { step } from '../../misc/reporters/step';
import { BaseComponent } from '../abstractClasses';

export class HeaderComponent extends BaseComponent {
    readonly signInBtn = this.page.locator('.header_user_info .login');
    readonly searchInput = this.page.locator('#search_query_top');
    readonly searchSubmitBtn = this.page.locator('[name="submit_search"]');

    @step()
    async clickSignIn() {
        await this.signInBtn.click();
    }

    @step()
    async searchWith(text: string) {
        await this.searchInput.fill(text);
        await this.searchSubmitBtn.click();
    }
}
