"use strict";
var browser_1 = require('./facade/browser');
function isBs3() {
    return browser_1.window.__theme !== 'bs4';
}
exports.isBs3 = isBs3;
