const { defineConfig } = require('cypress-image-diff-html-report');

module.exports = defineConfig({
  // Input: Path to JSON report directory from cypress-image-diff-js
  reportJsonDir: 'cypress-image-diff/cypress-visual-report',
  
  // Output: Path where HTML report will be generated (same as input for single HTML file)
  outputPath: 'cypress-image-diff/cypress-visual-report'
});
