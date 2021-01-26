import { getScreenShot } from "../utils/get-screenshot.function";
import type { IAppEnv } from "../utils/get-app-env.function";
import { getAppEnv } from "../utils/get-app-env.function";

describe("Login page", () => {
  let env: IAppEnv;

  beforeAll(async () => {
    env = await getAppEnv();
  });

  test("open", async () => {
    const res = await page.goto(env.appUrl + "/login");

    expect(res?.status()).toBe(200);

    await expect(getScreenShot()).resolves.toMatchImageSnapshot();
  });

  test("wrong email mask", async () => {
    await page.goto(env.appUrl + "/login");

    await page.type(`input[type=text]`, "username");
    await page.type(`input[type=password]`, "password");
    await page.click(`button[type=submit]`);

    await expect(getScreenShot()).resolves.toMatchImageSnapshot();

    await expect(page.evaluate(() => document.body.innerHTML)).resolves.toContain(
      "You have entered an invalid email or password.",
    );
  });

  test("right email mask", async () => {
    await page.goto(env.appUrl + "/login");

    await page.type(`input[type=text]`, env.user.login);
    await page.type(`input[type=password]`, env.user.password);
    await page.click(`button[type=submit]`);

    const res = await page.waitForResponse(env.apiUrl + "/api/cognitoidentity/signin");

    expect(res.status()).toBe(200);

    await page.waitForNavigation();

    expect(page.url()).toBe(env.appUrl + "/home/my-dashboard");
  });
});
