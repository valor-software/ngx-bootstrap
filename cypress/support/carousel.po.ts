import { BaseComponent } from './base.component';

export class CarouselPo extends BaseComponent {
  pageUrl = '/carousel';
  pageTitle = 'Carousel';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/carousel';

  exampleTitlesArr = [
    'Basic',
    'Optional captions',
    'Configuring defaults',
    'Dynamic Slides'
  ];

  exampleDemosArr = [
    'demo-carousel-basic',
    'demo-carousel-captions',
    'demo-carousel-config',
    'demo-carousel-dynamic'
  ];
}
