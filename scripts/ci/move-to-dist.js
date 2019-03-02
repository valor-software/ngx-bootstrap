'use strict';

const fs = require('fs-extra');
const del = require('del');
const execa = require('execa');
const NGX_BOOTSRAP_CI = 'ngx-bs-ci';
const dest = 'node_modules/ngx-bootstrap';

move();

async function move() {
  await del(`${dest}`);
  fs.mkdirSync(dest);

  await execa.shell(`rsync -a node_modules/${NGX_BOOTSRAP_CI}/. node_modules/ngx-bootstrap/`);
}
