import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import * as tanstackQuery from '@tanstack/eslint-plugin-query'

export const reactQuerylintConfig = {
  name: '@tanstack/query',
  files: ['src/**/*.{ts,tsx}'],
  plugins: {
    '@tanstack/query': {
      rules: tanstackQuery.rules,
    },
  },
  rules: tanstackQuery.configs.recommended.rules,
};

export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      semi: "error",
      "prefer-const": "error",
    },
    files: ["src/**/*.ts", "src/**/*.tsx"],
    ignores: ["**/*.config.js", "!**/eslint.config.mjs"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  reactQuerylintConfig,
];