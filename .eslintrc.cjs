module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import', 'unicorn'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.base.json'] },
  rules: {
    'import/order': [
      'error',
      { alphabetize: { order: 'asc' }, 'newlines-between': 'always' },
    ],
    'unicorn/prevent-abbreviations': 'off',
  },
  ignorePatterns: ['dist/**', '.next/**', 'build/**'],
};