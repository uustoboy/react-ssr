const path = require(path);

module.exports = {
	output: {
	    path: path.join(__dirname, '../dist'),
	    publicPath: ''
  	},
	module: {
	    rules: [
	      {
	        enforce: 'pre',
	        test: /.(js|jsx)$/,
	        loader: 'eslint-loader',
	        exclude: [
	          path.resolve(__dirname, '../node_modules')
	        ]
	      },
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
}