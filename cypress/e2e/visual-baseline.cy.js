const GreenKartPage = require('../support/GreenKartPage');
const { preparePageForSnapshot } = require('../support/visual-helpers');

describe('Visual Regression Tests - GreenKart', () => {
  beforeEach(function() {
    cy.fixture('product').as('productData');
  });

  it('should match homepage visual baseline', () => {
    GreenKartPage.visit();
    preparePageForSnapshot();
    cy.compareSnapshot('homepage');
  });

  it('should match search results visual baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    preparePageForSnapshot();
    cy.compareSnapshot('search-results');
  });

  it('should match empty search visual baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.invalidProduct);
    preparePageForSnapshot();
    cy.compareSnapshot('empty-search');
  });

  it('should match cart with items visual baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addToCart();
    GreenKartPage.openCart();
    preparePageForSnapshot();
    cy.compareSnapshot('cart-with-items');
  });

  it('should match empty cart visual baseline', () => {
    GreenKartPage.visit();
    GreenKartPage.openCart();
    preparePageForSnapshot();
    cy.compareSnapshot('empty-cart');
  });

  it('should match checkout page visual baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addToCart();
    GreenKartPage.openCart();
    GreenKartPage.proceedToCheckout();
    preparePageForSnapshot();
    cy.compareSnapshot('checkout-page');
  });
});
  
