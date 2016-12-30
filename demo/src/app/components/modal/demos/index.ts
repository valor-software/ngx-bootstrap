import { ModalDemoComponent } from './modal-demo.component';

export const DEMO_COMPONENTS = [
  ModalDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./modal-demo.component'),
    html: require('!!raw?lang=markup!./modal-demo.component.html')
  }
};
