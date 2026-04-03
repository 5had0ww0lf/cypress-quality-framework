const fs = require('fs');
const path = require('path');

const reportDir = path.join(__dirname, '../cypress-image-diff/cypress-visual-report');
const generatedReport = path.join(reportDir, 'cypress-visual-report.html');

function formatTimestamp(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}-T${hours}-${minutes}-${seconds}`;
}

function ensureReportDir() {
  fs.mkdirSync(reportDir, { recursive: true });
}

function removeTemporaryHtmlReport() {
  if (fs.existsSync(generatedReport)) {
    fs.unlinkSync(generatedReport);
  }
}

function archiveGeneratedHtmlReport() {
  if (!fs.existsSync(generatedReport)) {
    return null;
  }

  const timestamp = formatTimestamp(new Date());
  const filename = `cypress-visual-report_${timestamp}.html`;
  const timestampedReport = path.join(reportDir, filename);

  fs.renameSync(generatedReport, timestampedReport);
  return filename;
}

function cleanupJsonReports() {
  if (!fs.existsSync(reportDir)) {
    return [];
  }

  const files = fs.readdirSync(reportDir);
  const jsonFiles = files.filter(file => /^report_.*\.json$/.test(file));

  jsonFiles.forEach(file => {
    fs.unlinkSync(path.join(reportDir, file));
  });

  return jsonFiles;
}

module.exports = {
  archiveGeneratedHtmlReport,
  cleanupJsonReports,
  ensureReportDir,
  removeTemporaryHtmlReport,
  reportDir
};
