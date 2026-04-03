function preparePageForSnapshot() {
  cy.get('html, body').invoke(
    'attr',
    'style',
    'height: auto; scroll-behavior: auto;'
  );
}

module.exports = {
  preparePageForSnapshot
};
