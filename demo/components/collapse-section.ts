import { Component } from '@angular/core';

// webpack html imports
let doc = require('../../components/collapse/readme.md');
let titleDoc = require('../../components/collapse/title.md');

let ts = require('!!raw?lang=typescript!./collapse/collapse-demo.ts');
let html = require('!!raw?lang=markup!./collapse/collapse-demo.html');

@Component({
  selector: 'collapse-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <collapse-demo></collapse-demo>
    </demo-section>`
})
export class CollapseSectionComponent {
  public name:string = 'Collapse';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/collapse';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
