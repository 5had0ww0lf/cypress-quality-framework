# Cypress Visual Regression Testing Portfolio

This project showcases a visual regression testing workflow for the GreenKart demo storefront using Cypress, `cypress-image-diff-js`, and `cypress-image-diff-html-report`. The goal is to demonstrate how I structure UI regression coverage, maintain visual baselines, and generate polished HTML reports for local review and CI artifacts.

## Why This Project Stands Out

- Visual baseline coverage for core ecommerce flows
- Responsive regression coverage across desktop, tablet, and mobile
- A polished latest-run HTML report generated automatically after each execution
- CI pipeline that lints, runs visual checks, and uploads report artifacts
- Maintainable support code with reusable page-object interactions and shared snapshot helpers

## Tech Stack

- Cypress 14
- `cypress-image-diff-js`
- `cypress-image-diff-html-report`
- GitHub Actions
- ESLint
- Node.js 18+

## Application Under Test

- URL: `https://rahulshettyacademy.com/seleniumPractise/#/`
- Domain: ecommerce product search and checkout flow
- Focus: visual stability across key user journeys rather than broad functional coverage

## Test Coverage

### Baseline Suite

`cypress/e2e/visual-baseline.cy.js` covers:

- Homepage layout
- Search results state
- Empty search state
- Cart with items
- Empty cart
- Checkout page

### Responsive and Advanced Suite

`cypress/e2e/visual-responsive.cy.js` covers:

- Desktop, tablet, and mobile viewports
- Homepage, search, and cart layouts per viewport
- Empty-result state
- Hover state
- Add-to-cart call-to-action visibility
- Cart detail view
- Checkout call-to-action visibility

## Project Structure

```text
cypress/
|-- e2e/
|   |-- visual-baseline.cy.js
|   `-- visual-responsive.cy.js
|-- fixtures/
|   `-- product.json
`-- support/
    |-- GreenKartPage.js
    |-- e2e.js
    `-- visual-helpers.js

cypress-image-diff/
`-- cypress-visual-screenshots/
    `-- baseline/

cypress-image-diff-html-report/
`-- index.html

scripts/
|-- report-utils.js
`-- run-visual-tests.js

.github/workflows/
`-- visual-regression.yml
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Run Commands

```bash
# Run the baseline suite
npm run visual:run

# Refresh baseline images intentionally
npm run visual:baseline

# Run responsive and advanced scenarios
npm run visual:responsive

# Run all matching visual specs
npm run visual:all

# Lint the project
npm run lint
```

## Reporting Workflow

Each visual test execution follows this sequence:

1. Cypress runs the requested visual spec
2. JSON result data is generated temporarily in `cypress-image-diff/cypress-visual-report/`
3. A polished HTML report is generated in `cypress-image-diff-html-report/index.html`
4. Intermediate JSON files are removed and the temporary JSON directory is deleted when empty
5. The project keeps only the latest report instead of timestamped historical copies

The report includes:

- Pass/fail totals
- Per-snapshot comparisons
- Baseline, comparison, and diff image references
- Browser and execution metadata

## Baseline Strategy

Baseline images are committed for the current test naming scheme only. Comparison, diff, JSON, and HTML report outputs are treated as generated artifacts. The current failure threshold is `0.25`, which is intentionally tolerant because the demo site can introduce timing-related visual variance. That threshold is useful for this unstable demo target, but it is higher than I would allow in a production UI pipeline.

For a production system, I would normally pair this with tighter thresholds plus stronger control over dynamic content, fonts, and network timing.

## Continuous Integration

`.github/workflows/visual-regression.yml` runs:

- `npm ci`
- `npm run lint`
- `npm run visual:run`
- artifact uploads for HTML reports and baseline snapshots
- a pull request comment summarizing the workflow result

## Design Decisions

- A page object keeps repeated UI interactions readable
- A shared snapshot helper prepares the page for more stable full-page captures
- Report orchestration is handled in small Node scripts rather than long npm shell chains
- The default report viewer from `cypress-image-diff-html-report` is used because it provides a stronger presentation than the older in-folder output
- The workflow keeps only the latest `index.html` because historical reports are misleading unless their related diff assets are archived too

## Known Limitations

- The public demo site can change or render inconsistently between runs
- A higher visual threshold is used to absorb that instability
- Historical HTML reports are not archived because the related diff assets are regenerated on each run

## What I Would Improve Next

- Add a smoke functional suite alongside the visual suite
- Mock or stabilize dynamic homepage content to reduce threshold tolerance
- Publish sample report screenshots directly in the README for faster review
- Add status badges once the default branch and CI flow are finalized
