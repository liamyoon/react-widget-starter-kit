module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'jsdoc'],
  rules: {
    'react/prop-types': 'off',
    'prettier/prettier': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/interface-name-prefix': [
      'error',
      { prefixWithI: 'always' }
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false }
    ],
    eqeqeq: 'error',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-property-type': 'off',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/no-types': 'warn',
    'prefer-arrow-callback': 'error'
  },
  settings: {
    jsdoc: {
      mode: 'typescript'
    },
    react: {
      version: 'detect'
    }
  }
};
