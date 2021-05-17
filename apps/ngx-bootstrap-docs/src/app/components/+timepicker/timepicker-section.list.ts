import {
  NgApiDocComponent,
  NgApiDocConfigComponent
} from '../../docs/api-docs/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTimepickerArrowkeysComponent } from './demos/arrowkeys/arrowkeys';
import { DemoTimepickerBasicComponent } from './demos/basic/basic';
import { DemoTimepickerConfigComponent } from './demos/config/config';
import { DemoTimepickerCustomMeridianComponent } from './demos/custom-meridian/custom-meridian';
import { DemoTimepickerCustomValidationComponent } from './demos/custom-validation/custom-validation';
import { DemoTimepickerCustomComponent } from './demos/custom/custom';
import { DemoTimepickerDisabledComponent } from './demos/disabled/disabled';
import { DemoTimepickerDynamicComponent } from './demos/dynamic/dynamic';
import { DemoTimepickerEmptyDateComponent } from './demos/empty-date/empty-date';
import { DemoTimepickerFormComponent } from './demos/form/form';
import { DemoTimepickerIsValidComponent } from './demos/isvalid/isvalid';
import { DemoTimepickerMeridianComponent } from './demos/meridian/meridian';
import { DemoTimepickerMinMaxComponent } from './demos/min-max/min-max';
import { DemoTimepickerMousewheelComponent } from './demos/mousewheel/mousewheel';
import { DemoTimepickerPlaceholderComponent } from './demos/placeholder/placeholder';
import { DemoTimepickerReadonlyComponent } from './demos/readonly/readonly';
import { DemoTimepickerSpinnersComponent } from './demos/spinners/spinners';
import { DemoTimepickerToggleMinutesSecondsComponent } from './demos/toggle-minutes-seconds/toggle-minutes-seconds';



export const demoComponentContent: ContentSection[] = [
  {
    name: 'Usage',
    anchor: 'usage',
    outlet: DemoTopSectionComponent,
    content: {
      doc: require('!!raw-loader!./docs/usage.md')
    }
  },
  {
    name: 'Examples',
    anchor: 'examples',
    outlet: ExamplesComponent,
    content: [
      {
        title: 'Basic',
        anchor: 'basic',
        component: require('!!raw-loader!./demos/basic/basic'),
        html: require('!!raw-loader!./demos/basic/basic.html'),
        outlet: DemoTimepickerBasicComponent
      },
      {
        title: 'Form',
        anchor: 'form',
        component: require('!!raw-loader!./demos/form/form'),
        html: require('!!raw-loader!./demos/form/form.html'),
        outlet: DemoTimepickerFormComponent
      },
      {
        title: 'Meridian',
        anchor: 'meridian',
        component: require('!!raw-loader!./demos/meridian/meridian'),
        html: require('!!raw-loader!./demos/meridian/meridian.html'),
        outlet: DemoTimepickerMeridianComponent
      },
      {
        title: 'Custom meridian',
        anchor: 'custom-meridian',
        component: require('!!raw-loader!./demos/custom-meridian/custom-meridian'),
        html: require('!!raw-loader!./demos/custom-meridian/custom-meridian.html'),
        description: `<p>Text in meridian labels can be customized by using <code>meridians</code> input property</p>`,
        outlet: DemoTimepickerCustomMeridianComponent
      },
      {
        title: 'Min - Max',
        anchor: 'min-max',
        component: require('!!raw-loader!./demos/min-max/min-max'),
        html: require('!!raw-loader!./demos/min-max/min-max.html'),
        outlet: DemoTimepickerMinMaxComponent
      },
      {
        title: 'Toggle minutes/seconds',
        anchor: 'toggleMinutesSeconds',
        component: require('!!raw-loader!./demos/toggle-minutes-seconds/toggle-minutes-seconds'),
        html: require('!!raw-loader!./demos/toggle-minutes-seconds/toggle-minutes-seconds.html'),
        outlet: DemoTimepickerToggleMinutesSecondsComponent
      },
      {
        title: 'Disabled',
        anchor: 'disabled',
        component: require('!!raw-loader!./demos/disabled/disabled'),
        html: require('!!raw-loader!./demos/disabled/disabled.html'),
        outlet: DemoTimepickerDisabledComponent
      },
      {
        title: 'Readonly',
        anchor: 'readonly',
        component: require('!!raw-loader!./demos/readonly/readonly'),
        html: require('!!raw-loader!./demos/readonly/readonly.html'),
        outlet: DemoTimepickerReadonlyComponent
      },
      {
        title: 'Custom steps',
        anchor: 'custom',
        component: require('!!raw-loader!./demos/custom/custom'),
        html: require('!!raw-loader!./demos/custom/custom.html'),
        outlet: DemoTimepickerCustomComponent
      },
      {
        title: 'Custom validation',
        anchor: 'custom-validation',
        component: require('!!raw-loader!./demos/custom-validation/custom-validation'),
        html: require('!!raw-loader!./demos/custom-validation/custom-validation.html'),
        outlet: DemoTimepickerCustomValidationComponent
      },
      {
        title: 'Custom validation with isValid event',
        anchor: 'isvalid',
        component: require('!!raw-loader!./demos/isvalid/isvalid'),
        html: require('!!raw-loader!./demos/isvalid/isvalid.html'),
        description: `<p><code>isValid</code> event emits true if a value is a valid data.
            Enter an invalid data to see error</p>`,
        outlet: DemoTimepickerIsValidComponent
      },
      {
        title: 'Dynamic',
        anchor: 'dynamic',
        component: require('!!raw-loader!./demos/dynamic/dynamic'),
        html: require('!!raw-loader!./demos/dynamic/dynamic.html'),
        outlet: DemoTimepickerDynamicComponent
      },
      {
        title: 'Mouse wheel',
        anchor: 'mouse-wheel',
        component: require('!!raw-loader!./demos/mousewheel/mousewheel'),
        html: require('!!raw-loader!./demos/mousewheel/mousewheel.html'),
        outlet: DemoTimepickerMousewheelComponent
      },
      {
        title: 'Empty Date',
        anchor: 'empty-date',
        component: require('!!raw-loader!./demos/empty-date/empty-date'),
        html: require('!!raw-loader!./demos/empty-date/empty-date.html'),
        outlet: DemoTimepickerEmptyDateComponent
      },
      {
        title: 'Arrow keys',
        anchor: 'arrow keys',
        component: require('!!raw-loader!./demos/arrowkeys/arrowkeys'),
        html: require('!!raw-loader!./demos/arrowkeys/arrowkeys.html'),
        outlet: DemoTimepickerArrowkeysComponent
      },
      {
        title: 'Spinners',
        anchor: 'spinners',
        component: require('!!raw-loader!./demos/spinners/spinners'),
        html: require('!!raw-loader!./demos/spinners/spinners.html'),
        outlet: DemoTimepickerSpinnersComponent
      },
      {
        title: 'Placeholder',
        anchor: 'placeholder',
        component: require('!!raw-loader!./demos/placeholder/placeholder'),
        html: require('!!raw-loader!./demos/placeholder/placeholder.html'),
        outlet: DemoTimepickerPlaceholderComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'config-defaults',
        component: require('!!raw-loader!./demos/config/config'),
        html: require('!!raw-loader!./demos/config/config.html'),
        outlet: DemoTimepickerConfigComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'TimepickerComponent',
        anchor: 'timepicker-component',
        outlet: NgApiDocComponent
      },
      {
        title: 'TimepickerConfig',
        anchor: 'timepicker-config',
        outlet: NgApiDocConfigComponent
      }
    ]
  }
];
