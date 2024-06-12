// ESLint does not support ESM config
// ref: https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats
// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    //
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    //
    '@typescript-eslint',
  ],
  parserOptions: {
    project: [
      //
      './tsconfig.json',
      './tsconfig.vitest.json',
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
  }
}
