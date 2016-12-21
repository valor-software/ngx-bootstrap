// todo: add more samples https://jqueryui.com/accordion/#default
// todo: add more samples http://getbootstrap.com/components/#panels-alternatives

import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html!markdown!./docs/usage.md');

@Component({
  selector: 'accordion-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Displays collapsible content panels for presenting information in a limited amount of space</p>
  <p>The <strong>accordion component</strong> builds on top of the collapse directive to provide a list of items, with collapsible bodies that are collapsed or expanded by clicking on the item's header.</p>
  
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
        <li><a pageScroll href="#accordion-panel-component">AccordionPanelComponent</a></li>
        <li><a pageScroll href="#accordion-config">AccordionConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
      
  <!-- basic -->
  <p>Click headers to expand/collapse content that is broken into logical sections, much like tabs.</p>
  
  <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
    <accordion-demo></accordion-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  <ng-api-doc id="accordion-panel-component" directive="AccordionPanelComponent"></ng-api-doc>
  <ng-api-doc-config id="accordion-config" type="AccordionConfig"></ng-api-doc-config>
</demo-section>`
})
export class AccordionSectionComponent {
  public name: string = 'Accordion';
  public src: string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/accordion';
  public titleDoc: string = titleDoc;
  public demos: any = DEMOS;
}
