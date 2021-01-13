/**
 * @inheritDoc https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#puppeteerlaunchoptions
 */
module.exports = {
  launch: {
    // dumpio: true,
    headless: process.env.HEADLESS !== "false",
  },
  /*server: {
    command: "node server.js",
    port: 4444,
    launchTimeout: 10000,
    debug: false,
  },*/
};
