const fs = require('fs-extra');
const path = require('path');

const ghPagesDir = 'gh-pages/';
const oldVersionDir = 'gh-pages/old/';
const versionsFilePath = 'assets/json/versions.json';
const currentVersionFilePath = 'assets/json/current-version.json';

const demoSrcDir = 'demo/src';
const demoDistDir = 'demo/dist/browser';
const hostname = 'ngx-bootstrap';

let prevVersion;
const newVersion = require('../package.json').version;

if (!fs.existsSync(ghPagesDir)) {
  throw new Error('gh-pages dir wasn\'t found. Run `npm run docs.fetch`');
}

if (!fs.existsSync(demoDistDir)) {
  throw new Error('demo/dist dir wasn\'t found. Run `npm run demo.build`');
}

try {
  prevVersion = require(path.join('../', ghPagesDir, currentVersionFilePath)).version;
} catch (e) {
  prevVersion = require(path.join('../', demoSrcDir, currentVersionFilePath)).version;
}

console.log('Previous version:', prevVersion);
console.log('New version:', newVersion);
const isVersionChanged = prevVersion !== newVersion;


fs.readdir('gh-pages')
// filter files to operate on
  .then(filterFileToMove)
  // for local development, if version not changed, clean gh-pages folder
  .then(files => {
    if (isVersionChanged) {
      return files;
    }
    console.log('Version hasn\'t changed. Current gh-pages version will be replaced with the one from demo/dist');
    return Promise.all(files.map(file => fs.remove(path.join(ghPagesDir, file))))
      .then(() => files)
  })
  // move old files to corresponding folder, skip for local dev
  .then(files => {
    if (!isVersionChanged) {
      return files;
    }

    fs.ensureDirSync(path.join(oldVersionDir, prevVersion));

    return Promise.all(files
      .map(file => ({
        from: path.join(ghPagesDir, file),
        to: path.join(oldVersionDir, prevVersion, file)
      }))
      .map((move) => fs.rename(move.from, move.to)));
  })
  // copy demo dist to gh-pages folder
  .then(() => fs.copy(demoDistDir, ghPagesDir))
  // generate new version json files
  .then(() => {
    if (isVersionChanged) {
      return generateJson();
    }
  })
  .catch(console.error.bind(console));

function filterFileToMove(files) {
  return files.filter((file) => file !== 'old' && file !== '.git');
}

function generateJson() {
  return fs.readdir(oldVersionDir)
    .then(files => {
      let savedVersions = files.map(file => ({
        version: file,
        url: hostname + '/old/' + file,
        unprefixedUrl: 'old/' + file
      }));

      savedVersions.unshift({version: 'Current', url: hostname, unprefixedUrl: ''});

      return savedVersions;
    })
    .then(versions => {
      const content = JSON.stringify(versions);

      return Promise
        .all(versions.map((ver) => {
          if (ver.version === 'Current') {
            return Promise.resolve();
          }

          const _path = path.join(oldVersionDir, ver.version, versionsFilePath);
          fs.ensureFileSync(_path);
          return writeFile(_path, content);
        }))
        .then(() => writeFile(path.join(ghPagesDir, versionsFilePath), content))
        .then(() => writeFile(path.join(ghPagesDir, currentVersionFilePath), JSON.stringify({version: newVersion})))
        .then(() => writeFile(path.join(demoSrcDir, currentVersionFilePath), JSON.stringify({version: newVersion})));
    });
}

function writeFile(path, content) {
  return fs.writeFile(path, content, 'utf8');
}
