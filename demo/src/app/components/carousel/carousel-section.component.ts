import { Component } from '@angular/core';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

let ts = require('!!raw?lang=typescript!./demos/carousel-demo.component.ts');
let html = require('!!raw?lang=markup!./demos/carousel-demo.component.html');

@Component({
  selector: 'carousel-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>A slideshow component for cycling through elements—images or slides of text—like a carousel. <em>Nested carousels are not supported.</em></p>

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
        <li><a pageScroll href="#carousel-component">CarouselComponent</a></li>
        <li><a pageScroll href="#slide-component">SlideComponent</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
   
  <!-- basic -->
  <ng-sample-box [ts]="ts" [html]="html">
    <carousel-demo></carousel-demo>
  </ng-sample-box>
  
  <h2 id="api-reference">API Reference</h2>
  <ng-api-doc id="carousel-component" directive="CarouselComponent"></ng-api-doc>
  <ng-api-doc id="slide-component" directive="SlideComponent"></ng-api-doc>
</demo-section>
`
})
export class CarouselSectionComponent {
  public name:string = 'Carousel';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/carousel';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
}
