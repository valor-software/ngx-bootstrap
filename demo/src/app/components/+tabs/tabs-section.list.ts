import { DemoTabsBasicComponent } from './demos/basic/basic';
import { DemoTabsManualComponent } from './demos/manual/manual';
import { DemoTabsDynamicComponent } from './demos/dynamic/dynamic';
import { DemoTabsPillsComponent } from './demos/pills/pills';
import { DemoTabsVerticalPillsComponent } from './demos/vertical-pills/vertical-pills';
import { DemoTabsJustifiedComponent } from './demos/justified/justified';
import { DemoTabsStylingComponent } from './demos/styling/styling';
import { DemoTabsConfigComponent } from './demos/config/config';

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
        title: 'Static tabs',
        anchor: 'tabs-static',
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        outlet: DemoTabsBasicComponent
      },
      {
        title: 'Manual selection',
        anchor: 'tabs-manual',
        component: require('!!raw-loader?lang=typescript!./demos/manual/manual'),
        html: require('!!raw-loader?lang=markup!./demos/manual/manual.html'),
        outlet: DemoTabsManualComponent
      },
      {
        title: 'Dynamic tabs',
        anchor: 'tabs-dynamic',
        component: require('!!raw-loader?lang=typescript!./demos/dynamic/dynamic'),
        html: require('!!raw-loader?lang=markup!./demos/dynamic/dynamic.html'),
        outlet: DemoTabsDynamicComponent
      },
      {
        title: 'Pills',
        anchor: 'tabs-Pills',
        component: require('!!raw-loader?lang=typescript!./demos/pills/pills'),
        html: require('!!raw-loader?lang=markup!./demos/pills/pills.html'),
        outlet: DemoTabsPillsComponent
      },
      {
        title: 'Vertical Pills',
        anchor: 'tabs-vertical-pills',
        component: require('!!raw-loader?lang=typescript!./demos/vertical-pills/vertical-pills'),
        html: require('!!raw-loader?lang=markup!./demos/vertical-pills/vertical-pills.html'),
        outlet: DemoTabsVerticalPillsComponent
      },
      {
        title: 'Justified',
        anchor: 'tabs-justified',
        component: require('!!raw-loader?lang=typescript!./demos/justified/justified'),
        html: require('!!raw-loader?lang=markup!./demos/justified/justified.html'),
        description: '<p><i>Bootstrap 4 doesn\'t have justified classes</i></p>',
        outlet: DemoTabsJustifiedComponent
      },
      {
        title: 'Styling',
        anchor: 'tabs-styling',
        component: require('!!raw-loader?lang=typescript!./demos/styling/styling'),
        html: require('!!raw-loader?lang=markup!./demos/styling/styling.html'),
        outlet: DemoTabsStylingComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'tabs-config-defaults',
        component: require('!!raw-loader?lang=typescript!./demos/config/config'),
        html: require('!!raw-loader?lang=markup!./demos/config/config.html'),
        outlet: DemoTabsConfigComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'TabsetComponent',
        anchor: 'tabset-component'
      },
      {
        title: 'TabDirective',
        anchor: 'tab-directive'
      },
      {
        title: 'TabHeadingDirective',
        anchor: 'tab-heading-directive'
      },
      {
        title: 'TabsetConfig',
        anchor: 'tabset-config',
        component: 'config'
      }
    ]
  }
];
