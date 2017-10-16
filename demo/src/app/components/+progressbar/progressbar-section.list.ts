import { DemoProgressbarStaticComponent } from './demos/bs3/static/static';
import { DemoProgressbarDynamicComponent } from './demos/bs3/dynamic/dynamic';
import { DemoProgressbarStackedComponent } from './demos/bs3/stacked/stacked';
import { DemoProgressbarConfigComponent } from './demos/bs3/config/config';

import { DemoProgressbarStaticBs4Component } from './demos/bs4/static/static';
import { DemoProgressbarDynamicBs4Component } from './demos/bs4/dynamic/dynamic';
import { DemoProgressbarStackedBs4Component } from './demos/bs4/stacked/stacked';

export const demoComponentContent = {
  examplesBs3: [
    {
      title: 'Static',
      anchor: 'bs3-static',
      name: 'bs3static',
      outlet: DemoProgressbarStaticComponent
    },
    {
      title: 'Dynamic',
      anchor: 'bs3-dynamic',
      name: 'bs3dynamic',
      outlet: DemoProgressbarDynamicComponent
    },
    {
      title: 'Stacked',
      anchor: 'bs3-stacked',
      name: 'bs3stacked',
      outlet: DemoProgressbarStackedComponent
    },
    {
      title: 'Configuring defaults',
      anchor: 'bs3-config',
      name: 'bs3config',
      outlet: DemoProgressbarConfigComponent
    }
  ],
  examplesBs4: [
    {
      title: 'Static',
      anchor: 'bs4-static',
      name: 'bs4static',
      outlet: DemoProgressbarStaticBs4Component
    },
    {
      title: 'Dynamic',
      anchor: 'bs4-dynamic',
      name: 'bs4dynamic',
      outlet: DemoProgressbarDynamicBs4Component
    },
    {
      title: 'Stacked',
      anchor: 'bs4-stacked',
      name: 'bs4stacked',
      outlet: DemoProgressbarStackedBs4Component
    }
  ],
  apiSections: [
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
};
