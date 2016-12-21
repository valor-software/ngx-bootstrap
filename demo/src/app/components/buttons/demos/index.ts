import { ButtonsDemoComponent } from './buttons-demo.component';

export const DEMO_COMPONENTS = [
  ButtonsDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./buttons-demo.component'),
    html: require('!!raw?lang=markup!./buttons-demo.component.html')
  }
};
