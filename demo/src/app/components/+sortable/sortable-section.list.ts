import { SimpleItemsDemoComponent } from './demos/simple-items/simple-items';
import { ComplexDatamodelDemoComponent } from './demos/complex-datamodel/complex-datamodel';
import { CustomItemTemplateDemoComponent } from './demos/custom-item-template/custom-item-template';

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
      doc: require('!!raw-loader?lang=typescript!./docs/usage.md')
    }
  },
  {
    name: 'Examples',
    anchor: 'examples',
    outlet: ExamplesComponent,
    content: [
      {
        title: 'String items',
        anchor: 'stringItems',
        component: require('!!raw-loader?lang=typescript!./demos/simple-items/simple-items.ts'),
        html: require('!!raw-loader?lang=markup!./demos/simple-items/simple-items.html'),
        outlet: SimpleItemsDemoComponent
      },
      {
        title: 'Complex data model',
        anchor: 'complexDatamodel',
        component: require('!!raw-loader?lang=typescript!./demos/complex-datamodel/complex-datamodel.ts'),
        html: require('!!raw-loader?lang=markup!./demos/complex-datamodel/complex-datamodel.html'),
        outlet: ComplexDatamodelDemoComponent
      },
      {
        title: 'Custom item template',
        anchor: 'itemTemplate',
        component: require('!!raw-loader?lang=typescript!./demos/custom-item-template/custom-item-template.ts'),
        html: require('!!raw-loader?lang=markup!./demos/custom-item-template/custom-item-template.html'),
        outlet: CustomItemTemplateDemoComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'SortableComponent',
        anchor: 'sortable-component',
        outlet: NgApiDocComponent
      }
    ]
  }
];
