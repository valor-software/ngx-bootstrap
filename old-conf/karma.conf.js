/**
 * @author: @AngularClass
 */
'use strict';

// Look in ./config for karma.conf.js
const config = require('./.ng2-config');

config.src = '/';

module.exports = require('ng2-webpack-config').karma(config);
