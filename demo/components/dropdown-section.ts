import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {DropdownDemo} from './dropdown/dropdown-demo';

let name = 'Dropdowns';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/dropdown';

// webpack html imports
let doc = require('../../components/dropdown/readme.md');
let titleDoc = require('../../components/dropdown/title.md');

let ts = require('!!prismjs?lang=typescript!./dropdown/dropdown-demo.ts');
let html = require('!!prismjs?lang=markup!./dropdown/dropdown-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<dropdown-demo></dropdown-demo>');

@Component({
  selector: 'dropdown-section',
  directives: [DropdownDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})

export class DropdownSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
