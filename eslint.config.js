import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist", "build", "node_modules", "*.config.js", "*.config.ts", "coverage"]),

  //JavaScript and TypeScript ESLint configurations
  {
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },

  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // TypeScript ESLint configurations
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,

      // React and React Hooks configurations
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "error",
      "@typescript-eslint/no-var-requires": "error",

      // General code quality rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "warn",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],

      // Import/Export rules
      "no-duplicate-imports": "error",

      // React specific rules
      "react-x/no-array-index-key": "warn",
      "react-x/no-children-prop": "error",
      "react-x/no-danger": "warn",
      "react-x/no-direct-mutation-state": "error",
      "react-x/no-find-dom-node": "error",
      "react-x/no-is-mounted": "error",
      "react-x/no-render-return-value": "error",
      "react-x/no-string-refs": "error",
      "react-x/no-this-in-sfc": "error",
      "react-x/no-unescaped-entities": "error",
      "react-x/no-unknown-property": "error",
      "react-x/no-unsafe-target-blank": "error",
      "react-x/prefer-es6-class": "error",
      "react-x/prefer-stateless-function": "warn",
      "react-x/require-render-return": "error",
      "react-x/self-closing-comp": "error",
      "react-x/void-dom-elements-no-children": "error",
    },
  },

  // Configuration for config files
  {
    files: ["vite.config.ts", "vitest.config.ts", "*.config.{js,ts}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Config files often import from devDependencies
      "no-console": "off",
    },
  },
]);
