import { expect } from "@playwright/test";

export class DeliveryDetails
{

    constructor(page)
    {

        this.page = page;
        this.firstNameL = page.getByPlaceholder('First name');
        this.lastNameL = page.getByPlaceholder('Last name');
        this.streetL = page.getByPlaceholder('Street');
        this.postCodeL = page.getByPlaceholder('Post code');
        this.cityL = page.getByPlaceholder('City');
        this.countryL = page.locator('[data-qa="country-dropdown"]');
        this.saveAddressButton = page.locator('[data-qa="save-address-button"]');
        this.addressBox = page.locator('[data-qa="saved-address-container"]');
        this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]');
        this.savedLastName = page.locator('[data-qa="saved-address-lastName"]');
        this.savedStreet = page.locator('[data-qa="saved-address-street"]');
        this.savedPostcode = page.locator('[data-qa="saved-address-postcode"]');
        this.savedCity = page.locator('[data-qa="saved-address-city"]');
        this.savedCountry = page.locator('[data-qa="saved-address-country"]');
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' });

    }

    fillDetails = async (userAddress) => 
    {

        await this.firstNameL.waitFor();

        await this.firstNameL.fill(userAddress.firstName);

        await this.lastNameL.waitFor();

        await this.lastNameL.fill(userAddress.lastName);

        await this.streetL.waitFor();

        await this.streetL.fill(userAddress.street);

        await this.postCodeL.waitFor();

        await this.postCodeL.fill(userAddress.postCode);

        await this.cityL.waitFor();

        await this.cityL.fill(userAddress.city);

        await this.countryL.waitFor();

        await this.countryL.selectOption(userAddress.country);
    }

    saveDetails = async () => 
    {

        const addressCountBefore = await this.addressBox.count();

        await this.saveAddressButton.waitFor();

        await this.saveAddressButton.click();

        await expect(this.addressBox).toHaveCount(addressCountBefore + 1);

        await this.savedFirstName.first().waitFor();

        expect(await this.savedFirstName.first().innerText()).toBe(await this.firstNameL.inputValue());

        await this.savedLastName.first().waitFor();

        expect(await this.savedLastName.first().innerText()).toBe(await this.lastNameL.inputValue());

        await this.savedStreet.first().waitFor();

        expect(await this.savedStreet.first().innerText()).toBe(await this.streetL.inputValue());

        await this.savedPostcode.first().waitFor();

        expect(await this.savedPostcode.first().innerText()).toBe(await this.postCodeL.inputValue());

        await this.savedCity.first().waitFor();

        expect(await this.savedCity.first().innerText()).toBe(await this.cityL.inputValue());

        await this.savedCountry.first().waitFor();

        expect(await this.savedCountry.first().innerText()).toBe(await this.countryL.inputValue());

        // await this.page.pause();
    }

    continueToPayment = async () => 
    {

        await this.continueToPaymentButton.waitFor();

        await this.continueToPaymentButton.click();

        await this.page.waitForURL("http://localhost:2221/payment");
    }
}