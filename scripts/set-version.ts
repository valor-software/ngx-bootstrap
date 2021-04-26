import { readJson, writeJson } from 'fs-extra';
import { sync as glob } from 'glob';

const packagesGlob = './src/**/package.json';
const mainPackage = './package.json';
const docsVersion = './apps/ngx-bootstrap-docs/src/assets/json/current-version.json';

(async () => {
  const version = await readJson(mainPackage).then(json => json.version);
  const packages = [docsVersion, ...glob(packagesGlob)]
    .map(async packagePath => {
      const packageJson = await readJson(packagePath);
      packageJson.version = version;
      await writeJson(packagePath, packageJson, { spaces: 2 });
    });

  await Promise.all(packages);
})();
