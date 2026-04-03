# Cypress Visual Regression Testing

This project demonstrates visual regression testing for the GreenKart e-commerce website using Cypress and the `cypress-image-diff-js` plugin. Visual regression testing compares screenshots of web pages against baseline images to detect unintended visual changes.

## Features

- **Pixel-Perfect Comparisons**: Detect visual differences down to individual pixels
- **Baseline Management**: Create and update reference screenshots
- **HTML Reports**: Detailed visual diff reports with highlighted changes
- **Responsive Testing**: Multiple viewport breakpoints (desktop, tablet, mobile)
- **Code Quality**: ESLint integration with Cypress best practices
- **CI/CD Integration**: GitHub Actions workflow with automated testing
- **Advanced Scenarios**: Hover states, error states, and interaction testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Chrome browser (recommended for consistent rendering)

### Installation

1. **Clone the repository and checkout this branch:**
   ```bash
   git clone <repository-url>
   cd cypress-visual-regression
   git checkout visual-regression
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This installs:
   - Cypress 14.2.0
   - cypress-image-diff-js (visual comparison)
   - cypress-image-diff-html-report (HTML reporting)
   - cypress-iframe (cross-domain support)
   - ESLint with Cypress plugin

## Visual Test Suites

### Homepage Tests
- Initial page load and layout
- Product grid display
- Navigation elements

### Search Functionality
- Search results page
- Empty search results
- Search input styling

### Cart Operations
- Empty cart state
- Cart with items
- Cart totals and checkout button

### Checkout Process
- Checkout form layout
- Form validation states

## Configuration

### Plugin Setup
The visual regression plugin is configured in `cypress.config.js`:
```javascript
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin');
setupNodeEvents(on, config) {
  return getCompareSnapshotsPlugin(on, config);
}
```

### Custom Configuration
Settings in `cypress-image-diff.config.js`:
- `ROOT_DIR`: 'cypress-image-diff'
- `REPORT_DIR`: 'visual-reports'
- `SCREENSHOTS_DIR`: 'visual-screenshots'
- `FAILURE_THRESHOLD`: 0.25 (25% difference tolerance for demo site with dynamic content)

### Viewport Settings
- Width: 1280px
- Height: 720px
- Configured for consistent cross-browser testing

## Running Tests

### Interactive Mode
```bash
npm run cy:open
```

### Run All Visual Tests
```bash
npm run visual:run
```

### Run Responsive & Advanced Tests
```bash
npm run visual:responsive
```

### Run All Visual Tests
```bash
npm run visual:all
```

### Generate/Update Baselines
```bash
npm run visual:baseline
```
*Use this when intentionally updating the UI to create new baseline images*

### Run Specific Tests
```bash
npx cypress run --spec "cypress/e2e/visual-baseline.cy.js"
npx cypress run --spec "cypress/e2e/visual-responsive.cy.js"
```

## Baseline Management

### Creating Baselines
1. Run `npm run visual:baseline` after UI changes
2. Review generated images in `cypress-image-diff/visual-screenshots/`
3. Commit baseline images to version control

### Handling Changes
- **Intended Changes**: Update baselines with `visual:baseline`
- **Unexpected Changes**: Investigate and fix the root cause
- **False Positives**: Adjust thresholds or exclude dynamic content

## Reports

Visual diff reports are generated in `cypress-image-diff/visual-reports/`:
- HTML reports with side-by-side comparisons
- Highlighted differences with pixel counts
- Thumbnail navigation for multiple screenshots

## Best Practices

### Test Stability
- Use consistent viewport sizes
- Wait for dynamic content to load
- Avoid testing timestamps or random content
- Use data-cy attributes for reliable element selection

### Performance
- Run visual tests in headless mode for CI
- Limit screenshot frequency to key interactions
- Use appropriate thresholds to reduce false positives

### CI/CD Integration
- Commit baseline images to repository
- Run visual tests on pull requests
- Set up notifications for visual regressions
- Use parallel execution for faster feedback

## Responsive Design Testing

The branch includes comprehensive responsive viewport testing:

### Viewport Breakpoints
- Desktop: 1280x720
- Tablet: 1024x768
- Mobile: 375x667

### Running Responsive Tests
```bash
npx cypress run --spec "cypress/e2e/visual-responsive.cy.js"
```

This runs 9 responsive tests (3 breakpoints × 3 scenarios) plus 5 advanced interaction tests.
## Performance Optimization

### Headless Chrome Optimization
- Tests run in headless mode for faster execution
- Parallel execution possible across multiple node versions
- Baseline image caching for repeated runs

### Execution Strategy
- Run visual tests in headless mode for CI
- Use Electron or Chrome for consistency
- Screenshot throttling and network simulation available

### Optimization Tips
```bash
# Run tests in parallel (useful for large test suites)
npm run cy:run -- --parallel

# Run with specific browser optimization
npm run visual:run -- --browser chrome:headless
```

## Reporting and Metrics

### HTML Visual Diff Reports
Located in `cypress-image-diff/cypress-visual-report/`:
- Side-by-side baseline and comparison images
- Pixel difference highlighting with red overlay
- Difference percentage calculation
- Thumbnail navigation for quick review

### Report Contents
- Test execution summary
- Pass/fail status per test
- Visual diff images with annotations
- Timestamp and environment metadata

### Historical Tracking
- Reports timestamped: `report_DD-MM-YYYY_HHMMSS.json`
- Artifacts preserved for 30 days in GitHub Actions
- Enables trend analysis and regression detection

### Baseline Management
- Baselines tracked in Git for version control
- Diff and comparison folders excluded (regenerated per run)
- Easy rollback to previous versions via Git history

## CI/CD Integration

### GitHub Actions Workflow
The `.github/workflows/visual-regression.yml` provides:
- Automated testing on push and pull requests
- Multi-node version testing (18.x, 20.x)
- ESLint code quality checks
- Report artifact uploads for 30-day retention
- PR comments with result summaries

### Running in CI
```yaml
- Run ESLint for code quality
- Execute visual regression tests
- Upload HTML reports and baseline snapshots
- Comment on PRs with results
```

### Local Validation
Before pushing:
```bash
npm run lint          # Validate code
npm run visual:run    # Run tests locally
npm run visual:baseline  # Update baselines if needed
```

## Test Coverage

### Baseline Tests (visual-baseline.cy.js - 6 tests)
- Homepage with full content
- Search results page
- Empty search results
- Cart with items
- Empty cart
- Checkout page

### Responsive & Advanced Tests (visual-responsive.cy.js - 14 tests)
- 3 viewport breakpoints (desktop, tablet, mobile)
- 3 scenarios per breakpoint (homepage, search, cart) = 9 responsive tests
- 5 advanced scenarios (error states, hover, button visibility) = 5 advanced tests

**Total: 20 Visual Regression Tests**

### Current Status
- ✅ 5/6 core tests passing
- ⚠️ Homepage test has dynamic content variance (27% difference)
- ✅ All code passes ESLint validation
- ✅ CI/CD ready with GitHub Actions

## Troubleshooting

### Common Issues
- **Inconsistent Screenshots**: Ensure stable network and no animations
- **Dynamic Content**: Mock or wait for content to stabilize
- **Cross-browser Differences**: Use consistent browser versions

### Threshold Adjustments
Modify thresholds in test files for acceptable differences:
```javascript
cy.compareSnapshot('homepage', {
  threshold: 0.1, // 10% difference allowed
  thresholdType: 'percent'
});
```

## Project Structure

```
cypress/
├── e2e/
│   ├── visual-baseline.cy.js          # 6 baseline visual tests
│   └── visual-responsive.cy.js        # 14 responsive + advanced tests
├── fixtures/
│   └── product.json                   # Test data
├── support/
│   ├── GreenKartPage.js               # Page Object Model
│   └── commands.js                    # Custom commands

cypress-image-diff/
├── cypress-visual-report.html         # Main HTML report
├── cypress-visual-report/             # Timestamped JSON reports
└── cypress-visual-screenshots/
    └── baseline/                      # Reference images (tracked)

.github/workflows/
└── visual-regression.yml              # GitHub Actions CI/CD

.eslintrc.json                         # Cypress linting rules
cypress.config.js                      # Cypress configuration
cypress-image-diff.config.js           # Visual regression config
```

## Contributing

1. Create a feature branch
2. Add visual tests for new UI components
3. Generate baselines for new tests
4. Ensure tests pass in CI
5. Submit a pull request
