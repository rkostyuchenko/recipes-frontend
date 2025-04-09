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
              modules: true,
              esModule: false,
              sourceMap: isEnvDevelopment,
            },
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
