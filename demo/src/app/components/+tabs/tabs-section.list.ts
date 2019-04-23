import { DemoTabsBasicComponent } from './demos/basic/basic';
import { DemoTabsManualSelectionComponent } from './demos/manual-selection/manual-selection';
import { DemoTabsDynamicComponent } from './demos/dynamic/dynamic';
import { DemoTabsPillsComponent } from './demos/pills/pills';
import { DemoTabsVerticalPillsComponent } from './demos/vertical-pills/vertical-pills';
import { DemoTabsJustifiedComponent } from './demos/justified/justified';
import { DemoTabsCustomClassComponent } from './demos/custom-class/custom-class';
import { DemoTabsConfigComponent } from './demos/config/config';
import { DemoTabsDisabledComponent } from './demos/disabled/disabled';
import { DemoTabsCustomComponent } from './demos/custom-template/custom-template';
import { DemoTabsSelectEventComponent } from './demos/select-event/select-event';
import { DemoAccessibilityComponent } from './demos/accessibility/accessibility';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import {
  NgApiDocComponent,
  NgApiDocConfigComponent
} from '../../docs/api-docs';

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
      // {
      //   title: 'Basic',
      //   anchor: 'basic',
      //   component: require('!!raw-loader?lang=typescript!./demos/basic/basic'),
      //   html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
      //   outlet: DemoTabsBasicComponent
      // },
      // {
      //   title: 'Manual selection',
      //   anchor: 'tabs-manual-select',
      //   component: require('!!raw-loader?lang=typescript!./demos/manual-selection/manual-selection'),
      //   html: require('!!raw-loader?lang=markup!./demos/manual-selection/manual-selection.html'),
      //   outlet: DemoTabsManualSelectionComponent
      // },
      // {
      //   title: 'Disabled tabs',
      //   anchor: 'disabled',
      //   component: require('!!raw-loader?lang=typescript!./demos/disabled/disabled'),
      //   html: require('!!raw-loader?lang=markup!./demos/disabled/disabled.html'),
      //   outlet: DemoTabsDisabledComponent
      // },
      {
        title: 'Dynamic tabs',
        anchor: 'tabs-dynamic',
        component: require('!!raw-loader?lang=typescript!./demos/dynamic/dynamic'),
        html: require('!!raw-loader?lang=markup!./demos/dynamic/dynamic.html'),
        outlet: DemoTabsDynamicComponent
      },
      // {
      //   title: 'Pills',
      //   anchor: 'tabs-Pills',
      //   component: require('!!raw-loader?lang=typescript!./demos/pills/pills'),
      //   html: require('!!raw-loader?lang=markup!./demos/pills/pills.html'),
      //   outlet: DemoTabsPillsComponent
      // },
      // {
      //   title: 'Vertical Pills',
      //   anchor: 'tabs-vertical-pills',
      //   component: require('!!raw-loader?lang=typescript!./demos/vertical-pills/vertical-pills'),
      //   html: require('!!raw-loader?lang=markup!./demos/vertical-pills/vertical-pills.html'),
      //   outlet: DemoTabsVerticalPillsComponent
      // },
      // {
      //   title: 'Justified',
      //   anchor: 'tabs-justified',
      //   component: require('!!raw-loader?lang=typescript!./demos/justified/justified'),
      //   html: require('!!raw-loader?lang=markup!./demos/justified/justified.html'),
      //   description: '<p><i>Bootstrap 4 doesn\'t have justified classes</i></p>',
      //   outlet: DemoTabsJustifiedComponent
      // },
      // {
      //   title: 'Custom class',
      //   anchor: 'tabs-custom-class',
      //   component: require('!!raw-loader?lang=typescript!./demos/custom-class/custom-class'),
      //   html: require('!!raw-loader?lang=markup!./demos/custom-class/custom-class.html'),
      //   outlet: DemoTabsCustomClassComponent
      // },
      // {
      //   title: 'Select event',
      //   anchor: 'select-event',
      //   component: require('!!raw-loader?lang=typescript!./demos/select-event/select-event'),
      //   html: require('!!raw-loader?lang=markup!./demos/select-event/select-event.html'),
      //   description: '<p>You can subscribe to tab\'s <code>select</code> event</p>',
      //   outlet: DemoTabsSelectEventComponent
      // },
      // {
      //   title: 'Configuring defaults',
      //   anchor: 'tabs-config-defaults',
      //   component: require('!!raw-loader?lang=typescript!./demos/config/config'),
      //   html: require('!!raw-loader?lang=markup!./demos/config/config.html'),
      //   outlet: DemoTabsConfigComponent
      // },
      // {
      //   title: 'Custom template',
      //   anchor: 'tabs-custom-template',
      //   component: require('!!raw-loader?lang=typescript!./demos/custom-template/custom-template'),
      //   html: require('!!raw-loader?lang=markup!./demos/custom-template/custom-template.html'),
      //   outlet: DemoTabsCustomComponent
      // },
      // {
      //   title: 'Accessibility',
      //   anchor: 'accessibility',
      //   outlet: DemoAccessibilityComponent
      // }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'TabsetComponent',
        anchor: 'tabset-component',
        outlet: NgApiDocComponent
      },
      {
        title: 'TabComponent',
        anchor: 'tab-component',
        outlet: NgApiDocComponent
      },
      {
        title: 'TabHeadingDirective',
        anchor: 'tab-heading-directive',
        outlet: NgApiDocComponent
      },
      {
        title: 'TabsetConfig',
        anchor: 'tabset-config',
        outlet: NgApiDocConfigComponent
      }
    ]
  }
];
