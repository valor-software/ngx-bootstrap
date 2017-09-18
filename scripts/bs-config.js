module.exports = {
  port: 4400,
  server: {
    baseDir: './gh-pages',
    // baseDir: './demo/dist',
    middleware : { 1 : require('compression')()}
  }
};
