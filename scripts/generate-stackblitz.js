/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */

const fs = require('fs');
const he = require('he');

const moduleNames = {
  Dropdown: 'BsDropdownModule',
  Datepicker: 'BsDatepickerModule'
};

const entryComponents = {
  modal: ['service-component']
};

const polyfills = `/**
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
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run \`npm install --save classlist.js\`.

/** IE10 and IE11 requires the following to support \`@angular/animation\`. */
// import 'web-animations-js';  // Run \`npm install --save web-animations-js\`.


/** Evergreen browsers require these. **/
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';


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
const styles = ``;
const additionalStyles = {
  datepicker: '<link rel="stylesheet" href="https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css">',
  sortable: `<style>
      .sortable-item {
    padding: 6px 12px;
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 1.4em;
    text-align: center;
    cursor: grab;
    border: 1px solid transparent;
    border-radius: 4px;
    border-color: #adadad;
}
    .sortable-item-active {
    background-color: #e6e6e6;
    box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
    }
</style>`
};

const packageJson = JSON.parse(fs.readFileSync('package.json'));

const cmptDir = 'demo/src/app/components/';
fs.readdir(cmptDir, function (err, dirs) {
  if (err) throw err;
  dirs = dirs.filter((item) => {
    return fs.statSync(cmptDir + item).isDirectory();
  });
  dirs.forEach((dir) => {
    const demos = getDirs(`${cmptDir + dir}/demos`);
    const component = dir.slice(1);
    console.log(`Generating stackblitz demos for ${component}:`, demos.toString());
    demos.forEach((demo) => {
      const html = fs.readFileSync(`${cmptDir + dir}/demos/${demo}/${demo}.html`).toString();
      let code = fs.readFileSync(`${cmptDir + dir}/demos/${demo}/${demo}.ts`).toString();
      code = code.replace(/from 'ngx-bootstrap\/.+'/g, 'from \'ngx-bootstrap\'');
      let tag = code.match(/selector: '.+'/);
      tag = tag.length ? tag[0].substring(tag[0].indexOf("'") + 1, tag[0].lastIndexOf("'")) : null;
      const className = getComponentClassName(code);
      writeFile(`demo/src/assets/stackblitz/${component}-${demo}.html`, generatePlnkrHtml({component, tag, className, demo, code, html}));
    });
  });
});

function generatePlnkrHtml(config) {
  return `<!DOCTYPE html>
<html lang="en">
<body>
  <form id="form" method="post" action="https://run.stackblitz.com/api/angular/v1/">
    <input type="hidden" name="description" value="Example usage of the ${config.component} from http://valor-software.com/ngx-bootstrap/">
    <input type="hidden" name="files[index.html]" value="${he.encode(getIndexHtml(config.tag, config.component))}">
    <input type="hidden" name="files[main.ts]" value="${he.encode(generateMainTs())}">
    <input type="hidden" name="files[app/app.module.ts]" value="${he.encode(generateAppModule(config.component, config.demo, config.className))}">
    <input type="hidden" name="files[polyfills.ts]" value="${he.encode(polyfills)}">
    <input type="hidden" name="files[.angular-cli.json]" value="${he.encode(generateAngularCliJson())}">
    <input type="hidden" name="files[styles.css]" value="${he.encode(styles)}">
    <input type="hidden" name="files[app/${config.demo}.ts]" value="${he.encode(config.code)}">
    <input type="hidden" name="files[app/${config.demo}.html]" value="${he.encode(config.html)}">
    <input type="hidden" name="dependencies" value="${he.encode(JSON.stringify(generateDependencies()))}">
  </form>
  <script>document.getElementById("form").submit();</script>
</body>
</html>`;
}

function generateMainTs() {
  return `import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherise, log the boot error
}).catch(err => console.error(err));`
}

function generateAngularCliJson() {
  return `{
  "apps": [{
    "styles": ["styles.css"]
  }]
}`;
}

function generateAppModule(componentName, demoName, className) {
  const capitalizedCompName = capitalize(componentName);
  const moduleName = getModuleName(capitalizedCompName);
  const needsEntryComponent = entryComponents[componentName] && entryComponents[componentName].indexOf(demoName) > -1;
  const entryComponentName = `${capitalizedCompName}ContentComponent`;
  const imports = needsEntryComponent ? `${className}, ${entryComponentName}` : className;

  return `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ${moduleName} } from 'ngx-bootstrap';
import { ${imports} } from './${demoName}';

@NgModule({
  declarations: [${imports}],
  imports: [
    ${moduleName}.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  entryComponents: [${needsEntryComponent ? entryComponentName : ''}],
  bootstrap: [${className}]
})
export class AppModule {
}
`;
}

function getIndexHtml(tag, component) {
  return `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
<div style="padding: 30px; position: relative">
    <div class="well">
  This demo shows functionality of <strong>${component}</strong> from <strong>ngx-bootstrap.</strong><br/>
    You can find the full demo here <strong><a href="https://valor-software.com/ngx-bootstrap">https://valor-software.com/ngx-bootstrap</a></strong>
  </div>
  <${tag}>Loading ngx-bootstrap...</${tag}>
  </div>`
}

function getModuleName(name) {
  return moduleNames[name] || name + 'Module';
}

function getComponentClassName(code) {
  let className = code.match(/export class \w+/);
  if (className.length) {
    return className[0].split(' ').pop();
  }

  return null;
}

function capitalize(string) {
  if (string.indexOf('-') !== -1) {
    return string.split('-').map(i => capitalize(i)).join('');
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDirs(path) {
  return fs.readdirSync(path).filter(item => fs.statSync(`${path}/${item}`).isDirectory());
}

function writeFile(path, content) {
  fs.writeFile(path, content, 'utf8', (err) => {
    if (err) return console.log(err);
  });
}

function generateDependencies() {
  const versions = getVersions();
  return {
      '@angular/core': versions.angular,
      '@angular/common': versions.angular,
      '@angular/compiler': versions.angular,
      '@angular/platform-browser': versions.angular,
      '@angular/platform-browser-dynamic': versions.angular,
      '@angular/forms': versions.angular,
      'ngx-bootstrap': versions.ngxbootstrap,
      'typescript': versions.typescript,
      'core-js': versions.coreJs,
      'rxjs': versions.rxjs,
      'zone.js': versions.zoneJs
  }
}

function getVersions() {
  return {
      angular: getVersion('@angular/core'),
      typescript: getVersion('typescript'),
      rxjs: getVersion('rxjs'),
      ngxbootstrap: packageJson.version,
      zoneJs: getVersion('zone.js'),
      coreJs: getVersion('core-js'),
  };
}

function getVersion(name) {
  const version = packageJson.dependencies[name] || packageJson.devDependencies[name];
  if (!version) {
    throw `couldn't find version for ${name} in package.json`;
  }
  return version;
}
