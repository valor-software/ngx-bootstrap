import { DemoTimepickerBasicComponent } from './demos/basic/basic';
import { DemoTimepickerMeridianComponent } from './demos/meridian/meridian';
import { DemoTimepickerMinMaxComponent } from './demos/min-max/min-max';
import { DemoTimepickerSecondsComponent } from './demos/seconds/seconds';
import { DemoTimepickerDisabledComponent } from './demos/disabled/disabled';
import { DemoTimepickerCustomComponent } from './demos/custom/custom';
import { DemoTimepickerCustomValidationComponent } from './demos/custom-validation/custom-validation';
import { DemoTimepickerDynamicComponent } from './demos/dynamic/dynamic';
import { DemoTimepickerMousewheelArrowkeysComponent } from './demos/mousewheel-arrowkeys/mousewheel-arrowkeys';
import { DemoTimepickerConfigComponent } from './demos/config/config';

export const demoComponentContent = {
  examples: [
    {
      title: 'Timepicker',
      anchor: 'basic',
      name: 'basic',
      outlet: DemoTimepickerBasicComponent
    },
    {
      title: 'Meridian',
      anchor: 'meridian',
      name: 'meridian',
      outlet: DemoTimepickerMeridianComponent
    },
    {
      title: 'Min - Max',
      anchor: 'min-max',
      name: 'minmax',
      outlet: DemoTimepickerMinMaxComponent
    },
    {
      title: 'Show seconds',
      anchor: 'seconds',
      name: 'seconds',
      outlet: DemoTimepickerSecondsComponent
    },
    {
      title: 'Disabled',
      anchor: 'disabled',
      name: 'disabled',
      outlet: DemoTimepickerDisabledComponent
    },
    {
      title: 'Custom steps',
      anchor: 'custom',
      name: 'custom',
      outlet: DemoTimepickerCustomComponent
    },
    {
      title: 'Custom validation',
      anchor: 'custom-validation',
      name: 'customvalidation',
      outlet: DemoTimepickerCustomValidationComponent
    },
    {
      title: 'Dynamic',
      anchor: 'dynamic',
      name: 'dynamic',
      outlet: DemoTimepickerDynamicComponent
    },
    {
      title: 'Mouse wheel and Arrow keys',
      anchor: 'mouse-wheel',
      name: 'mousewheel',
      outlet: DemoTimepickerMousewheelArrowkeysComponent
    },
    {
      title: 'Configuring defaults',
      anchor: 'config-defaults',
      name: 'config',
      outlet: DemoTimepickerConfigComponent
    }
  ],
  apiSections: [
    {
      title: 'TimepickerComponent',
      anchor: 'timepicker-component'
    },
    {
      title: 'TimepickerConfig',
      anchor: 'timepicker-config',
      component: 'config'
    }
  ]
};
