# Introduction 
This project has the goal to run test and generate comprehensive and detailed lighthouse and pa11y reports. Lighthouse is a tool for improving the performance, quality, and correctness of your web apps. Pa11y runs accessibility tests on your pages.

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:

To be able to run tests and generate lighthouse reports, you'll need to do the following:

**1. Clone the repo in your local machine**

**2. Install Cypress:**

To install Cypress, follow this guide: https://docs.cypress.io/guides/getting-started/installing-cypress

```    
    $ yarn add cypress --dev
    # or
    $ npm install cypress --save-dev
```

**3. Install Lighthouse plugin:**

To install Lighthouse, after installing Cypress, run this code in the terminal:

```    
    $ yarn add -D @cypress-audit/lighthouse
    # or
    $ npm install --save-dev @cypress-audit/lighthouse
```

**4. Install Pa11y plugin:**

To install Pa11y, after installing Cypress and Lighthouse, run this code in the terminal:

```    
    $ yarn add -D @cypress-audit/pa11y
    # or
    $ npm install --save-dev @cypress-audit/pa11y
```

# Build and Test

If you wanna run Cypress and view the test being executed, you can run the following:

```    
    $ npx cypress open
```
After that, select E2E testing and the test that you wanna run.

But you can run these tests in the headless mode:

```    
    $ npx cypress run
```

To run a specific test, type the following:

```    
    $ npx cypress run --spec cypress/e2e/lighthouse-html-report.cy.js
```

# Reports

After running, reports can be found in 

```    
    cypress/reports
```

# NPM Scripts

Instead of using terminal, scripts were added for reuse. To enable it, you may need to right click on Explorer and check "NPM Scripts".

To open Cypress UI:
```    
    cy:open
```

To run all tests headlessly:
```    
    cy:open
```

To run one single test headlessly and in Chrome (other browsers may not not supported):
```    
    cy:run:lighthouse-html
```