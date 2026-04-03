class GreenKartPage {
  visit() {
    cy.visit('/');
  }

  getTitle() {
    return cy.title();
  }

  searchProduct(productName) {
    cy.get('.search-keyword').clear().type(productName);
    cy.get('.products').should('exist');
  }

  getVisibleProducts() {
    return cy.get('.products').find('.product:visible');
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

  getEmptyCartMessage() {
    return cy.get('.empty-cart').find('h2');
  }

  checkoutPage(selectCountry) {
    cy.get('select').select(selectCountry);
    cy.get('.chkAgree').click();
    cy.get('.chkAgree').should('be.checked');
    cy.get('button').contains('Proceed').click();
    cy.get('div.wrapperTwo > span').should('contain.text', 'Thank you, your order has been placed successfully');
  }

}

module.exports = new GreenKartPage();