module.exports = {
  "port": 4200,
  "server": {
    "baseDir": "./gh-pages",
    middleware : { 1 : require('compression')()}
  }
};
