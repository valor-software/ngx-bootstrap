import { DemoProgressbarStaticComponent } from './demos/bs3/static/static';
import { DemoProgressbarDynamicComponent } from './demos/bs3/dynamic/dynamic';
import { DemoProgressbarStackedComponent } from './demos/bs3/stacked/stacked';
import { DemoProgressbarConfigComponent } from './demos/bs3/config/config';

import { DemoProgressbarStaticBs4Component } from './demos/bs4/static/static';
import { DemoProgressbarDynamicBs4Component } from './demos/bs4/dynamic/dynamic';
import { DemoProgressbarStackedBs4Component } from './demos/bs4/stacked/stacked';

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
        title: 'Static',
        anchor: 'bs3-static',
        component: require('!!raw-loader?lang=typescript!./demos/bs3/static/static'),
        html: require('!!raw-loader?lang=markup!./demos/bs3/static/static.html'),
        outlet: DemoProgressbarStaticComponent
      },
      {
        title: 'Dynamic',
        anchor: 'bs3-dynamic',
        component: require('!!raw-loader?lang=typescript!./demos/bs3/dynamic/dynamic'),
        html: require('!!raw-loader?lang=markup!./demos/bs3/dynamic/dynamic.html'),
        outlet: DemoProgressbarDynamicComponent
      },
      {
        title: 'Stacked',
        anchor: 'bs3-stacked',
        component: require('!!raw-loader?lang=typescript!./demos/bs3/stacked/stacked'),
        html: require('!!raw-loader?lang=markup!./demos/bs3/stacked/stacked.html'),
        outlet: DemoProgressbarStackedComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'bs3-config',
        component: require('!!raw-loader?lang=typescript!./demos/bs3/config/config'),
        html: require('!!raw-loader?lang=markup!./demos/bs3/config/config.html'),
        outlet: DemoProgressbarConfigComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'ProgressbarComponent',
        anchor: 'progressbar-component'
      },
      {
        title: 'ProgressDirective',
        anchor: 'progress-directive'
      },
      {
        title: 'BarComponent',
        anchor: 'bar-component'
      },
      {
        title: 'ProgressbarConfig',
        anchor: 'progress-config',
        component: 'config'
      }
    ]
  }
];

/*
[
  {
    examplesBs3: [
      {
        title: 'Static',
        anchor: 'bs3-static',
        component: require('!!raw-loader?lang=typescript!./demos/bs3/static/static'),
        html: require('!!raw-loader?lang=markup!./demos/bs3/static/static.html'),
        outlet: DemoProgressbarStaticComponent
      },
      {
        title: 'Dynamic',
        anchor: 'bs3-dynamic',
        component: require('!!raw-loader?lang=typescript!./demos/bs3/dynamic/dynamic'),
        html: require('!!raw-loader?lang=markup!./demos/bs3/dynamic/dynamic.html'),
        outlet: DemoProgressbarDynamicComponent
      },
      {
        title: 'Stacked',
        anchor: 'bs3-stacked',
        component: require('!!raw-loader?lang=typescript!./demos/bs3/stacked/stacked'),
        html: require('!!raw-loader?lang=markup!./demos/bs3/stacked/stacked.html'),
        outlet: DemoProgressbarStackedComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'bs3-config',
        component: require('!!raw-loader?lang=typescript!./demos/bs3/config/config'),
        html: require('!!raw-loader?lang=markup!./demos/bs3/config/config.html'),
        outlet: DemoProgressbarConfigComponent
      }
    ],
    examplesBs4: [
      {
        title: 'Static',
        anchor: 'bs4-static',
        component: require('!!raw-loader?lang=typescript!./demos/bs4/static/static'),
        html: require('!!raw-loader?lang=markup!./demos/bs4/static/static.html'),
        outlet: DemoProgressbarStaticBs4Component
      },
      {
        title: 'Dynamic',
        anchor: 'bs4-dynamic',
        component: require('!!raw-loader?lang=typescript!./demos/bs4/dynamic/dynamic'),
        html: require('!!raw-loader?lang=markup!./demos/bs4/dynamic/dynamic.html'),
        outlet: DemoProgressbarDynamicBs4Component
      },
      {
        title: 'Stacked',
        anchor: 'bs4-stacked',
        component: require('!!raw-loader?lang=typescript!./demos/bs4/stacked/stacked'),
        html: require('!!raw-loader?lang=markup!./demos/bs4/stacked/stacked.html'),
        outlet: DemoProgressbarStackedBs4Component
      }
    ]
  }
]*/
