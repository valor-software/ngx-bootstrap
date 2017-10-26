const fs = require('fs-extra');
const exec = require('child_process').exec;

const repoUrl = process.env.TRAVIS
  ? 'https://github.com/valor-software/ngx-bootstrap.git'
  : 'git@github.com:valor-software/ngx-bootstrap.git';

if (!fs.existsSync('gh-pages')) {
  console.log('Cloning the latest version of gh-pages');
  runCmd(`git clone -b gh-pages --single-branch --depth 1 ${repoUrl} gh-pages`);
  return;
}
console.log('Pulling the latest version of gh-pages');
runCmd("cd gh-pages && git pull && cd ../");

function runCmd(cmd) {
  exec(cmd, function (err) {
    if (err) console.log('exec err: ' + err);
    console.log('Done');
  });
}
