import { TooltipDemoComponent } from './tooltip-demo.component';

export const DEMO_COMPONENTS = [
  TooltipDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./tooltip-demo.component'),
    html: require('!!raw?lang=markup!./tooltip-demo.component.html')
  }
};
