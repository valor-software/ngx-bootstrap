// All rights reserved by ng-bootstrap team, read licence file
// todo: add ng-bootstrap copyrights
const {writeFileSync} = require('fs');
const glob = require('glob');
const doc = require('./api-doc');
const {format, resolveConfig} = require('prettier');

function getFileNames() {
  return glob.sync('src/**/*.ts', {
    ignore: ['src/**/*.spec.ts', 'src/util/**']
  });
}

function getApiDocs() {
  return doc(getFileNames());
}

module.exports = getApiDocs;

async function run() {
  const json = JSON.stringify(getApiDocs(), null, 2);
  const outputFile = 'apps/ngx-bootstrap-docs/src/ng-api-doc.ts';
  const prettierConfig = await resolveConfig(outputFile, { editorConfig: true });
  writeFileSync(
    outputFile,
    await format(
      `/* tslint:disable */
       export const ngdoc: any = ${json};
      `,
      prettierConfig
    )
  );
}

run();
