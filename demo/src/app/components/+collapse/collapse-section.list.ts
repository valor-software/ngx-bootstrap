import { CollapseDemoComponent } from './demos/basic/basic';
import { ToggleManualDemoComponent } from './demos/toggle-manual/toggle-manual';
import { CollapseDemoEventsComponent } from './demos/events/events';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';
import { DemoAccessibilityComponent } from './demos/accessibility/accessibility';
import { InlineDisplayDemoComponent } from './demos/inline-display/inline-display';

import { NgApiDocComponent } from '../../docs/api-docs';

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
      {
        title: 'Basic',
        anchor: 'basic',
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        outlet: CollapseDemoComponent
      },
      {
        title: 'Events',
        anchor: 'events',
        component: require('!!raw-loader?lang=typescript!./demos/events/events'),
        html: require('!!raw-loader?lang=markup!./demos/events/events.html'),
        description: `Collapse directive exposes 2 events: <code>collapsed</code>, that fires when a content was hidden, 
                      and <code>expanded</code>, that fires when a content was shown`,
        outlet: CollapseDemoEventsComponent
      },
      {
        title: 'Manual toggle',
        anchor: 'manual-toggle',
        component: require('!!raw-loader?lang=typescript!./demos/toggle-manual/toggle-manual'),
        html: require('!!raw-loader?lang=markup!./demos/toggle-manual/toggle-manual.html'),
        outlet: ToggleManualDemoComponent
      },
      {
        title: 'Inline display',
        anchor: 'inline-display',
        component: require('!!raw-loader?lang=typescript!./demos/inline-display/inline-display'),
        html: require('!!raw-loader?lang=markup!./demos/inline-display/inline-display.html'),
        outlet: InlineDisplayDemoComponent
      },
      {
        title: 'Accessibility',
        anchor: 'accessibility',
        outlet: DemoAccessibilityComponent
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
        anchor: 'collapse-directive',
        outlet: NgApiDocComponent
      }
    ]
  }
];
