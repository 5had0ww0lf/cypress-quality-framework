const GreenKartPage = require('../support/GreenKartPage');

// Takes better screenshots, Cypress bug workaround
// https://cypress.visual-image-diff.dev/#guidelines-for-better-visual-testing-results
function cypressBetterScreenshots() {
  cy.get("html, body").invoke(
    "attr",
    "style",
    "height: auto; scroll-behavior: auto;"
  );
}

const viewports = [
  { name: 'desktop', width: 1280, height: 720 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 375, height: 667 },
];

describe('Visual Regression - Responsive Design', () => {
  beforeEach(function() {
    cy.fixture('product').as('productData');
  });

  viewports.forEach(viewport => {
    describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
      });

      it(`should match homepage on ${viewport.name}`, () => {
        GreenKartPage.visit();
        cy.get('[class*="product"]').should('be.visible');
        cypressBetterScreenshots();
        cy.compareSnapshot(`homepage-${viewport.name}`);
      });

      it(`should match search results on ${viewport.name}`, function() {
        GreenKartPage.visit();
        GreenKartPage.searchProduct(this.productData.productName);
        cy.get('[class*="product"]').should('have.length.greaterThan', 0);
        cypressBetterScreenshots();
        cy.compareSnapshot(`search-results-${viewport.name}`);
      });

      it(`should match cart on ${viewport.name}`, function() {
        GreenKartPage.visit();
        GreenKartPage.searchProduct(this.productData.productName);
        GreenKartPage.addToCart();
        GreenKartPage.openCart();
        cy.get('[class*="cartItems"]').should('exist');
        cypressBetterScreenshots();
        cy.compareSnapshot(`cart-${viewport.name}`);
      });
    });
  });
});

describe('Visual Regression - Advanced Scenarios', () => {
  beforeEach(function() {
    cy.fixture('product').as('productData');
    cy.viewport(1280, 720);
  });

  it('should match error state for invalid search', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.invalidProduct);
    cy.get('.products').should('exist');
    cypressBetterScreenshots();
    cy.compareSnapshot('error-state-empty-search');
  });

  it('should match product card hover state', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    cy.get('[class*="product"]').should('have.length.greaterThan', 0);
    cy.get('[class*="product"]').first().trigger('mouseover');
    cy.get('[class*="product"]').first().should('have.class');
    cypressBetterScreenshots();
    cy.compareSnapshot('advanced-product-hover');
  });

  it('should match add to cart button state', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    cy.get('[class*="product"]').should('have.length.greaterThan', 0);
    cy.get('button').contains('ADD TO CART').should('be.visible');
    cypressBetterScreenshots();
    cy.compareSnapshot('advanced-add-cart-button');
  });

  it('should match cart page with item details', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addToCart();
    GreenKartPage.openCart();
    cy.get('[class*="cartItems"]').should('exist');
    cypressBetterScreenshots();
    cy.compareSnapshot('advanced-cart-details');
  });

  it('should match checkout button visibility', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addToCart();
    GreenKartPage.openCart();
    cy.get('button').contains('PROCEED TO CHECKOUT').should('be.visible');
    cypressBetterScreenshots();
    cy.compareSnapshot('advanced-checkout-button');
  });
});
