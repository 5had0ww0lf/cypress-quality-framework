import pages from '../../fixtures/pages.json'
import lighthouseConfig from '../../fixtures/lighthouse.json'
import { buildRoomUrl } from '../../support/utils/dateUtils'

const lighthousePages = pages.filter(page => page.lighthouse)

describe('Accessibility Audit - Desktop', () => {
  lighthousePages.forEach((page) => {
    it(`lighthouse audit - ${page.name}`, () => {
      const url = page.needsDates ? buildRoomUrl(page.url) : page.url
      cy.visit(url)
      cy.lighthouse(lighthouseConfig.desktop.thresholds, {}, {...lighthouseConfig.desktop.config, output: 'html'})
    })
  })
})