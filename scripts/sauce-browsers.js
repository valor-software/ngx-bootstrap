module.exports.customLaunchers = function customLaunchers() {
  return {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: "52.0",
      platform: "Windows 7"
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'Firefox',
      platform: 'Windows 7',
      version: '46.0'
    },
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: "9.0",
      platform: "Windows 7"
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: "11.0",
      platform: "Windows 8.1"
    }
  };
};

