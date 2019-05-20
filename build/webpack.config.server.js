const path = require('path');

const config = {
  target: 'node',
  entry: {
  	app: path.join(__dirname,'../client/server-entry.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server-entry.js',
    publicPath: '',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
            loader: 'babel-loader',
            options: {
             presets: ['@babel/preset-env']
            }
	      },
        exclude: /(node_modules|bower_components)/,
      }
    ]
  }
};

module.exports = config;