import pages from '../../fixtures/visual.json'
import { preparePageForScreenshot } from '../../support/utils/visualHelpers'

describe('Visual Regression', () => {
  pages.forEach((page) => {
    it(`visual snapshot - ${page.name}`, () => {
      cy.visit(page.url)
      preparePageForScreenshot(page)
      cy.compareSnapshot({ name: page.name })
    })
  })
})