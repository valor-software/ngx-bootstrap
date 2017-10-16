import { DemoTabsBasicComponent } from './demos/basic/basic';
import { DemoTabsManualComponent } from './demos/manual/manual';
import { DemoTabsDynamicComponent } from './demos/dynamic/dynamic';
import { DemoTabsPillsComponent } from './demos/pills/pills';
import { DemoTabsVerticalPillsComponent } from './demos/vertical-pills/vertical-pills';
import { DemoTabsJustifiedComponent } from './demos/justified/justified';
import { DemoTabsStylingComponent } from './demos/styling/styling';
import { DemoTabsConfigComponent } from './demos/config/config';

export const demoComponentContent = {
  examples: [
    {
      title: 'Static tabs',
      anchor: 'tabs-static',
      name: 'basic',
      outlet: DemoTabsBasicComponent
    },
    {
      title: 'Manual selection',
      anchor: 'tabs-manual',
      name: 'manual',
      outlet: DemoTabsManualComponent
    },
    {
      title: 'Dynamic tabs',
      anchor: 'tabs-dynamic',
      name: 'dynamic',
      outlet: DemoTabsDynamicComponent
    },
    {
      title: 'Pills',
      anchor: 'tabs-Pills',
      name: 'pills',
      outlet: DemoTabsPillsComponent
    },
    {
      title: 'Vertical Pills',
      anchor: 'tabs-vertical-pills',
      name: 'verticalPills',
      outlet: DemoTabsVerticalPillsComponent
    },
    {
      title: 'Justified',
      anchor: 'tabs-justified',
      name: 'justified',
      description: '<p><i>Bootstrap 4 doesn\'t have justified classes</i></p>',
      outlet: DemoTabsJustifiedComponent
    },
    {
      title: 'Styling',
      anchor: 'tabs-styling',
      name: 'styling',
      outlet: DemoTabsStylingComponent
    },
    {
      title: 'Configuring defaults',
      anchor: 'tabs-config-defaults',
      name: 'config',
      outlet: DemoTabsConfigComponent
    }
  ],
  apiSections: [
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
};
