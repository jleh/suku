const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  output: {
    filename: '[name].[hash].js',
    publicPath: process.env.NODE_ENV === 'production' ? '/suku/' : '/'
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
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader' }
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
      { from: 'worldEvents.json', to: '' },
      { from: 'blog.md', to: '' }
    ]),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
