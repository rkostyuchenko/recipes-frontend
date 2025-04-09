module.exports = ({ isEnvProduction }) => ({
  name: 'optimization',
  mode: 'none',
  optimization: {
    ...(isEnvProduction && {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true,
          },
        },
      },
    }),
  },
});
