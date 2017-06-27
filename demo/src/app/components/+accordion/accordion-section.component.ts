// todo: add more samples https://jqueryui.com/accordion/#default
// todo: add more samples http://getbootstrap.com/components/#panels-alternatives

import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/usage.md');

console.log('loaded async')

@Component({
  selector: 'accordion-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Displays collapsible content panels for presenting information in a limited amount of space</p>
  <p>The <strong>accordion component</strong> builds on top of the collapse directive to provide a list of items, with collapsible bodies that are collapsed or expanded by clicking on the item's header.</p>
  
  <h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="examples">Examples</a>
      <ul>
        <li><a routerLink="." fragment="simple">Simple accordion</a></li>
        <li><a routerLink="." fragment="disabled">Disabled</a></li>
        <li><a routerLink="." fragment="dynamic">Dynamic accordion</a></li>
        <li><a routerLink="." fragment="one-time">Open only one at a time</a></li>
        <li><a routerLink="." fragment="styling">Styling</a></li>
        <li><a routerLink="." fragment="config">Configuring defaults</a></li>
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="accordion-panel-component">AccordionPanelComponent</a></li>
        <li><a routerLink="." fragment="accordion-config">AccordionConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
      
  <p>Click headers to expand/collapse content that is broken into logical sections, much like tabs.</p>
  
  <h2 routerLink="." fragment="simple" id="simple">Simple accordion</h2>
  <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
    <demo-accordion-basic></demo-accordion-basic>
  </ng-sample-box>
        
  <h2 routerLink="." fragment="disabled" id="disabled">Disabled</h2>
  <ng-sample-box [ts]="demos.disabled.component" [html]="demos.disabled.html">
    <demo-accordion-disabled></demo-accordion-disabled>
  </ng-sample-box>  
        
  <h2 routerLink="." fragment="dynamic" id="dynamic">Dynamic accordion</h2>
  <ng-sample-box [ts]="demos.dynamic.component" [html]="demos.dynamic.html">
    <demo-accordion-dynamic></demo-accordion-dynamic>
  </ng-sample-box>   
       
  <h2 routerLink="." fragment="one-time" id="one-time">Open only one at a time</h2>
  <ng-sample-box [ts]="demos.oneAtATime.component" [html]="demos.oneAtATime.html">
    <demo-accordion-one-time></demo-accordion-one-time>
  </ng-sample-box>
                
  <h2 routerLink="." fragment="styling" id="styling">Styling</h2>
  <ng-sample-box [ts]="demos.styling.component" [html]="demos.styling.html" [style]="demos.styling.css">
    <demo-accordion-styling></demo-accordion-styling>
  </ng-sample-box>
                
  <h2 routerLink="." fragment="config" id="config">Configuring defaults</h2>
  <ng-sample-box [ts]="demos.config.component" [html]="demos.config.html">
    <demo-accordion-config></demo-accordion-config>
  </ng-sample-box>

  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  <ng-api-doc routerLink="." fragment="accordion-panel-component" id="accordion-panel-component" directive="AccordionPanelComponent"></ng-api-doc>
  <ng-api-doc-config routerLink="." fragment="accordion-config" id="accordion-config" type="AccordionConfig"></ng-api-doc-config>
</demo-section>`
})
export class AccordionSectionComponent {
  public name: string = 'Accordion';
  public src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/accordion';
  public titleDoc: string = titleDoc;
  public demos: any = DEMOS;
}
