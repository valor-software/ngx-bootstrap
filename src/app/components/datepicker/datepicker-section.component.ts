import { Component } from '@angular/core';

// webpack html imports
let doc = require('html!markdown!../../../../components/datepicker/readme.md');
let titleDoc = require('html!markdown!../../../../components/datepicker/title.md');

let ts = require('!!raw?lang=typescript!./demos/datepicker-demo.component');
let html = require('!!raw?lang=markup!./demos/datepicker-demo.component.html');

@Component({
  selector: 'datepicker-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <datepicker-demo></datepicker-demo>
    </demo-section>`
})
export class DatepickerSectionComponent {
  public name:string = 'Datepicker';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/datepicker';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
