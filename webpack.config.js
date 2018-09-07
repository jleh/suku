const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  output: {
    filename: '[name].[hash].js',
    publicPath: process.env.NODE_ENV === 'production' ? '/suku/' : undefined
  },

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
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /family.json$/, to: '/family.json' },
        { from: /worldEvents.json$/, to: '/worldEvents.json' }
      ]
    }
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'family.json', to: '' },
      { from: 'worldEvents.json', to: '' }
    ]),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};
