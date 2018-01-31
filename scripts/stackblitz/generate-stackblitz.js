/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */

const fs = require('fs');
const he = require('he');
const path = require('path');

const moduleNames = {
  Dropdown: 'BsDropdownModule',
  Datepicker: 'BsDatepickerModule'
};

const entryComponents = {
  modal: ['service-component']
};
const packageJson = JSON.parse(fs.readFileSync('package.json'));
const angularCliJson = fs.readFileSync(path.join(__dirname, '.angular-cli.json')).toString();
const mainTs = fs.readFileSync(path.join(__dirname, 'main.ts')).toString();
const polyfills = fs.readFileSync(path.join(__dirname, 'polyfills.ts')).toString();
const cmptDir = 'demo/src/app/components/';
const distDir = 'demo/src/assets/stackblitz/';
const styles = `body {padding: 30px; position: relative}`;
const additionalStyles = {
  datepicker: '@import url(https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css);',
  sortable: `.sortable-item {
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
    }`
};

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}
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
      let tag = code.match(/selector: '.+'/);
      tag = tag.length ? tag[0].substring(tag[0].indexOf("'") + 1, tag[0].lastIndexOf("'")) : null;
      const className = getComponentClassName(code);
      writeFile(`${distDir + component}-${demo}-bs3.html`, generatePlnkrHtml({component, tag, className, demo, code, html, isBs3: true}));
      writeFile(`${distDir + component}-${demo}-bs4.html`, generatePlnkrHtml({component, tag, className, demo, code, html, isBs3: false}));
    });
  });
});

function generatePlnkrHtml(config) {
  return `<!DOCTYPE html>
<html lang="en">
<body>
  <form id="form" method="post" action="https://run.stackblitz.com/api/angular/v1/">
    <input type="hidden" name="description" value="Example usage of the ${config.component} from http://valor-software.com/ngx-bootstrap/">
    <input type="hidden" name="files[index.html]" value="${he.encode(getIndexHtml(config.tag, config.component, config.isBs3))}">
    <input type="hidden" name="files[main.ts]" value="${he.encode(mainTs)}">
    <input type="hidden" name="files[app/app.module.ts]" value="${he.encode(generateAppModule(config.component, config.demo, config.className))}">
    <input type="hidden" name="files[polyfills.ts]" value="${he.encode(polyfills)}">
    <input type="hidden" name="files[.angular-cli.json]" value="${he.encode(angularCliJson)}">
    <input type="hidden" name="files[styles.css]" value="${he.encode(getStyles(config.component) + styles)}">
    <input type="hidden" name="files[app/${config.demo}.ts]" value="${he.encode(config.code)}">
    <input type="hidden" name="files[app/${config.demo}.html]" value="${he.encode(config.html)}">
    <input type="hidden" name="dependencies" value="${he.encode(JSON.stringify(generateDependencies()))}">
  </form>
  <script>document.getElementById("form").submit();</script>
</body>
</html>`;
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
import { ${moduleName} } from 'ngx-bootstrap/${componentName}';
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

function getIndexHtml(tag, component, isBs3) {
  return `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/${isBs3 ? '3.3.7' : '4.0.0'}/css/bootstrap.min.css">
    <div class="card-header mb-2 well">
  This demo shows functionality of <strong>${component}</strong> from <strong>ngx-bootstrap.</strong><br/>
    You can find the full demo here <strong><a href="https://valor-software.com/ngx-bootstrap">https://valor-software.com/ngx-bootstrap</a></strong>
  </div>
  <div style="position: relative"><${tag}>Loading ngx-bootstrap...</${tag}></div>`
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

function getStyles(component) {
  return additionalStyles[component] || '' + '\n';
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
      'ngx-bootstrap': versions.ngxBootstrap,
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
      ngxBootstrap: packageJson.version,
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
