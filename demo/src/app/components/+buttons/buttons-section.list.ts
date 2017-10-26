import { DemoButtonsBasicComponent } from './demos/basic/basic';
import { DemoButtonsCheckboxComponent } from './demos/checkbox/checkbox';
import { DemoButtonsRadioComponent } from './demos/radio/radio';
import { DemoButtonsRadioReactiveFormsComponent } from './demos/radio-reactiveforms/radio-reactiveforms';
import { DemoButtonsDisabledComponent } from './demos/disabled/disabled';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import { NgApiDocComponent } from '../../docs/api-docs/api-doc/api-doc.component';
import { NgApiDocClassComponent } from '../../docs/api-docs/api-doc-class/api-doc-class.component';
import { NgApiDocConfigComponent } from '../../docs/api-docs/api-doc-config/api-doc-config.component';

export const demoComponentContent: ContentSection[] = [
  {
    name: 'Usage',
    anchor: 'usage',
    outlet: DemoTopSectionComponent,
    content: {
      doc: require('html-loader!markdown-loader!./docs/usage.md')
    }
  },
  {
    name: 'Examples',
    anchor: 'examples',
    outlet: ExamplesComponent,
    content: [
      {
        title: 'Single button',
        anchor: 'single-button',
        description: `<p>Default static button with two states</p>`,
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic.ts'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        outlet: DemoButtonsBasicComponent
      },
      {
        title: 'Checkbox',
        anchor: 'checkbox',
        description: `<p>Checkbox-like buttons set with variable states</p>`,
        component: require('!!raw-loader?lang=typescript!./demos/checkbox/checkbox.ts'),
        html: require('!!raw-loader?lang=markup!./demos/checkbox/checkbox.html'),
        outlet: DemoButtonsCheckboxComponent
      },
      {
        title: 'Radio & Uncheckable Radio',
        anchor: 'radio-button',
        description: `<p>Radio buttons with checked/unchecked states</p>`,
        component: require('!!raw-loader?lang=typescript!./demos/radio/radio.ts'),
        html: require('!!raw-loader?lang=markup!./demos/radio/radio.html'),
        outlet: DemoButtonsRadioComponent
      },
      {
        title: 'Radio with Reactive Forms',
        anchor: 'radio-reactiveforms"',
        description: `<p>Checkbox buttons with ReactiveForms</p>`,
        component: require('!!raw-loader?lang=typescript!./demos/radio-reactiveforms/radio-reactiveforms.ts'),
        html: require('!!raw-loader?lang=markup!./demos/radio-reactiveforms/radio-reactiveforms.html'),
        outlet: DemoButtonsRadioReactiveFormsComponent
      },
      {
        title: 'Disabled Buttons',
        anchor: 'disabled-buttons',
        component: require('!!raw-loader?lang=typescript!./demos/disabled/disabled.ts'),
        html: require('!!raw-loader?lang=markup!./demos/disabled/disabled.html'),
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
      }
    ]
  }
];
