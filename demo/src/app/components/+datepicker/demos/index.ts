import { DatepickerDemoComponent } from './datepicker-demo.component';
import { DemoDatePickerPopupComponent } from './popup/date-picker-popup';

export const DEMO_COMPONENTS = [
  DatepickerDemoComponent,
  DemoDatePickerPopupComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw-loader?lang=typescript!./datepicker-demo.component.ts'),
    html: require('!!raw-loader?lang=markup!./datepicker-demo.component.html')
  },
  popup: {
    component: require('!!raw-loader?lang=typescript!./popup/date-picker-popup.ts'),
    html: require('!!raw-loader?lang=markup!./popup/date-picker-popup.html')
  }
};
