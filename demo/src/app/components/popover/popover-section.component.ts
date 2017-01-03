import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'tooltip-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Add small overlay content, like those found in iOS, to any element for housing secondary information.</p>

  <h2>Contents</h2>
  <ul>
    <li><a pageScroll href="#usage">Usage</a></li>
    <li><a pageScroll href="#examples">Examples</a>
      <ul>
        <li><a pageScroll href="#four-directions">Four Directions</a></li>
        <li><a pageScroll href="#dismiss">Dismissible</a></li>
        <li><a pageScroll href="#dynamic-content">Dynamic Content</a></li>
        <li><a pageScroll href="#dynamic-html">Dynamic Html</a></li>
        <li><a pageScroll href="#container-body">Append to body</a></li>
        <li><a pageScroll href="#config">Configuring defaults</a></li>
      </ul>
    </li>
    <li><a pageScroll href="#api-reference">API Reference</a>
      <ul>
        <li><a pageScroll href="#popover-directive">PopoverDirective</a></li>
        <li><a pageScroll href="#popover-config">PopoverConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
      
  <!-- basic -->
  <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
    <demo-popover-basic></demo-popover-basic>
  </ng-sample-box>      
  
  <!-- four directions -->
  <h2 id="four-directions">Four directions</h2>
  Four positioning options are available: top, right, bottom, and left aligned.
  <ng-sample-box [ts]="demos.forDirections.component" [html]="demos.forDirections.html">
    <demo-popover-four-directions></demo-popover-four-directions>
  </ng-sample-box>

  <h2 id="dismiss">Dismiss on next click</h2>
  <p>Use the <code>focus</code> trigger to dismiss popovers on the next click that the user makes.</p>
  <ng-sample-box [ts]="demos.dismiss.component" [html]="demos.dismiss.html">
    <demo-popover-dismiss></demo-popover-dismiss>
  </ng-sample-box>
  
  <h2 id="dynamic-content">Dynamic Content</h2>
  <p>Popover content can contain any html template. Just create <code>&lt;template #myId></code> with any
  html allowed by Angular, and provide template ref (<code>#myId</code>) as popover content.</p>
  <ng-sample-box [ts]="demos.dynamic.component" [html]="demos.dynamic.html">
    <demo-popover-dynamic></demo-popover-dynamic>
  </ng-sample-box>
  
  <h2 id="dynamic-html">Dynamic Html</h2>
  <p>By using small trick you can display any dynamic html, which you got from ajax request for example.</p>
  <ng-sample-box [ts]="demos.dynamicHtml.component" [html]="demos.dynamicHtml.html">
    <demo-popover-dynamic-html></demo-popover-dynamic-html>
  </ng-sample-box>  
  
  <h2 id="container-body">Append to body</h2>
  <p>When you have some styles on a parent element that interfere with a popover, you’ll want to specify a <code>container="body"</code> so that the popover’s HTML will be appended to body. This will help to avoid rendering problems in more complex components (like our input groups, button groups, etc) or inside elements with <code>overflow: hidden</code></p>
  <ng-sample-box [ts]="demos.container.component" [html]="demos.container.html">
    <demo-popover-container></demo-popover-container>
  </ng-sample-box>
  
  <h2 id="config">Configuring defaults</h2>
  <ng-sample-box [ts]="demos.config.component" [html]="demos.config.html">
    <demo-popover-config></demo-popover-config>
  </ng-sample-box>
  
  <h2 id="api-reference">API Reference</h2>
  
  <ng-api-doc id="popover-directive" directive="PopoverDirective"></ng-api-doc>
  <ng-api-doc-config id="popover-config" type="PopoverConfig"></ng-api-doc-config>
</demo-section>`
})
export class PopoverSectionComponent {
  public name:string = 'Popover';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/popover';
  public demos: any = DEMOS;
  public titleDoc:string = titleDoc;
}
