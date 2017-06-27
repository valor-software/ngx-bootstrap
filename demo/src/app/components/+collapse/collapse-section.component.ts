import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'collapse-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Collapse component allows you to toggle content on your pages with a bit of JavaScript and some classes. Flexible component that utilizes a handful of classes (from the <strong>required transitions component</strong>(<em>not yet implemented</em>)) for easy toggle behavior.</p>
  
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
        <li><a routerLink="." fragment="collapse-directive">CollapseDirective</a></li>
      </ul>
    </li>
  </ul>
       
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
      
  <!-- basic -->
  <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
    <collapse-demo></collapse-demo>
  </ng-sample-box>
      
  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  <ng-api-doc id="collapse-directive" directive="CollapseDirective"></ng-api-doc>
</demo-section>`
})
export class CollapseSectionComponent {
  public name:string = 'Collapse';
  public src:string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/collapse';
  public demos: any = DEMOS;
  public titleDoc:string = titleDoc;
}
