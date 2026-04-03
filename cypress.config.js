const { defineConfig } = require("cypress");
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://rahulshettyacademy.com/seleniumPractise/#/",
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config);
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  chromeWebSecurity: false,
});
