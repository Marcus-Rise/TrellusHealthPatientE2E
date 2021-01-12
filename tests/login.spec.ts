import { getScreenShot } from "../src/get-screenshot.function";
import { getCredentials } from "../src/get-credentials.function";

describe("Login page", () => {
  let baseAppUrl: string;
  let appUrl: string;

  beforeAll(async () => {
    baseAppUrl = String(process.env.APP_URL);
    appUrl = baseAppUrl + "/login";

    expect(appUrl.length).toBeGreaterThan(0);
  });

  beforeEach(async () => {
    await page.goto(appUrl);

    const response = await page.goto(appUrl);
    expect(response?.status()).toBe(200);
  });

  test("open", async () => {
    const image = await getScreenShot();

    expect(image).toMatchImageSnapshot();
  });

  test("wrong email mask", async () => {
    await page.type(`input[type=text]`, "username");
    await page.type(`input[type=password]`, "password");
    await page.click(`button[type=submit]`);

    const image = await getScreenShot();

    expect(image).toMatchImageSnapshot();

    await expect(page.evaluate(() => document.body.innerHTML)).resolves.toContain(
      "You have entered an invalid email or password.",
    );
  });

  test("right email mask", async () => {
    const credentials = await getCredentials();

    await page.type(`input[type=text]`, credentials.login);
    await page.type(`input[type=password]`, credentials.password);
    await page.click(`button[type=submit]`);

    await page.waitForNavigation();

    await page.type(`input[type=text]`, credentials.login);
    await page.type(`input[type=password]`, credentials.password);
    await page.click(`button[type=submit]`);

    await page.waitForNavigation();

    const image = await getScreenShot();

    expect(image).toMatchImageSnapshot();

    expect(page.url()).toBe(baseAppUrl + "/home/my-dashboard");
  });
});
