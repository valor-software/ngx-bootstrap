import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'rating-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Rating component that will take care of visualising a star rating bar</p>
  <p><em>Note</em>: Bootstrap 4 do not include glyphicons anymore, so if you want to continue use this font, you will need to add a link to <a href="https://github.com/valor-software/ng2-bootstrap/blob/master/demo/assets/css/glyphicons.css"><code>glyphicons.css</code></a></p>
  
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
        <li><a pageScroll href="#rating-component">RatingComponent</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
      
  <!-- basic -->
  <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
    <rating-demo></rating-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  <ng-api-doc id="rating-component" directive="RatingComponent"></ng-api-doc>
</demo-section>`
})
export class RatingSectionComponent {
  public name:string = 'Rating';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/rating';
  public demos: any = DEMOS;
  public titleDoc:string = titleDoc;
}
