const cypress = require('eslint-plugin-cypress');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        after: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        console: 'readonly',
        Cypress: 'readonly',
        cy: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        __dirname: 'readonly',
        it: 'readonly',
        module: 'readonly',
        process: 'readonly',
        require: 'readonly'
      }
    },
    plugins: {
      cypress
    },
    rules: {
      'no-console': 'off',
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/no-force': 'warn'
    }
  }
];
