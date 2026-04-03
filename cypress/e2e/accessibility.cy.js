describe('GreenKart accessibility and API pipeline', () => {
  const baseUrl = 'https://rahulshettyacademy.com/seleniumPractise/#/';

  it('runs pa11y accessibility checks on homepage', () => {
    cy.visit(baseUrl);
    cy.pa11y({ standard: 'WCAG2AA' }).then((results) => {
      expect(results).to.not.be.null;
      if (results && results.issues) {
        cy.log(`Pa11y issues: ${results.issues.length}`);
        expect(results.issues.length).to.be.lte(36);
      }
    });
  });

  it('intercepts at least one network request from app load', () => {
    cy.intercept('**/*').as('allRequests');
    cy.visit(baseUrl);
    cy.wait('@allRequests', { timeout: 20000 }).its('response.statusCode').should('be.oneOf', [200, 304]);
  });
});