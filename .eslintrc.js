module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  ignorePatterns: ['node_modules', '.expo', '.expo-shared', 'babel.config.js'],
  rules: {
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 'off',
    camelcase: 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'react/no-unescaped-entities': 'off',
    'no-nested-ternary': 'off',
    'react/no-array-index-key': 'off',
    'no-shadow': 'off',
    'import/prefer-default-export': 'off',
  },
};
