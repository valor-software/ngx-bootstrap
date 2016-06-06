import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {TimepickerDemoComponent} from './timepicker/timepicker-demo';
import {DemoSectionComponent} from './demo-section';

// webpack html imports
let doc = require('../../components/timepicker/readme.md');
let titleDoc = require('../../components/timepicker/title.md');

let ts = require('!!prismjs?lang=typescript!./timepicker/timepicker-demo.ts');
let html = require('!!prismjs?lang=markup!./timepicker/timepicker-demo.html');

@Component({
  selector: 'timepicker-section',
  directives: [DemoSectionComponent, TimepickerDemoComponent, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <timepicker-demo></timepicker-demo>
    </demo-section>`
})
export class TimepickerSectionComponent {
  public name:string = 'Timepicker';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/timepicker';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
