import { ProgressbarDemoComponent } from './progressbar-demo.component';

export const DEMO_COMPONENTS = [
  ProgressbarDemoComponent
];

export const DEMOS = {
  bs3old: {
    component: require('!!raw?lang=typescript!./progressbar-demo.component'),
    html: require('!!raw?lang=markup!./progressbar-demo-bs3.component.html')
  },
  bs4old: {
    component: require('!!raw?lang=typescript!./progressbar-demo.component'),
    html: require('!!raw?lang=markup!./progressbar-demo-bs4.component.html')
  }
};
