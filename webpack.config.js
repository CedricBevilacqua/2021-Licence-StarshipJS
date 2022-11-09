const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const PRODUCTION = false;

module.exports = {
  entry: path.resolve(__dirname, './src/scripts/main.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/bundle.js'
  },

  mode :  (PRODUCTION ? 'production' : 'development'),
  devtool : (PRODUCTION ? undefined : 'eval-source-map'),

  devServer: {
      static: {
	       publicPath: path.resolve(__dirname, 'dist'),
	       watch : true
      },
      host: 'localhost',
      port : 8888,
      open : 'firefox'
  },

  module: {
    rules : [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name : '[name].[ext]',
              outputPath : 'images'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/images/*',
          to:  'images/[name].[ext]',
          noErrorOnMissing: true
        },
        {
          from: './src/style/*',
          to:  'style/[name].[ext]',
          noErrorOnMissing: true
        },
        {
          from: './src/assets/images/*',
          to:  'assets/images/[name].[ext]',
          noErrorOnMissing: true
        },
      ]
    })
  ]

};
