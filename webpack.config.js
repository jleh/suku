const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  devtool: 'source-map',

  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html', to: '' },
      { from: 'family.json', to: '' },
    ]),
  ],

};
