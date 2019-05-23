const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV = 'development';
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');



const config = webpackMerge(baseConfig, {
  entry: {
  	app: path.join(__dirname,'../client/app.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'../client/template.html')
    })
  ]
};

if(isDev){
  // config.entry = {
  //   app: [
  //     'react-hot-loader/patch',
  //     path.join(__dirname,'../client/app.js')
  //   ]
  // }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname,'../dist/'),
    hot: true,
    overlay:{
      errors: true
    },
    publicPath:'/',
    historyApiFallback: {
      index: "/index.html"
    },
  }
})

module.exports = config;