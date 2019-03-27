path = require('path');

module.exports = {
  // entry: './client/src/index.js',
  entry: path.join(__dirname, '/client/dist'),
  output: {
    path: path.resolve(__dirname, '/client/dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/dist'
  }
};  