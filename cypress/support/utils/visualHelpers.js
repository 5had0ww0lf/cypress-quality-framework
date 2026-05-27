const resetCss = () => {
  cy.document().then((doc) => {
    doc.documentElement.style.height = 'auto'
    doc.body.style.height = 'auto'
    doc.body.style.overflow = 'visible'
  })
}

const staticNavBar = () => {
  cy.get('nav.sticky-top').then(($nav) => {
    if ($nav.length) {
      cy.wrap($nav).invoke('css', 'position', 'static')
    }
  })
}

const waitForImages = () => {
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.prop', 'naturalWidth').and('be.gt', 0)
  })
}

const hideElementIfPresent = (selector) => {
  cy.get('body').then(($body) => {
    if ($body.find(selector).length) {
      cy.get(selector).invoke('css', 'display', 'none')
    }
  })
}

const disableAnimationsAndWidgets = () => {
  cy.document().then((doc) => {
    const css = `
      * { transition: none !important; animation: none !important; caret-color: transparent !important; }
      ::-webkit-scrollbar { display: none !important; }
      .leaflet-container, .pigeon-map, .cookie-consent, .cookie-banner, .carousel, canvas { visibility: hidden !important; }
    `
    const style = doc.createElement('style')
    style.setAttribute('data-cy', 'visual-styles')
    style.innerHTML = css
    doc.head.appendChild(style)
  })
}

const waitForFonts = () => {
  cy.document().then((doc) => {
    if (doc.fonts && doc.fonts.ready) {
      return cy.wrap(doc.fonts.ready)
    }
    return cy.wrap(null)
  })
}

export const preparePageForScreenshot = (page) => {
  resetCss()
  disableAnimationsAndWidgets()
  staticNavBar()
  if (page.url !== '/') {
    hideElementIfPresent('.shadow.booking-card')
  }
  // ensure fonts and images have loaded before taking snapshots
  waitForFonts()
  waitForImages()
}
