import { step } from '../../misc/reporters/step';
import { BaseComponent } from '../abstractClasses';
import User from '../../entities/user';

export class PersonalInfoComponent extends BaseComponent {
    readonly firstNameInput = this.page.locator('#customer_firstname');
    readonly lastNameInput = this.page.locator('#customer_lastname');
    readonly passInput = this.page.locator('#passwd');
    readonly submitAccBtn = this.page.locator('#submitAccount');

    @step()
    async fillInPersonalInfo(user: User) {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.passInput.fill(user.password);
        await this.submitAccBtn.click();
    }
}
