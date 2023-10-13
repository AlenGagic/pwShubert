import { expect } from "@playwright/test";
import { Navigation } from "./navigation";
import { isDesktopViewport } from "../utils/accesibility";

export class ProductsPage
{

    constructor(page)
    {
        
        this.page = page;
        this.addButton = page.locator("[data-qa='product-button']");
        this.basketCounter = page.locator("[data-qa='header-basket-count']");
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
        this.productTitle = page.locator('[data-qa="product-title"]');
    }

    visit = async () =>
    {
        await this.page.goto("/");
    }

    addProductToBasket = async (index) =>
    {
        const nav = new Navigation(this.page);

        const specificAddButton = this.addButton.nth(index)

        await specificAddButton.waitFor();

        await expect(specificAddButton).toHaveText("Add to Basket");

        if(isDesktopViewport(this.page)) {

            var basketCountBeforeAdd = await nav.getBasketCount();
        }
   
        await specificAddButton.click();

        await expect(specificAddButton).toHaveText("Remove from Basket");

        if(isDesktopViewport(this.page)) {

            var basketCountAfterAdd = await nav.getBasketCount();

            expect(basketCountAfterAdd).toBeGreaterThan(basketCountBeforeAdd);
        }
    }

    sortByCheapest = async () =>
    {

        await this.sortDropdown.waitFor();

        await this.productTitle.first().waitFor();

        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();

        await this.sortDropdown.selectOption("price-asc");

        const productTitlesAfterSorting = await this.productTitle.allInnerTexts();

        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);
    }


}