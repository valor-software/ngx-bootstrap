import { Component } from '@angular/core';

// webpack html imports
let doc = require('html!markdown!./docs/readme.md');
let titleDoc = require('html!markdown!./docs/title.md');

let ts = require('!!raw!./demos/sortable-demo.component.ts');
let html = require('!!raw!./demos//sortable-demo.component.html');

@Component({
  selector: 'sortable-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <sortable-demo></sortable-demo>
    </demo-section>`
})
export class SortableSectionComponent {
  public name:string = 'Sortable';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/sortable';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
