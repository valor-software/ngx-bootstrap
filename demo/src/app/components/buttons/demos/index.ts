import { DemoButtonsBasicComponent } from './basic/basic';
import { DemoButtonsCheckboxComponent } from './checkbox/checkbox';
import { DemoButtonsRadioComponent } from './radio/radio';
import { DemoButtonsDisabledComponent } from './disabled/disabled';

export const DEMO_COMPONENTS = [
  DemoButtonsBasicComponent, DemoButtonsCheckboxComponent, DemoButtonsRadioComponent, DemoButtonsDisabledComponent
];

export const DEMOS = {
  basic: {
    component: require('!!raw?lang=typescript!./basic/basic.ts'),
    html: require('!!raw?lang=markup!./basic/basic.html')
  },
  checkbox: {
    component: require('!!raw?lang=typescript!./checkbox/checkbox.ts'),
    html: require('!!raw?lang=markup!./checkbox/checkbox.html')
  },
  radio: {
    component: require('!!raw?lang=typescript!./radio/radio.ts'),
    html: require('!!raw?lang=markup!./radio/radio.html')
  },
  disabled: {
    component: require('!!raw?lang=typescript!./disabled/disabled.ts'),
    html: require('!!raw?lang=markup!./disabled/disabled.html')
  }
};
