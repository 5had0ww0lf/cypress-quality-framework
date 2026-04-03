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

describe('Visual Regression Tests - GreenKart', () => {
  beforeEach(function() {
    cy.fixture('product').as('productData');
  });

  it('should match homepage visual baseline', () => {
    GreenKartPage.visit();
    cypressBetterScreenshots();
    cy.compareSnapshot('homepage');
  });

  it('should match search results visual baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    cypressBetterScreenshots();
    cy.compareSnapshot('search-results');
  });

  it('should match empty search visual baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.invalidProduct);
    cypressBetterScreenshots();
    cy.compareSnapshot('empty-search');
  });

  it('should match cart with items visual baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addToCart();
    GreenKartPage.openCart();
    cypressBetterScreenshots();
    cy.compareSnapshot('cart-with-items');
  });

  it('should match empty cart visual baseline', () => {
    GreenKartPage.visit();
    GreenKartPage.openCart();
    cypressBetterScreenshots();
    cy.compareSnapshot('empty-cart');
  });

  it('should match checkout page visual baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addToCart();
    GreenKartPage.openCart();
    GreenKartPage.proceedToCheckout();
    cypressBetterScreenshots();
    cy.compareSnapshot('checkout-page');
  });
});
  