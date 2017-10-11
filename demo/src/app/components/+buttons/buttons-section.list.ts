import { DemoButtonsBasicComponent } from './demos/basic/basic';
import { DemoButtonsCheckboxComponent } from './demos/checkbox/checkbox';
import { DemoButtonsRadioComponent } from './demos/radio/radio';
import { DemoButtonsRadioReactiveFormsComponent } from './demos/radio-reactiveforms/radio-reactiveforms';
import { DemoButtonsDisabledComponent } from './demos/disabled/disabled';

export const buttonsExamples = [
  {
    title: 'Single button',
    anchor: 'single-button',
    name: 'basic',
    text: `<p>Default static button with two states</p>`,
    outlet: DemoButtonsBasicComponent
  },
  /*{
    title: 'Checkbox',
    anchor: 'checkbox',
    name: 'checkbox',
    text: `<p>Checkbox-like buttons set with variable states</p>`,
    outlet: DemoButtonsCheckboxComponent
  },
  {
    title: 'Radio &amp; Uncheckable Radio',
    anchor: 'radio-button',
    name: 'radio',
    text: `<p>Radio buttons with checked/unchecked states</p>`,
    outlet: DemoButtonsRadioComponent
  },
  {
    title: 'Radio with ReactiveForms',
    anchor: 'radio-reactiveforms"',
    name: 'radioReactiveForms',
    text: `<p>Checkbox buttons with ReactiveForms</p>`,
    outlet: DemoButtonsRadioReactiveFormsComponent
  },
  {
    title: 'Disabled Buttons',
    anchor: 'disabled-buttons',
    name: 'disabled',
    outlet: DemoButtonsDisabledComponent
  }*/
];

export const buttonsApi = [
  {
    title: 'ButtonCheckboxDirective',
    anchor: 'button-checkbox-directive'
  },
  {
    title: 'ButtonRadioDirective',
    anchor: 'button-radio-directive'
  }
];
