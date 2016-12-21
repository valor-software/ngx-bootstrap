import { Component } from '@angular/core';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

let ts = require('!!raw?lang=typescript!./demos/timepicker-demo.component.ts');
let html = require('!!raw?lang=markup!./demos/timepicker-demo.component.html');

@Component({
  selector: 'timepicker-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>A lightweight &amp; configurable timepicker directive</p>

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
        <li><a pageScroll href="#timepicker-component">TimepickerComponent</a></li>
        <li><a pageScroll href="#timepicker-config">TimepickerConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
      
  <!-- basic -->
  <ng-sample-box [ts]="ts" [html]="html">
    <timepicker-demo></timepicker-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  
  <ng-api-doc id="timepicker-component" directive="TimepickerComponent"></ng-api-doc>
  <ng-api-doc-config id="timepicker-config" type="TimepickerConfig"></ng-api-doc-config>
</demo-section>`
})
export class TimepickerSectionComponent {
  public name:string = 'Timepicker';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/timepicker';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
}
