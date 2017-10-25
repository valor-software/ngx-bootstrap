import { DemoTypeaheadStaticComponent } from './demos/static/static';
import { DemoTypeaheadItemTemplateComponent } from './demos/item-template/item-template';
import { DemoTypeaheadFieldComponent } from './demos/field/field';
import { DemoTypeaheadAsyncComponent } from './demos/async/async';
import { DemoTypeaheadFormsComponent } from './demos/in-form/in-form';
import { DemoTypeaheadGroupingComponent } from './demos/grouping/grouping';
import { DemoTypeaheadDropupComponent } from './demos/dropup/dropup';

import { ContentSection } from '../../shared/models/content-section.model';
import { DemoTopSectionComponent } from '../../shared/demo-component/demo-top-section/index';
import { ExamplesComponent } from '../../shared/demo-component/demo-examples-section/index';
import { ApiSectionsComponent } from '../../shared/demo-component/demo-api-section/index';

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
        title: 'Static array',
        anchor: 'static-array',
        component: require('!!raw-loader?lang=typescript!./demos/static/static.ts'),
        html: require('!!raw-loader?lang=markup!./demos/static/static.html'),
        outlet: DemoTypeaheadStaticComponent
      },
      {
        title: 'Item template',
        anchor: 'item-template',
        component: require('!!raw-loader?lang=typescript!./demos/item-template/item-template.ts'),
        html: require('!!raw-loader?lang=markup!./demos/item-template/item-template.html'),
        outlet: DemoTypeaheadItemTemplateComponent
      },
      {
        title: 'Option field',
        anchor: 'option-field',
        component: require('!!raw-loader?lang=typescript!./demos/field/field.ts'),
        html: require('!!raw-loader?lang=markup!./demos/field/field.html'),
        outlet: DemoTypeaheadFieldComponent
      },
      {
        title: 'Async data',
        anchor: 'async-data',
        component: require('!!raw-loader?lang=typescript!./demos/async/async.ts'),
        html: require('!!raw-loader?lang=markup!./demos/async/async.html'),
        outlet: DemoTypeaheadAsyncComponent
      },
      {
        title: 'Reactive forms',
        anchor: 'reactive-forms',
        component: require('!!raw-loader?lang=typescript!./demos/in-form/in-form.ts'),
        html: require('!!raw-loader?lang=markup!./demos/in-form/in-form.html'),
        outlet: DemoTypeaheadFormsComponent
      },
      {
        title: 'Grouping results',
        anchor: 'grouping-results',
        component: require('!!raw-loader?lang=typescript!./demos/grouping/grouping.ts'),
        html: require('!!raw-loader?lang=markup!./demos/grouping/grouping.html'),
        outlet: DemoTypeaheadGroupingComponent
      },
      {
        title: 'Dropup',
        anchor: 'dropup',
        component: require('!!raw-loader?lang=typescript!./demos/dropup/dropup.ts'),
        html: require('!!raw-loader?lang=markup!./demos/dropup/dropup.html'),
        outlet: DemoTypeaheadDropupComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'AccordionPanelComponent',
        anchor: 'AccordionPanelComponent'
      }
    ]
  }
];
