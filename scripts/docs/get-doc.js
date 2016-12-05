// All rights reserved by ng-bootstrap team, read licence file
// todo: add ng-bootstrap copyrights
const doc = require('./api-doc');
const glob = require('glob');

function getFileNames() {
  return glob.sync('src/**/*.ts', {
    ignore: ['src/**/*.spec.ts', 'src/util/**']
  });
}

function getApiDocs() {
  return doc(getFileNames());
}

module.exports = getApiDocs;

console.log(JSON.stringify(getApiDocs(), null, 2));
