import { Component, SecurityContext } from '@angular/core';
import { DEMOS } from './demos/index';
import { DomSanitizer } from '@angular/platform-browser';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'alert-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc">
      <!-- basic -->
      <p>Alerts are available for any length of text, as well as an optional dismiss button. For proper styling, use one of the four <strong>required</strong> contextual classes (e.g., <code class="highlighter-rouge">.alert-success</code>). For inline dismissal, use the <a href="#dismissing"><code>dismiss property</code></a>.</p>
      
      <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
        <demo-alert-basic></demo-alert-basic>
      </ng-sample-box>
      <!-- link -->
      <h3 id="link-color">Link color</h3>
      <p>Use the <code class="highlighter-rouge">.alert-link</code> utility class to quickly provide matching colored links within any alert.</p>
        
      <ng-sample-box [ts]="demos.link.component" [html]="demos.link.html">
        <demo-alert-link></demo-alert-link>
      </ng-sample-box>
      
      <!-- content -->
      <h3 id="additional-content">Additional content</h3>
      <p>Alerts can also contain additional HTML elements like headings and paragraphs.</p>
      
      <ng-sample-box [ts]="demos.content.component" [html]="demos.content.html">
        <demo-alert-content></demo-alert-content>
      </ng-sample-box>
      
      <!-- dismiss -->
      <h3 id="dismissing">Dismissing</h3>
      <p>Alerts have <code class="highlighter-rouge">dismiss</code> option. Enabling it will show close button to the right of the alert.</p>
      <ng-sample-box [ts]="demos.dismiss.component" [html]="demos.dismiss.html">
        <demo-alert-dismiss></demo-alert-dismiss>
      </ng-sample-box>
      
      <!-- dynamic-html -->
      <h3 id="dynamic-html">Dynamic html</h3>
      <p>Sometimes you will need to show dynamically generated html in alerts, here is how you can make it. And don't forget to sanitize your html.</p>
      <ng-sample-box [ts]="demos.dynamic.component" [html]="demos.dynamic.html">
        <demo-alert-dynamic-html></demo-alert-dynamic-html>
      </ng-sample-box>
      
      <!-- dismiss on timeout -->
      <h3>Dismiss on timeout</h3>
      <p>You can simply set timeout in milliseconds to <code class="highlighter-rouge">dismissOnTimeout</code> property to create self closable alerts.</p>
      <ng-sample-box [ts]="demos.timeout.component" [html]="demos.timeout.html">
        <demo-alert-timeout></demo-alert-timeout>
      </ng-sample-box>
      <!--<ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">-->
        <!--<alert-demo></alert-demo>-->
      <!--</ng-sample-box>-->
      
      <h2 id="api-reference">API Reference</h2>
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
