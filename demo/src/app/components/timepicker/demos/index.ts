import { TimepickerDemoComponent } from './timepicker-demo.component';

export const DEMO_COMPONENTS = [
  TimepickerDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./timepicker-demo.component'),
    html: require('!!raw?lang=markup!./timepicker-demo.component.html')
  }
};
