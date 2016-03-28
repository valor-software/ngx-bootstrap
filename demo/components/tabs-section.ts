import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {TabsDemo} from './tabs/tabs-demo';
import {DemoSection} from './demo-section';

// webpack html imports
let doc = require('../../components/tabs/readme.md');
let titleDoc = require('../../components/tabs/title.md');

let ts = require('!!prismjs?lang=typescript!./tabs/tabs-demo.ts');
let html = require('!!prismjs?lang=markup!./tabs/tabs-demo.html');

@Component({
  selector: 'tabs-section',
  directives: [DemoSection, TabsDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <tabs-demo></tabs-demo>
    </demo-section>`
})

export class TabsSection {
  private name:string = 'Tabs';
  private src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/tabs';
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
}
