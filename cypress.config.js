const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://rahulshettyacademy.com/seleniumPractise/#/",
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
