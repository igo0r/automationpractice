import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../abstractClasses';
import { step } from '../../misc/reporters/step';

export class LoginPage extends BasePage {
    public path = 'user/login?destination=/oauth2/authorize';
    readonly usernameInput = this.page.locator('#edit-name');
    readonly passInput = this.page.locator('#edit-pass');
    readonly submitBtn = this.page.locator('#edit-submit');

    @step()
    async signIn(username, password) {
        await this.usernameInput.fill(username);
        await this.passInput.fill(password);
        await this.submitBtn.click();
    }
}
