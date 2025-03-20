it("generates Lighthouse HTML report for GreenKart", function () {

    // Define the reports directory
    const reportsDir = 'cypress/reports/';
  
    // Unique name to insert for this spec file
    const uniqueNameForThisSpec = 'homePage';  
  
    const thresholds = {
      performance: 10,
      accessibility: 10,
      seo: 10,
      'first-contentful-paint': 10000, //7000
      'largest-contentful-paint': 40000, //12000
      'cumulative-layout-shift': 0.4,
      'total-blocking-time': 35000,  //3500
      };
    
    const desktopConfig = {
      formFactor: 'desktop',
      //screenEmulation: { disabled: true },
      screenEmulation: {
        width: 1350,
        height: 940,
        deviceScaleRatio: 1,
        mobile: false,
        disable: false,
      },
    };
  
    const lighthouseOptions = {
      formFactor: 'desktop',
      screenEmulation: { disabled: true },
    };
    
    const lighthouseConfig = {
      settings: { output: "html" },
      extends: "lighthouse:default",
      //Fix for HTML report
      //output: "html",
    };
    
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.lighthouse(thresholds, lighthouseOptions, lighthouseConfig).then(() => {
      // Use cy.task to invoke the 'findReportFile' task with the unique name
      cy.task('findReportFile', { reportsDir, pageName: uniqueNameForThisSpec }).then((filePath) => {
        if (filePath) {
          cy.log(`Found report file with unique name: ${filePath}`);
        } else {
          cy.log('No report file was found.');
        }
      });
    });
  });