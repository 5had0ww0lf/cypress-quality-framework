describe('GreenKart Lighthouse integration', () => {
  const baseUrl = 'https://rahulshettyacademy.com/seleniumPractise/#/';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('generates lighthouse report for homepage and asserts thresholds', () => {
    cy.fixture('lighthouseConfig').then((cfg) => {
      cy.lighthouse(cfg.lighthouse.thresholds, { formFactor: 'desktop', screenEmulation: { disabled: true } }, { extends: 'lighthouse:default', settings: { output: 'html' } })
        .then((lhr) => {
          expect(lhr).to.not.be.null;
          if (lhr && lhr.categories) {
            expect(lhr.categories.performance.score).to.be.gte(0.85);
            expect(lhr.categories.accessibility.score).to.be.gte(0.9);
            expect(lhr.categories['best-practices'].score).to.be.gte(0.85);
            expect(lhr.categories.seo.score).to.be.gte(0.9);

            cy.log(`Performance: ${lhr.categories.performance.score}`);
            cy.log(`Accessibility: ${lhr.categories.accessibility.score}`);
          }

          // Persist the report through task if available
          if (lhr && lhr.report) {
            cy.task('writeLighthouseReport', {
              report: lhr.report,
              pageName: 'homePage'
            }).then((filePath) => {
              cy.log(`Saved Lighthouse report: ${filePath}`);
            });
          }
        });
    });
  });

  it('runs Lighthouse on the same page in mobile emulation', () => {
    cy.fixture('lighthouseConfig').then((cfg) => {
      cy.lighthouse(cfg.lighthouse.thresholds, { formFactor: 'mobile', screenEmulation: { disabled: false }}, { extends: 'lighthouse:default', settings: { output: 'html', emulatedFormFactor: 'mobile' }})
        .then((lhr) => {
          expect(lhr).to.not.be.null;
          if (lhr && lhr.categories) {
            expect(lhr.categories.accessibility.score).to.be.gte(0.9);
            expect(lhr.categories.seo.score).to.be.gte(0.9);
            cy.log(`Mobile performance: ${lhr.categories.performance.score}`);
          }
        });
    });
  });
});