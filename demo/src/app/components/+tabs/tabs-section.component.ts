import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'tabs-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus. <strong>Nested tabs are not supported.</strong></p>
  
  <h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="examples">Examples</a>
      <ul>
        <li><a routerLink="." fragment="static">Static tabs</a></li>
        <li><a routerLink="." fragment="dynamic">Dynamic tabs</a></li>
        <li><a routerLink="." fragment="pills">Pills</a></li>
        <li><a routerLink="." fragment="vertical-pills">Vertical Pills</a></li>
        <li><a routerLink="." fragment="justified">Justified</a></li>
        <li><a routerLink="." fragment="styling">Styling</a></li>
        <li><a routerLink="." fragment="config">Configuring defaults</a></li>
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="tabset-component">TabsetComponent</a></li>
        <li><a routerLink="." fragment="tab-directive">TabDirective</a></li>
        <li><a routerLink="." fragment="tab-heading-directive">TabHeadingDirective</a></li>
        <li><a routerLink="." fragment="tabset-config">TabsetConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
  
  <h2 routerLink="." fragment="static" id="static">Static tabs</h2>    
  <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
      <demo-tabs-basic></demo-tabs-basic>
  </ng-sample-box>
       
  <h2 routerLink="." fragment="dynamic" id="dynamic">Dynamic tabs</h2>    
  <ng-sample-box [ts]="demos.dynamic.component" [html]="demos.dynamic.html">
      <demo-tabs-dynamic></demo-tabs-dynamic>
  </ng-sample-box>
          
  <h2 routerLink="." fragment="pills" id="pills">Pills</h2>    
  <ng-sample-box [ts]="demos.pills.component" [html]="demos.pills.html">
      <demo-tabs-pills></demo-tabs-pills>
  </ng-sample-box>
                 
  <h2 routerLink="." fragment="vertical-pills" id="vertical-pills">Vertical Pills</h2>    
  <ng-sample-box [ts]="demos.verticalPills.component" [html]="demos.verticalPills.html">
      <demo-tabs-vertical-pills></demo-tabs-vertical-pills>
  </ng-sample-box>
                       
  <h2 routerLink="." fragment="justified" id="justified">Justified</h2>   
  <p><i>Bootstrap 4 doesn't have justified classes</i></p>
  <ng-sample-box [ts]="demos.justified.component" [html]="demos.justified.html">
      <demo-tabs-justified></demo-tabs-justified>
  </ng-sample-box>
       
  <h2 routerLink="." fragment="styling" id="styling">Styling</h2>    
  <ng-sample-box [ts]="demos.styling.component" [html]="demos.styling.html">
      <demo-tabs-styling></demo-tabs-styling>
  </ng-sample-box>
         
  <h2 routerLink="." fragment="config" id="config">Configuring defaults</h2>    
  <ng-sample-box [ts]="demos.config.component" [html]="demos.config.html">
      <demo-tabs-config></demo-tabs-config>
  </ng-sample-box>

  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  
  <ng-api-doc routerLink="." fragment="tabset-component" id="tabset-component" directive="TabsetComponent"></ng-api-doc>
  <ng-api-doc routerLink="." fragment="tab-directive"id="tab-directive" directive="TabDirective"></ng-api-doc>
  <ng-api-doc routerLink="." fragment="tab-heading-directive" id="tab-heading-directive" directive="TabHeadingDirective"></ng-api-doc>
  <ng-api-doc-config routerLink="." fragment="tabset-config" id="tabset-config" type="TabsetConfig"></ng-api-doc-config>
</demo-section>`
})
export class TabsSectionComponent {
  public name: string = 'Tabs';
  public src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tabs';
  public demos: any = DEMOS;
  public titleDoc: string = titleDoc;
}
