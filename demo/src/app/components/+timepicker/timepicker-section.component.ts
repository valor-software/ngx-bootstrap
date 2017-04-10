import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'timepicker-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>A lightweight &amp; configurable timepicker directive</p>

  <h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="examples">Examples</a>
      <ul>
        <li><a routerLink="." fragment="basic">Timepicker</a></li>
        <li><a routerLink="." fragment="meridian">Meridian</a></li>
        <li><a routerLink="." fragment="disabled">Disabled</a></li>
        <li><a routerLink="." fragment="custom">Custom steps</a></li>
        <li><a routerLink="." fragment="dynamic">Dynamic</a></li>
        <li><a routerLink="." fragment="config">Configuring defaults</a></li>
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="timepicker-component">TimepickerComponent</a></li>
        <li><a routerLink="." fragment="timepicker-config">TimepickerConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
      
  <h2 routerLink="." fragment="basic" id="basic">Timepicker</h2>
  <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
    <demo-timepicker-basic></demo-timepicker-basic>
  </ng-sample-box>
      
  <h2 routerLink="." fragment="meridian" id="meridian">Meridian</h2>
  <ng-sample-box [ts]="demos.meridian.component" [html]="demos.meridian.html">
    <demo-timepicker-meridian></demo-timepicker-meridian>
  </ng-sample-box>
              
  <h2 routerLink="." fragment="disabled" id="disabled">Disabled</h2>
  <ng-sample-box [ts]="demos.disabled.component" [html]="demos.disabled.html">
    <demo-timepicker-disabled></demo-timepicker-disabled>
  </ng-sample-box>
                      
  <h2 routerLink="." fragment="custom" id="custom">Custom steps</h2>
  <ng-sample-box [ts]="demos.custom.component" [html]="demos.custom.html">
    <demo-timepicker-custom></demo-timepicker-custom>
  </ng-sample-box>     
                   
  <h2 routerLink="." fragment="dynamic" id="dynamic">Dynamic</h2>
  <ng-sample-box [ts]="demos.dynamic.component" [html]="demos.dynamic.html">
    <demo-timepicker-dynamic></demo-timepicker-dynamic>
  </ng-sample-box>
        
  <h2 routerLink="." fragment="config" id="config">Configuring defaults</h2>
  <ng-sample-box [ts]="demos.config.component" [html]="demos.config.html">
    <demo-timepicker-config></demo-timepicker-config>
  </ng-sample-box>

  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  
  <ng-api-doc routerLink="." fragment="timepicker-component" id="timepicker-component" directive="TimepickerComponent"></ng-api-doc>
  <ng-api-doc-config routerLink="." fragment="timepicker-config" id="timepicker-config" type="TimepickerConfig"></ng-api-doc-config>
</demo-section>`
})
export class TimepickerSectionComponent {
  public name: string = 'Timepicker';
  public src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/timepicker';
  public demos: any = DEMOS;
  public titleDoc: string = titleDoc;
}
