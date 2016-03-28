import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {CollapseDemoComponent} from './collapse/collapse-demo';
import {DemoSection} from './demo-section';

// webpack html imports
let doc = require('../../components/collapse/readme.md');
let titleDoc = require('../../components/collapse/title.md');

let ts = require('!!prismjs?lang=typescript!./collapse/collapse-demo.ts');
let html = require('!!prismjs?lang=markup!./collapse/collapse-demo.html');

@Component({
  selector: 'collapse-section',
  directives: [DemoSection, CollapseDemo, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <collapse-demo></collapse-demo>
    </demo-section>`
})
export class CollapseSectionComponent {
  private name:string = 'Collapse';
  private src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/collapse';
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
}
