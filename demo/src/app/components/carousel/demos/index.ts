import { CarouselDemoComponent } from './carousel-demo.component';

export const DEMO_COMPONENTS = [
  CarouselDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./carousel-demo.component'),
    html: require('!!raw?lang=markup!./carousel-demo.component.html')
  }
};
