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
        oneOf: [
          {
            issuer: /\.(ts|tsx)$/i,
            use: [
              {
                loader: require.resolve('@svgr/webpack'),
              },
            ],
          },
          {
            type: 'asset/resource',
          },
        ],
      },
    ],
  },
});
