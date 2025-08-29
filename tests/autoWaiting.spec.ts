import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("https://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
  // testInfo.setTimeout(testInfo.timeout + 2000 )
});

test("auto waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  // await successButton.click()
  // const text = await successButton.textContent()

  // await successButton.waitFor({state: 'attached'})
  // const text = await successButton.allTextContents() //since there is no auto-wait for .allTextContents()
  // expect(text).toContain('Data loaded with AJAX get request.')

  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  }); // manual wait for 20 seconds
});

test("alternative waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  // ____ wait for element
  await page.waitForSelector(".bg-success");

  // ____ wait for particular response
  //    await page.waitForResponse('https://uitestingplayground.com/ajaxdata')
  // ____ wait for network calls to be completed ('Not recommended')
  await page.waitForLoadState("networkidle");

  //____ hard coded wait
  await page.waitForTimeout(5000);

  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});

test("timeouts", async ({ page }) => {
  // test.setTimeout(10000)
  test.slow();
  const successButton = page.locator(".bg-success");
  await successButton.click({ timeout: 16000 });
  // await successButton.click()
});
