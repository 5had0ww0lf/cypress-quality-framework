describe('GreenKart Lighthouse Audits', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('generates a desktop Lighthouse report and checks calibrated thresholds', () => {
    cy.fixture('lighthouse-config').then((config) => {
      cy.lighthouse(
        config.desktop.thresholds,
        config.desktop.options,
        config.desktop.config
      );
    });
  });

  it('runs a mobile-emulated Lighthouse audit with realistic demo-site thresholds', () => {
    cy.fixture('lighthouse-config').then((config) => {
      cy.lighthouse(
        config.mobile.thresholds,
        config.mobile.options,
        config.mobile.config
      );
    });
  });
});
