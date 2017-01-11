import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

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
        <!--<li><a routerLink="." fragment="link-color">Link color</a></li>-->
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
      
  <!-- basic -->
  <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
    <timepicker-demo></timepicker-demo>
  </ng-sample-box>
      
  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  
  <ng-api-doc id="timepicker-component" directive="TimepickerComponent"></ng-api-doc>
  <ng-api-doc-config id="timepicker-config" type="TimepickerConfig"></ng-api-doc-config>
</demo-section>`
})
export class TimepickerSectionComponent {
  public name:string = 'Timepicker';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/timepicker';
  public demos: any = DEMOS;
  public titleDoc:string = titleDoc;
}
