import { expect } from "@playwright/test";

export class PaymentPage
{

    constructor(page)
    {

        this.page = page;
        this.discountIframe
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.discountField = page.getByPlaceholder('Discount code');
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]'); 
        this.discountMessage = page.locator('[data-qa="discount-active-message"]');
        this.discountTotal = page.locator('[data-qa="total-with-discount-value"]');
        this.totalPrice = page.locator('[data-qa="total-value"]');
        this.cardOwner = page.locator('[data-qa="credit-card-owner"]');
        this.cardNumber = page.locator('[data-qa="credit-card-number"]');
        this.validDate = page.locator('[data-qa="valid-until"]');
        this.cvc = page.locator('[data-qa="credit-card-cvc"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
    }

    activateDiscount = async () =>
    {

        expect(await this.discountMessage).not.toBeVisible();

        await this.discountCode.waitFor();

        const code = await this.discountCode.innerText();

        await this.discountField.waitFor();

        //option 1: using fill and expect toHaveValue
        await this.discountField.fill(code);

        await expect(this.discountField).toHaveValue(code);

        //option 2L focus typing
        // await this.discountField.focus();

        // await this.page.keyboard.type(code, {delay: 1000});

        // expect(await this.discountInput.inputValue()).toBe(code);

        await this.activateDiscountButton.waitFor();

        await this.activateDiscountButton.click();

        await expect (this.discountMessage).toHaveText("Discount activated!");

        expect(await this.discountTotal).toBeVisible();
    }

    filloutCreditCard = async (cardDetails) => 
    {

        await this.cardOwner.waitFor();

        await this.cardOwner.fill(cardDetails.owner);

        await this.cardNumber.waitFor();

        await this.cardNumber.fill(cardDetails.number);

        await this.validDate.waitFor();

        await this.validDate.fill(cardDetails.valid);

        await this.cvc.waitFor();

        await this.cvc.fill(cardDetails.cvc);
    }

    finishPayment = async () =>
    {

        await this.payButton.waitFor();

        await this.payButton.click();

        await this.page.waitForURL(/\/thank-you/);
    }
}