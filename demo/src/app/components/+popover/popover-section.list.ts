import { DemoPopoverBasicComponent } from './demos/basic/basic';
import { DemoPopoverFourDirectionsComponent } from './demos/four-directions/four-directions';
import { DemoPopoverDismissComponent } from './demos/dismiss/dismiss';
import { DemoPopoverDynamicComponent } from './demos/dynamic/dynamic';
import { DemoPopoverDynamicHtmlComponent } from './demos/dynamic-html/dynamic-html';
import { DemoPopoverContainerComponent } from './demos/container/container';
import { DemoPopoverConfigComponent } from './demos/config/config';
import { DemoPopoverOutsideClickComponent } from './demos/outside-click/outside-click';
import { DemoPopoverTriggersCustomComponent } from './demos/triggers-custom/triggers-custom';
import { DemoPopoverTriggersManualComponent } from './demos/triggers-manual/triggers-manual';
import { DemoPopoverStylingLocalComponent } from './demos/styling-local/styling-local';
import { DemoPopoverClassComponent } from './demos/class/class';
import { DemoPopoverStylingGlobalComponent } from './demos/styling-global/styling-global';

import { ContentSection } from '../../shared/models/content-section.model';
import { DemoTopSectionComponent } from '../../shared/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../shared/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../shared/demo-section-components/demo-api-section/index';

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
        title: 'Basic',
        anchor: 'basic',
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic.ts'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        outlet: DemoPopoverBasicComponent
      },
      {
        title: 'Four directions',
        anchor: 'four-directions',
        component: require('!!raw-loader?lang=typescript!./demos/four-directions/four-directions.ts'),
        html: require('!!raw-loader?lang=markup!./demos/four-directions/four-directions.html'),
        description: `<p>Four positioning options are available: top, right, bottom, and left aligned.
        Besides that, auto option may be used to detect a position that fits the component on screen.</p>`,
        outlet: DemoPopoverFourDirectionsComponent
      },
      {
        title: 'Dismiss on next click',
        anchor: 'popover-dismiss',
        component: require('!!raw-loader?lang=typescript!./demos/dismiss/dismiss.ts'),
        html: require('!!raw-loader?lang=markup!./demos/dismiss/dismiss.html'),
        description: `<p>Use the <code>focus</code> trigger to dismiss popovers on the next click that the
      user makes.</p>`,
        outlet: DemoPopoverDismissComponent
      },
      {
        title: 'Dynamic Content',
        anchor: 'dynamic-content',
        component: require('!!raw-loader?lang=typescript!./demos/dynamic/dynamic.ts'),
        html: require('!!raw-loader?lang=markup!./demos/dynamic/dynamic.html'),
        description: `<p>Popover content can contain any html template. Just create <code>&lt;template
        #myId></code> with any html allowed by Angular, and provide template ref (<code>#myId</code>)
        as popover content.</p>`,
        outlet: DemoPopoverDynamicComponent
      },
      {
        title: 'Dynamic Html',
        anchor: 'dynamic-html',
        component: require('!!raw-loader?lang=typescript!./demos/dynamic-html/dynamic-html.ts'),
        html: require('!!raw-loader?lang=markup!./demos/dynamic-html/dynamic-html.html'),
        description: `<p>By using small trick you can display any dynamic html, which you got from ajax
        request for example.</p>`,
        outlet: DemoPopoverDynamicHtmlComponent
      },
      {
        title: 'Append to body',
        anchor: 'container-body',
        component: require('!!raw-loader?lang=typescript!./demos/container/container.ts'),
        html: require('!!raw-loader?lang=markup!./demos/container/container.html'),
        description: `<p>When you have some styles on a parent element that interfere with a popover,
        you’ll want to specify a <code>container="body"</code> so that the popover’s HTML will be
        appended to body. This will help to avoid rendering problems in more complex components
        (like our input groups, button groups, etc) or inside elements with <code>overflow: hidden</code></p>`,
        outlet: DemoPopoverContainerComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'config-defaults',
        component: require('!!raw-loader?lang=typescript!./demos/config/config.ts'),
        html: require('!!raw-loader?lang=markup!./demos/config/config.html'),
        outlet: DemoPopoverConfigComponent
      },
      {
        title: 'Outside click',
        anchor: 'outside-click',
        component: require('!!raw-loader?lang=typescript!./demos/outside-click/outside-click.ts'),
        html: require('!!raw-loader?lang=markup!./demos/outside-click/outside-click.html'),
        outlet: DemoPopoverOutsideClickComponent
      },
      {
        title: 'Custom triggers',
        anchor: 'triggers-custom',
        component: require('!!raw-loader?lang=typescript!./demos/triggers-custom/triggers-custom.ts'),
        html: require('!!raw-loader?lang=markup!./demos/triggers-custom/triggers-custom.html'),
        outlet: DemoPopoverTriggersCustomComponent
      },
      {
        title: 'Manual triggering',
        anchor: 'triggers-manual',
        component: require('!!raw-loader?lang=typescript!./demos/triggers-manual/triggers-manual.ts'),
        html: require('!!raw-loader?lang=markup!./demos/triggers-manual/triggers-manual.html'),
        outlet: DemoPopoverTriggersManualComponent
      },
      {
        title: 'Component level styling',
        anchor: 'styling-local',
        component: require('!!raw-loader?lang=typescript!./demos/styling-local/styling-local.ts'),
        html: require('!!raw-loader?lang=markup!./demos/styling-local/styling-local.html'),
        outlet: DemoPopoverStylingLocalComponent
      },
      {
        title: 'Custom class',
        anchor: 'popover-custom-class',
        component: require('!!raw-loader?lang=typescript!./demos/class/class.ts'),
        html: require('!!raw-loader?lang=markup!./demos/class/class.html'),
        outlet: DemoPopoverClassComponent
      }/*,
      {
        title: 'Global styling',
        anchor: 'styling-global',
        component: require('!!raw-loader?lang=typescript!./demos/styling-global/styling-global.ts'),
        html: require('!!raw-loader?lang=markup!./demos/styling-global/styling-global.html'),
        outlet: DemoPopoverStylingGlobalComponent
      }*/
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'PopoverDirective',
        anchor: 'popover-directive'
      },
      {
        title: 'PopoverConfig',
        anchor: 'popover-config',
        component: 'config'
      }
    ]
  }
];
