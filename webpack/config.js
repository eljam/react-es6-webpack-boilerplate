import path from 'path';
import webpack from 'webpack';

import _ from 'lodash';

import Clean from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Root app path
const rootDir = path.resolve(__dirname, '..');
const cleanDirectories = ['build', 'dist'];
// Plugins configuration
const plugins = [new webpack.NoErrorsPlugin()];

// Default value for development env
let outputPath = path.join(rootDir, 'build');

const config = {
  context: rootDir,
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /bootstrap\/js\//, loader: 'imports-loader?jQuery=jquery' },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel', 'flowcheck'],
        exclude: [/node_modules/, /__tests__/]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'eslint-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!' +
         'sass?precision=10&outputStyle=expanded&sourceMap=true')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!' +
         'less?outputStyle=expanded&sourceMap=true')
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpe?g|png|gif)$/, loader: 'url?limit=10000&name=[sha512:hash:base64:7].[ext]' }
    ]
  }
};

module.exports = function configuration(options) {
  const prod = options.production;

  const hash = prod ? '-[hash]' : '';
  const suffix = prod ? '.prod' : '';

  const entryAppPath = [
    'bootstrap-sass!./src/theme/bootstrap.config.js',
    'font-awesome-webpack!./src/theme/font-awesome.config.js',
    './src/main.js'
  ];

  if (prod) {
    outputPath = path.join(rootDir, 'dist');
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        warnings: false,
        minimize: true,
        sourceMap: false
      })
    );
  }

  // Plugin configuration
  plugins.push(new Clean(cleanDirectories, rootDir));
  plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'static/index' + suffix + '.html'
    })
  );
  plugins.push(
    new webpack.optimize.DedupePlugin()
  );
  plugins.push(
    // You can use $ or jquery in all components
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  );
  plugins.push(
    new ExtractTextPlugin('styles/main' + hash + '.css')
  );
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors' + hash + '.js',
      minChunks: Infinity
    })
  );
  plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(true)
  );

  if (!prod) {
    entryAppPath.push('webpack/hot/dev-server');
  }

  return _.merge({}, config, {
    entry: {
      bundle: entryAppPath,
      vendors: ['react', 'react-router', 'react-hot-loader']
    },
    output: {
      path: outputPath,
      filename: '[name]' + hash + '.js'
    },
    plugins: plugins
  });
};
