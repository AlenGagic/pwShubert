import { test } from "@playwright/test"
import { ProductsPage } from "../page_objects/productsPage";
import { Navigation } from "../page_objects/navigation";
import { Checkout } from "../page_objects/checkout";
import { LoginPage } from "../page_objects/loginPage";
import { RegisterPage } from "../page_objects/registerPage";
import { DeliveryDetails } from "../page_objects/deliveryDetails";
import { deliveryDetails as userAddress } from "../data/deliveryDetails";
import { creditCardDetails as cardDetails } from "../data/credicCardDetails";
import { PaymentPage } from "../page_objects/paymentPage";
import { v4 } from "uuid"; //random string generator

test("New user full e2e journey", async ({ page }) => {

    const productsPage = new ProductsPage(page);
    const nav = new Navigation(page);
    const checkout = new Checkout(page);
    const login = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const deliveryDetails = new DeliveryDetails(page);
    const paymentPage = new PaymentPage(page);

    await productsPage.visit();

    await productsPage.sortByCheapest();

    await productsPage.addProductToBasket(0);

    await productsPage.addProductToBasket(1);

    await productsPage.addProductToBasket(2);

    await nav.navigateToCheckout();

    await checkout.removeCheapestProduct();

    await checkout.continueToCheckout();

    await login.moveToSignup();

    const emailId = v4()
    const email = emailId + "@gmail.com"
    const passwordId = v4();

    await registerPage.signupAsNewUser(email, passwordId);

    await deliveryDetails.fillDetails(userAddress);

    await deliveryDetails.saveDetails();

    await deliveryDetails.continueToPayment();

    await paymentPage.activateDiscount();
    
    await paymentPage.filloutCreditCard(cardDetails);

    await paymentPage.finishPayment()
});