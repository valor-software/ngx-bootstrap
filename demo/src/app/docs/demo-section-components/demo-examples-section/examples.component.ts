import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import sdk from '@stackblitz/sdk';

import { ContentSection } from '../../models/content-section.model';
import { ComponentExample } from '../../models/components-examples.model';
import { main } from './stackblitz/main';
import { polyfills } from './stackblitz/polyfills';
import { getAppModuleCode, NgxModuleData } from './stackblitz/app.module';
import { getIndexHtmlCode } from './stackblitz/html';
import { getComponentClassName, getTagName, getTemplateFileName } from './stackblitz/helpers';

@Component({
  selector: 'examples',
  templateUrl: './examples.component.html'
})
export class ExamplesComponent {
  examples: ComponentExample[];
  moduleData: NgxModuleData;

  constructor(public section: ContentSection, private route: ActivatedRoute) {
    this.examples = section.content as ComponentExample[];
    this.moduleData = this.route.snapshot.data && this.route.snapshot.data[1];
    this.moduleData.moduleRoute = this.route.snapshot['_routerState'].url;
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

  openStackBlitzDemo(ts: string, html: string) {
    const className = getComponentClassName(ts);
    const tag = getTagName(ts);
    const templateName = getTemplateFileName(ts);
    const project = {
      files: {
        'index.html': getIndexHtmlCode(tag, this.moduleData),
        'styles.css': `body {padding: 30px; position: relative}
        ${this.moduleData.moduleRoute === '/sortable' ?
          `.sortable-item {
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

    .sortable-wrapper {
      min-height: 150px;
    }` : ''}
    ${this.moduleData.moduleRoute === '/accordion' ?
          `.card.customClass,
.card.customClass .card-header,
.panel.customClass {
  background-color: #5bc0de;
  color: #fff;
}
.panel.customClass .panel-body {
  background-color: #337aa7;
}` : ''}`,
        '.angular-cli.json': `{"apps": [{"styles": ["styles.css"]}]}`,
        'main.ts': main,
        'polyfills.ts': polyfills,
        'app/app.module.ts': getAppModuleCode(className, this.moduleData),
        'app/ngx-bootstrap-demo.component.ts': this.getTs(ts)
      },
      dependencies: {
        '@angular/animations': 'latest',
        'ngx-bootstrap': 'next'
      },
      title: 'stackblitz demo',
      description: 'stackblitz demo',
      template: 'angular-cli'
    };
    project.files[`app/${templateName}`] = this.getHtml(html);

    sdk.openProject(project);
  }

  private getHtml(html: string): string {
    return this.moduleData.moduleRoute === '/carousel' ?
      html.replace(/src="/g, 'src="https://valor-software.com/ngx-bootstrap/') : html;
  }

  private getTs(ts: string): string {
    return this.moduleData.moduleRoute === '/carousel' ?
      ts.replace(/assets/g, 'https://valor-software.com/ngx-bootstrap/assets') : ts;
  }
}

