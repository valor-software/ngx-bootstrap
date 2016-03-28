import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {TimepickerDemo} from './timepicker/timepicker-demo';

let name = 'Timepicker';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/timepicker';

// webpack html imports
let doc = require('../../components/timepicker/readme.md');
let titleDoc = require('../../components/timepicker/title.md');

let ts = require('!!prismjs?lang=typescript!./timepicker/timepicker-demo.ts');
let html = require('!!prismjs?lang=markup!./timepicker/timepicker-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<timepicker-demo></timepicker-demo>');

@Component({
  selector: 'timepicker-section',
  directives: [TimepickerDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})

export class TimepickerSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
