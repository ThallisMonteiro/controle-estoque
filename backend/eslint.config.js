const js = require('@eslint/js');

module.exports = [
  {
    ignores: ['node_modules/', '.env', '.DS_Store', 'dist/', '.next/', 'prisma/migrations/']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        setImmediate: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly',
        clearImmediate: 'readonly',
        clearInterval: 'readonly',
        clearTimeout: 'readonly'
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      'indent': ['error', 2],
      'linebreak-style': ['error', 'windows'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'eol-last': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
      'space-infix-ops': 'error',
      'no-trailing-spaces': 'error',
      'brace-style': ['error', '1tbs', { allowSingleLine: true }]
    }
  }
];
