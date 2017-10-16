import { DemoButtonsBasicComponent } from './demos/basic/basic';
import { DemoButtonsCheckboxComponent } from './demos/checkbox/checkbox';
import { DemoButtonsRadioComponent } from './demos/radio/radio';
import { DemoButtonsRadioReactiveFormsComponent } from './demos/radio-reactiveforms/radio-reactiveforms';
import { DemoButtonsDisabledComponent } from './demos/disabled/disabled';

export const demoComponentContent = {
  examples: [
    {
      title: 'Single button',
      anchor: 'single-button',
      name: 'basic',
      description: `<p>Default static button with two states</p>`,
      outlet: DemoButtonsBasicComponent
    },
    {
      title: 'Checkbox',
      anchor: 'checkbox',
      name: 'checkbox',
      description: `<p>Checkbox-like buttons set with variable states</p>`,
      outlet: DemoButtonsCheckboxComponent
    },
    {
      title: 'Radio & Uncheckable Radio',
      anchor: 'radio-button',
      name: 'radio',
      description: `<p>Radio buttons with checked/unchecked states</p>`,
      outlet: DemoButtonsRadioComponent
    },
    {
      title: 'Radio with Reactive Forms',
      anchor: 'radio-reactiveforms"',
      name: 'radioReactiveForms',
      description: `<p>Checkbox buttons with ReactiveForms</p>`,
      outlet: DemoButtonsRadioReactiveFormsComponent
    },
    {
      title: 'Disabled Buttons',
      anchor: 'disabled-buttons',
      name: 'disabled',
      outlet: DemoButtonsDisabledComponent
    }
  ],
  apiSections: [
    {
      title: 'ButtonCheckboxDirective',
      anchor: 'button-checkbox-directive'
    },
    {
      title: 'ButtonRadioDirective',
      anchor: 'button-radio-directive'
    }
  ]
};
