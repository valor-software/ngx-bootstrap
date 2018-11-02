const ngPackage = require('ng-packagr');
const path = require('path');

const folder = process.argv[2];

ngPackage
  .ngPackagr()
  .forProject(path.join(__dirname, folder))
  .withTsConfig(path.join(__dirname, 'tsconfig.ngc.json'))
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
