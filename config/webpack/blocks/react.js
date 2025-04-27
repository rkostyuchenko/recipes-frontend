const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = ({ isEnvDevelopment }) => ({
  name: 'react',
  mode: 'none',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                [
                  require.resolve('@babel/preset-react'),
                  {
                    development: isEnvDevelopment,
                    runtime: 'automatic',
                  },
                ],
                require.resolve('@babel/preset-typescript'),
              ],
              cacheDirectory: true,
              plugins: [
                [require.resolve('@babel/plugin-proposal-decorators'), { version: 'legacy' }],
                isEnvDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [isEnvDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
});
