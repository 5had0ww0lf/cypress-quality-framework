const config = {
  ROOT_DIR: 'cypress-image-diff',
  REPORT_DIR: 'visual-reports',
  SCREENSHOTS_DIR: 'visual-screenshots',
  FAILURE_THRESHOLD: 0.2  // Allow 20% difference for demo site timing variations
};

module.exports = config;