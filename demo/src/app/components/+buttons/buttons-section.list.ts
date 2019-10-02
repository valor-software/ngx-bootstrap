import { DemoButtonsBasicComponent } from './demos/basic/basic';
import { DemoButtonsCheckboxComponent } from './demos/checkbox/checkbox';
import { DemoButtonsRadioComponent } from './demos/radio/radio';
import { DemoButtonsUncheckableRadioComponent } from './demos/uncheckable-radio/uncheckable-radio';
import { DemoButtonsCheckboxReactiveFormsComponent } from './demos/checkbox-reactiveforms/checkbox-reactiveforms';
import { DemoButtonsRadioReactiveFormsComponent } from './demos/radio-reactiveforms/radio-reactiveforms';
import { DemoButtonsDisabledComponent } from './demos/disabled/disabled';
import { DemoButtonsCustomCheckboxValueComponent } from './demos/custom-checkbox-value/custom-checkbox-value';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import { NgApiDocComponent } from '../../docs/api-docs';

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
        component: require('!!raw-loader!./demos/basic/basic.ts'),
        html: require('!!raw-loader!./demos/basic/basic.html'),
        outlet: DemoButtonsBasicComponent
      },
      {
        title: 'Checkbox',
        anchor: 'checkbox',
        description: `<p>Checkbox-like buttons set with variable states</p>`,
        component: require('!!raw-loader!./demos/checkbox/checkbox.ts'),
        html: require('!!raw-loader!./demos/checkbox/checkbox.html'),
        outlet: DemoButtonsCheckboxComponent
      },
      {
        title: 'Custom checkbox value',
        anchor: 'custom-checkbox-value',
        component: require('!!raw-loader!./demos/custom-checkbox-value/custom-checkbox-value.ts'),
        html: require('!!raw-loader!./demos/custom-checkbox-value/custom-checkbox-value.html'),
        outlet: DemoButtonsCustomCheckboxValueComponent
      },
      {
        title: 'Checkbox with Reactive Forms',
        anchor: 'checkbox-reactiveforms"',
        description: `<p>Checkbox buttons with ReactiveForms</p>`,
        component: require('!!raw-loader!./demos/checkbox-reactiveforms/checkbox-reactiveforms.ts'),
        html: require('!!raw-loader!./demos/checkbox-reactiveforms/checkbox-reactiveforms.html'),
        outlet: DemoButtonsCheckboxReactiveFormsComponent
      },
      {
        title: 'Radio',
        anchor: 'radio-button',
        description: `<p>Radio buttons with checked/unchecked states. Group can be created in two ways: using
<code>btnRadioGroup</code> directive or using the same <code>ngModel</code> binding with several buttons (works only for
template driven forms). Check the demo below for more info.</p>`,
        component: require('!!raw-loader!./demos/radio/radio.ts'),
        html: require('!!raw-loader!./demos/radio/radio.html'),
        outlet: DemoButtonsRadioComponent
      },
      {
        title: 'Uncheckable Radio',
        anchor: 'uncheckable-radio-button',
        component: require('!!raw-loader!./demos/uncheckable-radio/uncheckable-radio.ts'),
        html: require('!!raw-loader!./demos/uncheckable-radio/uncheckable-radio.html'),
        outlet: DemoButtonsUncheckableRadioComponent
      },
      {
        title: 'Radio with Reactive Forms',
        anchor: 'radio-reactiveforms',
        description: `<p>Radio buttons with ReactiveForms. Example below shows how to use radio buttons with reactive
 forms. Please be aware that for reactive forms it's required to use <code>btnRadioGroup</code> directive along with
 <code>btnRadio</code>'s</p>`,
        component: require('!!raw-loader!./demos/radio-reactiveforms/radio-reactiveforms.ts'),
        html: require('!!raw-loader!./demos/radio-reactiveforms/radio-reactiveforms.html'),
        outlet: DemoButtonsRadioReactiveFormsComponent
      },
      {
        title: 'Disabled Buttons',
        anchor: 'disabled-buttons',
        component: require('!!raw-loader!./demos/disabled/disabled.ts'),
        html: require('!!raw-loader!./demos/disabled/disabled.html'),
        outlet: DemoButtonsDisabledComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'ButtonCheckboxDirective',
        anchor: 'button-checkbox-directive',
        outlet: NgApiDocComponent
      },
      {
        title: 'ButtonRadioDirective',
        anchor: 'button-radio-directive',
        outlet: NgApiDocComponent
      },
      {
        title: 'ButtonRadioGroupDirective',
        anchor: 'button-radio-group-directive',
        outlet: NgApiDocComponent
      }
    ]
  }
];
