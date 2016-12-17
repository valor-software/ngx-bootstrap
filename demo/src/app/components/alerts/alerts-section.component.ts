import { Component } from '@angular/core';
import { DEMOS } from './demos/index';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'alert-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc">
      <!-- basic -->
      <p>Alerts are available for any length of text, as well as an optional dismiss button. For proper styling, use one of the four <strong>required</strong> contextual classes (e.g., <code class="highlighter-rouge">.alert-success</code>). For inline dismissal, use the <a href="#dismissing"><code>dismiss property</code></a>.</p>
      
      <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
        <ui-alert-basic></ui-alert-basic>
      </ng-sample-box>
      <!-- link -->
      <h3 id="link-color">Link color</h3>
      <p>Use the <code class="highlighter-rouge">.alert-link</code> utility class to quickly provide matching colored links within any alert.</p>
        
      <ng-sample-box [ts]="demos.link.component" [html]="demos.link.html">
        <ui-alert-link></ui-alert-link>
      </ng-sample-box>
      
      <!-- content -->
      <h3 id="additional-content">Additional content</h3>
      <p>Alerts can also contain additional HTML elements like headings and paragraphs.</p>
      
      <ng-sample-box [ts]="demos.content.component" [html]="demos.content.html">
        <demo-alert-content></demo-alert-content>
      </ng-sample-box>
      
      <!--<ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">-->
        <!--<alert-demo></alert-demo>-->
      <!--</ng-sample-box>-->
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
