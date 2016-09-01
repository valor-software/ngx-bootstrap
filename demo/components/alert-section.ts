import { Component } from '@angular/core';

// webpack html imports
let doc = require('../../components/alert/readme.md');
let titleDoc = require('../../components/alert/title.md');
let ts = require('!!raw?lang=typescript!./alert/alert-demo.ts');
let html = require('!!raw?lang=markup!./alert/alert-demo.html');

@Component({
  selector: 'alert-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <alert-demo></alert-demo>
    </demo-section>`
})
export class AlertSectionComponent {
  public name:string = 'Alerts';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/alert';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
