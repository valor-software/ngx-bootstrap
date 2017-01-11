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
    component: require('!!raw?lang=typescript!./basic/basic'),
    html: require('!!raw?lang=markup!./basic/basic.html')
  },
  meridian: {
    component: require('!!raw?lang=typescript!./meridian/meridian'),
    html: require('!!raw?lang=markup!./meridian/meridian.html')
  },
  disabled: {
    component: require('!!raw?lang=typescript!./disabled/disabled'),
    html: require('!!raw?lang=markup!./disabled/disabled.html')
  },
  custom: {
    component: require('!!raw?lang=typescript!./custom/custom'),
    html: require('!!raw?lang=markup!./custom/custom.html')
  },
  dynamic: {
    component: require('!!raw?lang=typescript!./dynamic/dynamic'),
    html: require('!!raw?lang=markup!./dynamic/dynamic.html')
  },
  config: {
    component: require('!!raw?lang=typescript!./config/config'),
    html: require('!!raw?lang=markup!./config/config.html')
  }
};
