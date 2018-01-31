import { CollapseDemoComponent } from './demos/basic/basic';
import { ToggleManualDemoComponent } from './demos/toggle-manual/toggle-manual';

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
        title: 'Basic',
        anchor: 'basic',
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        outlet: CollapseDemoComponent
      },
      {
        title: 'Manual toggle',
        anchor: 'manual-toggle',
        component: require('!!raw-loader?lang=typescript!./demos/toggle-manual/toggle-manual'),
        html: require('!!raw-loader?lang=markup!./demos/toggle-manual/toggle-manual.html'),
        outlet: ToggleManualDemoComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'CollapseDirective',
        anchor: 'collapse-directive',
        outlet: NgApiDocComponent
      }
    ]
  }
];
