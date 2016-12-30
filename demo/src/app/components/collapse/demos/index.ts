import { CollapseDemoComponent } from './collapse-demo.component';

export const DEMO_COMPONENTS = [
  CollapseDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./collapse-demo.component'),
    html: require('!!raw?lang=markup!./collapse-demo.component.html')
  }
};
