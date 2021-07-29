export const polyfills = `/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es/symbol';
// import 'core-js/es/object';
// import 'core-js/es/function';
// import 'core-js/es/parse-int';
// import 'core-js/es/parse-float';
// import 'core-js/es/number';
// import 'core-js/es/math';
// import 'core-js/es/string';
// import 'core-js/es/date';
// import 'core-js/es/array';
// import 'core-js/es/regexp';
// import 'core-js/es/map';
// import 'core-js/es/set';
import 'web-animations-js';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run \`npm install --save classlist.js\`.

/** IE10 and IE11 requires the following to support \`@angular/animation\`. */
// import 'web-animations-js';  // Run \`npm install --save web-animations-js\`.


/** Evergreen browsers require these. **/
import 'core-js/es/reflect';
import 'core-js/es/reflect';


/** ALL Firefox browsers require the following to support \`@angular/animation\`. **/
// import 'web-animations-js';  // Run \`npm install --save web-animations-js\`.



/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run \`npm install --save intl\`.`;
