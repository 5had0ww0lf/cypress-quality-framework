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
    setupNodeEvents(on) {
      on("before:browser:launch", (_, launchOptions) => {
        prepareAudit(launchOptions);
      })

      on('task', {

        pa11y: pa11y((pa11yReport) => {
          console.log(pa11yReport);
        }),
        
        lighthouse: lighthouse((lighthouseReport) => {
          console.log("---- Writing lighthouse report to disk ----");

          // Ensure report folder exists
          const reportsDir = path.join(__dirname, 'cypress', 'reports');
          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
          }

          // Create a filename with date + optional pageName from report meta
          const pageName = (lighthouseReport && lighthouseReport.pageName) ? `${lighthouseReport.pageName}-` : '';
          const fileName = path.join(reportsDir, `lighthouse-${clientName}-${pageName}${date}-T${timeWithSeconds}.html`);

          fs.writeFileSync(fileName, lighthouseReport.report);
          console.log(`Report created successfully: ${fileName}`);

          return fileName;
        }),

        writeLighthouseReport({ report, pageName }) {
          const reportsDir = path.join(__dirname, 'cypress', 'reports');
          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
          }
          const fileName = path.join(reportsDir, `lighthouse-${clientName}-${pageName}-${date}-T${timeWithSeconds}.html`);
          fs.writeFileSync(fileName, report);
          return fileName;
        },

        findReportFile({ reportsDir, pageName }) {
          const files = fs.readdirSync(reportsDir);
          const reportFiles = files.filter(file => file.startsWith('lighthouse-') && file.endsWith('.html'));
          reportFiles.sort((a, b) => {
            const aStats = fs.statSync(path.join(reportsDir, a));
            const bStats = fs.statSync(path.join(reportsDir, b));
            return bStats.mtimeMs - aStats.mtimeMs;
          });

          if (reportFiles.length > 0) {
            const latestReportFile = reportFiles[0];
            const originalPath = path.join(reportsDir, latestReportFile);
            const newPath = originalPath.replace(`${date}-`, `${date}-${pageName}-`);
            fs.renameSync(originalPath, newPath);
            return newPath;
          }

          return null;
        },


      })
    }
  }
}