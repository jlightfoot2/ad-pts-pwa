const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const PathRewriterPlugin = require('webpack-path-rewriter');
const config = {
  entry: ['babel-polyfill',path.join(__dirname, '/src/app/app.js')],
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js', // Name of output file
  },
  plugins: [
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'ad-asset-cache1',
        filename: 'ad-service-worker.js',
        maximumFileSizeToCacheInBytes: 104857600, //100Mb
        staticFileGlobs: [
                          'build/**/*.{js,html,css,json}',
                          'build/static/**/*.{png,jpg,jpeg,svg,gif,mp4}'
                          ],
        runtimeCaching: [{
          handler: 'cacheFirst',
          urlPattern: /dynamic\/[\w_-]+\.(gif|jpg|jpeg|png|svg|mp4|mp3)$/i
        }],
        "stripPrefix": "build/"
      }
    ),
    new PathRewriterPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
      {
        test:   /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=100&name=static/[name]-[hash].[ext]',
        /*
        TODO upping limit cause images to in-line but this causes probems
        with webpack-path-rewriter https://github.com/skozin/webpack-path-rewriter
         */
      },
      {
        test:   /\.(mp3|mp4)$/i,
        loader: 'file?name=dynamic/[name]-[hash].[ext]',
      },
      {
          test: /\.css/,
          loader: "file?name=[name]-[hash].[ext]"
      },
      {
        test: /[.]html$/,
        loader: PathRewriterPlugin.rewriteAndEmit({
          name: '[name].html'
        })
      }
    ],
  },
};

module.exports = config;
