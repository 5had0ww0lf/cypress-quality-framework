import pages from '../../fixtures/pages.json'
import { preparePageForScreenshot } from '../../support/utils/visualHelpers'
import { buildRoomUrl } from '../../support/utils/dateUtils'

describe('Visual Regression', () => {
  pages.forEach((page) => {
    it(`visual snapshot - ${page.name}`, () => {
      const url = page.needsDates ? buildRoomUrl(page.url) : page.url
      cy.visit(url)
      preparePageForScreenshot(page)
      cy.compareSnapshot({ name: page.name })
    })
  })
})