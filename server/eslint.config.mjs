import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Disable no-unused-vars rule for TypeScript files
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "off" to completely disable it
        { argsIgnorePattern: "^_" } // Allows ignoring unused variables that start with an underscore
      ],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];