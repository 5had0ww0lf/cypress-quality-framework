const GreenKartPage = require('../../support/GreenKartPage');

describe('GreenKart', () => {
  beforeEach(function() {
    cy.fixture('product').as('productData');
  });

  it('should visit the URL and check the title', () => {
    GreenKartPage.visit();
    GreenKartPage.getTitle().should('include', 'GreenKart');
  });

  it('should search for a product', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.getVisibleProducts().should('have.length', 1);
  });

  it('should add a product to the cart', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.getVisibleProducts().should('have.length', 1);
    GreenKartPage.addToCart();
    GreenKartPage.openCart();
    GreenKartPage.proceedToCheckout();
    GreenKartPage.placeOrder();
  });

  it('should verify the cart is empty initially', () => {
    GreenKartPage.visit();
    GreenKartPage.openCart();
    GreenKartPage.getCartItems().should('have.length', 0);
  });

  it('should verify the total amount in the cart', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addToCart();
    GreenKartPage.openCart();
    GreenKartPage.getTotalAmount().should('not.be.empty');
  });

  it('should remove a product from the cart', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addToCart();
    GreenKartPage.openCart();
    GreenKartPage.removeProduct();
    GreenKartPage.getEmptyCartMessage();
    GreenKartPage.getCartItems().should('have.length', 0);
  });

  it.only('should buy a product', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addToCart();
    GreenKartPage.openCart();
    GreenKartPage.proceedToCheckout();
    GreenKartPage.placeOrder();
    GreenKartPage.checkoutPage(this.productData.country);
    GreenKartPage.getTitle().should('include', 'GreenKart');
  });
});