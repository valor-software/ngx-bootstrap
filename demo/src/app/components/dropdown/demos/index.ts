import { DropdownDemoComponent } from './dropdown-demo.component';

export const DEMO_COMPONENTS = [
  DropdownDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./dropdown-demo.component'),
    html: require('!!raw?lang=markup!./dropdown-demo.component.html')
  }
};
