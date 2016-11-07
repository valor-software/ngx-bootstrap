import { Component } from '@angular/core';

// webpack html imports
let doc = require('html!markdown!../../../../components/tabs/readme.md');
let titleDoc = require('html!markdown!../../../../components/tabs/title.md');

let ts = require('!!raw?lang=typescript!./demos/tabs-demo.component.ts');
let html = require('!!raw?lang=markup!./demos/tabs-demo.component.html');

@Component({
  selector: 'tabs-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <tabs-demo></tabs-demo>
    </demo-section>`
})
export class TabsSectionComponent {
  public name:string = 'Tabs';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/tabs';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
