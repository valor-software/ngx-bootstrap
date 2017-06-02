import { DemoTabsBasicComponent } from './basic/basic';
import { DemoTabsDynamicComponent } from './dynamic/dynamic';
import { DemoTabsReorderingComponent } from './reordering/reordering';
import { DemoTabsStylingComponent } from './styling/styling';
import { DemoTabsPillsComponent } from './pills/pills';
import { DemoTabsVerticalPillsComponent } from './vertical-pills/vertical-pills';
import { DemoTabsJustifiedComponent } from './justified/justified';
import { DemoTabsConfigComponent } from './config/config';

export const DEMO_COMPONENTS = [
  DemoTabsBasicComponent, DemoTabsDynamicComponent, DemoTabsStylingComponent, DemoTabsPillsComponent,
  DemoTabsVerticalPillsComponent, DemoTabsJustifiedComponent, DemoTabsConfigComponent, DemoTabsReorderingComponent
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
  reordering: {
    component: require('!!raw-loader?lang=typescript!./reordering/reordering'),
    html: require('!!raw-loader?lang=markup!./reordering/reordering.html')
  },
  pills: {
    component: require('!!raw-loader?lang=typescript!./pills/pills'),
    html: require('!!raw-loader?lang=markup!./pills/pills.html')
  },
  verticalPills: {
    component: require('!!raw-loader?lang=typescript!./vertical-pills/vertical-pills'),
    html: require('!!raw-loader?lang=markup!./vertical-pills/vertical-pills.html')
  },
  justified: {
    component: require('!!raw-loader?lang=typescript!./justified/justified'),
    html: require('!!raw-loader?lang=markup!./justified/justified.html')
  },
  styling: {
    component: require('!!raw-loader?lang=typescript!./styling/styling'),
    html: require('!!raw-loader?lang=markup!./styling/styling.html')
  },
  config: {
    component: require('!!raw-loader?lang=typescript!./config/config'),
    html: require('!!raw-loader?lang=markup!./config/config.html')
  }
};
