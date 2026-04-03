const { defineConfig } = require('cypress-image-diff-html-report');

module.exports = defineConfig({
  reportJsonDir: 'cypress-image-diff/cypress-visual-report',
  outputPath: 'cypress-image-diff/cypress-visual-report',
  htmlReportFilePath: 'cypress-image-diff/cypress-visual-report/cypress-visual-report.html'
});
