import { ApiSectionsComponent } from '@ngx-bootstrap-doc/docs';
import { CollapseDemoAnimatedComponent } from './demos/animated/animated';
import { CollapseDemoComponent } from './demos/basic/basic';
import { CollapseDemoEventsComponent } from './demos/events/events';
import { ContentSection } from '@ngx-bootstrap-doc/docs';
import { DemoAccessibilityComponent } from './demos/accessibility/accessibility';
import { DemoTopSectionComponent } from '@ngx-bootstrap-doc/docs';
import { ExamplesComponent } from '@ngx-bootstrap-doc/docs';
import { InlineDisplayDemoComponent } from './demos/inline-display/inline-display';
import { ToggleManualDemoComponent } from './demos/toggle-manual/toggle-manual';

import { NgApiDocComponent } from '@ngx-bootstrap-doc/docs';

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
        outlet: CollapseDemoComponent
      },
      {
        title: 'With animation',
        anchor: 'animated',
        component: require('!!raw-loader!./demos/animated/animated'),
        html: require('!!raw-loader!./demos/animated/animated.html'),
        description: `You can enable animation via <code>isAnimated</code> input option`,
        outlet: CollapseDemoAnimatedComponent
      },
      {
        title: 'Events',
        anchor: 'events',
        component: require('!!raw-loader!./demos/events/events'),
        html: require('!!raw-loader!./demos/events/events.html'),
        description: `Collapse directive exposes 4 events: <code>collapses</code>, that fires when a collapse was triggered (animation start),
                        <code>collapsed</code>, that fires when a content was hidden (animation finished),
                        <code>expands</code>, that fires when a expansion was triggered (animation start)
                      and <code>expanded</code>, that fires when a content was shown`,
        outlet: CollapseDemoEventsComponent
      },
      {
        title: 'Manual toggle',
        anchor: 'manual-toggle',
        component: require('!!raw-loader!./demos/toggle-manual/toggle-manual'),
        html: require('!!raw-loader!./demos/toggle-manual/toggle-manual.html'),
        outlet: ToggleManualDemoComponent
      },
      {
        title: 'Inline display',
        anchor: 'inline-display',
        component: require('!!raw-loader!./demos/inline-display/inline-display'),
        html: require('!!raw-loader!./demos/inline-display/inline-display.html'),
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
