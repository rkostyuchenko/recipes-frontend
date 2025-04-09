module.exports = () => ({
  name: 'images',
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
          },
        ],
      },
    ],
  },
});
