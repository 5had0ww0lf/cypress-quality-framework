class GreenKartPage {
  visit() {
    cy.visit('/');
  }

  getTitle() {
    return cy.title();
  }

  searchProduct(productName) {
    cy.get('.search-keyword').clear();
    cy.get('.search-keyword').type(productName);
    cy.get('.products', { timeout: 5000 }).should('exist');
    cy.get('.products').invoke('text').should('exist');
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

  getEmptyCartMessage() {
    cy.get('.empty-cart').find('h2').should('have.text', 'You cart is empty!');
  }

  checkoutPage(selectCountry) {
    cy.get('select').select(selectCountry);
    cy.get('.chkAgree').click();
    cy.get('.chkAgree').should('be.checked');
    cy.get('button').contains('Proceed').click();
    cy.get('div.wrapperTwo > span').contains('Thank you, your order has been placed successfully ');
  }

}

module.exports = new GreenKartPage();
