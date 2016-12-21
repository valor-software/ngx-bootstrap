// All rights reserved by ng-bootstrap team, read licence file
// todo: add ng-bootstrap copyrights
const fs = require('fs');
const glob = require('glob');
const doc = require('./api-doc');

function getFileNames() {
  return glob.sync('src/**/*.ts', {
    ignore: ['src/**/*.spec.ts', 'src/util/**']
  });
}

function getApiDocs() {
  return doc(getFileNames());
}

module.exports = getApiDocs;
const json = JSON.stringify(getApiDocs(), null, 2);
fs.writeFileSync('demo/src/ng-api-doc.ts',
`/* tslint:disable */
export const ngdoc = ${json};
`);

