import { DemoProgressbarStaticComponent } from './bs3/static/static';
import { DemoProgressbarDynamicComponent } from './bs3/dynamic/dynamic';
import { DemoProgressbarStackedComponent } from './bs3/stacked/stacked';
import { DemoProgressbarDynamicBs4Component } from './bs4/dynamic/dynamic';
import { DemoProgressbarStackedBs4Component } from './bs4/stacked/stacked';
import { DemoProgressbarStaticBs4Component } from './bs4/static/static';
import { DemoProgressbarConfigComponent } from './bs3/config/config';

export const DEMO_COMPONENTS = [
  DemoProgressbarStaticComponent,
  DemoProgressbarDynamicComponent,
  DemoProgressbarStackedComponent,
  DemoProgressbarDynamicBs4Component,
  DemoProgressbarStackedBs4Component,
  DemoProgressbarStaticBs4Component,
  DemoProgressbarConfigComponent
];

export const DEMOS = {
  bs3static: {
    component: require('!!raw-loader?lang=typescript!./bs3/static/static'),
    html: require('!!raw-loader?lang=markup!./bs3/static/static.html')
  },
  bs4static: {
    component: require('!!raw-loader?lang=typescript!./bs4/static/static'),
    html: require('!!raw-loader?lang=markup!./bs4/static/static.html')
  },
  bs3dynamic: {
    component: require('!!raw-loader?lang=typescript!./bs3/dynamic/dynamic'),
    html: require('!!raw-loader?lang=markup!./bs3/dynamic/dynamic.html')
  },
  bs4dynamic: {
    component: require('!!raw-loader?lang=typescript!./bs4/dynamic/dynamic'),
    html: require('!!raw-loader?lang=markup!./bs4/dynamic/dynamic.html')
  },
  bs3stacked: {
    component: require('!!raw-loader?lang=typescript!./bs3/stacked/stacked'),
    html: require('!!raw-loader?lang=markup!./bs3/stacked/stacked.html')
  },
  bs4stacked: {
    component: require('!!raw-loader?lang=typescript!./bs4/stacked/stacked'),
    html: require('!!raw-loader?lang=markup!./bs4/stacked/stacked.html')
  },
  bs3config: {
    component: require('!!raw-loader?lang=typescript!./bs3/config/config'),
    html: require('!!raw-loader?lang=markup!./bs3/config/config.html')
  }
};
