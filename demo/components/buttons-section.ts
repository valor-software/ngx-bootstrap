import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {ButtonsDemo} from './buttons/buttons-demo';

let name = 'Buttons';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/buttons';

// webpack html imports
let doc = require('../../components/buttons/readme.md');
let titleDoc = require('../../components/buttons/title.md');

let ts = require('!!prismjs?lang=typescript!./buttons/buttons-demo.ts');
let html = require('!!prismjs?lang=markup!./buttons/buttons-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<buttons-demo></buttons-demo>');

@Component({
  selector: 'buttons-section',
  directives: [ButtonsDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})
export class ButtonsSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
