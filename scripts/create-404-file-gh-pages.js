'use strict';

const fs = require('fs-extra');
fs.copyFileSync('./dist/apps/ngx-bootstrap/index.html', './dist/apps/ngx-bootstrap/404.html');
