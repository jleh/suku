module.exports = {
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    indent: 'off',
    'comma-dangle': 'off',
    'function-paren-newline': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'default-param-last': 'off',
  },
  plugins: ['jest'],
};
