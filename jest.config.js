module.exports = {
  testMatch: ["**/?(*.)+(spec|test).[t]s"],
  testPathIgnorePatterns: ["/node_modules/", "dist"], //
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer",
};
