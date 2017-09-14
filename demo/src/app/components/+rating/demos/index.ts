import { DemoRatingBasicComponent } from './basic/basic';
import { DemoRatingCustomComponent } from './custom/custom';
import { DemoRatingDynamicComponent } from './dynamic/dynamic';

export const DEMO_COMPONENTS = [
  DemoRatingBasicComponent,
  DemoRatingCustomComponent,
  DemoRatingDynamicComponent
];

export const DEMOS = {
  basic: {
    component: require('!!raw-loader?lang=typescript!./basic/basic'),
    html: require('!!raw-loader?lang=markup!./basic/basic.html')
  },
  dynamic: {
    component: require('!!raw-loader?lang=typescript!./dynamic/dynamic'),
    html: require('!!raw-loader?lang=markup!./dynamic/dynamic.html')
  },
  custom: {
    component: require('!!raw-loader?lang=typescript!./custom/custom'),
    html: require('!!raw-loader?lang=markup!./custom/custom.html')
  }
};
