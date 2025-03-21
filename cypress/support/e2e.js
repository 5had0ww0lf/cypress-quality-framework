// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// cypress/support/{scheme}.js, where {scheme} defaults to e2e
const compareSnapshotCommand = require('cypress-image-diff-js/dist/command');   //v1
//const compareSnapshotCommand = require('cypress-image-diff-js/command');      //v2
compareSnapshotCommand();

// Generate default HTML report
// https://cypress.visual-image-diff.dev/getting-started/reporting#generate-default-html-report
after(() => {
    cy.task('generateReport')
  })