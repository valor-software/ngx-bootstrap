'use strict';

const execa = require('execa');

const dist = 'dist/schematics';
const pathToCollection = 'schematics/src/.';

build();

async function build() {
  await execa.shell(`tsc -p schematics/tsconfig.json`);
  await execa.shell(`rsync -a ${pathToCollection} ${dist} --exclude *.ts`);
}