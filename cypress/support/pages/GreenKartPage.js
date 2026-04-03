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

  getCartPreviewItem(productName) {
    return cy
      .get('.cart-preview.active .cart-items .cart-item')
      .contains('.product-name', productName, { matchCase: false })
      .parents('.cart-item');
  }

  removeProductFromCart(productName) {
    this.getCartPreviewItem(productName)
      .find('.product-remove')
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
