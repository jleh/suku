const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],

  output: {
    filename: '[name].[contenthash].js',
    publicPath: process.env.NODE_ENV === 'production' ? '/suku/' : '/',
    path: path.resolve(process.cwd(), 'dist')
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
              modules: {
                localIdentName: '[name]__[local]___[chunkhash:base64:5]'
              }
            }
          },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'initial'
    }
  },

  devtool: 'source-map',

  devServer: {
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /family.json$/, to: '/family.json' },
        { from: /world.json$/, to: '/world.json' },
        { from: /places.json$/, to: '/places.json' }
      ]
    }
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'family.json', to: '' },
        { from: 'world.json', to: '' },
        { from: 'places.json', to: '' },
        { from: 'blog.md', to: '' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
