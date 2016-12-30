import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'tooltip-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Inspired by the excellent Tipsy jQuery plugin written by Jason Frame. Tooltips are an updated version, which don’t rely on images, use CSS3 for animations, and much more.</p>

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
        <li><a pageScroll href="#tooltip-directive">TooltipDirective</a></li>
        <li><a pageScroll href="#tooltip-config">TooltipConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
      
  <!-- basic -->
  <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
    <tooltip-demo></tooltip-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  
  <ng-api-doc id="tooltip-directive" directive="TooltipDirective"></ng-api-doc>
  <ng-api-doc-config id="tooltip-config" type="TooltipConfig"></ng-api-doc-config>
</demo-section>`
})
export class TooltipSectionComponent {
  public name:string = 'Tooltip';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/tooltip';
  public demos: any = DEMOS;
  public titleDoc:string = titleDoc;
}
