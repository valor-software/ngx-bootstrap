import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {DropdownDemo} from './dropdown/dropdown-demo';
import {DemoSection} from './demo-section';

// webpack html imports
let doc = require('../../components/dropdown/readme.md');
let titleDoc = require('../../components/dropdown/title.md');

let ts = require('!!prismjs?lang=typescript!./dropdown/dropdown-demo.ts');
let html = require('!!prismjs?lang=markup!./dropdown/dropdown-demo.html');

@Component({
  selector: 'dropdown-section',
  directives: [DemoSection, DropdownDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <dropdown-demo></dropdown-demo>
    </demo-section>`
})

export class DropdownSection {
  private name:string = 'Dropdowns';
  private src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/dropdown';
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
}
