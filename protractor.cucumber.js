const chromeOptions = {
  // need this window size due to cutting last menu point by viewport borders. will be deleted after fix
  args: ['--headless', '--disable-gpu', '--window-size=800, 900']
};

if (process.env.GOOGLE_CHROME_BINARY) {
  chromeOptions.binary = process.env.GOOGLE_CHROME_BINARY;
}

exports.config = {

  SELENIUM_PROMISE_MANAGER: false,

  baseUrl: process.env.URL,

  capabilities: {
    'browserName': 'chrome',
    chromeOptions: chromeOptions
  },

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: [
    './demo/e2e-bdd/features/*.feature'
  ],

  cucumberOpts: {
    require: [
      './demo/e2e-bdd/step_definitions/*.steps.ts',
      './demo/e2e-bdd/support/*.ts'
    ]
  },

  onPrepare: () => {
    require('ts-node').register({
      project: 'demo/e2e-bdd'
    });
    const chai = require('chai');
    const chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised)
  }
}
