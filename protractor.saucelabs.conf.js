'use strict';

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  baseUrl: 'http://valor-software.com/ng2-bootstrap/',
  specs: [
    './demo/dist/out-tsc-e2e/**/*.e2e-spec.js'
  ],
  multiCapabilities: [{
    browserName: 'Firefox',
    platform: 'Windows 7',
    version: '46.0'
  }, {
    browserName: 'chrome',
    version: "52.0",
    platform: "Windows 7"
  }, {
    browserName: 'internet explorer',
    version: "9.0",
    platform: "Windows 7"
  }, {
    browserName: 'internet explorer',
    version: "9.0",
    platform: "Windows 8"
  },
    {
    browserName: 'internet explorer',
    version: "11.0",
    platform: "Windows 8.1"
  }
  // {
  //   browserName: 'MicrosoftEdge',
  //   version: "13.0",
  //   platform: "Windows 10"
  // }, {
  //   browserName: 'Safari',
  //   version: "9.0",
  //   platform: "OS X 7.0"
  // }
  ],
  onPrepare: function () {
    browser.driver.manage().window().maximize();
  },
  onComplete: function() {
    var printSessionId = function(jobName){
      browser.getSession().then(function(session) {
        console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
      });
    }
    printSessionId("Insert Job Name Here");
  }
};
