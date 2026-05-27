const { defineConfig } = require('cypress')
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/plugin')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationintesting.online',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config)
    },
  },
})