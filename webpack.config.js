var path = require('path');
var marked = require('marked');
var webpack = require('webpack');

var Clean = require('clean-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

// marked renderer hack
marked.Renderer.prototype.code = function (code, lang) {
  var out = this.options.highlight(code, lang);

  if (!lang) {
    return '<pre><code>' + out + '\n</code></pre>';
  }

  var classMap = this.options.langPrefix + lang;
  return '<pre class="' + classMap + '"><code class="' + classMap + '">' + out + '\n</code></pre>\n';
};

/*eslint no-process-env:0, camelcase:0*/
var isProduction = (process.env.NODE_ENV || 'development') === 'production';

var src = 'demo';
//var absSrc = path.join(__dirname, src);
var dest = '/build';
var absDest = path.join(__dirname, dest);

var config = {
  // isProduction ? 'source-map' : 'evale',
  devtool: 'source-map',
  debug: true,
  cache: true,

  verbose: true,
  displayErrorDetails: true,
  context: __dirname,
  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json'],
    alias: {}
  },

  entry: {
    angular2: [
      // Angular 2 Deps
      'zone.js',
      'reflect-metadata',
      'angular2/angular2',
      'angular2/core'
    ],
    'angular2-bootstrap': ['components'],
    'angular2-bootstrap-demo': 'demo'
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

  markdownLoader: {
    langPrefix: 'language-',
    highlight: function (code, lang) {
      var language = !lang || lang === 'html' ? 'markup' : lang;
      if (!global.Prism) {
        global.Prism = require('prismjs');
      }
      var Prism = global.Prism;
      if (!Prism.languages[language]) {
        require('prismjs/components/prism-' + language + '.js');
      }
      return Prism.highlight(code, Prism.languages[language]);
    }
  },
  module: {
    loaders: [
      // support markdown
      {test: /\.md$/, loader: 'html!markdown'},

      // Support for *.json files.
      {test: /\.json$/, loader: 'json'},

      // Support for CSS as raw text
      {test: /\.css$/, loader: 'raw'},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw'},

      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts',
        query: {
          ignoreDiagnostics: [
            // 2300, // 2300 -> Duplicate identifier
            // 2309 // 2309 -> An export assignment cannot be used in a module with other exported elements.
          ]
        },
        exclude: [
          /\.min\.js$/,
          /\.spec\.ts$/,
          /\.e2e\.ts$/,
          /web_modules/,
          /test/,
          /node_modules/
        ]
      }
    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/,
      /reflect-metadata/
    ]
  },

  plugins: [
    new Clean(['build']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
      filename: 'angular2.js'
    }),
    new webpack.optimize.DedupePlugin({
      __isProduction: isProduction
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  pushPlugins: function () {
    if (!isProduction) {
      return;
    }

    this.plugins.push.apply(this.plugins, [
      //production only
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_debugger: false
        },
        output: {
          comments: false
        },
        beautify: false
      }),
      new CompressionPlugin({
        asset: '{file}.gz',
        algorithm: 'gzip',
        regExp: /\.js$|\.html|\.css|.map$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]);
  }
};

config.pushPlugins();

module.exports = config;
