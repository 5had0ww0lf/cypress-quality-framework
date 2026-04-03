class GreenKartPage {
  visit() {
    cy.visit('/');
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
}

module.exports = new GreenKartPage();
