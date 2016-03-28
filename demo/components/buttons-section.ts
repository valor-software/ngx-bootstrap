import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {ButtonsDemo} from './buttons/buttons-demo';
import {DemoSection} from './demo-section';

// webpack html imports
let doc = require('../../components/buttons/readme.md');
let titleDoc = require('../../components/buttons/title.md');

let ts = require('!!prismjs?lang=typescript!./buttons/buttons-demo.ts');
let html = require('!!prismjs?lang=markup!./buttons/buttons-demo.html');

@Component({
  selector: 'buttons-section',
  directives: [DemoSection, ButtonsDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <buttons-demo></buttons-demo>
    </demo-section>`
})

export class ButtonsSection {
  private name:string = 'Buttons';
  private src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/buttons';
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
}
