import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {AlertDemo} from './alert/alert-demo';

let name = 'Alerts';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/alert';

// webpack html imports
let doc = require('../../components/alert/readme.md');
let titleDoc = require('../../components/alert/title.md');
let ts = require('!!prismjs?lang=typescript!./alert/alert-demo.ts');
let html = require('!!prismjs?lang=markup!./alert/alert-demo.html');
let template = require('./demo-component.template.html');

template = template.replace('<demoComponentContent></demoComponentContent>', '<alert-demo></alert-demo>');

@Component({
  selector: 'alert-section',
  template: template,
  directives: [AlertDemo, TAB_DIRECTIVES, CORE_DIRECTIVES]
})

export class AlertSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
