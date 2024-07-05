import { AddressStepPage } from './address-step.page';

export class MyAddressesPage extends AddressStepPage {
    public path = '/index.php?controller=addresses';

    async openNewAddressPage() {
        await this.open('/index.php?controller=address');
    }
}
