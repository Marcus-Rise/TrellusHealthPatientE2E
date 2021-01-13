import { getAppBaseUrl } from "../src/get-app-base-url.function";

describe("Api", () => {
  let appUrl: string;

  beforeAll(async () => {
    appUrl = (await getAppBaseUrl()) + "/api";
  });

  test("health", async () => {
    const response = await page.goto(appUrl);
    expect(response?.status()).toBe(200);
  });

  test("invalid url return 404", async () => {
    const response = await page.goto(appUrl + "/awdawd");
    expect(response?.status()).toBe(404);
  });
});
