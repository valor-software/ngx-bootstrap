import { DatepickerDemoComponent } from './datepicker-demo.component';
import { DemoDatePickerPopupComponent } from './bs-popup/date-picker-popup';
import { DemoDatepickerColorThemingComponent } from './color-theming/color-theming';
import { DemoDatepickerChangeLocaleComponent } from './change-locale/change-locale';
import { DemoDatepickerMinMaxComponent } from './min-max/min-max.component';
import { DemoDatepickerDisabledComponent } from './disabled/disabled.component';
import { DemoDatepickerFormsComponent } from './forms/forms.component';
import { DemoDatepickerReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { DemoDatePickerStartingdayComponent } from './startingday/date-picker-startingday';

export const DEMO_COMPONENTS = [
  DatepickerDemoComponent,
  DemoDatePickerPopupComponent,
  DemoDatepickerColorThemingComponent,
  DemoDatepickerChangeLocaleComponent,
  DemoDatepickerMinMaxComponent,
  DemoDatepickerDisabledComponent,
  DemoDatepickerFormsComponent,
  DemoDatepickerReactiveFormsComponent,
  DemoDatePickerStartingdayComponent
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
  minMax: {
    component: require('!!raw-loader?lang=typescript!./min-max/min-max.component.ts'),
    html: require('!!raw-loader?lang=markup!./min-max/min-max.component.html')
  },
  disabled: {
    component: require('!!raw-loader?lang=typescript!./disabled/disabled.component.ts'),
    html: require('!!raw-loader?lang=markup!./disabled/disabled.component.html')
  },
  forms: {
    component: require('!!raw-loader?lang=typescript!./forms/forms.component.ts'),
    html: require('!!raw-loader?lang=markup!./forms/forms.component.html')
  },
  reactive: {
    component: require('!!raw-loader?lang=typescript!./reactive-forms/reactive-forms.component.ts'),
    html: require('!!raw-loader?lang=markup!./reactive-forms/reactive-forms.component.html')
  },
  startingday: {
    component: require('!!raw-loader?lang=typescript!./startingday/date-picker-startingday.ts'),
    html: require('!!raw-loader?lang=markup!./startingday/date-picker-startingday.html')
  }
};
