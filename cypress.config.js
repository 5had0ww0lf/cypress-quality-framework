const { defineConfig } = require("cypress");
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin');
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const { writeLighthouseReport: saveLighthouseReport } = require('./scripts/lighthouse-report-utils');

function resolveAuditPageName(auditUrl) {
  if (!auditUrl) {
    return 'page';
  }

  try {
    const parsedUrl = new URL(auditUrl);
    const hashPath = parsedUrl.hash ? parsedUrl.hash.replace(/^#\/?/, '') : '';
    const pathname = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const route = hashPath || pathname;

    return route ? route.replace(/[/?#]+/g, '-') : 'homepage';
  } catch {
    return 'page';
  }
}

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://rahulshettyacademy.com/seleniumPractise/#/",
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);

      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          prepareAudit(launchOptions);
        }

        return launchOptions;
      });

      on('task', {
        lighthouse(auditOptions) {
          const profileName = auditOptions && auditOptions.opts && auditOptions.opts.formFactor
            ? auditOptions.opts.formFactor
            : 'desktop';
          const pageName = resolveAuditPageName(auditOptions && auditOptions.url);

          return lighthouse((results) => {
            const report = Array.isArray(results.report) ? results.report[0] : results.report;

            if (report) {
              saveLighthouseReport({
                pageName,
                profileName,
                report
              });
            }
          })(auditOptions);
        }
      });

      return config;
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  chromeWebSecurity: false,
});
