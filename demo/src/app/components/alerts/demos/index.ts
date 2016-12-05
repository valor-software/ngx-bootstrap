import { UiAlertBasicComponent } from './basic/basic';
import { AlertsDemoComponent } from './alerts-demo.component';

export const DEMO_COMPONENTS = [UiAlertBasicComponent, AlertsDemoComponent];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./alerts-demo.component.ts'),
    html: require('!!raw?lang=markup!./alerts-demo.component.html')
  },
  basic: {
    component: require('!!raw?lang=typescript!./basic/basic.ts'),
    html: require('!!raw?lang=markup!./basic/basic.html')
  }
};
