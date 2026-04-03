Cypress.Commands.add('searchProduct', productName => {
  cy.get('.search-keyword').clear();
  cy.get('.search-keyword').type(productName);
  cy.get('.products').should('exist');
});
