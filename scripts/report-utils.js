const fs = require('fs');
const path = require('path');

const reportDir = path.join(__dirname, '../cypress-image-diff-html-report');
const tempJsonDir = path.join(__dirname, '../cypress-image-diff/cypress-visual-report');
const visualScreenshotsDir = path.join(__dirname, '../cypress-image-diff/cypress-visual-screenshots');
const baselineScreenshotsDir = path.join(visualScreenshotsDir, 'baseline');
const bundledVisualAssetsDir = path.join(reportDir, 'cypress-image-diff');
const bundledScreenshotsDir = path.join(
  bundledVisualAssetsDir,
  'cypress-visual-screenshots'
);
const reportIndexPath = path.join(reportDir, 'index.html');

function ensureReportDir() {
  fs.mkdirSync(reportDir, { recursive: true });
}

function hasJsonReportOutput() {
  return fs.existsSync(tempJsonDir);
}

function resetBaselineForSpec(specFile) {
  if (!fs.existsSync(baselineScreenshotsDir)) {
    return [];
  }

  const specName = path.basename(specFile, '.js');
  const snapshotPrefix = `${specName}-`;
  const deletedBaselineFiles = fs.readdirSync(baselineScreenshotsDir)
    .filter(file => file.startsWith(snapshotPrefix) && file.endsWith('.png'));

  deletedBaselineFiles.forEach(file => {
    fs.unlinkSync(path.join(baselineScreenshotsDir, file));
  });

  return deletedBaselineFiles;
}

function cleanupBundledVisualAssets() {
  if (!fs.existsSync(bundledVisualAssetsDir)) {
    return false;
  }

  fs.rmSync(bundledVisualAssetsDir, { recursive: true, force: true });
  return true;
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

function bundleVisualAssetsForReport() {
  if (!fs.existsSync(visualScreenshotsDir) || !fs.existsSync(reportIndexPath)) {
    return false;
  }

  cleanupBundledVisualAssets();
  fs.mkdirSync(path.dirname(bundledScreenshotsDir), { recursive: true });
  fs.cpSync(visualScreenshotsDir, bundledScreenshotsDir, { recursive: true });

  const html = fs.readFileSync(reportIndexPath, 'utf8');
  const updatedHtml = html.replace(
    /window\.__injectedData__ = ([\s\S]*?)<\/script>/,
    (_, injectedData) => {
      const normalizedData = injectedData
        .replace(/\.\.\\\\cypress-image-diff\\\\/g, './cypress-image-diff/')
        .replace(/\\\\/g, '/');

      return `window.__injectedData__ = ${normalizedData}</script>`;
    }
  );

  fs.writeFileSync(reportIndexPath, updatedHtml);

  return true;
}

module.exports = {
  bundleVisualAssetsForReport,
  cleanupBundledVisualAssets,
  hasJsonReportOutput,
  resetBaselineForSpec,
  cleanupJsonReports,
  ensureReportDir
};
