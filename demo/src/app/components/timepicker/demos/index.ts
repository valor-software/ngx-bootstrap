import { DemoTimepickerBasicComponent } from './basic/basic';
import { DemoTimepickerConfigComponent } from './config/config';
import { DemoTimepickerMeridianComponent } from './meridian/meridian';
import { DemoTimepickerDisabledComponent } from './disabled/disabled';
import { DemoTimepickerCustomComponent } from './custom/custom';
import { DemoTimepickerDynamicComponent } from './dynamic/dynamic';

export const DEMO_COMPONENTS = [
  DemoTimepickerBasicComponent, DemoTimepickerConfigComponent, DemoTimepickerMeridianComponent,
  DemoTimepickerDisabledComponent, DemoTimepickerCustomComponent, DemoTimepickerDynamicComponent
];

export const DEMOS = {
  basic: {
    component: require('!!raw-loader?lang=typescript!./basic/basic'),
    html: require('!!raw-loader?lang=markup!./basic/basic.html')
  },
  meridian: {
    component: require('!!raw-loader?lang=typescript!./meridian/meridian'),
    html: require('!!raw-loader?lang=markup!./meridian/meridian.html')
  },
  disabled: {
    component: require('!!raw-loader?lang=typescript!./disabled/disabled'),
    html: require('!!raw-loader?lang=markup!./disabled/disabled.html')
  },
  custom: {
    component: require('!!raw-loader?lang=typescript!./custom/custom'),
    html: require('!!raw-loader?lang=markup!./custom/custom.html')
  },
  dynamic: {
    component: require('!!raw-loader?lang=typescript!./dynamic/dynamic'),
    html: require('!!raw-loader?lang=markup!./dynamic/dynamic.html')
  },
  config: {
    component: require('!!raw-loader?lang=typescript!./config/config'),
    html: require('!!raw-loader?lang=markup!./config/config.html')
  }
};
