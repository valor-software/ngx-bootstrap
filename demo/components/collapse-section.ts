import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {CollapseDemo} from './collapse/collapse-demo';

let name = 'Collapse';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/collapse';

// webpack html imports
let doc = require('../../components/collapse/readme.md');
let titleDoc = require('../../components/collapse/title.md');

let ts = require('!!prismjs?lang=typescript!./collapse/collapse-demo.ts');
let html = require('!!prismjs?lang=markup!./collapse/collapse-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<collapse-demo></collapse-demo>');

@Component({
  selector: 'collapse-section',
  directives: [CollapseDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})

export class CollapseSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
