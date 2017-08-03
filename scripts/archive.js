const fs = require('fs');

if (!fs.existsSync('gh-pages')) {
  throw 'gh-pages dir wasn\'t found. Run `npm run docs.fetch`';
}

if (!fs.existsSync('demo/dist')) {
  throw 'demo/dist dir wasn\'t found. Run `npm run demo.build`';
}

const del = require('del');
const hostname = 'ngx-bootstrap';
const dir = 'demo/dist/old/';
const version = require('../gh-pages/assets/json/current-version.json').version;
const newVersion = require('../package.json').version;

console.log('Previous version:', version);
console.log('New version:', newVersion);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
fs.rename('gh-pages', dir + version, function (err) {
  if (err) throw err;
  console.log('previous version of docs was saved to ', dir + version);
  if (fs.existsSync(dir + version + '/old')) {
    fs.readdir(dir + version + '/old', function (err, files) {
      if (err) throw err;
      for (let i in files) {
        if (!fs.existsSync(dir + files[i])) {
          console.log(files[i], 'version found');
          fs.rename(dir + version + '/old/' + files[i], dir + files[i], function (err) {
            if (err) throw err;
          });
        }
        del(dir + version + '/old');
        generateJson();
      }
    });
  } else {
    generateJson();
  }
});

function generateJson() {
  let savedVersions = [];
  fs.readdir(dir, function (err, files) {
    if (err) throw err;
    for (let i in files) {
      savedVersions.push({version: files[i], url: hostname + '/old/' + files[i]});
    }
    savedVersions.push({version: 'Current', url: hostname});
    savedVersions.reverse();
    savedVersions.forEach((ver) => {
      if (ver.version !== 'Current') {
        fs.writeFile(dir + ver.version + '/assets/json/versions.json', JSON.stringify(savedVersions), 'utf8', function (err) {
          if (err) return console.log(err);
        });
      }
    });
    fs.writeFile('demo/dist/assets/json/versions.json', JSON.stringify(savedVersions), 'utf8', function (err) {
      if (err) return console.log(err);
    });
    fs.writeFile('demo/dist/assets/json/current-version.json', JSON.stringify({version: newVersion}), 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}
