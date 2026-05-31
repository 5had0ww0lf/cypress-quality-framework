// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginPage from '../pages/LoginPage';
import { lighthouse } from '@cypress-audit/lighthouse'

Cypress.Commands.add('login', (username, password) => {
  LoginPage.login(username, password)
})

Cypress.Commands.add('getErrorMessage', () => {
  return cy.get('div.alert.alert-danger')
})

Cypress.Commands.add('accessAdminPage', () =>{
  cy.get('a.nav-link[href="/admin"]')
    .should('be.visible')
    .click()
});

Cypress.Commands.add('lighthouse', (thresholds, opts, config) => {
  lighthouse(thresholds, {}, config)
})