/**
 * environment settings fro protractor
 */
'use strict';

module.exports = {

  capabilities: {browserName: 'chrome'},

  multiCapabilities: [{browserName: 'firefox'}, {browserName: 'chrome'}],

  seleniumAddress: 'http://127.0.0.1:4444/wd/hub'

};


