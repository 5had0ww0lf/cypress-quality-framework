const GreenKartPage = require('../../support/pages/GreenKartPage');
const { preparePageForSnapshot } = require('../../support/utils/visual-helpers');

const viewports = [
  { name: 'desktop', width: 1280, height: 720 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 375, height: 667 }
];

describe('Visual Regression - Responsive', () => {
  beforeEach(function() {
    cy.fixture('product').as('productData');
  });

  viewports.forEach(viewport => {
    describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
      });

      it(`should match homepage on ${viewport.name}`, () => {
        GreenKartPage.visit();
        GreenKartPage.getVisibleProducts().should('have.length.greaterThan', 0);
        preparePageForSnapshot();
        cy.compareSnapshot(`homepage-${viewport.name}`);
      });

      it(`should match search results on ${viewport.name}`, function() {
        GreenKartPage.visit();
        GreenKartPage.searchProduct(this.productData.productName);
        GreenKartPage.getVisibleProducts().should('have.length.greaterThan', 0);
        preparePageForSnapshot();
        cy.compareSnapshot(`search-results-${viewport.name}`);
      });

      it(`should match cart preview on ${viewport.name}`, function() {
        GreenKartPage.visit();
        GreenKartPage.searchProduct(this.productData.productName);
        GreenKartPage.addProductToCart(this.productData.productName);
        GreenKartPage.openCartPreview();
        GreenKartPage.getCartItems().should('exist');
        preparePageForSnapshot();
        cy.compareSnapshot(`cart-${viewport.name}`);
      });
    });
  });
});

describe('Visual Regression - Advanced States', () => {
  beforeEach(function() {
    cy.fixture('product').as('productData');
    cy.viewport(1280, 720);
  });

  it('should match the invalid search state', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.invalidProduct);
    cy.get('.products').should('exist');
    preparePageForSnapshot();
    cy.compareSnapshot('error-state-empty-search');
  });

  it('should match the product hover state', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.getVisibleProducts().should('have.length.greaterThan', 0);
    GreenKartPage.getVisibleProducts().first().trigger('mouseover');
    preparePageForSnapshot();
    cy.compareSnapshot('advanced-product-hover');
  });

  it('should match the add-to-cart button state', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.getProductCard(this.productData.productName)
      .contains('ADD TO CART')
      .should('be.visible');
    preparePageForSnapshot();
    cy.compareSnapshot('advanced-add-cart-button');
  });

  it('should match cart detail content', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addProductToCart(this.productData.productName);
    GreenKartPage.openCartPreview();
    GreenKartPage.getCartItems().should('exist');
    preparePageForSnapshot();
    cy.compareSnapshot('advanced-cart-details');
  });

  it('should match checkout button visibility', function() {
    GreenKartPage.visit();
    GreenKartPage.searchProduct(this.productData.productName);
    GreenKartPage.addProductToCart(this.productData.productName);
    GreenKartPage.openCartPreview();
    cy.contains('button', 'PROCEED TO CHECKOUT').should('be.visible');
    preparePageForSnapshot();
    cy.compareSnapshot('advanced-checkout-button');
  });
});
