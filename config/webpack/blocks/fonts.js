module.exports = () => ({
  name: 'fonts',
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.woff2$/i,
        type: 'asset/resource',
      },
    ],
  },
});
