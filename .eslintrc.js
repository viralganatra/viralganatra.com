module.exports = {
  extends: [require.resolve('@viralganatra/app-scripts/configs/eslint')],
  globals: {
    graphql: true,
    __PATH_PREFIX__: true,
  },
  rules: {
    'react/react-in-jsx-scope': ['off'],
  },
};
