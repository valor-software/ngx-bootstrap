import { Component } from '@angular/core';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

let ts = require('!!raw?lang=typescript!./demos/alerts-demo.component.ts');
let html = require('!!raw?lang=markup!./demos/alerts-demo.component.html');

@Component({
  selector: 'alert-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <alert-demo></alert-demo>
      <ng-sample-box [ts]="ts" [html]="html"></ng-sample-box>
      <ng-api-doc directive="AlertComponent"></ng-api-doc>
      <ng-api-doc-config type="AlertConfig"></ng-api-doc-config>
    </demo-section>`
})
export class AlertsSectionComponent {
  public name: string = 'Alerts';
  public src: string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/alert';
  public titleDoc: string = titleDoc;
  public ts: string = ts;
  public html: string = html;
}
