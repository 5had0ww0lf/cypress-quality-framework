const GreenKartPage = require('../../support/pages/GreenKartPage');
const { preparePageForSnapshot } = require('../../support/utils/visual-helpers');

describe('Visual Regression - Baseline', () => {
  beforeEach(function() {
    cy.fixture('product').as('productData');
  });

  it('should match the homepage baseline', () => {
    GreenKartPage.visit();
    preparePageForSnapshot();
    cy.compareSnapshot('homepage');
  });

  it('should match the search results baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    preparePageForSnapshot();
    cy.compareSnapshot('search-results');
  });

  it('should match the empty search baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.invalidProduct);
    preparePageForSnapshot();
    cy.compareSnapshot('empty-search');
  });

  it('should match the cart-with-items baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addProductToCart(this.productData.productName);
    GreenKartPage.openCartPreview();
    preparePageForSnapshot();
    cy.compareSnapshot('cart-with-items');
  });

  it('should match the empty cart baseline', () => {
    GreenKartPage.visit();
    GreenKartPage.openCartPreview();
    preparePageForSnapshot();
    cy.compareSnapshot('empty-cart');
  });

  it('should match the checkout page baseline', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addProductToCart(this.productData.productName);
    GreenKartPage.openCartPreview();
    GreenKartPage.proceedToCheckout();
    preparePageForSnapshot();
    cy.compareSnapshot('checkout-page');
  });
});
