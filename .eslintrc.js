export default {
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
  }
}
