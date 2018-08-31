const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },

  devtool: 'source-map',

  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html', to: '' },
      { from: 'family.json', to: '' },
      { from: 'worldEvents.json', to: '' }
    ])
  ]
};
