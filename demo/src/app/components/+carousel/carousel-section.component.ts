import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'carousel-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>A slideshow component for cycling through elements—images or slides of text—like a carousel. <em>Nested carousels are not supported.</em></p>

  <h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="examples">Examples</a>
      <ul>
        <li><a routerLink="." fragment="captions">Optional captions</a></li>
        <li><a routerLink="." fragment="config">Configuring defaults</a></li>
        <li><a routerLink="." fragment="dynamic">Dynamic Slides</a></li>
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="carousel-component">CarouselComponent</a></li>
        <li><a routerLink="." fragment="slide-component">SlideComponent</a></li>
        <li><a routerLink="." fragment="carousel-config">CarouselConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
   
  <!-- basic -->
  <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
    <demo-carousel-basic></demo-carousel-basic>
  </ng-sample-box>
    
  <!-- captions -->
  <h2 routerLink="." fragment="captions" id="captions">Optional captions</h2>
  <p>Add captions to your slides easily with the <code>.carousel-caption</code> element within any <code>&lt;slide></code>.
 Place just about any optional HTML within there and it will be automatically aligned and formatted.</p>
  <ng-sample-box [ts]="demos.captions.component" [html]="demos.captions.html">
    <demo-carousel-captions></demo-carousel-captions>
  </ng-sample-box>
    
  <!-- config -->
  <h2 routerLink="." fragment="config" id="config">Configuring defaults</h2>
  <ng-sample-box [ts]="demos.config.component" [html]="demos.config.html">
    <demo-carousel-config></demo-carousel-config>
  </ng-sample-box>
  
  <!-- dynamic -->
  <h2 routerLink="." fragment="dynamic" id="dynamic">Dynamic Slides</h2>
  <ng-sample-box [ts]="demos.dynamic.component" [html]="demos.dynamic.html">
    <demo-carousel-dynamic></demo-carousel-dynamic>
  </ng-sample-box>
  
  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  <ng-api-doc id="carousel-component" directive="CarouselComponent"></ng-api-doc>
  <ng-api-doc id="slide-component" directive="SlideComponent"></ng-api-doc>
  <ng-api-doc-config id="carousel-config" type="CarouselConfig"></ng-api-doc-config>
</demo-section>
`
})
export class CarouselSectionComponent {
  public name: string = 'Carousel';
  public src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/carousel';
  public demos: any = DEMOS;
  public titleDoc: string = titleDoc;
}
