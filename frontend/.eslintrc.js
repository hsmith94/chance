module.exports = {
    env: {
        es2021: true,
        node: true,
        'react-native/react-native': true
    },
    extends: [
        'plugin:react/recommended',
        'prettier'
    ],
    plugins: [
        'react',
        'react-native'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
};