module.exports = {
  entry: './client/js/src/app.jsx',
    output: {
      filename: './public/js/app.js'
    },
    devtool: 'inline-source-map',
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'jsx-loader'
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
};
