import { DemoTabsBasicComponent } from './basic/basic';
import { DemoTabsDynamicComponent } from './dynamic/dynamic';
import { DemoTabsStylingComponent } from './styling/styling';
import { DemoTabsPillsComponent } from './pills/pills';
import { DemoTabsVerticalPillsComponent } from './vertical-pills/vertical-pills';
import { DemoTabsJustifiedComponent } from './justified/justified';
import { DemoTabsConfigComponent } from './config/config';
import { DemoTabsManualComponent } from './manual/manual';

export const DEMO_COMPONENTS = [
  DemoTabsBasicComponent,
  DemoTabsManualComponent,
  DemoTabsDynamicComponent,
  DemoTabsStylingComponent,
  DemoTabsPillsComponent,
  DemoTabsVerticalPillsComponent,
  DemoTabsJustifiedComponent,
  DemoTabsConfigComponent
];

export const DEMOS = {
  basic: {
    component: require('!!raw-loader?lang=typescript!./basic/basic'),
    html: require('!!raw-loader?lang=markup!./basic/basic.html')
  },
  manual: {
    component: require('!!raw-loader?lang=typescript!./manual/manual'),
    html: require('!!raw-loader?lang=markup!./manual/manual.html')
  },
  dynamic: {
    component: require('!!raw-loader?lang=typescript!./dynamic/dynamic'),
    html: require('!!raw-loader?lang=markup!./dynamic/dynamic.html')
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
