import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import sdk from '@stackblitz/sdk';

import { ContentSection } from '../../models/content-section.model';
import { ComponentExample } from '../../models/components-examples.model';
import { main } from './stackblitz/main';
import { polyfills } from './stackblitz/polyfills';
import { getAppModuleCode, NgxModuleData } from './stackblitz/app.module';
import { getIndexHtmlCode } from './stackblitz/html';
import { getComponentClassName, getTagName, getTemplateFileName } from './stackblitz/helpers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'examples',
  templateUrl: './examples.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent {
  examples: ComponentExample[];
  moduleData: NgxModuleData;

  constructor(public section: ContentSection, private route: ActivatedRoute) {
    this.examples = section.content as ComponentExample[];
    this.moduleData = this.route.snapshot.data && this.route.snapshot.data[1];
  }

  @HostListener('document:click', ['$event'])
  preventEmptyHrefNav(event: MouseEvent & {target: Element}): void {
    let element: Element = event.target;
    let preventNav = element.getAttribute('href') === '#';

    if (preventNav) {
      event.preventDefault();
      return;
    }

    if (element.tagName !== 'A') {
      while (element.parentElement && element !== document.body)  {
        if (preventNav) {
          event.preventDefault();
          return;
        }
        element = element.parentElement;
        preventNav = element.getAttribute('href') === '#';
      }
    }
  }

  openStackBlitzDemo(ts: any, html: any) {
    const className = getComponentClassName(ts);
    const tag = getTagName(ts);
    const templateName = getTemplateFileName(ts);
    const project = {
      files: {
        'index.html': getIndexHtmlCode(tag, 'accordion'),
        'styles.css': `body {padding: 30px; position: relative}`,
        '.angular-cli.json': `{"apps": [{"styles": ["styles.css"]}]}`,
        'main.ts': main,
        'polyfills.ts': polyfills,
        'app/app.module.ts': getAppModuleCode(className, this.moduleData),
        'app/ngx-bootstrap-demo.component.ts': ts
      },
      dependencies: {
        'ngx-bootstrap': '2.0.0-rc.0'
      },
      title: 'stackblitz demo',
      description: 'stackblitz demo',
      template: 'angular-cli'
    };

    project.files[`app/${templateName}`] = html;

    console.log(tag, templateName, project);

    sdk.openProject(project);
  }
}

