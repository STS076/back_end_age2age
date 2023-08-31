module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'eqeqeq': 'off',
        'curly': 'error',
        'quotes': ['error', 'single']
    },
    'ignorePatterns': [
        'node_modules/',
        '**/docker/**'
    ]
}