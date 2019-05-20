const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV = 'development';


const config = {
  entry: {
  	app: path.join(__dirname,'../client/app.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash].js',
    publicPath: ''
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
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'../client/template.html')
    })
  ]
};

if(isDev){
  config.devServer = {
    host:
  }
}

module.exports = config;