import { DemoPaginationBasicComponent } from './demos/basic/basic';
import { DemoPaginationPagerComponent } from './demos/pager/pager';
import { DemoPaginationLimitComponent } from './demos/limit/limit';
import { DemoPaginationStylingComponent } from './demos/styling-global/styling-global';
import { DemoPaginationManualSwitchingComponent } from './demos/manual-switching/manual-switching';
import { DemoPaginationPageChangedComponent } from './demos/page-changed-event/page-changed-event';
import { DemoPaginationPagesCountChangedComponent } from './demos/pages-count-changed/pages-count-changed';
import { DemoPaginationBoundaryLinksComponent } from './demos/boundary-links/boundary-links';
import { DemoPaginationDirectionLinksComponent } from './demos/direction-links/direction-links';
import { DemoPaginationCustomLinksContentComponent } from './demos/custom-links-content/custom-links-content';
import { DemoPaginationContentSwitchingComponent } from './demos/content-switching/content-switching';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import {
  NgApiDocComponent,
  NgApiDocConfigComponent
} from '../../docs/api-docs';
import { DemoPaginationDisabledComponent } from './demos/disabled/disabled';
import { DemoPaginationRotateComponent } from './demos/rotate/rotate';
import { DemoPaginationCustomTemplateComponent } from './demos/custom-template/custom-template';

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
    description: `<p>On small screens bootstrap4 pagination can be cropped</p>`,
    content: [
      {
        title: 'Basic',
        anchor: 'basic',
        component: require('!!raw-loader!./demos/basic/basic.ts'),
        html: require('!!raw-loader!./demos/basic/basic.html'),
        outlet: DemoPaginationBasicComponent
      },
      {
        title: 'Manual switching page',
        anchor: 'manual-switching',
        component: require('!!raw-loader!./demos/manual-switching/manual-switching.ts'),
        html: require('!!raw-loader!./demos/manual-switching/manual-switching.html'),
        outlet: DemoPaginationManualSwitchingComponent
      },
      {
        title: 'Page changed event',
        anchor: 'page-changed-event',
        component: require('!!raw-loader!./demos/page-changed-event/page-changed-event.ts'),
        html: require('!!raw-loader!./demos/page-changed-event/page-changed-event.html'),
        outlet: DemoPaginationPageChangedComponent
      },
      {
        title: 'Pages count changed event',
        anchor: 'pages-count-changed',
        component: require('!!raw-loader!./demos/pages-count-changed/pages-count-changed.ts'),
        html: require('!!raw-loader!./demos/pages-count-changed/pages-count-changed.html'),
        outlet: DemoPaginationPagesCountChangedComponent
      },
      {
        title: 'Boundary links',
        anchor: 'boundary-links',
        component: require('!!raw-loader!./demos/boundary-links/boundary-links.ts'),
        html: require('!!raw-loader!./demos/boundary-links/boundary-links.html'),
        outlet: DemoPaginationBoundaryLinksComponent
      },
      {
        title: 'Direction links',
        anchor: 'direction-links',
        component: require('!!raw-loader!./demos/direction-links/direction-links.ts'),
        html: require('!!raw-loader!./demos/direction-links/direction-links.html'),
        outlet: DemoPaginationDirectionLinksComponent
      },
      {
        title: 'Custom links content',
        anchor: 'custom-links-content',
        component: require('!!raw-loader!./demos/custom-links-content/custom-links-content.ts'),
        html: require('!!raw-loader!./demos/custom-links-content/custom-links-content.html'),
        outlet: DemoPaginationCustomLinksContentComponent
      },
      {
        title: 'Disabled',
        anchor: 'pagination-disabled',
        component: require('!!raw-loader!./demos/disabled/disabled.ts'),
        html: require('!!raw-loader!./demos/disabled/disabled.html'),
        outlet: DemoPaginationDisabledComponent
      },
      {
        title: 'Limits',
        anchor: 'pagination-limit',
        component: require('!!raw-loader!./demos/limit/limit.ts'),
        html: require('!!raw-loader!./demos/limit/limit.html'),
        description: `<p>Limit the maximum visible page numbers</p>`,
        outlet: DemoPaginationLimitComponent
      },
      {

        title: 'Centering the active page link',
        anchor: 'pagination-rotate',
        component: require('!!raw-loader!./demos/rotate/rotate.ts'),
        html: require('!!raw-loader!./demos/rotate/rotate.html'),
        description: `<p>Set current page link to center</p>`,
        outlet: DemoPaginationRotateComponent
      },
      {
        title: 'Content switching',
        anchor: 'content-switching',
        component: require('!!raw-loader!./demos/content-switching/content-switching.ts'),
        html: require('!!raw-loader!./demos/content-switching/content-switching.html'),
        outlet: DemoPaginationContentSwitchingComponent
      },
      {
        title: 'Pager',
        anchor: 'pagination-pager',
        component: require('!!raw-loader!./demos/pager/pager.ts'),
        html: require('!!raw-loader!./demos/pager/pager.html'),
        outlet: DemoPaginationPagerComponent
      },
      {
        title: 'Custom Template',
        anchor: 'custom-template',
        description: `
          <p>
            It is possible to customize what exactly is displayed in each pagination link. To overwrite default
            templates use these inputs:
            <ul>
              <li><code>customPageTemplate</code></li>
              <li><code>customNextTemplate</code></li>
              <li><code>customPreviousTemplate</code></li>
              <li><code>customFirstTemplate</code></li>
              <li><code>customLastTemplate</code></li>
            </ul>
            Each template has a context object. The object <code>PaginationLinkContext</code> is available for all
            templates and for page numbers there is a <code>PaginationNumberLinkContext</code> that
            contains the page number.
          </p>
        `,
        component: require('!!raw-loader!./demos/custom-template/custom-template.ts'),
        html: require('!!raw-loader!./demos/custom-template/custom-template.html'),
        outlet: DemoPaginationCustomTemplateComponent
      }
      /* TODO: temporary disabled pageBtnClass option
      {
        title: 'Styling',
        anchor: 'pagination-styling',
        component: require('!!raw-loader!./demos/styling-global/styling-global.ts'),
        html: require('!!raw-loader!./demos/styling-global/styling-global.html'),
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
      },
      {
        title: 'PaginationLinkContext',
        anchor: 'pagination-link-context',
        outlet: NgApiDocConfigComponent
      },
      {
        title: 'PaginationNumberLinkContext',
        anchor: 'pagination-number-link-context',
        outlet: NgApiDocConfigComponent
      },
      {
        title: 'PagesModel',
        anchor: 'pagination-models',
        outlet: NgApiDocConfigComponent
      }
    ]
  }
];
