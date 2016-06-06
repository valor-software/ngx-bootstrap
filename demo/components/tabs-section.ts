import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {TabsDemoComponent} from './tabs/tabs-demo';
import {DemoSectionComponent} from './demo-section';

// webpack html imports
let doc = require('../../components/tabs/readme.md');
let titleDoc = require('../../components/tabs/title.md');

let ts = require('!!prismjs?lang=typescript!./tabs/tabs-demo.ts');
let html = require('!!prismjs?lang=markup!./tabs/tabs-demo.html');

@Component({
  selector: 'tabs-section',
  directives: [DemoSectionComponent, TabsDemoComponent, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <tabs-demo></tabs-demo>
    </demo-section>`
})
export class TabsSectionComponent {
  public name:string = 'Tabs';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/tabs';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
