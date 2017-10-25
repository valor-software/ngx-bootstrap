import { DemoPaginationBasicComponent } from './demos/basic/basic';
import { DemoPaginationPagerComponent } from './demos/pager/pager';
import { DemoPaginationLimitComponent } from './demos/limit/limit';
import { DemoPaginationStylingComponent } from './demos/styling-global/styling-global';

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
    description: `<p>On small screens bootstrap4 pagination can be cropped</p>`,
    content: [
      {
        title: 'Default',
        anchor: 'pagination-default',
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic.ts'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        outlet: DemoPaginationBasicComponent
      },
      {
        title: 'States & Limits',
        anchor: 'pagination-limit',
        component: require('!!raw-loader?lang=typescript!./demos/limit/limit.ts'),
        html: require('!!raw-loader?lang=markup!./demos/limit/limit.html'),
        description: `<p>Limit the maximum visible buttons</p>`,
        outlet: DemoPaginationLimitComponent
      },
      {
        title: 'Pager',
        anchor: 'pagination-pager',
        component: require('!!raw-loader?lang=typescript!./demos/pager/pager.ts'),
        html: require('!!raw-loader?lang=markup!./demos/pager/pager.html'),
        outlet: DemoPaginationPagerComponent
      }
      /* TODO: temporary disabled pageBtnClass option
      {
        title: 'Styling',
        anchor: 'pagination-styling',
        component: require('!!raw-loader?lang=typescript!./demos/styling-global/styling-global.ts'),
        html: require('!!raw-loader?lang=markup!./demos/styling-global/styling-global.html'),
        outlet: DemoPaginationStylingComponent
      }*/
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'PaginationComponent',
        anchor: 'pagination-component'
      },
      {
        title: 'PagerComponent',
        anchor: 'pager-component'
      },
      {
        title: 'PaginationConfig',
        anchor: 'pagination-config',
        component: 'config'
      }
    ]
  }
];
