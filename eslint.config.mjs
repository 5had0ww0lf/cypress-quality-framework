import js from "@eslint/js";
import globals from "globals";
import cypress from "eslint-plugin-cypress/flat";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  { files: ["cypress/**/*.js"], ...cypress.configs.recommended },
]);