import { TabsDemoComponent } from './tabs-demo.component';

export const DEMO_COMPONENTS = [
  TabsDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./tabs-demo.component'),
    html: require('!!raw?lang=markup!./tabs-demo.component.html')
  }
};
