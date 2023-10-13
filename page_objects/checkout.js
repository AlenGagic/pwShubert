import { expect } from "@playwright/test";

export class Checkout
{

    constructor(page)
    {

        this.page = page;
        this.basketCards = page.locator('[data-qa="product-card"]');
        this.basketCardPrice = page.locator('[data-qa="basket-item-price"]');
        this.basketCardRemoveButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async () =>
    {

        const allPriceTexts = await this.basketCardPrice.allInnerTexts();

        const justNumbers = allPriceTexts.map((element) => 
        {

            const withoutDollarSign = element.replace("$", "");

            return parseInt(withoutDollarSign, 10);

        });

        const smallestPrice = Math.min(...justNumbers);

        const smallestIndex = justNumbers.indexOf(smallestPrice);

        await this.basketCardRemoveButton.nth(smallestIndex).waitFor();

        await this.basketCardRemoveButton.nth(smallestIndex).click();
    };

    continueToCheckout = async () =>
    {

        await this.continueToCheckoutButton.waitFor();

        await this.continueToCheckoutButton.click();

        await this.page.waitForURL("http://localhost:2221/login?redirect=/delivery-details");
    }
};