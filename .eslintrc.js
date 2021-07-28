module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    require.resolve('@viralganatra/app-scripts/configs/eslint'),
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    graphql: true,
    __PATH_PREFIX__: true,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['node'] }],
    'no-underscore-dangle': ['error', { allow: ['__PATH_PREFIX__'] }],
    'react/react-in-jsx-scope': ['off'],
    'react/require-default-props': ['off'],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
        'no-use-before-define': 'off',
        'import/extensions': ['off'],
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-unused-vars': ['error'],
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': ['off'],
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
