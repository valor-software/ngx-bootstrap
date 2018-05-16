import { BaseComponent } from './base.component';

export class CarouselPo extends BaseComponent {
  pageUrl = '/carousel';
  pageTitle = 'Carousel';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/carousel';

  carouselClass = '.carousel';
  indicatorClass = '.carousel-indicators';
  itemClass = '.carousel-item';
  leftControl = '.carousel-control-prev';
  rightControl = '.carousel-control-next';

  exampleDemosArr = {
    basic: 'demo-carousel-basic'
  };
}
