import { expect } from "@playwright/test";
import { isDesktopViewport } from "../utils/accesibility";

export class Navigation
{

    constructor(page)
    {

        this.page = page;
        this.basketCounter = page.locator("[data-qa='header-basket-count']");
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' });
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]');
    }

    visit = async () =>
    {
        await this.page.goto("/");
    }

    getBasketCount = async () =>
    {
        await this.basketCounter.waitFor();

        const text = await this.basketCounter.innerText()

        return parseInt(text, 10);
    }

    navigateToCheckout = async () =>
    {

        if(!isDesktopViewport(this.page)) {

            await this.mobileBurgerButton.waitFor();
        
            await this.mobileBurgerButton.click();
        }

        await this.checkoutButton.waitFor();

        await this.checkoutButton.click();
    
        await this.page.waitForURL("/basket")
    }
}