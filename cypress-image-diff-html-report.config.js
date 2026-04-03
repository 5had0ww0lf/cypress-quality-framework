const { defineConfig } = require('cypress-image-diff-html-report');

module.exports = defineConfig({
  reportJsonDir: 'cypress-image-diff/cypress-visual-report',
  outputPath: 'cypress-image-diff-html-report',
  htmlReportFilePath: 'cypress-image-diff-html-report/index.html'
});
