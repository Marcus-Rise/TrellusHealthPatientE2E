import type { IAppEnv } from "../utils/get-app-env.function";
import { getAppEnv } from "../utils/get-app-env.function";

describe("Health", () => {
  test("health", async () => {
    const env: IAppEnv = await getAppEnv();
    const response = await page.goto(env.appUrl + "/health");

    expect(response?.status()).toBe(200);
  });
});
