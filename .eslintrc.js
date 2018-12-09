module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "jsx": true
        }
    },
    env: {
        "browser": true,
        "jest/globals": true
    },
    rules: {
        'comma-dangle': [2, 'never'],
        'react/jsx-filename-extension': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/prop-types': 'off',
        'react/no-array-index-key': 'off'
    },
    plugins: ['jest']
};
