const HtmlWebpackPlugin = require('html-webpack-plugin')

const path              = require('path'),
      webpack           = require('webpack');


const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, "/public/index.html"),
  filename: 'index.html',
});

// Rules
const jsRules = {
  test: /\.(js|jsx)$/,
  use: 'babel-loader',
  exclude: /node_modules/
};
const fileRules = {
  test: /\.(png|jpg|gif|svg|otf|eot|ttf|woff)$/,
  loader: 'file-loader',
  options: {
    publicPath: "./",
    outputPath: './source/'
  }
};

const urlRules = {
    test: /\.(png|jpg|gif|svg|otf|eot|ttf|woff)$/,
    loader: 'resolve-url-loader',
    options: {
        publicPath: "./",
        outputPath: './source/'
    }
};

module.exports = {
  entry: './source/index.js',
  module: {
    rules: [
      jsRules,
      fileRules,
      urlRules
    ]
  },
  plugins: [
    HTMLWebpackPluginConfig,
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: { '@': path.join(__dirname) }
  },
};
