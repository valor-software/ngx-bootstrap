import { Component } from '@angular/core';
import { isBs3 } from 'ng2-bootstrap';

// webpack html imports
let doc = require('html!markdown!./docs/readme.md');
let titleDoc = require('html!markdown!./docs/title.md');

let ts = require('!!raw?lang=typescript!./demos/progressbar-demo.component.ts');

let templates: any = {
  'bs3': require('!!raw?lang=markup!./demos/progressbar-demo-bs3.component.html'),
  'bs4': require('!!raw?lang=markup!./demos/progressbar-demo-bs4.component.html')
};

@Component({
  selector: 'progressbar-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <progressbar-demo></progressbar-demo>
    </demo-section>`
})
export class ProgressbarSectionComponent {
  public name: string = 'Progressbar';
  public src: string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/progressbar';
  public get html(): string {
    return isBs3() ? templates.bs3 : templates.bs4;
  }
  public ts: string = ts;
  public titleDoc: string = titleDoc;
  public doc: string = doc;
}
