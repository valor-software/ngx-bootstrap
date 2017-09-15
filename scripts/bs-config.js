module.exports = {
  port: 4400,
  server: {
    baseDir: './gh-pages',
    middleware : { 1 : require('compression')()}
  }
};
