import { DemoPaginationBasicComponent } from './demos/basic/basic';
import { DemoPaginationPagerComponent } from './demos/pager/pager';
import { DemoPaginationLimitComponent } from './demos/limit/limit';
import { DemoPaginationStylingComponent } from './demos/styling-global/styling-global';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import { NgApiDocComponent } from '../../docs/api-docs/api-doc/api-doc.component';
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
        anchor: 'pagination-component',
        outlet: NgApiDocComponent
      },
      {
        title: 'PagerComponent',
        anchor: 'pager-component',
        outlet: NgApiDocComponent
      },
      {
        title: 'PaginationConfig',
        anchor: 'pagination-config',
        outlet: NgApiDocConfigComponent
      }
    ]
  }
];
