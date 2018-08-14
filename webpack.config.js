const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  devtool: 'source-map',

  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html', to: '' },
      { from: 'family.json', to: '' }
    ])
  ]

};
