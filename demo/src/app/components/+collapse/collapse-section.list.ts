import { CollapseDemoComponent } from './demos/collapse-demo.component';

import { ContentSection } from '../../shared/models/content-section.model';
import { DemoTopSectionComponent } from '../../shared/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../shared/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../shared/demo-section-components/demo-api-section/index';

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
        title: 'Basic',
        anchor: 'basic',
        component: require('!!raw-loader?lang=typescript!./demos/collapse-demo.component'),
        html: require('!!raw-loader?lang=markup!./demos/collapse-demo.component.html'),
        outlet: CollapseDemoComponent
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
        anchor: 'collapse-directive'
      }
    ]
  }
];
