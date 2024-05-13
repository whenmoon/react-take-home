import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import * as tanstackQuery from '@tanstack/eslint-plugin-query'

export const reactQuerylintConfig = {
  name: '@tanstack/query',
  files: ['src/**/*.{js,jsx,ts,tsx}'],
  plugins: {
    '@tanstack/query': {
      rules: tanstackQuery.rules,
    },
  },
  rules: tanstackQuery.configs.recommended.rules,
};

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      semi: "error",
      "prefer-const": "error",
      "max-len": ["error", { "code": 100 }]
    },
    files: ["src/**/*.ts", "src/**/*.tsx"],
    ignores: ["**/*.config.js", "!**/eslint.config.mjs"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  reactQuerylintConfig,
];