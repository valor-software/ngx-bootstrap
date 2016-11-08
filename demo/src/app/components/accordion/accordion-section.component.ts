import { Component } from '@angular/core';

// webpack html imports
let doc = require('html!markdown!./docs/readme.md');
let titleDoc = require('html!markdown!./docs/title.md');

let ts = require('!!raw!./demos/accordion-demo.component.ts');
let html = require('!!raw!./demos//accordion-demo.component.html');

@Component({
  selector: 'accordion-section',
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
