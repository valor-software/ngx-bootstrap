module.exports = {
  "port": 4200,
  "server": {
    "baseDir": "./demo/dist",
    middleware : { 1 : require('compression')()}
  }
};
