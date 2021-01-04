module.exports = {
  extends: [require.resolve('@viralganatra/app-scripts/configs/eslint')],
  rules: {
    'react/react-in-jsx-scope': ['off'],
    globals: {
      __PATH_PREFIX__: true,
    },
  },
};
