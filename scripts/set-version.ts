import { readJson, writeJson } from 'fs-extra';
import { sync as glob } from 'glob';

const packagesGlob = './src/**/package.json';
const mainPackage = './package.json';
const docsVersion = './apps/ngx-bootstrap-docs/src/assets/json/current-version.json';
const schematicDependencyVersion = './src/schematics/src/utils/current_dependency_versions.json';

(async () => {
  const version = await readJson(mainPackage).then(json => json.version);
  const packages = [docsVersion, schematicDependencyVersion, ...glob(packagesGlob)]
    .map(async packagePath => {
      const packageJson = await readJson(packagePath);
      if (packageJson.version) {
        packageJson.version = version;
      }

      if (packageJson.NGX_BOOTSTRAP_VERSION) {
        packageJson.NGX_BOOTSTRAP_VERSION = version;
      }

      await writeJson(packagePath, packageJson, { spaces: 2 });
    });

  await Promise.all(packages);
})();
