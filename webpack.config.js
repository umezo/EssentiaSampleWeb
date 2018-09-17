const path = require("path");
module.exports = {
  entry: {
    app: './public/js/src/app.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js/dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-react',
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
          ]
        }
      }

    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  mode: 'production',
};
