const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  devtool: 'source-map',
  resolve: {
    modules: [ 'node_modules' ],
    extensions: ['.js', '.jsx'],
    alias: {
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat', // Must be below test-utils
      scales: path.resolve(__dirname, 'scales'),
    }
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: "/node_modules",
        loader: "babel-loader"
      },
      {
        test: /\.svg$/,
        use: [{
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              "plugins": [
                {mergePaths: false},
                {prefixIds: false},
                {cleanupIDs: false}
              ]
            }
          }
        }],
      },
      {
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader,
           options: { name: "[name].css" }},
          {loader: 'css-loader'},
        ]
      },
      { test: /\.scl$/,
        use: [
          {loader: 'raw-loader'}
        ]
      },
      {
        test:/\.(png|jpg|gif)$/,
        use:[{
          loader:'url-loader',
          options:{
            limit:1024,
            outputPath:'./'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: "./src/keys.htm", }),
    new CopyWebpackPlugin([
      // TODO generate manifest
      {from: "manifest.webmanifest", to: './'},
      {from: "192.png", to: './'},
      {from: "256.png", to: './'},
      {from: "512.png", to: './'},
      {from: "1024.png", to: './'},
      {from: "sounds", to: './sounds'},
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new WorkboxPlugin.GenerateSW(),
  ],
  devServer: {
    host: '0.0.0.0'
  }
}
