/*tslint:disable*/
//needs to disable tslint due to config
const { defineSupportCode } = require('cucumber');

defineSupportCode(function ({setDefaultTimeout}) {
  setDefaultTimeout(10 * 1000);
});
