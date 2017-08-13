import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'pagination-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p><strong>Pagination</strong> - provide pagination links for your site or app with the multi-page pagination component, or the simpler pager alternative.</p>
  <p><strong>Pager</strong> - quick previous and next links for simple pagination implementations with light markup and styles. It's great for simple sites like blogs or magazines.</p>
  
    <h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="examples">Examples</a>
      <ul>
        <li><a routerLink="." fragment="default">Default</a></li>
        <li><a routerLink="." fragment="limit">States & Limits</a></li>
        <li><a routerLink="." fragment="pager">Pager</a></li>
        <!--<li><a routerLink="." fragment="styling">Styling</a></li>-->
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="pagination-component">PaginationComponent</a></li>
        <li><a routerLink="." fragment="pager-component">PagerComponent</a></li>
        <li><a routerLink="." fragment="pagination-config">PaginationConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
  
  <h2 routerLink="." fragment="default" id="default">Default</h2>
  <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
    <demo-pagination-basic></demo-pagination-basic>
  </ng-sample-box>  
  
  <h2 routerLink="." fragment="limit" id="limit">States & Limits</h2>
  <p>Limit the maximum visible buttons</p>
  <ng-sample-box [ts]="demos.limit.component" [html]="demos.limit.html">
    <demo-pagination-limit></demo-pagination-limit>
  </ng-sample-box>
  
  <h2 routerLink="." fragment="pager" id="pager">Pager</h2>
  <ng-sample-box [ts]="demos.pager.component" [html]="demos.pager.html">
    <demo-pagination-pager></demo-pagination-pager>
  </ng-sample-box>
    
  <!--TODO: temporary disabled pageBtnClass option-->
  <!--<h2 routerLink="." fragment="styling" id="styling">Styling</h2>-->
  <!--<ng-sample-box [ts]="demos.styling.component" [html]="demos.styling.html">-->
    <!--<demo-pagination-styling></demo-pagination-styling>-->
  <!--</ng-sample-box>-->
      
  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  <ng-api-doc routerLink="." fragment="pagination-component" id="pagination-component" directive="PaginationComponent"></ng-api-doc>
  <ng-api-doc routerLink="." fragment="pager-component" id="pager-component" directive="PagerComponent"></ng-api-doc>
  <ng-api-doc-config routerLink="." fragment="pagination-config" id="pagination-config" type="PaginationConfig"></ng-api-doc-config>
</demo-section>`
})
export class PaginationSectionComponent {
  public name: string = 'Pagination';
  public src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/pagination';
  public demos: any = DEMOS;
  public titleDoc: string = titleDoc;
}
