import {Component, View} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {DatepickerDemo} from './datepicker/datepicker-demo';

let name = 'Datepicker';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/datepicker';

// webpack html imports
let doc = require('../../components/datepicker/readme.md');
let titleDoc = require('../../components/datepicker/title.md');

let ts = require('!!prismjs?lang=typescript!./datepicker/datepicker-demo.ts');
let html = require('!!prismjs?lang=markup!./datepicker/datepicker-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<datepicker-demo></datepicker-demo>');

@Component({
  selector: 'datepicker-section',
  template: template,
  directives: [DatepickerDemo, TAB_DIRECTIVES, CORE_DIRECTIVES]
})

export class DatepickerSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
