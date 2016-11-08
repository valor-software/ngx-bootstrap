import { Component } from '@angular/core';

// webpack html imports
let doc = require('html!markdown!../../../../../components/buttons/readme.md');
let titleDoc = require('html!markdown!../../../../../components/buttons/title.md');

let ts = require('!!raw?lang=typescript!./demos/buttons-demo.component.ts');
let html = require('!!raw?lang=markup!./demos/buttons-demo.component.html');

@Component({
  selector: 'buttons-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <buttons-demo></buttons-demo>
    </demo-section>`
})
export class ButtonsSectionComponent {
  public name:string = 'Buttons';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/buttons';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
