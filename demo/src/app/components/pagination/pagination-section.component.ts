import { Component } from '@angular/core';

// webpack html imports
let doc = require('html!markdown!../../../../../components/pagination/readme.md');
let titleDoc = require('html!markdown!../../../../../components/pagination/title.md');

let ts = require('!!raw?lang=typescript!./demos/pagination-demo.component.ts');
let html = require('!!raw?lang=markup!./demos/pagination-demo.component.html');

@Component({
  selector: 'pagination-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <pagination-demo></pagination-demo>
    </demo-section>`
})
export class PaginationSectionComponent {
  public name:string = 'Pagination';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/pagination';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
