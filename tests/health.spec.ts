import { getAppBaseUrl } from "../src/get-app-base-url.function";

describe("Health", () => {
  test("health", async () => {
    const url = (await getAppBaseUrl()) + "/health";
    const response = await page.goto(url);

    expect(response?.status()).toBe(200);
  });
});
