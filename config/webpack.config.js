import path from 'path';
import webpack from 'webpack';

import Clean from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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

  let entryPath = [path.resolve(__dirname, '../app/main.js')];

  if (!prod) {
    entryPath.push('webpack/hot/dev-server');
  }

  let config = {
    entry: entryPath,
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: {
      path: outputPath,
      filename: 'bundle.js'
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        }
      ],
      loaders: [{
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: [/node_modules/, /__tests__/]
      }]
    },
    plugins: plugins
  };

  return config;
};
