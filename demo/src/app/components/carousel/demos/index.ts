import { DemoCarouselDynamicComponent } from './dynamic/dynamic';
import { DemoCarouseBasicComponent } from './basic/basic';
import { DemoCarouselCaptionsComponent } from './captions/captions';
import { DemoCarouselConfigComponent } from './config/config';

export const DEMO_COMPONENTS = [
  DemoCarouselDynamicComponent,
  DemoCarouseBasicComponent,
  DemoCarouselCaptionsComponent,
  DemoCarouselConfigComponent
];

export const DEMOS = {
  basic: {
    component: require('!!raw?lang=typescript!./basic/basic.ts'),
    html: require('!!raw?lang=markup!./basic/basic.html')
  },
  captions: {
    component: require('!!raw?lang=typescript!./captions/captions.ts'),
    html: require('!!raw?lang=markup!./captions/captions.html')
  },
  dynamic: {
    component: require('!!raw?lang=typescript!./dynamic/dynamic.ts'),
    html: require('!!raw?lang=markup!./dynamic/dynamic.html')
  },
  config: {
    component: require('!!raw?lang=typescript!./config/config.ts'),
    html: require('!!raw?lang=markup!./config/config.html')
  }
};
