const fs = require('fs-extra');
const path = require('path');
const devDependencies = JSON.stringify(require('../../../package.json').devDependencies, null, 2);

fs.writeFileSync(path.join(process.cwd(), 'demo/dist/Procfile'), 'web: node server.js', 'utf8');
fs.writeFileSync(path.join(process.cwd(), 'demo/dist/package.json'),
  `{
  "name": "ngx-universal",
  "version": "2.0.0",
  "devDependencies": ${devDependencies}
}`, 'utf8');
