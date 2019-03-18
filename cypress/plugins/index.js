const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);

  config.env.bsVersion = process.env.bsVersion ? process.env.bsVersion : false;

  return config
};

require('@applitools/eyes.cypress')(module);
