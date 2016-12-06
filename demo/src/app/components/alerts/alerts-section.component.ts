import { Component } from '@angular/core';

// webpack html imports
let doc = require('html!markdown!./docs/readme.md');
let titleDoc = require('html!markdown!./docs/title.md');

let ts = require('!!raw?lang=typescript!./demos/alerts-demo.component.ts');
let html = require('!!raw?lang=markup!./demos/alerts-demo.component.html');

@Component({
  selector: 'alert-section',
  template: `
      <ng-api-doc directive="AlertComponent"></ng-api-doc>
      <ng-api-doc-config type="AlertConfig"></ng-api-doc-config>
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <alert-demo></alert-demo>
    </demo-section>`
})
export class AlertsSectionComponent {
  public name:string = 'Alerts';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/alert';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
