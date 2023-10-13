import { test, expect } from "@playwright/test" //expect is for assertions

test("Product Page Add To Basket", async ({ page }) => {

    await page.goto("/")

    const addToBasketButton = page.locator("[data-qa=product-button]").first();
    const checkoutButton = page.getByRole('link', { name: 'Checkout' });
    const pageCounter = page.locator("[data-qa=header-basket-count]");
     //variations with selector hub works
    // const pageCounter = page.locator(".header-basket-count.bg-black.text-white.rounded-full.w-fit.px-2");

    await addToBasketButton.waitFor();

    await expect(addToBasketButton).toHaveText("Add to Basket");
    
    await expect(pageCounter).toHaveText("0");

    await addToBasketButton.click();

    await expect(addToBasketButton).toHaveText("Remove from Basket");

    await expect(pageCounter).toHaveText("1");

    await checkoutButton.waitFor();

    await checkoutButton.click();

    await page.waitForURL("/basket")

    
})