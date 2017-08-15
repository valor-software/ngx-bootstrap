/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */

const fs = require('fs');
const he = require('he');

const systemJs = `
System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  packages: {
    '.': {
      defaultExtension: 'ts'
    },
    'vendor': {
      defaultExtension: 'js'
    }
  }
});

System.config({
  map: {
    'main': 'main.js',
    
    // Angular specific mappings.
    '@angular/core': 'https://unpkg.com/@angular/core/bundles/core.umd.js',
    '@angular/common': 'https://unpkg.com/@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'https://unpkg.com/@angular/compiler/bundles/compiler.umd.js',
    '@angular/forms': 'https://unpkg.com/@angular/forms/bundles/forms.umd.js',
    '@angular/platform-browser': 'https://unpkg.com/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'https://unpkg.com/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    
    // Third party libraries
    'tslib': 'https://unpkg.com/tslib@1.7.1',
    'rxjs': 'https://unpkg.com/rxjs',
    'ngx-bootstrap': 'https://unpkg.com/ngx-bootstrap@1.8.1/bundles/ngx-bootstrap.umd.min.js'
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
  }
});
`;

const cmptDir = 'demo/src/app/components/';
fs.readdir(cmptDir, function (err, dirs) {
  if (err) throw err;
  dirs = dirs.filter((item) => {
    return fs.statSync(cmptDir + item).isDirectory();
  }).slice(0, 1);
  dirs.forEach((dir) => {
    const demos = getDirs(`${cmptDir + dir}/demos`);
    const compName = dir.slice(1);
    console.log(compName);
    console.log(`Generating plunks for ${dir}`);
    console.log('Following demos are found ', demos);
    demos.forEach((demo) => {
      const code = fs.readFileSync(`${cmptDir + dir}/demos/${demo}/${demo}.ts`).toString();
      const html = fs.readFileSync(`${cmptDir + dir}/demos/${demo}/${demo}.html`).toString();
      console.log(code);
      // console.log(html);
      writeFile(`${cmptDir + dir}/demos/${demo}/plunkr.html`, generatePlnkrHtml(compName, demo, code, html));
    });
  });
});

function getDirs(path) {
  return fs.readdirSync(path).filter(item => fs.statSync(`${path}/${item}`).isDirectory());
}

function writeFile(path, content) {
  fs.writeFile(path, content, 'utf8', (err) => {
    if (err) return console.log(err);
  });
}

function generatePlnkrHtml(componentName, demoName, code, html) {
  return `<!DOCTYPE html>
<html lang="en">
<body>
  <form id="mainForm" method="post" action="http://plnkr.co/edit/?p=preview">
    <input type="hidden" name="description" value="Example usage of the ${componentName} from http://valor-software.com/ngx-bootstrap/">
    <input type="hidden" name="files[index.html]" value="${he.encode(getIndexHtml(componentName, demoName))}">
    <input type="hidden" name="files[systemjs.config.js]" value="${he.encode(systemJs)}">
    <input type="hidden" name="files[main.ts]" value="${he.encode(generateMainTs(componentName, demoName))}">
    <input type="hidden" name="files[${demoName}.ts]" value="${he.encode(code)}">
    <input type="hidden" name="files[${demoName}.html]" value="${he.encode(html)}">
  </form>
  <script>document.getElementById("mainForm").submit();</script>
</body>
</html>`;
}

function generateMainTs(componentName, demoName) {
  const capitalizedCompName = capitalize(componentName);
  const capitalizedDemoName = capitalize(demoName);
  const demoCompName = `Demo${capitalizedCompName + capitalizedDemoName}Component`;
  return `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ${capitalizedCompName}Module } from 'ngx-bootstrap';
import { ${demoCompName} } from './${demoName}';

@NgModule({
  declarations: [${demoCompName}],
  imports: [
    ${capitalizedCompName}Module.forRoot(),
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  bootstrap: [${demoCompName}]
})
export class Demo${capitalizedCompName}Module {
}
platformBrowserDynamic().bootstrapModule(Demo${capitalizedCompName}Module);
`;
}

function getIndexHtml(compName, demoName) {
  compName = compName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
  const compTagName = `demo-${compName}-${demoName}`;
  return `<!DOCTYPE html>
<html>
  <head>
    <title>ngx-bootstrap plunkr</title>
    <!-- Load common libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typescript/2.1.6/typescript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.7.2/zone.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.47/system.js"></script>
    <!-- Configure SystemJS -->
    <script src="systemjs.config.js"></script>
    <script>
      System
        .import('main.ts')
        .catch(console.error.bind(console));
    </script>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <style>body { font-family: Roboto, Arial, sans-serif; margin: 0 }</style>
  </head>

  <body>
    <${compTagName}>Loading ngx-bootstrap...</${compTagName}>
  </body>
</html>`
}

function capitalize(string) {
  if (string.indexOf('-') !== -1) {
    return string.split('-').map(i => capitalize(i)).join('');
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
