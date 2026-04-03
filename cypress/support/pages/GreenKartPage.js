class GreenKartPage {
  visit() {
    cy.visit('/');
  }

  getTitle() {
    return cy.title();
  }

  searchProduct(productName) {
    cy.searchProduct(productName);
  }

  getProductCard(productName) {
    return cy.contains('.product', productName, { matchCase: false });
  }

  getVisibleProducts() {
    return cy.get('.products').find('.product:visible');
  }

  addProductToCart(productName) {
    this.getProductCard(productName).contains('ADD TO CART').click();
  }

  openCartPreview() {
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

  removeProductFromCart(productName) {
    cy.get('div.cart-preview.active')
      .contains('.cart-preview-active', productName, { matchCase: false })
      .parents('.cart-preview-active')
      .find('a.product-remove')
      .click();
  }

  getEmptyCartMessage() {
    return cy.get('.empty-cart').find('h2');
  }

  completeCheckout(country) {
    cy.get('select').select(country);
    cy.get('.chkAgree').click();
    cy.get('.chkAgree').should('be.checked');
    cy.contains('button', 'Proceed').click();
    cy.get('div.wrapperTwo > span')
      .should('contain.text', 'Thank you, your order has been placed successfully');
  }
}

module.exports = new GreenKartPage();
