import { DemoPopoverBasicComponent } from './basic/basic';
import { DemoPopoverFourDirectionsComponent } from './four-directions/four-directions';
import { DemoPopoverDismissComponent } from './dismiss/dismiss';
import { DemoPopoverDynamicComponent } from './dynamic/dynamic';
import { DemoPopoverDynamicHtmlComponent } from './dynamic-html/dynamic-html';
import { DemoPopoverContainerComponent } from './container/container';
import { DemoPopoverConfigComponent } from './config/config';
import { DemoPopoverStylingGlobalComponent } from './styling-global/styling-global';
import { DemoPopoverStylingLocalComponent } from './styling-local/styling-local';
import { DemoPopoverTriggersCustomComponent } from './triggers-custom/triggers-custom';
import { DemoPopoverTriggersManualComponent } from './triggers-manual/triggers-manual';

export const DEMO_COMPONENTS = [
  DemoPopoverBasicComponent,
  DemoPopoverFourDirectionsComponent,
  DemoPopoverDismissComponent,
  DemoPopoverDynamicComponent,
  DemoPopoverDynamicHtmlComponent,
  DemoPopoverContainerComponent,
  DemoPopoverConfigComponent,
  DemoPopoverStylingGlobalComponent,
  DemoPopoverStylingLocalComponent,
  DemoPopoverTriggersCustomComponent,
  DemoPopoverTriggersManualComponent
];

export const DEMOS = {
  basic: {
    component: require('!!raw?lang=typescript!./basic/basic.ts'),
    html: require('!!raw?lang=markup!./basic/basic.html')
  },
  forDirections: {
    component: require('!!raw?lang=typescript!./four-directions/four-directions.ts'),
    html: require('!!raw?lang=markup!./four-directions/four-directions.html')
  },
  dismiss: {
    component: require('!!raw?lang=typescript!./dismiss/dismiss.ts'),
    html: require('!!raw?lang=markup!./dismiss/dismiss.html')
  },
  dynamic: {
    component: require('!!raw?lang=typescript!./dynamic/dynamic.ts'),
    html: require('!!raw?lang=markup!./dynamic/dynamic.html')
  },
  dynamicHtml: {
    component: require('!!raw?lang=typescript!./dynamic-html/dynamic-html.ts'),
    html: require('!!raw?lang=markup!./dynamic-html/dynamic-html.html')
  },
  container: {
    component: require('!!raw?lang=typescript!./container/container.ts'),
    html: require('!!raw?lang=markup!./container/container.html')
  },
  config: {
    component: require('!!raw?lang=typescript!./config/config.ts'),
    html: require('!!raw?lang=markup!./config/config.html')
  },
  triggersCustom: {
    component: require('!!raw?lang=typescript!./triggers-custom/triggers-custom.ts'),
    html: require('!!raw?lang=markup!./triggers-custom/triggers-custom.html')
  },
  triggersManual: {
    component: require('!!raw?lang=typescript!./triggers-manual/triggers-manual.ts'),
    html: require('!!raw?lang=markup!./triggers-manual/triggers-manual.html')
  },
  stylingComponent: {
    component: require('!!raw?lang=typescript!./styling-local/styling-local.ts'),
    html: require('!!raw?lang=markup!./styling-local/styling-local.html')
  },
  stylingGlobal: {
    component: require('!!raw?lang=typescript!./styling-global/styling-global.ts'),
    html: require('!!raw?lang=markup!./styling-global/styling-global.html')
  }
};
