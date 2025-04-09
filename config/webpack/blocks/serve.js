module.exports = ({ isEnvDevelopment }) => ({
  name: 'serve',
  mode: 'none',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
  devtool: isEnvDevelopment ? 'inline-source-map' : 'source-map',
});
