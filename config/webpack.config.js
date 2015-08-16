import path from 'path';
import webpack from 'webpack';

import Clean from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BowerWebpackPlugin from 'bower-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = function configuration(options) {
  let prod = options.production;

  // Root app path
  let rootDir = path.resolve(__dirname, '..');

  let cleanDirectories = ['build', 'dist'];
  let plugins = [new webpack.NoErrorsPlugin()];

  // Default value for development env
  let outputPath = path.join(rootDir, 'build');
  let suffix = 'dev';

  if (prod) {
    suffix = 'prod';
    outputPath = path.join(rootDir, 'dist');
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
      excludes: /.*\.less/,
      searchResolveModulesDirectories: true
    })
  );
  plugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  );
  plugins.push(
    new ExtractTextPlugin('styles/main.css')
  );

  let entryAppPath = [path.resolve(__dirname, '../app/main.js')];

  if (!prod) {
    entryAppPath.push('webpack/hot/dev-server');
  }

  let config = {
    entry: {
      bundle: entryAppPath
    },
    resolve: {
      modulesDirectories: ['node_modules', 'bower_components'],
      extensions: ['', '.js', '.jsx', '.scss']
    },
    output: {
      path: outputPath,
      filename: '[name].js'
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
        { test: /\.gif$/, loader: 'url?limit=10000&mimetype=image/gif' },
        { test: /\.jpg$/, loader: 'url?limit=10000&mimetype=image/jpg' },
        { test: /\.png$/, loader: 'url?limit=10000&mimetype=image/png' },
        { test: /\.woff$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
        { test: /\.woff2$/, loader: 'url?limit=10000&mimetype=application/font-woff2' },
        { test: /\.ttf$/, loader: 'file?mimetype=application/vnd.ms-fontobject' },
        { test: /\.eot$/, loader: 'file?mimetype=application/x-font-ttf' },
        { test: /\.svg$/, loader: 'file?mimetype=image/svg+xml' }
      ]
    },
    plugins: plugins
  };

  return config;
};
