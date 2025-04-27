const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ NODE_ENV, isEnvProduction, isEnvDevelopment }) => ({
  name: 'css',
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          isEnvProduction && { loader: MiniCssExtractPlugin.loader },
          isEnvDevelopment && { loader: require.resolve('style-loader') },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: isEnvProduction ? '[hash:base64]' : '[name]__[local]--[hash:base64:5]',
              },
              esModule: false,
              sourceMap: isEnvDevelopment,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: isEnvDevelopment,
            },
          },
        ],
      },
    ].filter(Boolean),
  },
  plugins: [
    isEnvProduction &&
      new MiniCssExtractPlugin({
        filename: 'static/[name].[contenthash].css',
      }),
  ].filter(Boolean),
});
