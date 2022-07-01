import { Component, HostListener } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import sdk from '@stackblitz/sdk';

import { ContentSection } from '../../models/content-section.model';
import { ComponentExample } from '../../models/components-examples.model';
import { NgxModuleData } from './stackblitz/app.module';
import { getIndexHtmlCode } from './stackblitz/html';
import { getComponentClassName, getTagName, getTemplateFileName, getCSSCodeDatepickerCustomClass } from './stackblitz/helpers';
import { Utils } from 'ngx-bootstrap/utils';
import { Subscription } from "rxjs";
import { AvailableTabsNames } from "../../models/common.models";
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'examples',
  templateUrl: './examples.component.html'
})
export class ExamplesComponent {
  examples: ComponentExample[];
  moduleData: NgxModuleData;
  tabName?: AvailableTabsNames;
  routeSubscription: Subscription;

  constructor(public section: ContentSection, private route: ActivatedRoute, router: Router) {
    this.examples = section.content as ComponentExample[];
    this.moduleData = this.route.snapshot.data && this.route.snapshot.data[1];
    this.moduleData.moduleRoute = router.routerState.snapshot.url;
    this.tabName = router.parseUrl(router.url).queryParams?.["tab"];
    this.routeSubscription = router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.tabName = router.parseUrl(router.url).queryParams?.["tab"];
      }
    });
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
      const project = {
        files: <any>{
          'src/index.html': getIndexHtmlCode(tag, this.moduleData, Utils.stackOverflowConfig()),
          'tsconfig.json': this.getTsConfig(),
          'angular.json': this.getAngularJson(),
          'src/style.scss': '',
          'src/polyfills.ts': `import 'zone.js/dist/zone';  // Included with Angular CLI.`,
          'src/main.ts': this.getMainFile(),
          'src/environments/environment.prod.ts': this.getEnvProd(),
          'src/environments/environment.ts': this.getEnvDev(),
          'src/app/app.component.html': 'hi, there!',
          'src/app/app.component.ts': this.getAppComponent(),
          'src/app/app.module.ts': this.getAppModule()
        },
        dependencies: this.getDependencies(),
        devDependencies: {
          "@angular-devkit/build-angular": "12.2.5",
          "@angular/cli": "12.2.5",
          "@angular/compiler-cli": "12.2.5",
          "typescript": "~4.3.2"
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

  initFragment(anchor: string) {
    const spAnchor =  anchor.split('-');
    return spAnchor.slice(0, spAnchor.length -1).join('-');
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
    "typeRoots": ["node_modules/@types"],
    "lib": ["es2018", "dom"]
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
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        },
        "@schematics/angular:application": {
          "strict": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/demo",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.json",
            "inlineStyleLanguage": "scss",
            "styles": [
              "src/style.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "outputHashing": "all"
            },
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
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "browserTarget": "demo:build:production"
            },
            "development": {
              "browserTarget": "demo:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "demo:build"
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

  private getEnvProd(): string {
    return `
    export const environment = {
      production: true
    };
    `;
  }

  private getEnvDev(): string {
    return `
    export const environment = {
      production: false
    };
    `;
  }

  private getAppComponent(): string {
    return `
import {Component} from '@angular/core';

    @Component({
       selector: 'app-root',
       templateUrl: './app.component.html'
    })
    export class AppComponent {}
`;
  }

  private getAppModule(): string {
    return `
    import { NgModule } from '@angular/core'
    import { BrowserModule } from '@angular/platform-browser';
    import { AppComponent } from './app.component';

            @NgModule({
            declarations: [
               AppComponent
            ],
            imports: [
               BrowserModule
            ],
            providers: [],
            bootstrap: [AppComponent]
            })
            export class AppModule { }
    `;
  }

  private getDependencies(): any {
    return {
      "@angular/animations": "12.2.5",
      "@angular/common": "12.2.5",
      "@angular/compiler": "12.2.5",
      "@angular/core": "12.2.5",
      "@angular/forms": "12.2.5",
      "@angular/platform-browser": "12.2.5",
      "@angular/platform-browser-dynamic": "12.2.5",
      "ngx-bootstrap": "7.1.1",
      "rxjs": "7.3.0",
      "tslib": "2.3.1",
      "zone.js": "0.11.4"
    };
  }
}



