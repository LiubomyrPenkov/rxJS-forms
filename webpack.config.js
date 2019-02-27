const path = require('path');

module.exports = {
  entry: './app/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js'
  },
  target: 'web',
  mode: 'development'
};
