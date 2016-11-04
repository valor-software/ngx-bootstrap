/* eslint no-process-env: 0, global-require:0 */
/**
 * @author: @AngularClass
 */
'use strict';

// Look in ./config folder for webpack.dev.js
const conf = getWebpackConfig(process.env.NODE_ENV, require('./.ng2-config'));

// marked renderer hack
const marked = require('marked');

marked.Renderer.prototype.code = function renderCode(code, lang) {
  const escCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  if (!lang) {
    return `<pre class="prettyprint" ngNonBindable>${escCode}</pre>`;
  }
  return `<pre class="prettyprint lang-${lang}" ngNonBindable>${escCode}</pre>`;
};

module.exports = conf;

function getWebpackConfig(env, config) {
  switch (env) {
  case 'prod':
  case 'production':
    return require('ng2-webpack-config').webpack.prod(config);
  case 'test':
  case 'testing':
    return require('ng2-webpack-config').webpack.test(config);
  case 'dev':
  case 'development':
  default:
    return require('ng2-webpack-config').webpack.dev(config);
  }
}
