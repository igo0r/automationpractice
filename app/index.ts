import { PageHolder } from './abstractClasses';
import { HomePage } from './page/home.page';
import { HeaderComponent } from './component/header.component';
import { ProductPage } from './page/product.page';
import { AddedToCartComponent } from './component/added-to-cart.component';
import { CartPage } from './page/cart.page';
import { AuthPage } from './page/auth.page';
import { PersonalInfoComponent } from './component/personal-info.component';
import { AddressFormComponent } from './component/address-form.component';
import { AddressStepPage } from './page/address-step.page';
import { ShippingStepPage } from './page/shipping-step.page';
import { PaymentStepPage } from './page/payment-step.page';
import { AlertBannerComponent } from './component/alert-banner.component';
import { OrderConfirmationStepPage } from './page/order-confirmation-step.page';
import { MyAddressesPage } from './page/my-addresses.page';
import { OrderHistoryPage } from './page/order-history.page';
import { SearchPage } from './page/search.page';

export class Application extends PageHolder {
    public myAddressesPage = new MyAddressesPage(this.page);
    public homePage = new HomePage(this.page);
    public authPage = new AuthPage(this.page);
    public productPage = new ProductPage(this.page);
    public cartPage = new CartPage(this.page);
    public addressStepPage = new AddressStepPage(this.page);
    public orderConfirmationStepPage = new OrderConfirmationStepPage(this.page);
    public searchPage = new SearchPage(this.page);
    public orderHistoryPage = new OrderHistoryPage(this.page);
    public shippingStepPage = new ShippingStepPage(this.page);
    public paymentStepPage = new PaymentStepPage(this.page);
    public headerComponent = new HeaderComponent(this.page);
    public addedToCartComponent = new AddedToCartComponent(this.page);
    public personalInfoComponent = new PersonalInfoComponent(this.page);
    public addressFormComponent = new AddressFormComponent(this.page);
    public alertBannerComponent = new AlertBannerComponent(this.page);
}
