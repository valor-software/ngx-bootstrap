import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'pagination-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p><strong>Pagination</strong> - provide pagination links for your site or app with the multi-page pagination component, or the simpler pager alternative.</p>
  <p><strong>Pager</strong> - quick previous and next links for simple pagination implementations with light markup and styles. It's great for simple sites like blogs or magazines.</p>
  
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
        <li><a pageScroll href="#pagination-component">PaginationComponent</a></li>
        <li><a pageScroll href="#pager-component">PagerComponent</a></li>
        <li><a pageScroll href="#pagination-config">PaginationConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
  
  <!-- basic -->
  <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
    <pagination-demo></pagination-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  <ng-api-doc id="pagination-component" directive="PaginationComponent"></ng-api-doc>
  <ng-api-doc id="pager-component" directive="PagerComponent"></ng-api-doc>
  <ng-api-doc-config id="pagination-config" type="PaginationConfig"></ng-api-doc-config>
</demo-section>`
})
export class PaginationSectionComponent {
  public name:string = 'Pagination';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/pagination';
  public demos: any = DEMOS;
  public titleDoc:string = titleDoc;
}
