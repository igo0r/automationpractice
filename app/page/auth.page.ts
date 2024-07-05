import { BasePage } from '../abstractClasses';
import { step } from '../../misc/reporters/step';
import User from '../../entities/user';

export class AuthPage extends BasePage {
    public path = '/index.php?controller=authentication';
    readonly emailInput = this.page.locator('#email_create');
    readonly loginEmailInput = this.page.locator('#login_form #email');
    readonly loginPassInput = this.page.locator('#login_form #passwd');

    readonly submitRegistrationBtn = this.page.locator('#SubmitCreate');
    readonly submitLoginBtn = this.page.locator('#SubmitLogin');

    @step()
    async createAnAccount(email: string) {
        await this.emailInput.fill(email);
        await this.submitRegistrationBtn.click();
    }

    @step()
    async signIn(user: User) {
        await this.loginEmailInput.fill(user.email);
        await this.loginPassInput.fill(user.password);
        await this.submitLoginBtn.click();
    }
}
