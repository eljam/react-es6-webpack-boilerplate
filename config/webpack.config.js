import path from 'path';
import webpack from 'webpack';

import _ from 'lodash';

import Clean from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BowerWebpackPlugin from 'bower-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Root app path
let rootDir = path.resolve(__dirname, '..');
let cleanDirectories = ['build', 'dist'];
// Plugins configuration
let plugins = [new webpack.NoErrorsPlugin()];

// Default value for development env
let outputPath = path.join(rootDir, 'build');
let suffix = 'dev';

let config = {
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /bower_components/],
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel', 'flowcheck'],
        exclude: [/node_modules/, /bower_components/, /__tests__/]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!' +
         'sass?precision=10&outputStyle=expanded&sourceMap=true&includePaths[]=' +
         path.resolve(__dirname, '../bower_components/bootstrap-sass/assets/stylesheets'))
      },
      { test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/, loader: 'url?limit=10000&name=[sha512:hash:base64:7].[ext]' }
    ]
  }
};

module.exports = function configuration(options) {
  let prod = options.production;

  let hash = prod ? '-[hash]' : '';

  let entryAppPath = [path.resolve(__dirname, '../app/main.js')];

  if (prod) {
    suffix = 'prod';
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
      template: 'app/assets/index.' + suffix + '.html'
    })
  );
  plugins.push(
    new BowerWebpackPlugin({
      modulesDirectories: ['bower_components'],
      manifestFiles: 'bower.json',
      includes: /.*/,
      excludes: [],
      searchResolveModulesDirectories: true
    })
  );
  plugins.push(
    new webpack.optimize.DedupePlugin()
  );
  plugins.push(
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
