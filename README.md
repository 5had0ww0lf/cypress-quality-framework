# Cypress Quality Engineering Framework

This repository is a Cypress-based quality engineering portfolio project built around the GreenKart demo storefront. It is organized as a lightweight framework so UI and visual regression coverage are implemented today, while the structure can continue growing into API, performance, and accessibility testing over time.

## Current Focus

- UI end-to-end coverage for core ecommerce flows
- Visual regression coverage with HTML reporting
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
|   |   |-- ui/
|   |   |   `-- greenkart.cy.js
|   |   `-- visual/
|   |       |-- visual-baseline.cy.js
|   |       `-- visual-responsive.cy.js
|   |
|   |-- support/
|   |   |-- commands/
|   |   |   `-- index.js
|   |   |-- pages/
|   |   |   `-- GreenKartPage.js
|   |   `-- utils/
|   |       `-- visual-helpers.js
|   |
|   `-- fixtures/
|       `-- product.json
|
|-- .github/workflows/
|   `-- cypress-run.yml
|
|-- cypress-image-diff/
|   `-- cypress-visual-screenshots/
|       `-- baseline/
|
|-- cypress-image-diff-html-report.config.js
|-- cypress-image-diff.config.js
|-- scripts/
|   |-- report-utils.js
|   `-- run-visual-tests.js
|
|-- cypress.config.js
|-- package.json
`-- README.md
```

## Planned Expansion Paths

The framework is intentionally organized so future capabilities can be added cleanly under:

- `cypress/e2e/api/`
- `cypress/e2e/performance/`
- `cypress/e2e/accessibility/`
- `cypress/support/services/`

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

## Visual Regression Coverage

The visual suites in `cypress/e2e/visual/` cover:

- baseline snapshots for homepage, search, cart, empty cart, and checkout
- responsive snapshots across desktop, tablet, and mobile
- advanced states such as invalid search, hover, cart detail, and CTA visibility
- latest-run HTML reporting through `cypress-image-diff-html-report`

## Design Decisions

- Page-object methods keep selectors and interaction flows centralized
- Fixture data keeps tests readable and easier to extend
- A custom `cy.searchProduct()` command isolates a repeated user action
- Visual helpers prepare the page for more stable full-page screenshots
- Report orchestration is handled through small Node scripts rather than long shell chains
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

### Run Visual Regression

```bash
npm run visual:run
npm run visual:baseline
npm run visual:responsive
npm run visual:all
```

### Open Cypress Interactively

```bash
npm run cy:open
```

## CI Workflow

`.github/workflows/cypress-run.yml`:

- installs dependencies with `npm ci`
- runs the UI suite on pushes and pull requests to `main` / `master`
- runs the visual baseline suite as a dedicated job
- exports JUnit XML test results as an artifact
- uploads visual HTML reports and baseline snapshots as artifacts

## Next Improvements

- Add API coverage under `cypress/e2e/api/`
- Add accessibility checks under `cypress/e2e/accessibility/`
- Add performance auditing under `cypress/e2e/performance/` or a dedicated `lighthouse/` area
- Extract shared helpers into `cypress/support/utils/` when utility code grows
