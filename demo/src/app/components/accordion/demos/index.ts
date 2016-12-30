import { AccordionDemoComponent } from './accordion-demo.component';

export const DEMO_COMPONENTS = [
  AccordionDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./accordion-demo.component'),
    html: require('!!raw?lang=markup!./accordion-demo.component.html')
  }
};
