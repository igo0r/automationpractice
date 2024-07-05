import { step } from '../../misc/reporters/step';
import { BaseComponent } from '../abstractClasses';

export class AlertBannerComponent extends BaseComponent {
    readonly successMessageBlock = this.page.locator('.alert-success');
}
