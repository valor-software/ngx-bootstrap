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
import { DynamicContentRenderingComponent } from './demos/dynamic-content-rendering/dynamic-content-rendering';
import { DemoDisabledKeyNavigationsComponent } from './demos/disabled-key-navigations/disabled-key-navigations';
import { ContentSection } from '@ngx-bootstrap-doc/docs';
import { DemoTopSectionComponent } from '@ngx-bootstrap-doc/docs';
import { ExamplesComponent } from '@ngx-bootstrap-doc/docs';
import { ApiSectionsComponent } from '@ngx-bootstrap-doc/docs';

import {
  NgApiDocComponent,
  NgApiDocConfigComponent
} from '@ngx-bootstrap-doc/docs';

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
    content: [
      {
        title: 'Basic',
        anchor: 'basic',
        component: require('!!raw-loader!./demos/basic/basic'),
        html: require('!!raw-loader!./demos/basic/basic.html'),
        outlet: DemoTabsBasicComponent
      },
      {
        title: 'Manual selection',
        anchor: 'tabs-manual-select',
        component: require('!!raw-loader!./demos/manual-selection/manual-selection'),
        html: require('!!raw-loader!./demos/manual-selection/manual-selection.html'),
        outlet: DemoTabsManualSelectionComponent
      },
      {
        title: 'Disabled tabs',
        anchor: 'disabled',
        component: require('!!raw-loader!./demos/disabled/disabled'),
        html: require('!!raw-loader!./demos/disabled/disabled.html'),
        outlet: DemoTabsDisabledComponent
      },
      {
        title: 'Dynamic tabs',
        anchor: 'tabs-dynamic',
        component: require('!!raw-loader!./demos/dynamic/dynamic'),
        html: require('!!raw-loader!./demos/dynamic/dynamic.html'),
        outlet: DemoTabsDynamicComponent
      },
      {
        title: 'Pills',
        anchor: 'tabs-Pills',
        component: require('!!raw-loader!./demos/pills/pills'),
        html: require('!!raw-loader!./demos/pills/pills.html'),
        outlet: DemoTabsPillsComponent
      },
      {
        title: 'Vertical Pills',
        anchor: 'tabs-vertical-pills',
        component: require('!!raw-loader!./demos/vertical-pills/vertical-pills'),
        html: require('!!raw-loader!./demos/vertical-pills/vertical-pills.html'),
        outlet: DemoTabsVerticalPillsComponent
      },
      {
        title: 'Justified',
        anchor: 'tabs-justified',
        component: require('!!raw-loader!./demos/justified/justified'),
        html: require('!!raw-loader!./demos/justified/justified.html'),
        description: '<p><i>Bootstrap 4 doesn\'t have justified classes</i></p>',
        outlet: DemoTabsJustifiedComponent
      },
      {
        title: 'Custom class',
        anchor: 'tabs-custom-class',
        component: require('!!raw-loader!./demos/custom-class/custom-class'),
        html: require('!!raw-loader!./demos/custom-class/custom-class.html'),
        outlet: DemoTabsCustomClassComponent
      },
      {
        title: 'Select event',
        anchor: 'select-event',
        component: require('!!raw-loader!./demos/select-event/select-event'),
        html: require('!!raw-loader!./demos/select-event/select-event.html'),
        description: '<p>You can subscribe to tab\'s <code>select</code> event</p>',
        outlet: DemoTabsSelectEventComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'tabs-config-defaults',
        component: require('!!raw-loader!./demos/config/config'),
        html: require('!!raw-loader!./demos/config/config.html'),
        outlet: DemoTabsConfigComponent
      },
      {
        title: 'Custom template',
        anchor: 'tabs-custom-template',
        component: require('!!raw-loader!./demos/custom-template/custom-template'),
        html: require('!!raw-loader!./demos/custom-template/custom-template.html'),
        outlet: DemoTabsCustomComponent
      },
      {
        title: 'Dynamic content rendering',
        anchor: 'dynamic-content-rendering',
        component: require('!!raw-loader!./demos/dynamic-content-rendering/dynamic-content-rendering'),
        html: require('!!raw-loader!./demos/dynamic-content-rendering/dynamic-content-rendering.html'),
        outlet: DynamicContentRenderingComponent
      },
      {
        title: 'Accessibility',
        anchor: 'accessibility',
        outlet: DemoAccessibilityComponent
      },
      {
        title: 'Disable key navigations',
        anchor: 'disable-key-navigations',
        component: require('!!raw-loader!./demos/disabled-key-navigations/disabled-key-navigations'),
        html: require('!!raw-loader!./demos/disabled-key-navigations/disabled-key-navigations.html'),
        outlet: DemoDisabledKeyNavigationsComponent
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
        anchor: 'tabset-component',
        outlet: NgApiDocComponent
      },
      {
        title: 'TabDirective',
        anchor: 'tab-directive',
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
