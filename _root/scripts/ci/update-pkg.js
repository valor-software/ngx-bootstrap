'use strict';

const fs = require('fs-extra');
const pathToJSONFile = 'dist/package.json';
const NGX_BOOTSRAP_CI = 'ngx-bootstrap-ci';

updatePkg();

async function updatePkg() {
  const packageJson = JSON.parse(fs.readFileSync(pathToJSONFile), 'utf8');

  packageJson.version = `${packageJson.version}-dev.${getTime()}`;
  packageJson.name = NGX_BOOTSRAP_CI;

  fs.writeFile(pathToJSONFile, JSON.stringify(packageJson, null, 2));

  console.log(`Package.json was updated`);
}

function getTime() {
  const date = new Date();

  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ]
    .map((number) => {
      return String(number).length < 2
        ? `0${number}`
        : `${number}`;
    })
    .join('');
}
