import type { IAppEnv } from "../utils/get-app-env.function";
import { getAppEnv } from "../utils/get-app-env.function";

describe("Api", () => {
  let env: IAppEnv;

  beforeAll(async () => {
    env = await getAppEnv();
  });

  test("health", async () => {
    const response = await page.goto(env.apiUrl + "/api");
    expect(response?.status()).toBe(200);
  });

  test("invalid url return 404", async () => {
    const response = await page.goto(env.apiUrl + "/api/awwadwad");
    expect(response?.status()).toBe(404);
  });
});
