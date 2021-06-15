const extra = require('fs-extra');
const path = process.cwd();
// 1. Copy static datepicker scss files for schematics'

if (!extra.existsSync(`${path}/node_modules/ngx-bootstrap/datepicker`)) {
  extra.mkdirSync(`${path}/node_modules/ngx-bootstrap/datepicker`);
};

// extra.copyFileSync(`${path}/dist/apps/ngx-bootstrap/styles.css`, `${path}/node_modules/ngx-bootstrap/datepicker/styles.css`);
if (!extra.existsSync(`${path}/node_modules/ngx-bootstrap/datepicker/scss`)) {
  extra.mkdirSync(`${path}/node_modules/ngx-bootstrap/datepicker/scss`);
  extra.mkdirSync(`${path}/node_modules/ngx-bootstrap/datepicker/scss/utils`);
  extra.mkdirSync(`${path}/node_modules/ngx-bootstrap/datepicker/scss/utils/scss`);
};

extra.copyFileSync(`${path}/src/datepicker/bs-datepicker.scss`, `${path}/node_modules/ngx-bootstrap/datepicker/scss/bs-datepicker.scss`);
extra.copyFileSync(`${path}/src/datepicker/utils/scss/mixins.scss`, `${path}/node_modules/ngx-bootstrap/datepicker/scss/utils/scss/mixins.scss`);
extra.copyFileSync(`${path}/src/datepicker/utils/scss/variables.scss`, `${path}/node_modules/ngx-bootstrap/datepicker/scss/utils/scss/variables.scss`);
