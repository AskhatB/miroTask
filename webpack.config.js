const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/emails-editor.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'EmailsEditor'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[id].min.css'
    })
  ],
  node: {
    dns: 'mock',
    fs: 'empty',
    path: true,
    url: false
  }
};
