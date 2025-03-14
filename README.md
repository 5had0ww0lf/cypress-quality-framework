# Cypress Automation Project

This project showcases the use of Cypress for end-to-end testing on a sample e-commerce website. The tests are organized using the Page Object Model (POM) to ensure maintainability and reusability. The project includes various test cases to verify the functionality of the website, such as searching for products, adding products to the cart, and verifying the cart's contents.

## Project Intent

The intent of this project is to demonstrate knowledge and proficiency in using Cypress for automated testing. The tests are designed to cover common user interactions on an e-commerce site, providing a comprehensive example of how to use Cypress for real-world testing scenarios.

## Setup Instructions

Follow these steps to set up the repository after cloning it to your machine:

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Steps

1. **Clone the repository**

   ```sh
   git clone <repository-url>
   cd <repository-directory>

2. **Install dependencies**
    ```sh
    npm install

3. **Run Cypress Tests**
    Open the Cypress Test Runner
    ```sh
    npx cypress open
    ```
    
    Or run the tests in headless mode
    ```sh
    npx cypress run
    ```

### Key Files

- cypress/e2e/greenKart/e2e.cy.js: Contains the test cases for the GreenKart page.
- cypress/fixtures/product.json: Contains test data for the product.
- cypress/support/GreenKartPage.js: Page Object Model for the GreenKart page.
- cypress.config.js: Cypress configuration file.

### Test Cases

The project includes the following test cases:

1. **Visit the URL and check the title**
2. **Search for a product**
3. **Add a product to the cart**
4. **Verify the cart is empty initially**
5. **Verify the total amount in the cart**
6. **Remove a product from the cart**
7. **Buy a product**

