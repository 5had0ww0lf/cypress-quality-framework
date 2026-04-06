#!/usr/bin/env node

const { execSync } = require('child_process');
const {
  bundleVisualAssetsForReport,
  cleanupBundledVisualAssets,
  hasJsonReportOutput,
  resetBaselineForSpec,
  cleanupJsonReports,
  ensureReportDir
} = require('./report-utils');

const specFile = process.argv[2];
const additionalArgs = process.argv.slice(3).join(' ');
const shouldUpdateBaselines = /\bupdateSnapshots=true\b/i.test(additionalArgs);
const shouldBundleVisualReport = process.env.CI === 'true'
  || process.env.BUNDLE_VISUAL_REPORT === 'true';

if (!specFile) {
  console.error('Error: spec file required');
  process.exit(1);
}

const spec = `cypress/e2e/${specFile}`;

let command = `npx cypress run --spec "${spec}"`;
if (additionalArgs) {
  command += ` ${additionalArgs}`;
}

if (shouldUpdateBaselines) {
  console.log(`Refreshing baseline images for ${specFile} before running Cypress...`);

  try {
    const deletedBaselineFiles = resetBaselineForSpec(specFile);

    if (deletedBaselineFiles.length === 0) {
      console.log('No existing baseline images were found for this spec.');
    } else {
      console.log(`Removed ${deletedBaselineFiles.length} baseline image(s) so they can be recreated from the current run.`);
    }
  } catch (error) {
    console.error('Error resetting baseline images:', error.message);
    process.exit(1);
  }

  console.log('');
}

console.log(`Running: ${command}\n`);

let cypressExitCode = 0;
let reportGenerationFailed = false;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  cypressExitCode = error.status || 1;
  console.log('\nCypress finished with test failures.');
  console.log('The visual HTML report will still be generated if JSON output is available.\n');
}

console.log('Checking whether a visual HTML report can be generated...');
if (hasJsonReportOutput()) {
  try {
    ensureReportDir();
    console.log('Generating visual HTML report from the current run output...');
    execSync('npx cypress-image-diff-html-report generate', { stdio: 'inherit' });

    if (shouldBundleVisualReport && bundleVisualAssetsForReport()) {
      console.log('Bundled visual screenshots into the report output for portable artifact viewing.');
    } else if (shouldBundleVisualReport) {
      console.log('Report generated, but no screenshot bundle was created.');
    } else {
      const removedBundledAssets = cleanupBundledVisualAssets();

      if (removedBundledAssets) {
        console.log('Report generated and stale bundled screenshots were removed from the report output.');
      } else {
        console.log('Report generated without bundling screenshots into the report output.');
      }
    }
  } catch (error) {
    reportGenerationFailed = true;
    console.error('Error generating report:', error.message);
  }
} else {
  console.log('Skipping visual HTML report generation because no JSON report output was created.');
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

if (cypressExitCode !== 0 && !reportGenerationFailed) {
  console.log('\nVisual report generation completed, but the Cypress run still failed.');
}

console.log('\nVisual regression workflow complete!');

if (reportGenerationFailed) {
  process.exit(1);
}

process.exit(cypressExitCode);
