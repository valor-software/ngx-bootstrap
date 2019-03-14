'use strict';

const execa = require('execa');
const from = 'node_modules/ngx-bootstrap-ci/';
const dest = 'node_modules/ngx-bootstrap/';

copyToNgxPkg();

async function copyToNgxPkg() {
  await execa.shell(`rsync -a ${from}. ${dest}`);
}
