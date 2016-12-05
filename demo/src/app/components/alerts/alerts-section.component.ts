import { Component } from '@angular/core';
import { DEMOS } from './demos/index';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'alert-section',
  // tslint:disable-next-line
  host: {'class': 'col-md-9'},
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc">
      <!-- basic -->
      <p>Alerts are available for any length of text, as well as an optional dismiss button. For proper styling, use one of the four <strong>required</strong> contextual classes (e.g., <code class="highlighter-rouge">.alert-success</code>). For inline dismissal, use the <a href="#dismissing"><code>dismiss property</code></a>.</p>
      
      <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
        <ui-alert-basic></ui-alert-basic>
      </ng-sample-box>
      
      <h3 id="link-color">Link color</h3>
        
      <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
        <alert-demo></alert-demo>
      </ng-sample-box>
      <ng-api-doc directive="AlertComponent"></ng-api-doc>
      <ng-api-doc-config type="AlertConfig"></ng-api-doc-config>
    </demo-section>`
})
export class AlertsSectionComponent {
  public name: string = 'Alerts';
  public src: string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/alert';
  public titleDoc: string = titleDoc;
  public demos: any = DEMOS;
}
