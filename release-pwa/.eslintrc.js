module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    extends: 'standard',
    plugins: [
        'html'
    ],
    rules: {
        'generator-star-spacing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': ['off', 'always'],
        'eqeqeq': 0,
        'spaced-comment': 0,
        'keyword-spacing': 0,
        'space-before-function-paren': 0,
        "quotes": [0, "single"],
        'no-unused-vars': 0,
        'comma-dangle': 0,
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}