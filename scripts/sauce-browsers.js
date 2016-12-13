module.exports.customLaunchers = function customLaunchers() {
  return {
    sl_chrome: {base: 'SauceLabs', browserName: 'chrome'},
    sl_chrome_1: {base: 'SauceLabs', browserName: 'chrome', version: 'latest-1'},
    sl_firefox: {base: 'SauceLabs', browserName: 'firefox'},
    sl_firefox_1: {base: 'SauceLabs', browserName: 'firefox', version: 'latest-1'},
    sl_ie9: {base: 'SauceLabs', browserName: 'internet explorer', platform: 'Windows 2008', version: '9'},
    'SL_IE10': {base: 'SauceLabs', browserName: 'internet explorer', platform: 'Windows 2012', version: '10'},
    'SL_IE11': {base: 'SauceLabs', browserName: 'internet explorer', platform: 'Windows 8.1', version: '11'},
    'SL_EDGE': {base: 'SauceLabs', browserName: 'MicrosoftEdge', platform: 'Windows 10', version: '13.10586'},
    'SL_IOS9': {base: 'SauceLabs', browserName: 'iphone', platform: 'OS X 10.10', version: '9.3'},
    'SL_IOS10': {base: 'SauceLabs', browserName: 'iphone', platform: 'OS X 10.10', version: '10.0'},
    'SL_ANDROID4.4': {base: 'SauceLabs', browserName: 'android', platform: 'Linux', version: '4.4'},
    'SL_ANDROID5': {base: 'SauceLabs', browserName: 'android', platform: 'Linux', version: '5.1'},
    'SL_SAFARI9': {base: 'SauceLabs', browserName: 'safari', platform: 'OS X 10.11', version: '9.0'}
  };
};

