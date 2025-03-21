//const { defineConfig } = require("cypress");

const config = {
  ROOT_DIR: 'custom-folder-name',         //not working according to documentation yet
  REPORT_DIR: 'html-report',              //plugin v2: not working according to documentation yet
  SCREENSHOTS_DIR: 'visual-screenshots'   //plugin v2: not working according to documentation yet

};

module.exports = config;


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config);
    },
  }
});

/*
Force resolution size
https://cypress.visual-image-diff.dev/#force-resolution-size
*/