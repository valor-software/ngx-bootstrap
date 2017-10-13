import { DemoAlertBasicComponent } from './basic/basic';
import { DemoAlertLinkComponent } from './link/link';
import { DemoAlertContentComponent } from './content/content';
import { DemoAlertDismissComponent } from './dismiss/dismiss';
import { DemoAlertDynamicHtmlComponent } from './dynamic-html/dynamic-html';
import { DemoAlertTimeoutComponent } from './dismiss-on-timeout/dismiss-on-timeout';
import { DemoAlertStylingGlobalComponent } from './styling-global/styling-global';
import { DemoAlertStylingLocalComponent } from './styling-local/styling-local';
import { DemoAlertConfigComponent } from './config/config';

export const DEMO_COMPONENTS = [
  DemoAlertBasicComponent,
  DemoAlertLinkComponent,
  DemoAlertContentComponent,
  DemoAlertDismissComponent,
  DemoAlertDynamicHtmlComponent,
  DemoAlertTimeoutComponent,
  DemoAlertStylingGlobalComponent,
  DemoAlertStylingLocalComponent,
  DemoAlertConfigComponent
];

export const DEMOS = {
  basic: {
    component: require('!!raw-loader?lang=typescript!./basic/basic.ts'),
    html: require('!!raw-loader?lang=markup!./basic/basic.html')
  },
  link: {
    component: require('!!raw-loader?lang=typescript!./link/link.ts'),
    html: require('!!raw-loader?lang=markup!./link/link.html')
  },
  content: {
    component: require('!!raw-loader?lang=typescript!./content/content.ts'),
    html: require('!!raw-loader?lang=markup!./content/content.html')
  },
  dismiss: {
    component: require('!!raw-loader?lang=typescript!./dismiss/dismiss.ts'),
    html: require('!!raw-loader?lang=markup!./dismiss/dismiss.html')
  },
  timeout: {
    component: require('!!raw-loader?lang=typescript!./dismiss-on-timeout/dismiss-on-timeout.ts'),
    html: require('!!raw-loader?lang=markup!./dismiss-on-timeout/dismiss-on-timeout.html')
  },
  dynamic: {
    component: require('!!raw-loader?lang=typescript!./dynamic-html/dynamic-html.ts'),
    html: require('!!raw-loader?lang=markup!./dynamic-html/dynamic-html.html')
  },
  global: {
    component: require('!!raw-loader?lang=typescript!./styling-global/styling-global.ts'),
    html: require('!!raw-loader?lang=markup!./styling-global/styling-global.html')
  },
  local: {
    component: require('!!raw-loader?lang=typescript!./styling-local/styling-local.ts'),
    html: require('!!raw-loader?lang=markup!./styling-local/styling-local.html')
  },
  config: {
    component: require('!!raw-loader?lang=typescript!./config/config.ts'),
    html: require('!!raw-loader?lang=markup!./config/config.html')
  }
};
