# Cypress Lighthouse Integration Project

This project demonstrates advanced Cypress testing capabilities with integrated performance auditing using Lighthouse and accessibility testing with Pa11y. It showcases automated quality assurance for web applications, generating detailed reports for performance metrics, accessibility compliance, and best practices.

## Features

- **End-to-End Testing**: Functional tests for e-commerce flows (search, cart, checkout)
- **Performance Auditing**: Lighthouse reports for desktop and mobile with configurable thresholds
- **Accessibility Testing**: Pa11y audits for WCAG compliance and automated violation detection
- **API Interception**: Network request validation and monitoring
- **Page Object Model**: Maintainable test architecture
- **Code Quality**: ESLint integration with Cypress-specific linting rules
- **Automated Reporting**: HTML reports generation for audits

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Chrome browser (required for Lighthouse/Pa11y plugins)

### Installation

1. **Clone the repository and checkout this branch:**
   ```bash
   git clone <repository-url>
   cd cypress-portfolio
   git checkout lighthouse-integration
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This installs Cypress, Lighthouse plugin, Pa11y plugin, and ESLint.

## Test Suites

### Core E2E Tests (`cypress/e2e/greenKart/e2e.cy.js`)
- Homepage navigation and title verification
- Product search functionality (valid/invalid searches)
- Cart operations (add, remove, totals)
- Complete purchase workflow
- Network request interception

### Performance Tests (`cypress/e2e/greenkartHomePage.cy.js`)
- Lighthouse desktop performance audit
- Lighthouse mobile performance audit
- Automated HTML report generation

### Accessibility Tests (`cypress/e2e/accessibility.cy.js`)
- Pa11y accessibility compliance audit
- API request interception validation

## Configuration

### Lighthouse Thresholds
Configured for realistic demo site performance in `cypress/fixtures/lighthouseConfig.json`:
- Performance: ≥30
- Accessibility: ≥60
- Best Practices: ≥70
- SEO: ≥82
- PWA: ≥25

### Browser Requirements
Chrome browser is mandatory due to Lighthouse/Pa11y plugin dependencies.

## Running Tests

### Interactive Mode
```bash
npm run cy:open
```

### Headless Mode (All Tests)
```bash
npm run cy:run
```

### Individual Test Suites
```bash
npx cypress run --spec "cypress/e2e/greenKart/e2e.cy.js"
npx cypress run --spec "cypress/e2e/greenkartHomePage.cy.js"
npx cypress run --spec "cypress/e2e/accessibility.cy.js"
```

### Code Linting
```bash
npm run lint
```

## Reports

Audit reports are automatically generated in `cypress/reports/`:
- Lighthouse performance reports (HTML)
- Accessibility audit results

## Project Structure

```
cypress/
├── e2e/
│   ├── greenKart/e2e.cy.js          # Core E2E tests
│   ├── greenkartHomePage.cy.js      # Performance audits
│   └── accessibility.cy.js          # Accessibility tests
├── fixtures/
│   ├── product.json                 # Test data
│   └── lighthouseConfig.json        # Audit configuration
├── support/
│   ├── commands.js                  # Custom commands
│   ├── GreenKartPage.js             # Page Object Model
│   └── e2e.js                       # Global setup
└── config.js                        # Cypress configuration
```

## Usage

This branch demonstrates advanced Cypress testing with performance and accessibility integration. Run `npm run cy:run` to execute the full test suite and generate comprehensive audit reports.