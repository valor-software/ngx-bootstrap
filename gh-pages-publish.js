#!/usr/bin/env node
/*eslint no-console: 0, no-sync: 0*/
'use strict';

var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, 'demo-build'), function(err) {
  console.log(err);
});
