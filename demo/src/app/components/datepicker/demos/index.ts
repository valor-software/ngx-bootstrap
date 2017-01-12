import { DatepickerDemoComponent } from './datepicker-demo.component';

export const DEMO_COMPONENTS = [
  DatepickerDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./datepicker-demo.component.ts'),
    html: require('!!raw?lang=markup!./datepicker-demo.component.html')
  }
};
