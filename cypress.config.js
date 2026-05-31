const { defineConfig } = require('cypress')
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/plugin')
const { prepareAudit, lighthouse } = require('@cypress-audit/lighthouse')
const fs = require('fs')
const path = require('path')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationintesting.online',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config)
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions)
      })
      on('task', {
        lighthouse: lighthouse((lighthouseReport) => {
          lighthouse((lighthouseReport) => {
            console.log('=== LIGHTHOUSE CALLBACK EXECUTED ===')
            console.log('Keys:', lighthouseReport ? Object.keys(lighthouseReport) : 'null')
          })
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
          const reportDir = 'cypress/accessibility/lighthouse'
          if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true })
          }
          const reportPath = path.join(reportDir, `lighthouse-report-${timestamp}.html`)
          fs.writeFileSync(reportPath, lighthouseReport.report)
        })
      })
      return config
    },
  },
})