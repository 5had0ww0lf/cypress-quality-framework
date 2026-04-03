# Cypress Quality Engineering Framework

This repository is a Cypress-based quality engineering portfolio project built around the GreenKart demo storefront. It is organized as a lightweight framework so UI coverage is production-style today, while the structure can grow naturally into API, visual, performance, and accessibility testing over time.

## Current Focus

- UI end-to-end coverage for core ecommerce flows
- Fixture-driven test data
- Page Object Model for maintainable selectors and interactions
- Custom Cypress commands for reusable user actions
- GitHub Actions execution with JUnit artifact upload
- ESLint rules for Cypress-focused code quality

## Framework Structure

```text
cypress-quality-engineering-framework/
|
|-- cypress/
|   |-- e2e/
|   |   `-- ui/
|   |       `-- greenkart.cy.js
|   |
|   |-- support/
|   |   |-- commands/
|   |   |   `-- index.js
|   |   `-- pages/
|   |       `-- GreenKartPage.js
|   |
|   `-- fixtures/
|       `-- product.json
|
|-- .github/workflows/
|   `-- cypress-run.yml
|
|-- cypress.config.js
|-- package.json
`-- README.md
```

## Planned Expansion Paths

The framework is intentionally organized so future capabilities can be added cleanly under:

- `cypress/e2e/api/`
- `cypress/e2e/visual/`
- `cypress/e2e/performance/`
- `cypress/e2e/accessibility/`
- `cypress/support/services/`
- `cypress/support/utils/`

Those areas are not scaffolded yet because this branch only keeps structure that is backed by real implementation.

## Application Under Test

- URL: `https://rahulshettyacademy.com/seleniumPractise/#/`
- Domain: ecommerce browsing and checkout
- Purpose: demonstrate maintainable Cypress test design, not just isolated test scripts

## Current Test Coverage

The UI suite in `cypress/e2e/ui/greenkart.cy.js` covers:

- Visiting the storefront and validating the title
- Searching for a valid product
- Handling invalid product searches
- Adding an item to the cart
- Checking cart totals
- Verifying an empty cart state
- Removing items from the cart
- Completing a purchase flow
- Intercepting a network request during page load

## Design Decisions

- Page-object methods keep selectors and interaction flows centralized
- Fixture data keeps tests readable and easier to extend
- A custom `cy.searchProduct()` command isolates a repeated user action
- The repo structure favors capability-based growth instead of a flat test folder
- CI runs the suite headlessly and publishes machine-readable test output

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Install

```bash
npm install
```

### Run the UI Suite

```bash
npm run cy:run
```

### Open Cypress Interactively

```bash
npm run cy:open
```

## CI Workflow

`.github/workflows/cypress-run.yml`:

- installs dependencies with `npm ci`
- runs the UI suite on pushes and pull requests to `main` / `master`
- exports JUnit XML test results as an artifact

## Next Improvements

- Add API coverage under `cypress/e2e/api/`
- Add visual regression coverage under `cypress/e2e/visual/`
- Add accessibility checks under `cypress/e2e/accessibility/`
- Add performance auditing under `cypress/e2e/performance/` or a dedicated `lighthouse/` area
- Extract shared helpers into `cypress/support/utils/` when utility code grows
