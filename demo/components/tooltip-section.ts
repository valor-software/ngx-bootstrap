import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {TooltipDemo} from './tooltip/tooltip-demo';

let name = 'Tooltip';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/tooltip';

// webpack html imports
let doc = require('../../components/tooltip/readme.md');
let titleDoc = require('../../components/tooltip/title.md');

let ts = require('!!prismjs?lang=typescript!./tooltip/tooltip-demo.ts');
let html = require('!!prismjs?lang=markup!./tooltip/tooltip-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<tooltip-demo></tooltip-demo>');

@Component({
  selector: 'tooltip-section',
  directives: [TooltipDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})

export class TooltipSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
