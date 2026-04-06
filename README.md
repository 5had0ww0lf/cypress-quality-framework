# Cypress Quality Framework

A Cypress-based quality engineering portfolio project built around the GreenKart demo storefront. The goal of this repo is to show more than basic end-to-end test automation: it demonstrates a capability-based framework with UI coverage, visual regression testing, Lighthouse auditing, reusable page objects, custom commands, and CI artifact publishing.

## What This Project Demonstrates

- UI automation for core ecommerce flows
- Visual regression testing with baseline management and HTML reporting
- Lighthouse performance, accessibility, best-practices, and SEO auditing
- Maintainable test design through Page Object Model, fixtures, and support utilities
- Capability-based project structure designed to scale into API and accessibility testing
- GitHub Actions execution with artifact publishing for reports and baseline assets

## Implemented Capabilities

### UI End-to-End Testing

The UI suite in `cypress/e2e/ui/greenkart.cy.js` covers:

- storefront load and title validation
- valid and invalid product search flows
- add-to-cart and remove-from-cart flows
- cart totals and empty-cart validation
- purchase flow completion
- request interception during application load

### Visual Regression Testing

The visual suites in `cypress/e2e/visual/` cover:

- baseline snapshots for homepage, search, cart, empty cart, and checkout states
- responsive checks across desktop, tablet, and mobile viewports
- generated HTML diff reporting through `cypress-image-diff-html-report`
- tracked baseline snapshots with generated comparison and diff output ignored from Git

Visual report generation is automatic when the visual workflow runs.

### Lighthouse Auditing

The Lighthouse suite in `cypress/e2e/lighthouse/` covers:

- desktop Lighthouse audits
- mobile-emulated Lighthouse audits
- timestamped HTML report generation under `lighthouse-reports/`
- calibrated thresholds that better match a public demo site than production-grade budgets

Because this project audits a public demo application, Lighthouse scores can vary slightly between local and CI environments.

## Framework Structure

```text
cypress-quality-framework/
|
|-- cypress/
|   |-- e2e/
|   |   |-- ui/
|   |   |   `-- greenkart.cy.js
|   |   |-- lighthouse/
|   |   |   `-- lighthouse.cy.js
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
|       |-- lighthouse-config.json
|       `-- product.json
|
|-- .github/workflows/
|   `-- cypress-run.yml
|-- cypress-image-diff/
|   `-- cypress-visual-screenshots/
|       `-- baseline/
|-- cypress-image-diff-html-report.config.js
|-- cypress-image-diff.config.js
|-- lighthouse-reports/
|-- scripts/
|   |-- lighthouse-report-utils.js
|   |-- report-utils.js
|   `-- run-visual-tests.js
|-- cypress.config.js
|-- package.json
`-- README.md
```

## Design Choices

- Page-object methods centralize selectors and business actions instead of scattering DOM logic across tests.
- Fixtures keep test data readable and make scenario expansion easier.
- Custom commands isolate repeated user actions such as product search.
- Visual helpers improve screenshot stability for full-page comparisons.
- Small Node scripts handle reporting and cleanup more reliably than long shell chains.
- CI publishes artifacts so visual and Lighthouse output can be reviewed outside the terminal.

## Application Under Test

- URL: `https://rahulshettyacademy.com/seleniumPractise/#/`
- Domain: ecommerce browsing and checkout
- Purpose: demonstrate maintainable Cypress test architecture on a realistic public demo app

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- Chrome for Lighthouse execution

### Install

```bash
npm install
```

### Run the UI Suite

```bash
npm run e2e:run
```

### Run Visual Regression

```bash
npm run visual:run
npm run visual:baseline
npm run visual:responsive
npm run visual:all
```

`visual:baseline` refreshes the tracked baseline snapshots for the baseline visual suite before comparing against the current run.

### Run Lighthouse Audits

```bash
npm run lighthouse:run
```

### Run All Quality Checks

```bash
npm run quality:run
```

This runs the UI suite, the baseline visual regression suite, and the Lighthouse audit in sequence.

### Open Cypress Interactively

```bash
npm run cy:open
```

## CI Workflow

The GitHub Actions workflow in `.github/workflows/cypress-run.yml`:

- installs dependencies with `npm ci`
- runs the UI suite on pushes and pull requests to `main` and `master`
- runs visual regression in a dedicated job
- runs Lighthouse auditing in a dedicated Chrome-based job
- uploads JUnit, visual report, and Lighthouse report artifacts

## Planned Expansion

This framework is intentionally structured so additional capabilities can be added without flattening the repo:

- `cypress/e2e/api/`
- `cypress/e2e/accessibility/`
- `cypress/support/services/`

Those areas are not scaffolded yet because this branch only keeps structure backed by real implementation.
