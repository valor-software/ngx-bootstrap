import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {TabsDemo} from './tabs/tabs-demo';

let name = 'Tabs';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/tabs';

// webpack html imports
let doc = require('../../components/tabs/readme.md');
let titleDoc = require('../../components/tabs/title.md');

let ts = require('!!prismjs?lang=typescript!./tabs/tabs-demo.ts');
let html = require('!!prismjs?lang=markup!./tabs/tabs-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<accordion-demo></accordion-demo>');

@Component({
  selector: 'tabs-section',
  directives: [TabsDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})

export class TabsSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
