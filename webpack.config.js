module.exports = {
	entry: './src/main.jsx',
	output: {
		filename: 'app.js',
		path: __dirname + '/app/'
	},
	module: {
		rules: [

			{
				test: /\.jsx?/,
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015']
				}
			}
		]
	}
};
