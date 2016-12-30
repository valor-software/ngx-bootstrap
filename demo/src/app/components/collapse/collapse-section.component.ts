import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'collapse-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Collapse component allows you to toggle content on your pages with a bit of JavaScript and some classes. Flexible component that utilizes a handful of classes (from the <strong>required transitions component</strong>(<em>not yet implemented</em>)) for easy toggle behavior.</p>
  
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
        <li><a pageScroll href="#collapse-directive">CollapseDirective</a></li>
      </ul>
    </li>
  </ul>
       
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
      
  <!-- basic -->
  <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
    <collapse-demo></collapse-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  <ng-api-doc id="collapse-directive" directive="CollapseDirective"></ng-api-doc>
</demo-section>`
})
export class CollapseSectionComponent {
  public name:string = 'Collapse';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/collapse';
  public demos: any = DEMOS;
  public titleDoc:string = titleDoc;
}
