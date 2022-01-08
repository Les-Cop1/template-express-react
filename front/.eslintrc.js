module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    settings: {
        react: {
            version: 'detect',
        }
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    plugins: [
        "react"
    ],
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaFeatures: {
            "jsx": true
        },
        sourceType: "module"
    },
    rules: {
        'no-console': 'off',
    },
}
