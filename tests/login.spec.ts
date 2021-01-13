import { getScreenShot } from "../src/get-screenshot.function";
import { getCredentials } from "../src/get-credentials.function";
import { getAppBaseUrl } from "../src/get-app-base-url.function";

describe("Login page", () => {
  let baseAppUrl: string;
  let appUrl: string;

  beforeAll(async () => {
    baseAppUrl = await getAppBaseUrl();
    appUrl = baseAppUrl + "/login";

    expect(appUrl.length).toBeGreaterThan(0);
  });

  test("open", async () => {
    const response = await page.goto(appUrl);
    expect(response?.status()).toBe(200);

    await expect(getScreenShot()).resolves.toMatchImageSnapshot();
  });

  test("wrong email mask", async () => {
    const response = await page.goto(appUrl);
    expect(response?.status()).toBe(200);

    await page.type(`input[type=text]`, "username");
    await page.type(`input[type=password]`, "password");
    await page.click(`button[type=submit]`);

    await expect(getScreenShot()).resolves.toMatchImageSnapshot();

    await expect(page.evaluate(() => document.body.innerHTML)).resolves.toContain(
      "You have entered an invalid email or password.",
    );
  });

  test("right email mask", async () => {
    const response = await page.goto(appUrl);
    expect(response?.status()).toBe(200);

    const credentials = await getCredentials();

    await page.type(`input[type=text]`, credentials.login);
    await page.type(`input[type=password]`, credentials.password);
    await page.click(`button[type=submit]`);

    await page.waitForNavigation();

    await page.type(`input[type=text]`, credentials.login);
    await page.type(`input[type=password]`, credentials.password);
    await page.click(`button[type=submit]`);

    await page.waitForNavigation();

    await expect(getScreenShot()).resolves.toMatchImageSnapshot();

    expect(page.url()).toBe(baseAppUrl + "/home/my-dashboard");
  });
});
