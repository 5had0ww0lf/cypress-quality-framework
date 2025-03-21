# Cypress Automation Project

The script takes a baseline image of a page and uses pixelmatch to check for visual differences between the comparison image.

# Getting Started
Install Cypress:
```
npm i -D cypress
```

Then initialise Cypress if you don't have a project:
```
npx cypress open
```

Install the core package and the HTML report:
```
npm i cypress-image-diff-js@^1.32.0 --save-dev
```

```
npm i cypress-image-diff-html-report@^2.1.2 --save-dev
```

Plugin needed to allow Cypress to work with iframes
```
npm install cypress-iframe@^1.0.1 --save-dev
