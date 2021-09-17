import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import sdk from '@stackblitz/sdk';

import { ContentSection } from '../../models/content-section.model';
import { ComponentExample } from '../../models/components-examples.model';
import { main } from './stackblitz/main';
import { polyfills } from './stackblitz/polyfills';
import { getAppModuleCode, NgxModuleData } from './stackblitz/app.module';
import { getIndexHtmlCode } from './stackblitz/html';
import { getComponentClassName, getTagName, getTemplateFileName, getCSSCodeDatepickerCustomClass } from './stackblitz/helpers';
import { Utils } from 'ngx-bootstrap/utils';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'examples',
  templateUrl: './examples.component.html'
})
export class ExamplesComponent {
  examples: ComponentExample[];
  moduleData: NgxModuleData;

  constructor(public section: ContentSection, private route: ActivatedRoute, router: Router) {
    this.examples = section.content as ComponentExample[];
    this.moduleData = this.route.snapshot.data && this.route.snapshot.data[1];
    this.moduleData.moduleRoute = router.routerState.snapshot.url;
  }

  @HostListener('document:click', ['$event'])
  preventEmptyHrefNav(event: MouseEvent & { target: Element }): void {
    let element: Element = event.target;
    let preventNav = element.getAttribute('href') === '#';

    if (preventNav) {
      event.preventDefault();

      return;
    }

    if (element.tagName !== 'A') {
      while (element.parentElement && element !== document.body) {
        if (preventNav) {
          event.preventDefault();

          return;
        }
        element = element.parentElement;
        preventNav = element.getAttribute('href') === '#';
      }
    }
  }

  openStackBlitzDemo(ts?: string, html?: string) {
    if (!ts || !html) {
      return;
    }

    const className = getComponentClassName(ts);
    const tag = getTagName(ts);
    const templateName = getTemplateFileName(ts);
    if (tag && className) {
//       const project = {
//         files: <any>{
//           'index.html': getIndexHtmlCode(tag, this.moduleData, Utils.stackOverflowConfig()),
//           'styles.css': `body {padding: 30px; position: relative}
//         ${this.moduleData.moduleRoute === '/sortable' ?
//             `.sortable-item {
//       padding: 6px 12px;
//       margin-bottom: 4px;
//       font-size: 14px;
//       line-height: 1.4em;
//       text-align: center;
//       cursor: grab;
//       border: 1px solid transparent;
//       border-radius: 4px;
//       border-color: #adadad;
//     }
//
//     .sortable-item-active {
//       background-color: #e6e6e6;
//       box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
//     }
//
//     .sortable-wrapper {
//       min-height: 150px;
//     }` : ''}
//     ${this.moduleData.moduleRoute === '/accordion' ?
//             `.card.customClass,
// .card.customClass .card-header,
// .panel.customClass {
//   background-color: #5bc0de;
//   color: #fff;
// }
// .panel.customClass .panel-body {
//   background-color: #337aa7;
// }` : ''}`,
//           '.angular-cli.json': `{"apps": [{"styles": ["styles.css"]}]}`,
//           'main.ts': main,
//           'polyfills.ts': polyfills,
//           'app/app.module.ts': getAppModuleCode(className, this.moduleData),
//           'app/ngx-bootstrap-demo.component.ts': this.getTs(ts)
//         },
//         dependencies: {
//           '@angular/animations': 'latest',
//           'web-animations-js': 'latest',
//           'ngx-bootstrap': 'next'
//         },
//         title: 'stackblitz demo',
//         description: 'stackblitz demo',
//         template: 'angular-cli'
//       };







      const project = {
        files: <any>{
          'src/index.html': getIndexHtmlCode(tag, this.moduleData, Utils.stackOverflowConfig()),
          'tsconfig.json': this.getTsConfig(),
          // 'tsconfig.app.json': this.getTsConfigApp(),
          'angular.json': this.getAngularJson(),
          'src/style.scss': '',
          'src/polyfills.ts': 'import \'zone.js/dist/zone\';  // Included with Angular CLI.\n',
          'src/main.ts': this.getMainFile(),
          'src/environments/environment.prod.ts': 'export const environment = {\n' +
            '  production: true\n' +
            '};\n',
          'src/environments/environment.ts': 'export const environment = {\n' +
            '  production: false\n' +
            '};\n',
          'src/app/app.component.html': 'hi, there!',
          'src/app/app.component.ts': 'import {Component} from \'@angular/core\';\n' +
            '\n' +
            '@Component({\n' +
            '  selector: \'app-root\',\n' +
            '  templateUrl: \'./app.component.html\'\n' +
            '})\n' +
            'export class AppComponent {}',
          'src/app/app.module.ts': 'import { NgModule } from \'@angular/core\';\n' +
            'import { BrowserModule } from \'@angular/platform-browser\';\n' +
            '\n' +
            'import { AppComponent } from \'./app.component\';\n' +
            '\n' +
            '@NgModule({\n' +
            '  declarations: [\n' +
            '    AppComponent\n' +
            '  ],\n' +
            '  imports: [\n' +
            '    BrowserModule\n' +
            '  ],\n' +
            '  providers: [],\n' +
            '  bootstrap: [AppComponent]\n' +
            '})\n' +
            'export class AppModule { }\n'
        },
        dependencies: {
          "@angular/animations": "12.1.0",
          "@angular/common": "12.0.5",
          "@angular/compiler": "12.0.5",
          "@angular/core": "12.0.5",
          "@angular/forms": "12.0.5",
          "@angular/platform-browser": "12.0.5",
          "@angular/platform-browser-dynamic": "12.0.5",
          "@angular/router": "12.0.5",
          "rxjs": "~6.6.0",
          "tslib": "^2.0.0",
          "zone.js": "~0.11.3"
        },
        devDependencies: {
          "@angular-devkit/build-angular": "~0.1102.13",
          "@angular/cli": "11.0.4",
          "@angular/compiler-cli": "11.0.4",
          "@types/node": "^12.11.1",
          "codelyzer": "^6.0.0",
          "protractor": "~7.0.0",
          "ts-node": "~8.3.0",
          "tslint": "~6.1.0",
          "typescript": "~4.1.5"
        },
        title: 'stackblitz demo',
        description: 'stackblitz demo',
        template: 'angular-cli'
      };

      if (className === 'DemoDatepickerDateCustomClassesComponent') {
        project.files['src/app/date-custom-classes.scss'] = getCSSCodeDatepickerCustomClass();
      }
      project.files[`src/app/${templateName}`] = this.getHtml(html);

      sdk.openProject(project);
    }
  }

  private getHtml(html: string): string {
    return this.moduleData.moduleRoute === '/carousel' ?
      html.replace(/src="/g, 'src="https://valor-software.com/ngx-bootstrap/') : html;
  }

  private getTs(ts: string): string {
    return this.moduleData.moduleRoute === '/carousel' ?
      ts.replace(/assets/g, 'https://valor-software.com/ngx-bootstrap/assets') : ts;
  }


  private getTsConfig(): string {
    return `
    {
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2018",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableIvy": true,
    "fullTemplateTypeCheck": true,
    "stricTemplates": true,
    "strictInjectionParameters": true
  }
}
    `;
  }

  private getTsConfigApp(): string {
    // return `
    //   {
    //     "extends": "./tsconfig.json",
    //     "compilerOptions": {
    //       "outDir": "./out-tsc/app",
    //       "types": []
    //     },
    //     "files": [
    //       "src/main.ts",
    //       "src/polyfills.ts"
    //     ],
    //     "include": [
    //       "src/**/*.d.ts"
    //     ],
    //     "angularCompilerOptions": {
    //       "enableIvy": true,
    //       "fullTemplateTypeCheck": true,
    //       "strictInjectionParameters": true,
    //       "strictTemplates": true,
    //       "strictMetadataEmit": true
    //       "allowEmptyCodegenFiles": true
    //     }
    //   }
    // `;

    return `
    {
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2018",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableIvy": true,
    "fullTemplateTypeCheck": true,
    "stricTemplates": true,
    "strictInjectionParameters": true
  }
}
    `;
  }

  private getAngularJson(): string {
    return `
    {
      "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
      "version": 1,
      "newProjectRoot": "projects",
      "projects": {
        "demo": {
          "projectType": "application",
          "schematics": {},
          "root": "",
          "sourceRoot": "src",
          "prefix": "app",
          "architect": {
            "build": {
              "builder": "@angular-devkit/build-angular:browser",
              "options": {
                "outputPath": "dist",
                "index": "src/index.html",
                "main": "src/main.ts",
                "polyfills": "src/polyfills.ts",
                "tsConfig": "tsconfig.json",
                "aot": true,
                "configurations": {
                  "development": {
                    "buildOptimizer": false,
                    "optimization": false,
                    "vendorChunk": true,
                    "extractLicenses": false,
                    "sourceMap": true,
                    "namedChunks": true
                  }
                },
                "defaultConfiguration": "production"
              }
            },
            "serve": {
              "builder": "@angular-devkit/build-angular:dev-server",
              "options": {
                "browserTarget": "demo:build"
              },
              "configurations": {
                "production": {
                  "browserTarget": "demo:build:production"
                }
              }
            }
          }
        }
      },
      "defaultProject": "demo"
    }
    `;
  }

  private getMainFile(): string {
    // return `
    // import { enableProdMode } from '@angular/core';
    // import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    //
    // import { AppModule } from './app/app.module';
    // import { environment } from './environments/environment';
    //
    // if (environment.production) {
    //   enableProdMode();
    // }
    //
    // platformBrowserDynamic().bootstrapModule(AppModule)
    //   .catch(err => console.error(err));
    // `;

    return `
import './polyfills';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(ref => {
      if (window['ngRef']) {
        window['ngRef'].destroy();
      }
      window['ngRef'] = ref;
    })
    .catch(err => console.error(err));
    `;
  }
}



