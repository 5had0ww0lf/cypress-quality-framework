const fs = require('fs');
const path = require('path');

const CLIENT_NAME = 'greenkart';
const REPORTS_DIR = path.join(__dirname, '..', 'lighthouse-reports');

function ensureReportsDir() {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }
}

function buildTimestamp() {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');

  return `${date}-T${time}`;
}

function sanitizeSegment(value) {
  return String(value || 'report')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildReportPath(pageName, profileName) {
  const timestamp = buildTimestamp();
  const page = sanitizeSegment(pageName);
  const profile = sanitizeSegment(profileName);

  return path.join(
    REPORTS_DIR,
    `lighthouse-${CLIENT_NAME}-${page}-${profile}-${timestamp}.html`
  );
}

function writeLighthouseReport(lighthouseReport) {
  ensureReportsDir();

  const pageName = lighthouseReport && lighthouseReport.pageName
    ? lighthouseReport.pageName
    : 'homepage';
  const profileName = lighthouseReport && lighthouseReport.profileName
    ? lighthouseReport.profileName
    : 'desktop';
  const filePath = buildReportPath(pageName, profileName);

  fs.writeFileSync(filePath, lighthouseReport.report);
  console.log(`Lighthouse report created successfully: ${filePath}`);

  return filePath;
}

module.exports = {
  REPORTS_DIR,
  writeLighthouseReport
};
