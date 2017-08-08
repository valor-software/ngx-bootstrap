const fs = require('fs-extra');
const del = require('del');

if (!fs.existsSync('gh-pages')) {
  throw 'gh-pages dir wasn\'t found. Run `npm run docs.fetch`';
}

if (!fs.existsSync('demo/dist')) {
  throw 'demo/dist dir wasn\'t found. Run `npm run demo.build`';
}

const hostname = 'ngx-bootstrap';
const dir = 'gh-pages/old/';
const version = require('../gh-pages/assets/json/current-version.json').version;
const newVersion = require('../package.json').version;

console.log('Previous version:', version);
console.log('New version:', newVersion);
const isVersionChanged = version !== newVersion;

fs.readdir('gh-pages', function (err, files) {
  if (err) throw err;
  let filesToMove = getFilesToMove(files);
  if (!isVersionChanged) {
    console.log('Version hasn\'t changed. Current gh-pages version will be replaced with the one from demo/dist');
    del(filesToMove.map(file => 'gh-pages/' + file)).then(() => {
      copyDist();
    });
    return;
  }
  fs.ensureDir('gh-pages/old/' + version, err => {
    if (err) throw err;
    filesToMove.forEach((file) => {
      fs.rename('gh-pages/' + file, 'gh-pages/old/' + version + '/' + file, function (err) {
        if (err) throw err;
      });
    });
    copyDist();
  });
});

function getFilesToMove(files) {
  return files.filter((file) => {return file !== 'old' && file !== '.git'});
}

function generateJson() {
  let savedVersions = [];
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      savedVersions.push({version: file, url: hostname + '/old/' + file, unprefixedUrl: 'old/' + file});
    });
    savedVersions.push({version: 'Current', url: hostname, unprefixedUrl: ''});
    savedVersions.reverse();
    savedVersions.forEach((ver) => {
      if (ver.version !== 'Current') {
        writeFile(dir + ver.version + '/assets/json/versions.json', JSON.stringify(savedVersions));
      }
    });
    writeFile('gh-pages/assets/json/versions.json', JSON.stringify(savedVersions));
    writeFile('gh-pages/assets/json/current-version.json', JSON.stringify({version: newVersion}));
  });
}

function writeFile(path, content) {
  fs.writeFile(path, content, 'utf8', (err) => {
    if (err) return console.log(err);
  });
}

function copyDist() {
  fs.copy('demo/dist', 'gh-pages', function (err) {
    if (err) return console.error(err);
    generateJson();
  });
}
