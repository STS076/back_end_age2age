module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
        'node/no-missing-import': 'off',
        'node/no-missing-require': 'off',
        'import/no-unresolved': 'error',
        'import/named': 'error',
        'import/default': 'error',
        'import/namespace': 'error',
        'import/export': 'error',
        'import/no-duplicates': 'error',
        'jest/expect-expect': 'error',
        'jest/no-mocks-import': 'error',
        'jest/no-jest-import': 'error',
    },
    "ignorePatterns": [
        'node_modules/',
        '**/docker/**'
    ]
}
