module.exports = {
  entry: './public/js/src/app.jsx',
    output: {
      filename: './public/js/dist/app.js'
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
