/**
 * Adapted from angular2-webpack-starter
 */
'use strict';

const helpers = require('./scripts/helpers');
const webpack = require('webpack');

/**
 * Webpack Plugins
 */
// const ProvidePlugin = require('webpack/lib/ProvidePlugin');
// const DefinePlugin = require('webpack/lib/DefinePlugin');
// const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const pkg = require('./package.json');
const name = pkg.name;
const targetFolder = './dist/package/bundles';

module.exports = {
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  entry: helpers.root('src/core'),

  output: {
    path: helpers.root(targetFolder),
    publicPath: '/',
    filename: `${name}.umd.js`,
    libraryTarget: 'umd',
    library: name
  },

  // require those dependencies but don't bundle them
  externals: [/^\@angular\//, /^rxjs\//],

  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader?declaration=false',
      exclude: [/\.e2e\.ts$/]
    }]
  },

  plugins: [
    // fix the warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src')
    ),

    new webpack.LoaderOptionsPlugin({
      options: {
        tslintLoader: {
          emitErrors: false,
          failOnHint: false
        }
      }
    })
  ]
};
