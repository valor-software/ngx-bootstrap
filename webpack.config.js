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
  debug: false,
  cache: false,

  verbose: true,
  displayErrorDetails: true,
  context: __dirname,
  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json']
  },

  entry: {
    angular2: [
      // Angular 2 Deps
      'zone.js/dist/zone-microtask',
      'reflect-metadata',
      'angular2/common',
      'angular2/core'
    ],
    'angular2-bootstrap': ['ng2-bootstrap'],
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
      {test: /\.md$/, loader: 'html?minimize=false!markdown'},

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
          compilerOptions: {
            removeComments: true,
            noEmitHelpers: false
          }
        },
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      }
    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/,
      /reflect-metadata/,
      /zone\.js\/dist\/zone-microtask/
    ]
  },

  plugins: [
    new Clean(['build']),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
      filename: 'angular2.js'
    })
  ],
  pushPlugins: function () {
    if (!isProduction) {
      return;
    }

    this.plugins.push.apply(this.plugins, [
      //production only
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        comments: false,
        compress: {
          screw_ie8: true
          //warnings: false,
          //drop_debugger: false
        }
        //verbose: true,
        //beautify: false,
        //quote_style: 3
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
