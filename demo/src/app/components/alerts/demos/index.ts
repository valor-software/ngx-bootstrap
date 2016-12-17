import { UiAlertBasicComponent } from './basic/basic';
import { AlertsDemoComponent } from './alerts-demo.component';
import { UiAlertLinkComponent } from './link/link';
import { DemoAlertContentComponent } from './content/content';

export const DEMO_COMPONENTS = [UiAlertBasicComponent, AlertsDemoComponent,
  UiAlertLinkComponent, DemoAlertContentComponent];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./alerts-demo.component.ts'),
    html: require('!!raw?lang=markup!./alerts-demo.component.html')
  },
  basic: {
    component: require('!!raw?lang=typescript!./basic/basic.ts'),
    html: require('!!raw?lang=markup!./basic/basic.html')
  },
  link: {
    component: require('!!raw?lang=typescript!./link/link.ts'),
    html: require('!!raw?lang=markup!./link/link.html')
  },
  content: {
    component: require('!!raw?lang=typescript!./content/content.ts'),
    html: require('!!raw?lang=markup!./content/content.html')
  }
};
