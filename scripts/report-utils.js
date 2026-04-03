const fs = require('fs');
const path = require('path');

const reportDir = path.join(__dirname, '../cypress-image-diff-html-report');
const tempJsonDir = path.join(__dirname, '../cypress-image-diff/cypress-visual-report');

function ensureReportDir() {
  fs.mkdirSync(reportDir, { recursive: true });
}

function hasJsonReportOutput() {
  return fs.existsSync(tempJsonDir);
}

function cleanupJsonReports() {
  if (!fs.existsSync(tempJsonDir)) {
    return [];
  }

  const files = fs.readdirSync(tempJsonDir);
  const jsonFiles = files.filter(file => /^report_.*\.json$/.test(file));

  jsonFiles.forEach(file => {
    fs.unlinkSync(path.join(tempJsonDir, file));
  });

  const remainingFiles = fs.readdirSync(tempJsonDir);
  if (remainingFiles.length === 0) {
    fs.rmdirSync(tempJsonDir);
  }

  return jsonFiles;
}

module.exports = {
  hasJsonReportOutput,
  cleanupJsonReports,
  ensureReportDir
};
