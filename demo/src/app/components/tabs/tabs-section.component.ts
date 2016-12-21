import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'tabs-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus. <strong>Nested tabs are not supported.</strong></p>
  
  <h2>Contents</h2>
  <ul>
    <li><a pageScroll href="#usage">Usage</a></li>
    <li><a pageScroll href="#examples">Examples</a>
      <ul>
        <!--<li><a pageScroll href="#link-color">Link color</a></li>-->
      </ul>
    </li>
    <li><a pageScroll href="#api-reference">API Reference</a>
      <ul>
        <li><a pageScroll href="#tabset-component">TabsetComponent</a></li>
        <li><a pageScroll href="#tab-directive">TabDirective</a></li>
        <li><a pageScroll href="#tab-heading-directive">TabHeadingDirective</a></li>
        <li><a pageScroll href="#tabset-config">TabsetConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
      
  <!-- basic -->
  <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
      <tabs-demo></tabs-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  
  <ng-api-doc id="tabset-component" directive="TabsetComponent"></ng-api-doc>
  <ng-api-doc id="tab-directive" directive="TabDirective"></ng-api-doc>
  <ng-api-doc id="tab-heading-directive" directive="TabHeadingDirective"></ng-api-doc>
  <ng-api-doc-config id="tabset-config" type="TabsetConfig"></ng-api-doc-config>
</demo-section>`
})
export class TabsSectionComponent {
  public name:string = 'Tabs';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/tabs';
  public demos: any = DEMOS;
  public titleDoc:string = titleDoc;
}
