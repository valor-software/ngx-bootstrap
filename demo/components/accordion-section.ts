import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {AccordionDemoComponent} from './accordion/accordion-demo';
import {DemoSectionComponent} from './demo-section';

// webpack html imports
let doc = require('../../components/accordion/readme.md');
let titleDoc = require('../../components/accordion/title.md');

let ts = require('!!prismjs?lang=typescript!./accordion/accordion-demo.ts');
let html = require('!!prismjs?lang=markup!./accordion/accordion-demo.html');

@Component({
  selector: 'accordion-section',
  directives: [DemoSectionComponent, AccordionDemoComponent, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <accordion-demo></accordion-demo>
    </demo-section>`
})
export class AccordionSectionComponent {
  public name:string = 'Accordion';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/accordion';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
