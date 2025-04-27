const { merge } = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('node:path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const projectRoot = path.resolve();

const environment = {
  NODE_ENV: process.env.NODE_ENV,
  isEnvProduction: process.env.NODE_ENV === 'production',
  isEnvDevelopment: process.env.NODE_ENV === 'development',
};

module.exports = merge(
  require('./blocks/react')(environment),
  require('./blocks/css')(environment),
  require('./blocks/images')(),
  require('./blocks/fonts')(),
  require('./blocks/optimization')(environment),
  require('./blocks/serve')(environment),
  {
    mode: environment.NODE_ENV,
    entry: './src/main.tsx',
    output: {
      publicPath: '/',
      filename: environment.isEnvProduction ? `static/[name].[contenthash].js` : '[name].js',
      assetModuleFilename: `static/[contenthash][ext]`,
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      modules: [path.join(projectRoot, 'src'), 'node_modules'],
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser.js',
      }),
      new HtmlWebPackPlugin({
        favicon: path.join(projectRoot, 'src/favicon.svg'),
      }),
      new Dotenv({
        prefix: 'import.meta.env.',
      }),
    ],
  },
);
