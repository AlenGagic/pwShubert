import test from "@playwright/test"
import { MyAccountPage } from "../page_objects/myAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetails } from "../data/userDetails";

test.only("My account cookie injection and mocking network request", async ({page}) => {

    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);

    await page.route("**/api/user**", async (route, request) =>
    {

        await route.fulfill({

            status: 500,
            contentType: "application/json",
            body: {message: "PLAYWRIGHT ERROR FOR MOCKING"},
        })
    })

    const myAccount = new MyAccountPage(page);

    await myAccount.visit();

    await page.evaluate(([loginTokenInsideBrowserCode]) => {  //we inject a variable that is outside our code (getting token from the website and processing it here);

        document.cookie = "token=" + loginTokenInsideBrowserCode;
    }, [loginToken]);

    await myAccount.visit();

    await myAccount.waitForPageHeading();
})