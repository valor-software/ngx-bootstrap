import { DemoTabsBasicComponent } from './basic/basic';
import { DemoTabsDynamicComponent } from './dynamic/dynamic';
import { DemoTabsStylingComponent } from './styling/styling';
import { DemoTabsPillsComponent } from './pills/pills';
import { DemoTabsVerticalPillsComponent } from './vertical-pills/vertical-pills';
import { DemoTabsJustifiedComponent } from './justified/justified';
import { DemoTabsConfigComponent } from './config/config';

export const DEMO_COMPONENTS = [
  DemoTabsBasicComponent, DemoTabsDynamicComponent, DemoTabsStylingComponent, DemoTabsPillsComponent,
  DemoTabsVerticalPillsComponent, DemoTabsJustifiedComponent, DemoTabsConfigComponent
];

export const DEMOS = {
  basic: {
    component: require('!!raw?lang=typescript!./basic/basic'),
    html: require('!!raw?lang=markup!./basic/basic.html')
  },
  dynamic: {
    component: require('!!raw?lang=typescript!./dynamic/dynamic'),
    html: require('!!raw?lang=markup!./dynamic/dynamic.html')
  },
  pills: {
    component: require('!!raw?lang=typescript!./pills/pills'),
    html: require('!!raw?lang=markup!./pills/pills.html')
  },
  verticalPills: {
    component: require('!!raw?lang=typescript!./vertical-pills/vertical-pills'),
    html: require('!!raw?lang=markup!./vertical-pills/vertical-pills.html')
  },
  justified: {
    component: require('!!raw?lang=typescript!./justified/justified'),
    html: require('!!raw?lang=markup!./justified/justified.html')
  },
  styling: {
    component: require('!!raw?lang=typescript!./styling/styling'),
    html: require('!!raw?lang=markup!./styling/styling.html')
  },
  config: {
    component: require('!!raw?lang=typescript!./config/config'),
    html: require('!!raw?lang=markup!./config/config.html')
  }
};
