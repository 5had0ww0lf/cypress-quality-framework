class GreenKartPage {
  visit() {
    cy.visit('/');
  }

  getTitle() {
    return cy.title();
  }

  searchProduct(productName) {
    cy.get('.search-keyword').type(productName);
    cy.wait(2000);
  }

  getVisibleProducts() {
    return cy.get('.product:visible');
  }

  addToCart() {
    cy.get('.products').find('.product').eq(0).contains('ADD TO CART').click();
  }

  openCart() {
    cy.get('.cart-icon > img').click();
  }

  proceedToCheckout() {
    cy.contains('PROCEED TO CHECKOUT').click();
  }

  placeOrder() {
    cy.contains('Place Order').click();
  }

  getCartItems() {
    return cy.get('.cart-items');
  }

  getTotalAmount() {
    return cy.get('.totAmt');
  }

  removeProduct() {
    cy.get('div.cart-preview.active').find('a.product-remove').click();
  }
}

module.exports = new GreenKartPage();