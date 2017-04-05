import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'rating-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Rating component that will take care of visualising a star rating bar</p>
  <p><em>Note</em>: Bootstrap 4 do not include glyphicons anymore, so if you want to continue use this font, you will need to add a link to <a href="https://github.com/valor-software/ngx-bootstrap/blob/master/demo/assets/css/glyphicons.css"><code>glyphicons.css</code></a></p>
  
  <h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="examples">Examples</a>
      <ul>
        <li><a routerLink="." fragment="static">Static rating</a></li>
        <li><a routerLink="." fragment="dynamic">Dynamic rating</a></li>
        <li><a routerLink="." fragment="custom">Custom icons</a></li>
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="rating-component">RatingComponent</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
  
  <h2 routerLink="." fragment="static" id="static">Static rating</h2>
  <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
    <demo-rating-basic></demo-rating-basic>
  </ng-sample-box>  
  
  <h2 routerLink="." fragment="dynamic" id="dynamic">Dynamic rating</h2>
  <ng-sample-box [ts]="demos.dynamic.component" [html]="demos.dynamic.html">
    <demo-rating-dynamic></demo-rating-dynamic>
  </ng-sample-box> 
   
  <h2 routerLink="." fragment="custom" id="custom">Custom icons</h2>
  <ng-sample-box [ts]="demos.custom.component" [html]="demos.custom.html">
    <demo-rating-custom></demo-rating-custom>
  </ng-sample-box>
      
  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  <ng-api-doc routerLink="." fragment="rating-component" id="rating-component" directive="RatingComponent"></ng-api-doc>
</demo-section>`
})
export class RatingSectionComponent {
  public name: string = 'Rating';
  public src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/rating';
  public demos: any = DEMOS;
  public titleDoc: string = titleDoc;
}
