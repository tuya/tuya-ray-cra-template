module.exports = {
  root: true,
  extends: [
    'tuya/react',
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'tuya-panel',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'one-var': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react/destructuring-assignment': 1,
  },
  plugins: ['@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
