const fs = require('fs')
const path = require('path');
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse')
const { pa11y } = require('@cypress-audit/pa11y')

// Update per branch/client for HTML file naming   
const clientName = "greenkart";

// Getting current date and time
const now = new Date();
const date = now.toISOString().split('T')[0];   //YYYY-MM-DD
const timeWithSeconds = now.toTimeString().split(' ')[0].replace(/:/g, '-');    //HH-mm-ss


module.exports = {
  e2e: {
    //baseUrl: "https://www.arke.com",
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      })

      on('task', {

        pa11y: pa11y((pa11yReport) => {
          console.log(pa11yReport);
        }),
        
        lighthouse: lighthouse((lighthouseReport) => {
          console.log("---- Writing lighthouse report to disk ----");

          //Creating a filename with date and time
          const fileName = `cypress/reports/lighthouse-${clientName}-${date}-T${timeWithSeconds}.html`;   //YYYY-MM-DD HH-mm-ss
          
          // Writing the file
          fs.writeFile(fileName, lighthouseReport.report, (error) => {
            if (error) {
              console.log("Error writing report:", error);
            } else {
              console.log("Report created successfully");
            }
          });
        }),

        findReportFile({ reportsDir, pageName }) {
          // Read the directory contents
          const files = fs.readdirSync(reportsDir);
      
          // Filter out the report files based on a pattern
          const reportFiles = files.filter(file => file.startsWith('lighthouse-') && file.endsWith('.html'));

          // Sort the report files by creation time in descending order
          reportFiles.sort((a, b) => {
          const aStats = fs.statSync(path.join(reportsDir, a));
          const bStats = fs.statSync(path.join(reportsDir, b));
          return bStats.mtimeMs - aStats.mtimeMs;
          });
      
          // If a report file is found, return the full path
          if (reportFiles.length > 0) {
            const latestReportFile = reportFiles[0]; // Get the most recent report file
            const originalPath = path.join(reportsDir, latestReportFile);
      
            // Construct the new file path with the new name inserted
            const newPath = originalPath.replace(`${date}-`, `${date}-${pageName}-`);
      
            // Rename the file on the disk
            fs.renameSync(originalPath, newPath);
      
            // Return the new file path
            return newPath;
          }
      
          // If no files are found, return null
          return null;
        },

      })
    }
  }
}