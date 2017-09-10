module.exports = {
  port: 4200,
  server: {
    // baseDir: './gh-pages',
    baseDir: './demo/dist',
    middleware : { 1 : require('compression')()}
  }
};
