import { CarouselDemoComponent } from './carousel-demo.component';
import { DemoCarouseBasicComponent } from './basic/basic';
import { DemoCarouselCaptionsComponent } from './captions/captions';
import { DemoCarouselConfigComponent } from './config/config';

export const DEMO_COMPONENTS = [
  CarouselDemoComponent,
  DemoCarouseBasicComponent,
  DemoCarouselCaptionsComponent,
  DemoCarouselConfigComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./carousel-demo.component'),
    html: require('!!raw?lang=markup!./carousel-demo.component.html')
  },
  basic: {
    component: require('!!raw?lang=typescript!./basic/basic.ts'),
    html: require('!!raw?lang=markup!./basic/basic.html')
  },
  captions: {
    component: require('!!raw?lang=typescript!./captions/captions.ts'),
    html: require('!!raw?lang=markup!./captions/captions.html')
  },
  config: {
    component: require('!!raw?lang=typescript!./config/config.ts'),
    html: require('!!raw?lang=markup!./config/config.html')
  }
};
