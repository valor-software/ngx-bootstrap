const extra = require('fs-extra');
const path = process.cwd();
console.log(path)
// 1. Copy static scss file for schematics'
extra.copyFileSync(`${path}/src/datepicker/bs-datepicker.scss`, `${path}/dist/apps/ngx-bootstrap/assets/css/bs-datepicker.scss`);
