module.exports = {
    "extends": "airbnb",
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