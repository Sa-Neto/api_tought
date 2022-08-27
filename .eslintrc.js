module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'prefer-const': 'off',
    'no-undef': 'off',
    'arrow-body-style': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'linebreak-style': 'off',
  },
};
