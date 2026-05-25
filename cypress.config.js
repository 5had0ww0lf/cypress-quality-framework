const { defineConfig } = require('cypress')
const { addMatchImageSnapshotPlugin } = require('cypress-image-diff-js/plugin')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationintesting.online',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config)
      return config
    },
  },
})