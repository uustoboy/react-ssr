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
    }),
     new webpack.HotModuleReplacementPlugin() 
  ],
  resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
  }
};

if(isDev){

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
}

module.exports = config;