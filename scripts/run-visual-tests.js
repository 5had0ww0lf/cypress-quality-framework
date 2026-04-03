#!/usr/bin/env node

const { execSync } = require('child_process');
const {
  archiveGeneratedHtmlReport,
  cleanupJsonReports,
  ensureReportDir,
  removeTemporaryHtmlReport
} = require('./report-utils');

// Get the spec file and any additional arguments
const specFile = process.argv[2];
const additionalArgs = process.argv.slice(3).join(' ');

if (!specFile) {
  console.error('Error: spec file required');
  process.exit(1);
}

const spec = `cypress/e2e/${specFile}`;

// Build the Cypress command
let command = `npx cypress run --spec "${spec}"`;
if (additionalArgs) {
  command += ` ${additionalArgs}`;
}

console.log(`Running: ${command}\n`);

let cypressExitCode = 0;
let reportGenerationFailed = false;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  cypressExitCode = error.status || 1;
  console.log('\nTests completed (some may have failed)\n');
}

console.log('Generating HTML report...');
try {
  ensureReportDir();
  removeTemporaryHtmlReport();

  execSync('npm run visual:report', { stdio: 'inherit' });
} catch (error) {
  reportGenerationFailed = true;
  console.error('Error generating report:', error.message);
}

console.log('Creating timestamped report archive...');
try {
  const archivedReport = archiveGeneratedHtmlReport();

  if (archivedReport) {
    console.log(`Timestamped report created: ${archivedReport}`);
  } else if (reportGenerationFailed) {
    console.error('No HTML report was generated, so nothing was archived.');
  }
} catch (error) {
  console.error('Error creating timestamped report:', error.message);
  reportGenerationFailed = true;
}

console.log('\nCleaning up JSON reports...');
try {
  const deletedJsonReports = cleanupJsonReports();

  if (deletedJsonReports.length === 0) {
    console.log('No JSON files to clean up');
  } else {
    console.log(`Removed ${deletedJsonReports.length} JSON report file(s)`);
  }
} catch (error) {
  console.error('Error cleaning JSON:', error.message);
}

console.log('\nVisual regression workflow complete!');

if (reportGenerationFailed) {
  process.exit(1);
}

process.exit(cypressExitCode);
