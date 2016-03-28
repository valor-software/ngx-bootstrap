import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {AccordionDemo} from './accordion/accordion-demo';

let name = 'Accordion';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/accordion';

// webpack html imports
let doc = require('../../components/accordion/readme.md');
let titleDoc = require('../../components/accordion/title.md');

let ts = require('!!prismjs?lang=typescript!./accordion/accordion-demo.ts');
let html = require('!!prismjs?lang=markup!./accordion/accordion-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<accordion-demo></accordion-demo>');

@Component({
  selector: 'accordion-section',
  template: template,
  directives: [AccordionDemo, TAB_DIRECTIVES, CORE_DIRECTIVES]
})

export class AccordionSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
