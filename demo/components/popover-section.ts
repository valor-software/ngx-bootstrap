import { Component } from '@angular/core';

// webpack html imports
let doc = require('../../components/popover/readme.md');
let titleDoc = require('../../components/popover/title.md');

let ts = require('!!raw?lang=typescript!./popover/popover-demo.ts');
let html = require('!!raw?lang=markup!./popover/popover-demo.html');

@Component({
  selector: 'popover-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <popover-demo></popover-demo>
    </demo-section>`
})
export class PopoverSectionComponent {
  public name:string = 'Popover';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/popover';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
