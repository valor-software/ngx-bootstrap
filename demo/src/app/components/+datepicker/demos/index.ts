import { DatepickerDemoComponent } from './datepicker-demo.component';
import { DemoDatePickerPopupComponent } from './bs-popup/date-picker-popup';
import { DemoDatepickerColorThemingComponent } from './color-theming/color-theming';
import { DemoDatepickerChangeLocaleComponent } from './change-locale/change-locale';
import { DemoDisabledDatepickerComponent } from './is-disabled/disabled-datepicker';

export const DEMO_COMPONENTS = [
  DatepickerDemoComponent,
  DemoDatePickerPopupComponent,
  DemoDatepickerColorThemingComponent,
  DemoDatepickerChangeLocaleComponent,
  DemoDisabledDatepickerComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw-loader?lang=typescript!./datepicker-demo.component.ts'),
    html: require('!!raw-loader?lang=markup!./datepicker-demo.component.html')
  },
  pop: {
    component: require('!!raw-loader?lang=typescript!./bs-popup/date-picker-popup.ts'),
    html: require('!!raw-loader?lang=markup!./bs-popup/date-picker-popup.html')
  },
  colorTheming: {
    component: require('!!raw-loader?lang=typescript!./color-theming/color-theming.ts'),
    html: require('!!raw-loader?lang=markup!./color-theming/color-theming.html')
  },
  changeLocale: {
    component: require('!!raw-loader?lang=typescript!./change-locale/change-locale.ts'),
    html: require('!!raw-loader?lang=markup!./change-locale/change-locale.html')
  },
  disabled: {
    component: require('!!raw-loader?lang=typescript!./is-disabled/disabled-datepicker.ts'),
    html: require('!!raw-loader?lang=markup!./is-disabled/disabled-datepicker.html')
  }
};
