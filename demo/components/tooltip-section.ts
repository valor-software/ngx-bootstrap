import { Component } from '@angular/core';

// webpack html imports
let doc = require('../../components/tooltip/readme.md');
let titleDoc = require('../../components/tooltip/title.md');

let ts = require('!!raw?lang=typescript!./tooltip/tooltip-demo.ts');
let html = require('!!raw?lang=markup!./tooltip/tooltip-demo.html');

@Component({
  selector: 'tooltip-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <tooltip-demo></tooltip-demo>
    </demo-section>`
})
export class TooltipSectionComponent {
  public name:string = 'Tooltip';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/tooltip';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
