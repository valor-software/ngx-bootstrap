import { DemoAccordionBasicComponent } from './basic/basic';
import { DemoAccordionDisabledComponent } from './disabled/disabled';
import { DemoAccordionStylingComponent } from './styling/styling';
import { DemoAccordionOneAtATimeComponent } from './one-at-a-time/one-at-a-time';
import { DemoAccordionDynamicComponent } from './dymanic/dynamic';
import { DemoAccordionConfigComponent } from './config/config';

export const DEMO_COMPONENTS = [
  DemoAccordionBasicComponent, DemoAccordionDisabledComponent, DemoAccordionStylingComponent,
  DemoAccordionOneAtATimeComponent, DemoAccordionDynamicComponent, DemoAccordionConfigComponent
];

export const DEMOS = {
  basic: {
    component: require('!!raw?lang=typescript!./basic/basic'),
    html: require('!!raw?lang=markup!./basic/basic.html')
  },
  disabled: {
    component: require('!!raw?lang=typescript!./disabled/disabled'),
    html: require('!!raw?lang=markup!./disabled/disabled.html')
  },
  dynamic: {
    component: require('!!raw?lang=typescript!./dymanic/dynamic'),
    html: require('!!raw?lang=markup!./dymanic/dynamic.html')
  },
  oneAtATime: {
    component: require('!!raw?lang=typescript!./one-at-a-time/one-at-a-time'),
    html: require('!!raw?lang=markup!./one-at-a-time/one-at-a-time.html')
  },
  config: {
    component: require('!!raw?lang=typescript!./config/config'),
    html: require('!!raw?lang=markup!./config/config.html')
  },
  styling: {
    component: require('!!raw?lang=typescript!./styling/styling'),
    html: require('!!raw?lang=markup!./styling/styling.html')
  }
};
