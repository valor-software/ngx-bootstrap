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
    'ngx-bootstrap': 'https://unpkg.com/ngx-bootstrap/bundles/ngx-bootstrap.umd.min.js'
    
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
  }
});
`;
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

const cmptDir = 'demo/src/app/components/';
fs.readdir(cmptDir, function (err, dirs) {
  if (err) throw err;
  dirs = dirs.filter((item) => {
    return fs.statSync(cmptDir + item).isDirectory();
  });
  dirs.forEach((dir) => {
    const demos = getDirs(`${cmptDir + dir}/demos`);
    const component = dir.slice(1);
    console.log(`Generating plunks for ${component}:`, demos.toString());
    demos.forEach((demo) => {
      const html = fs.readFileSync(`${cmptDir + dir}/demos/${demo}/${demo}.html`).toString();
      let code = fs.readFileSync(`${cmptDir + dir}/demos/${demo}/${demo}.ts`).toString();
      code = code.replace(/from 'ngx-bootstrap\/.+'/g, 'from \'ngx-bootstrap\'');
      let tag = code.match(/selector: '.+'/);
      tag = tag.length ? tag[0].substring(tag[0].indexOf("'") + 1, tag[0].lastIndexOf("'")) : null;
      const className = getComponentClassName(code);
      writeFile(`demo/src/assets/plunkrs/${component}-${demo}.html`, generatePlnkrHtml({component, tag, className, demo, code, html}));
    });
  });
});

function generatePlnkrHtml(config) {
  return `<!DOCTYPE html>
<html lang="en">
<body>
  <form id="form" method="post" action="http://plnkr.co/edit/?p=preview">
    <input type="hidden" name="description" value="Example usage of the ${config.component} from http://valor-software.com/ngx-bootstrap/">
    <input type="hidden" name="files[index.html]" value="${he.encode(getIndexHtml(config.tag, config.component))}">
    <input type="hidden" name="files[systemjs.config.js]" value="${he.encode(systemJs)}">
    <input type="hidden" name="files[main.ts]" value="${he.encode(generateMainTs(config.component, config.demo, config.className))}">
    <input type="hidden" name="files[${config.demo}.ts]" value="${he.encode(config.code)}">
    <input type="hidden" name="files[${config.demo}.html]" value="${he.encode(config.html)}">
  </form>
  <script>document.getElementById("form").submit();</script>
</body>
</html>`;
}

function generateMainTs(componentName, demoName, className) {
  const capitalizedCompName = capitalize(componentName);
  const moduleName = getModuleName(capitalizedCompName);
  const needsEntryComponent = entryComponents[componentName] && entryComponents[componentName].indexOf(demoName) > -1;
  const entryComponentName = `${capitalizedCompName}ContentComponent`;
  const imports = needsEntryComponent ? `${className}, ${entryComponentName}` : className;

  return `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
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
export class Demo${capitalizedCompName}Module {
}
platformBrowserDynamic().bootstrapModule(Demo${capitalizedCompName}Module);
`;
}

function getIndexHtml(tag, component) {
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
    ${additionalStyles[component] || ''}
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <style>body { font-family: Roboto, Arial, sans-serif; margin: 0 }</style>
  </head>

  <body>
  <div style="padding: 30px; position: relative">
    <div class="well">
  This plunkr shows functionality of <strong>${component}</strong> from <strong>ngx-bootstrap.</strong><br/>
    You can find the full demo here <strong><a href="https://valor-software.com/ngx-bootstrap">https://valor-software.com/ngx-bootstrap</a></strong>
  </div>
  <${tag}>Loading ngx-bootstrap...</${tag}>
  </div>
  </body>
</html>`
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
