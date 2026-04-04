import './commands'
import '@cypress-audit/lighthouse/commands'

const compareSnapshotCommand = require('cypress-image-diff-js/dist/command');

compareSnapshotCommand();
