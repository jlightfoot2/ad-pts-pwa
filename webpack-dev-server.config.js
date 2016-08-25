const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const PathRewriterPlugin = require('webpack-path-rewriter');

const config = {
  // Entry points to the project
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.js'),
  ],
  // Server Configuration options
  devServer: {
    contentBase: 'src/www', // Relative directory for base of server
    devtool: 'eval',
    hot: true, // Live-reload
    inline: true,
    port: 3002, // Port Number
    host: '0.0.0.0', // Change to '0.0.0.0' for external facing server
  },
  devtool: 'eval',
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js',
  },
  plugins: [
   new webpack.optimize.CommonsChunkPlugin({
        //name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    }),
    // This plugin looks for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),

    // This plugins optimizes chunks and modules by
    // how much they are used in your app
    new webpack.optimize.OccurenceOrderPlugin(),

    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 51200, // ~50kb
    }),
   
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),

    new PathRewriterPlugin({includeHash: true})
  ],
  module: {
    loaders: [
      {
        // React-hot loader and
        test: /\.js$/, // All .js files
        loaders: ['react-hot', 'babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
{
        test:   /\.(png|gif|jpe?g|svg)$/i,
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
