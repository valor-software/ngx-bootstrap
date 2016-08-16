import { Component } from '@angular/core';

// webpack html imports
let doc = require('../../components/dropdown/readme.md');
let titleDoc = require('../../components/dropdown/title.md');

let ts = require('!!raw?lang=typescript!./dropdown/dropdown-demo.ts');
let html = require('!!raw?lang=markup!./dropdown/dropdown-demo.html');

@Component({
  selector: 'dropdown-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <dropdown-demo></dropdown-demo>
    </demo-section>`
})
export class DropdownSectionComponent {
  public name:string = 'Dropdowns';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/dropdown';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
