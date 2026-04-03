const GreenKartPage = require('../../support/pages/GreenKartPage');

describe('GreenKart UI Flow', () => {
  beforeEach(function() {
    cy.fixture('product').as('productData');
  });

  it('should load the storefront and show the expected title', () => {
    GreenKartPage.visit();
    GreenKartPage.getTitle().should('include', 'GreenKart');
  });

  it('should search for a product successfully', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.getVisibleProducts().should('have.length', 1);
  });

  it('should add a product to the cart', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.getVisibleProducts().should('have.length', 1);
    GreenKartPage.addProductToCart(this.productData.productName);
    GreenKartPage.openCartPreview();
    GreenKartPage.proceedToCheckout();
    GreenKartPage.placeOrder();
  });

  it('should verify the cart is empty initially', () => {
    GreenKartPage.visit();
    GreenKartPage.openCartPreview();
    GreenKartPage.getCartItems().should('have.length', 0);
  });

  it('should verify the total amount in the cart', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addProductToCart(this.productData.productName);
    GreenKartPage.openCartPreview();
    GreenKartPage.getTotalAmount().should('not.be.empty');
  });

  it('should intercept at least one network request when visiting the app', () => {
    cy.intercept('GET', '**/*').as('allRequest');

    GreenKartPage.visit();

    cy.wait('@allRequest').its('response.statusCode').should('be.oneOf', [200, 304]);
  });

  it('should show no results for an invalid product search', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.invalidProduct);
    GreenKartPage.getVisibleProducts().should('have.length', 0);
    cy.get('.products .product', { timeout: 1000 }).should('not.exist');
  });

  it('should remove a product from the cart', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addProductToCart(this.productData.productName);
    GreenKartPage.openCartPreview();
    GreenKartPage.removeProductFromCart(this.productData.productName);
    GreenKartPage.getEmptyCartMessage().should('contain.text', 'cart is empty');
    GreenKartPage.getCartItems().should('have.length', 0);
  });

  it('should buy a product', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addProductToCart(this.productData.productName);
    GreenKartPage.openCartPreview();
    GreenKartPage.getCartItems().should('have.length.greaterThan', 0);
    GreenKartPage.proceedToCheckout();
    GreenKartPage.placeOrder();
    GreenKartPage.completeCheckout(this.productData.country);
    GreenKartPage.getTitle().should('include', 'GreenKart');
  });
});
