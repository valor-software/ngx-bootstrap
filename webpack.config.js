var webpack = require('webpack');
var path = require('path');

/*eslint no-process-env:0*/
var isProduction = process.env.NODE_ENV || 'development';

var src = 'src/public';
//var absSrc = path.join(__dirname, src);
var dest = '/build';
var absDest = path.join(__dirname, dest);

var config = {
  devtool: isProduction ? 'source-map' : 'evale',

  debug: true,
  cache: true,
  context: __dirname,

  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json'],
    alias: {}
  },

  entry: {
    angular2: [
      // Angular 2 Deps
      'traceur-runtime',
      'zone.js',
      'reflect-metadata',
      'rtts_assert/rtts_assert',
      'angular2/angular2'
    ],
    app: [
      './src/public'
    ],
    alert: ['./src/components/alert/alert.ts']
  },

  output: {
    path: absDest,
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  // our Development Server configs
  devServer: {
    inline: true,
    colors: true,
    historyApiFallback: true,
    contentBase: src,
    publicPath: dest
  },
  module: {
    loaders: [
      // Support for *.json files.
      {test: /\.json$/, loader: 'json'},

      // Support for CSS as raw text
      {test: /\.css$/, loader: 'raw'},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw'},

      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'typescript-simple?ignoreWarnings[]=2345',
        //loader: 'awesome-typescript-loader',
        //loader: 'ts-loader',
        exclude: [
          /\.spec\.ts$/,
          /\.e2e\.ts$/,
          /web_modules/,
          /test/,
          /node_modules/
        ]
      }
    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
      filename: 'angular2.js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    }),
    new webpack.optimize.DedupePlugin({
      __isProduction: isProduction
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
    // production
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false,
    //    drop_debugger: false
    //  },
    //  output: {
    //    comments: false
    //  },
    //  beautify: false
    //})
  ],

  stats: {colors: true, reasons: true}
};

module.exports = config;
