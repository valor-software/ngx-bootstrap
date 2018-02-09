import { BaseComponent } from './base.component';

export class CarouselPo extends BaseComponent {
  pageUrl = '/carousel';
  pageTitle = 'Carousel';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/carousel';

  exampleDemosArr = {
    basic: 'demo-carousel-basic',
    optionalCaptions: 'demo-carousel-captions',
    config: 'demo-carousel-config',
    dynamic: 'demo-carousel-dynamic'
  };
}
