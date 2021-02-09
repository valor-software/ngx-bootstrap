import { DemoPopoverAdaptivePositionComponent } from './demos/adaptive-position/adaptive-position';
import { DemoPopoverBasicComponent } from './demos/basic/basic';
import { DemoPopoverByIsOpenPropComponent } from './demos/trigger-by-isopen-property/trigger-by-isopen-property';
import { DemoPopoverClassComponent } from './demos/class/class';
import { DemoPopoverConfigComponent } from './demos/config/config';
import { DemoPopoverContainerComponent } from './demos/container/container';
import { DemoPopoverContextComponent } from './demos/popover-context/popover-context';
import { DemoPopoverCustomContentComponent } from './demos/custom-content/custom-content';
import { DemoPopoverDelayComponent } from './demos/delay/delay';
import { DemoPopoverHideAfterDelayComponent } from './demos/hide-after-delay/hide-after-delay';
import { DemoPopoverDismissComponent } from './demos/dismiss/dismiss';
import { DemoPopoverDynamicComponent } from './demos/dynamic/dynamic';
import { DemoPopoverDynamicHtmlComponent } from './demos/dynamic-html/dynamic-html';
import { DemoPopoverEventsComponent } from './demos/events/events';
import { DemoPopoverOutsideClickComponent } from './demos/outside-click/outside-click';
import { DemoPopoverPlacementComponent } from './demos/placement/placement';
import { DemoPopoverStylingLocalComponent } from './demos/styling-local/styling-local';
import { DemoPopoverTriggersCustomComponent } from './demos/triggers-custom/triggers-custom';
import { DemoPopoverTriggersManualComponent } from './demos/triggers-manual/triggers-manual';
import { DemoPopoverCornerPlacementComponent } from './demos/corner-placement/corner-placement';

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
        component: require('!!raw-loader!./demos/basic/basic.ts'),
        html: require('!!raw-loader!./demos/basic/basic.html'),
        outlet: DemoPopoverBasicComponent
      },
      {
        title: 'Placement',
        anchor: 'placement',
        component: require('!!raw-loader!./demos/placement/placement.ts'),
        html: require('!!raw-loader!./demos/placement/placement.html'),
        description: `<p>Four base positioning options are available: <code>top</code>, <code>right</code>,
        <code>bottom</code>, and <code>left</code>.
        Besides that, <code>auto</code> option may be used to detect a position that fits the component on screen.</p>`,
        outlet: DemoPopoverPlacementComponent
      },
      {
        title: 'Corner placement',
        anchor: 'corner-placement',
        description: `
          <p>Placement property of a popover can contain "corner placement" specifier following the base positioning.
          Thus, in addition to the four base positioning options, namely <code>top</code>, <code>right</code>,
          <code>bottom</code>, and <code>left</code>, eight more positioning options are available: <code>top left</code>, <code>top right</code>,
          <code>right top</code>, <code>right bottom</code>, <code>bottom right</code>, <code>bottom left</code>, <code>left bottom</code>, and <code>left top</code>.`,
        component: require('!!raw-loader!./demos/corner-placement/corner-placement.ts'),
        html: require('!!raw-loader!./demos/corner-placement/corner-placement.html'),
        outlet: DemoPopoverCornerPlacementComponent
      },
      {
        title: 'Disable adaptive position',
        anchor: 'adaptive-position',
        description: `
          <p>You can disable adaptive position via <code>adaptivePosition</code> input or config option</p>
        `,
        component: require('!!raw-loader!./demos/adaptive-position/adaptive-position.ts'),
        html: require('!!raw-loader!./demos/adaptive-position/adaptive-position.html'),
        outlet: DemoPopoverAdaptivePositionComponent
      },
      {
        title: 'Dismiss on next click',
        anchor: 'popover-dismiss',
        component: require('!!raw-loader!./demos/dismiss/dismiss.ts'),
        html: require('!!raw-loader!./demos/dismiss/dismiss.html'),
        description: `<p>Use the <code>focus</code> trigger to dismiss popovers on the next click that the
      user makes.</p>`,
        outlet: DemoPopoverDismissComponent
      },
      {
        title: 'Dynamic content',
        anchor: 'dynamic-content',
        component: require('!!raw-loader!./demos/dynamic/dynamic.ts'),
        html: require('!!raw-loader!./demos/dynamic/dynamic.html'),
        description: `<p>Pass a string as popover content.</p>`,
        outlet: DemoPopoverDynamicComponent
      },
      {
        title: 'Custom content template',
        anchor: 'custom-content-template',
        component: require('!!raw-loader!./demos/custom-content/custom-content.ts'),
        html: require('!!raw-loader!./demos/custom-content/custom-content.html'),
        description: `<p>Create <code>&lt;ng-template #myId></code> with any html allowed by Angular,
        and provide template ref <code>[popover]="myId"</code> as popover content.</p>`,
        outlet: DemoPopoverCustomContentComponent
      },
      {
        title: 'Dynamic Html',
        anchor: 'dynamic-html',
        component: require('!!raw-loader!./demos/dynamic-html/dynamic-html.ts'),
        html: require('!!raw-loader!./demos/dynamic-html/dynamic-html.html'),
        description: `<p>By using <code>[innerHtml]</code> inside <code>ng-template</code> you can display any dynamic html</p>`,
        outlet: DemoPopoverDynamicHtmlComponent
      },
      {
        title: 'Append to body',
        anchor: 'container-body',
        component: require('!!raw-loader!./demos/container/container.ts'),
        html: require('!!raw-loader!./demos/container/container.html'),
        description: `<p>When you have any styles on a parent element that interfere with a popover,
        you’ll want to specify a <code>container="body"</code> so that the popover’s HTML will be
        appended to body. This will help to avoid rendering problems in more complex components
        (like input groups, button groups, etc) or inside elements with <code>overflow: hidden</code></p>`,
        outlet: DemoPopoverContainerComponent
      },
      {
        title: 'Visibility events',
        anchor: 'events',
        component: require('!!raw-loader!./demos/events/events.ts'),
        html: require('!!raw-loader!./demos/events/events.html'),
        outlet: DemoPopoverEventsComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'config-defaults',
        component: require('!!raw-loader!./demos/config/config.ts'),
        html: require('!!raw-loader!./demos/config/config.html'),
        outlet: DemoPopoverConfigComponent
      },
      {
        title: 'Outside click',
        anchor: 'outside-click',
        component: require('!!raw-loader!./demos/outside-click/outside-click.ts'),
        html: require('!!raw-loader!./demos/outside-click/outside-click.html'),
        outlet: DemoPopoverOutsideClickComponent
      },
      {
        title: 'Custom triggers',
        anchor: 'triggers-custom',
        component: require('!!raw-loader!./demos/triggers-custom/triggers-custom.ts'),
        html: require('!!raw-loader!./demos/triggers-custom/triggers-custom.html'),
        outlet: DemoPopoverTriggersCustomComponent
      },
      {
        title: 'Manual triggering',
        anchor: 'triggers-manual',
        component: require('!!raw-loader!./demos/triggers-manual/triggers-manual.ts'),
        html: require('!!raw-loader!./demos/triggers-manual/triggers-manual.html'),
        description: `<p>This demo shows manipulating popover by <code>show</code>,
        <code>hide</code> and <code>toggle</code> methods</p>`,
        outlet: DemoPopoverTriggersManualComponent
      },
      {
        title: 'Trigger by isOpen property',
        anchor: 'trigger-by-isopen-property',
        component: require('!!raw-loader!./demos/trigger-by-isopen-property/trigger-by-isopen-property.ts'),
        html: require('!!raw-loader!./demos/trigger-by-isopen-property/trigger-by-isopen-property.html'),
        description: `<p>You can show/hide popover by switching <code>isOpen</code> property</p>`,
        outlet: DemoPopoverByIsOpenPropComponent
      },
      {
        title: 'Component level styling',
        anchor: 'styling-local',
        component: require('!!raw-loader!./demos/styling-local/styling-local.ts'),
        html: require('!!raw-loader!./demos/styling-local/styling-local.html'),
        outlet: DemoPopoverStylingLocalComponent
      },
      {
        title: 'Custom class',
        anchor: 'popover-custom-class',
        component: require('!!raw-loader!./demos/class/class.ts'),
        html: require('!!raw-loader!./demos/class/class.html'),
        outlet: DemoPopoverClassComponent
      },
      {
        title: 'Popover context',
        anchor: 'popover-context',
        component: require('!!raw-loader!./demos/popover-context/popover-context.ts'),
        html: require('!!raw-loader!./demos/popover-context/popover-context.html'),
        outlet: DemoPopoverContextComponent
      },
      {
        title: 'Popover with delay',
        anchor: 'popover-delay',
        component: require('!!raw-loader!./demos/delay/delay.ts'),
        html: require('!!raw-loader!./demos/delay/delay.html'),
        description: `<p>Click on the button to see popover delayed for 0,5 second </p>`,
        outlet: DemoPopoverDelayComponent
      },
      {
        title: 'Hide popover after delay',
        anchor: 'popover-hide-after-delay',
        component: require('!!raw-loader!./demos/hide-after-delay/hide-after-delay.ts'),
        html: require('!!raw-loader!./demos/hide-after-delay/hide-after-delay.html'),
        description: `<p>Open popover and it will disappear after 3 seconds</p>`,
        outlet: DemoPopoverHideAfterDelayComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'PopoverDirective',
        anchor: 'popover-directive',
        outlet: NgApiDocComponent
      },
      {
        title: 'PopoverConfig',
        anchor: 'popover-config',
        outlet: NgApiDocConfigComponent
      }
    ]
  }
];
