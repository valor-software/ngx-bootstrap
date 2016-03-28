import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {DatepickerDemoComponent} from './datepicker/datepicker-demo';
import {DemoSection} from './demo-section';

// webpack html imports
let doc = require('../../components/datepicker/readme.md');
let titleDoc = require('../../components/datepicker/title.md');

let ts = require('!!prismjs?lang=typescript!./datepicker/datepicker-demo.ts');
let html = require('!!prismjs?lang=markup!./datepicker/datepicker-demo.html');

@Component({
  selector: 'datepicker-section',
  directives: [DemoSection, DatepickerDemo, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <datepicker-demo></datepicker-demo>
    </demo-section>`
})

  private name:string = 'Datepicker';
  private src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/datepicker';
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
}
