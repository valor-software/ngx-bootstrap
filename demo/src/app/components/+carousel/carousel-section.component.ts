import { Component } from '@angular/core';
import { DEMOS } from './demos';

import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
import { carouselExamples, carouselApi } from './carousel-section.list';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'carousel-section',
  templateUrl: './carousel-section.component.html'
})
export class CarouselSectionComponent {
  name: string = 'Carousel';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/carousel';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  carouselExamples: ComponentExample[] = carouselExamples;
  carouselApi: ComponentApi[] = carouselApi;
}
