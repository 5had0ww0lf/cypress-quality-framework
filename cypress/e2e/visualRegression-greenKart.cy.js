const GreenKartPage = require('../support/GreenKartPage');

const url = [
  "",
];
  
  //Takes better screenshots, Cypress bug workaround
  //https://cypress.visual-image-diff.dev/#guidelines-for-better-visual-testing-results
  function cypressBetterScreenshots() {
    cy.get("html, body").invoke(
      "attr",
      "style",
      "height: auto; scroll-behavior: auto;"
    )
  }
  
  describe('Visuals regression test, array of URLs', () => {

    before(function() {
      cy.fixture('product').as('productData');
    });
  
    for (let i=0; i<url.length; i++){
        it('should compare screenshot of the entire page: '+url[i]+'', () => { 
          //cy.visit(jaxUrl+url[i])   //delete if BaseUrl NPM script works
          cy.visit('/'+url[i])
          cy.wait(1000)
  
          url[i] = url[i].replace(/\//g, '-'); //replace forward slash for better screenshot filenaming
          if (i == 0) {
            cypressBetterScreenshots()
            cy.compareSnapshot('/'+'greenKart-homepage')
          }
          else{
            cypressBetterScreenshots()
            cy.compareSnapshot('/'+'greenKart-'+url[i])
          }
        })
      }
    })
  