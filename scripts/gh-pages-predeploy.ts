import { join } from 'path';
import {
  readJson,
  existsSync,
  readdir,
  remove,
  ensureDir,
  rename,
  copy,
  ensureFile,
  writeJson
} from 'fs-extra';

const ghPagesDir = 'gh-pages/';
const oldVersionDir = 'gh-pages/old/';
const versionsFilePath = 'assets/json/versions.json';
const currentVersionFilePath = 'assets/json/current-version.json';

const demoDistDir = 'dist/apps/ngx-bootstrap';
const hostname = 'ngx-bootstrap';

(async () => {
  const newVersion = await readJson('./package.json')
    .then(json => json.version);

  if (!existsSync(ghPagesDir)) {
    throw new Error(`gh-pages dir wasn't found. Run 'git clone -b gh-pages --single-branch --depth 3 https://github.com/valor-software/ngx-bootstrap.git gh-pages'\n`);
  }

  if (!existsSync(demoDistDir)) {
    throw new Error(`${demoDistDir} dir wasn't found. Run 'npm run build && npm run build scully'`);
  }

  let prevVersion = await readJson(join(ghPagesDir, currentVersionFilePath))
    .then(json => json.version);

  console.log('Previous version:', prevVersion);
  console.log('New version:', newVersion);
  const isVersionChanged = prevVersion !== newVersion;


  await readdir('gh-pages')
    // filter files to operate on
    .then(files => files
      .filter((file) => file !== 'old' && file !== '.git'))
    // for local development, if version not changed, clean gh-pages folder
    .then(async files => {
      if (isVersionChanged) {
        return files;
      }

      console.log(`Version hasn't changed. Current gh-pages version will be replaced with the one from ${demoDistDir}`);
      return await Promise.all(files
        .map(file => remove(join(ghPagesDir, file))))
        .then(() => files);
    })
    // move old files to corresponding folder, skip for local dev
    .then(async files => {
      if (!isVersionChanged) {
        return files;
      }

      await ensureDir(join(oldVersionDir, prevVersion));

      return await Promise.all(files
        .map(file => ({
          from: join(ghPagesDir, file),
          to: join(oldVersionDir, prevVersion, file)
        }))
        .map(async move => await rename(move.from, move.to)));
    })
    // copy demo dist to gh-pages folder
    .then(async () => await copy(demoDistDir, ghPagesDir))
    // generate new version json files
    .then(async () => isVersionChanged && await generateJson())
    .catch(console.error.bind(console));


  async function generateJson() {
    return await readdir(oldVersionDir)
      .then(files => {
        let savedVersions = files.map(file => ({
          version: file,
          url: hostname + '/old/' + file,
          unprefixedUrl: 'old/' + file
        }));

        savedVersions.unshift({ version: 'Current', url: hostname, unprefixedUrl: '' });

        return savedVersions;
      })
      .then(async versions => {
        return await Promise
          .all(versions.map(async ver => {
            if (ver.version === 'Current') {
              return Promise.resolve();
            }

            const _path = join(oldVersionDir, ver.version, versionsFilePath);
            await ensureFile(_path);
            return await writeJson(_path, versions, {spaces: 2});
          }))
          .then(async () => await writeJson(join(ghPagesDir, versionsFilePath), versions, {spaces: 2}))
          .then(async () => await writeJson(join(ghPagesDir, currentVersionFilePath), { version: newVersion }, {spaces: 2}))
          // .then(() => writeFile(join(demoSrcDir, currentVersionFilePath), JSON.stringify({ version: newVersion })));
      });
  }
})();
