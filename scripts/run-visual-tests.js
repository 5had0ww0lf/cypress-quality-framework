#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

try {
  // Run Cypress tests  
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  // Continue even if tests fail
  console.log('\nTests completed (some may have failed)\n');
}

// Generate HTML report
console.log('Generating HTML report...');
try {
  execSync('npm run visual:report', { stdio: 'inherit' });
} catch (error) {
  console.error('Error generating report:', error.message);
}

// Clean up JSON files
console.log('\nCleaning up JSON reports...');
try {
  execSync('npm run visual:clean-json', { stdio: 'inherit' });
} catch (error) {
  console.error('Error cleaning JSON:', error.message);
}

console.log('\nVisual regression workflow complete!');
