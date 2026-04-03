#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const reportDir = path.join(__dirname, '../cypress-image-diff/cypress-visual-report');

if (!fs.existsSync(reportDir)) {
  console.log('Report directory does not exist');
  process.exit(0);
}

const files = fs.readdirSync(reportDir);
const jsonFiles = files.filter(file => file.match(/^report_.*\.json$/));

if (jsonFiles.length === 0) {
  console.log('No JSON files to clean up');
  process.exit(0);
}

console.log(`Removing ${jsonFiles.length} JSON report file(s)...`);

jsonFiles.forEach(file => {
  const filePath = path.join(reportDir, file);
  try {
    fs.unlinkSync(filePath);
    console.log(`  ✓ Deleted ${file}`);
  } catch (error) {
    console.error(`  ✗ Failed to delete ${file}: ${error.message}`);
  }
});

console.log('JSON cleanup complete');
