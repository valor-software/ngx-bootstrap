/*tslint:disable */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
var win = typeof window !== 'undefined' && window || {};
exports.window = win;
exports.document = win.document;
exports.location = win.location;
exports.gc = win['gc'] ? function () { return win['gc'](); } : function () { return null; };
exports.performance = win['performance'] ? win['performance'] : null;
exports.Event = win['Event'];
exports.MouseEvent = win['MouseEvent'];
exports.KeyboardEvent = win['KeyboardEvent'];
exports.EventTarget = win['EventTarget'];
exports.History = win['History'];
exports.Location = win['Location'];
exports.EventListener = win['EventListener'];
