import { expect } from "@playwright/test";

export class LoginPage
{

    constructor(page)
    {

        this.page = page;
        this.moveToSignupButton = page.locator('[data-qa="go-to-signup-button"]');
    }

    moveToSignup = async () =>
    {

        await this.moveToSignupButton.waitFor();

        await this.moveToSignupButton.click();

        await this.page.waitForURL("http://localhost:2221/signup?redirect=/delivery-details");
    }
}