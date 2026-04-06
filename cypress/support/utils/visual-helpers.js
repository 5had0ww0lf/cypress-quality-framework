const SNAPSHOT_STYLE_ID = '__visual_snapshot_stabilizer__';
const volatileSelectors = [
  'a.cart-header-navlink.blinkingText[href="http://qasummit.org/"]',
  '.cart-header-navlink.blinkingText'
];

function preparePageForSnapshot() {
  cy.document().then(doc => {
    if (doc.getElementById(SNAPSHOT_STYLE_ID)) {
      return;
    }

    const style = doc.createElement('style');
    style.id = SNAPSHOT_STYLE_ID;
    style.textContent = `
      *,
      *::before,
      *::after {
        animation: none !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
        transition: none !important;
      }

      ${volatileSelectors.join(',\n      ')} {
        visibility: hidden !important;
      }
    `;

    doc.head.appendChild(style);
  });

  cy.get('html, body').invoke(
    'attr',
    'style',
    'height: auto; scroll-behavior: auto;'
  );
}

module.exports = {
  preparePageForSnapshot
};
