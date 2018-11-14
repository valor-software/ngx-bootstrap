const cucumber = require('cypress-cucumber-preprocessor').default;
const webpack = require('@cypress/webpack-preprocessor');
const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');

const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
};

module.exports = (on) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);
  on('file:preprocessor', (file) => {
    if (file.filePath.match(/\.(js|jsx)/g)) {
      return webpack(webpackOptions)(file)
    } else if (file.filePath.match(/\.(ts)/g)) {
      return cypressTypeScriptPreprocessor(file);
    } else {
      return cucumber()(file)}
  })
};
