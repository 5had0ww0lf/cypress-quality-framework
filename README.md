# cypress-quality-framework

Cypress-based test framework demonstrating E2E, visual regression, API, and Lighthouse auditing — built as a portfolio for quality engineering roles.

## Application Under Test

[Restful Booker Platform](https://automationintesting.online) — a hotel booking demo application built specifically for QA practice, with a realistic user-facing UI and a documented REST API backend.

- **User side:** room browsing, availability search, booking, and contact
- **Admin side:** room management, message inbox, reports, and branding

## What This Project Demonstrates

- End-to-end test automation across both user and admin flows
- Visual regression testing with full-page screenshot capture, baseline management, and HTML diff reporting
- Page Object Model with reusable custom Cypress commands
- Fixture-driven test data with dynamic data generation utilities
- Cross-side E2E validation (user action → admin verification)
- Maintainable project structure designed to scale into Lighthouse auditing and API testing
- ESLint with Cypress plugin for code quality enforcement

## Framework Structure

```
cypress/
├── e2e/
│   ├── ui/           # E2E test specs
│   ├── visual/       # Visual regression tests
│   ├── lighthouse/   # Lighthouse audit tests (planned)
│   └── api/          # API tests (planned)
├── support/
│   ├── commands/     # Custom Cypress commands
│   ├── pages/        # Page objects
│   └── utils/        # Data generation and visual helper utilities
└── fixtures/         # Test data (JSON)
```

## Test Coverage

### Login
- Successful login with valid credentials and logout validation
- Error handling for wrong username, wrong password, and empty fields

### Room Management (Admin)
- Create a new room and verify it appears in the room list
- Edit an existing room and verify the updated values
- Error handling when updating a room with invalid field formats
- Delete a room and verify it no longer appears in the list

### Booking Flow (User)
- Complete a room booking end-to-end and validate the confirmation
- Error handling for missing required fields
- Error handling for invalid field formats

### Message Flow (Cross-side)
- Send a message from the user contact form and verify it appears in the admin inbox
- Error handling for empty required fields
- Error handling for invalid field formats

### Visual Regression
- Full-page baseline snapshots for the homepage, Single Room, Double Room, and Suite Room pages
- Data-driven spec — pages are loaded from a fixture file, making it trivial to add new URLs
- HTML diff report generated automatically after each visual run
- Baselines tracked in Git; comparison and diff output gitignored

## Design Decisions

- Page objects handle selectors and page-specific interactions. Custom commands handle reusable multi-step workflows (e.g. `cy.login()`, `cy.accessAdminPage()`).
- Room numbers and booking dates are generated dynamically to avoid conflicts across test runs and ensure tests remain independent.
- Fixtures are scoped per feature rather than shared globally, keeping test data readable and easy to maintain.
- `cy.intercept()` is used as a synchronization mechanism (not for API assertions) to wait for network requests before proceeding with UI assertions.
- Assertions live in spec files, not in page objects, keeping page objects reusable and free of test logic.
- `visualHelpers.js` centralizes all pre-screenshot preparation — CSS resets, sticky navbar repositioning, animation disabling, font and image load waiting — so the visual spec stays clean and the setup logic is maintainable in one place.

## Known Limitations

- **Booking conflicts:** tests targeting the shared demo app may occasionally fail with a 409 if another user has booked the same room for the same dates. This is an external dependency issue, not a test design flaw.
- **Login intermittency:** the admin login button occasionally does not respond on the first click — a known bug in the demo application that affects both manual and automated testing.
- **Branding page:** the branding form uses React-controlled inputs that resist programmatic interaction via Cypress. Combined with a broken default logo URL that causes 400 responses after app resets, reliable automation of branding updates was not achievable. This is documented here rather than masked with flaky tests.
- **App data resets:** the demo application resets its data periodically. Tests are designed to be self-contained and do not rely on persisted state between runs.
- **Visual regression — Next.js full-page screenshots:** the app sets `height: 100%` on `html` and `body`, which blocks Cypress's native `fullPage` capture. This is handled in `visualHelpers.js` by resetting those CSS properties before taking screenshots.
- **Visual regression — JSON report in interactive mode:** the JSON report used to generate the HTML diff report is only produced during `cypress run`, not `cypress open`. Visual regression is intended to be run headlessly via the provided npm scripts.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- Chrome (required for visual regression scripts)

### Install

```bash
npm install
```

### Open Cypress (interactive)

```bash
npm run cy:open
```

### Run E2E tests (headless)

```bash
npm run e2e:run
```

### Run Visual Regression

```bash
# Capture or refresh baselines
npm run visual:baseline

# Run comparison and generate HTML report
npm run visual:run
```

### Run All Quality Checks

```bash
npm run test:all
```

## Planned Expansion

The project structure is intentionally scaffolded to accommodate additional test types without restructuring:

- `cypress/e2e/lighthouse/` — performance and accessibility auditing
- `cypress/e2e/api/` — REST API testing with `cy.request()`