import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {TimepickerDemo} from './timepicker/timepicker-demo';
import {DemoSection} from './demo-section';

// webpack html imports
let doc = require('../../components/timepicker/readme.md');
let titleDoc = require('../../components/timepicker/title.md');

let ts = require('!!prismjs?lang=typescript!./timepicker/timepicker-demo.ts');
let html = require('!!prismjs?lang=markup!./timepicker/timepicker-demo.html');

@Component({
  selector: 'timepicker-section',
  directives: [DemoSection, TimepickerDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <timepicker-demo></timepicker-demo>
    </demo-section>`
})

export class TimepickerSection {
  private name:string = 'Timepicker';
  private src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/timepicker';
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
}
