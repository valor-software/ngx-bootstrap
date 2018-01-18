const fs = require('fs-extra');
const path = require('path');

fs.writeFileSync(path.join(process.cwd(), 'demo/dist/Procfile'), 'web: node server.js', 'utf8');
fs.writeFileSync(path.join(process.cwd(), 'demo/dist/package.json'), '{"name": "ngx-universal", "version": "1.0.0" }', 'utf8');
