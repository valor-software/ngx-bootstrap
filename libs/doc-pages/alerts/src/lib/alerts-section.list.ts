import { DemoAlertBasicComponent } from './demos/basic/basic';
import { DemoAlertLinkComponent } from './demos/link/link';
import { DemoAlertContentComponent } from './demos/content/content';
import { DemoAlertDismissComponent } from './demos/dismiss/dismiss';
import { DemoAlertDynamicHtmlComponent } from './demos/dynamic-html/dynamic-html';
import { DemoAlertDynamicContentComponent } from './demos/dynamic-content/dynamic-content';
import { DemoAlertTimeoutComponent } from './demos/dismiss-on-timeout/dismiss-on-timeout';
import { DemoAlertStylingGlobalComponent } from './demos/styling-global/styling-global';
import { DemoAlertStylingLocalComponent } from './demos/styling-local/styling-local';
import { DemoAlertConfigComponent } from './demos/config/config';

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
        description: `<p>Alerts are available for any length of text, as well as an optional dismiss
          button. For proper styling, use one of the four <strong>required</strong>
          contextual classes (e.g., <code>.alert-success</code>). For inline
          dismissal, use the <code>dismissible</code> property.</p>`,
        component: require('!!raw-loader!./demos/basic/basic'),
        html: require('!!raw-loader!./demos/basic/basic.html'),
        outlet: DemoAlertBasicComponent
      },
      {
        title: 'Link color',
        anchor: 'link-color',
        description: `<p>Use the <code>.alert-link</code> utility class to quickly provide matching
          colored links within any alert.</p>`,
        component: require('!!raw-loader!./demos/link/link.ts'),
        html: require('!!raw-loader!./demos/link/link.html'),
        outlet: DemoAlertLinkComponent
      },
      {
        title: 'Additional content',
        anchor: 'additional-content',
        description: `<p>Alerts can also contain additional HTML elements like headings and
          paragraphs.</p>`,
        component: require('!!raw-loader!./demos/content/content.ts'),
        html: require('!!raw-loader!./demos/content/content.html'),
        outlet: DemoAlertContentComponent
      },
      {
        title: 'Dismissing',
        anchor: 'dismissing',
        description: `<p>Alerts have <code>dismiss</code> option. Enabling it will show close button
          to the right of the alert.</p>`,
        component: require('!!raw-loader!./demos/dismiss/dismiss.ts'),
        html: require('!!raw-loader!./demos/dismiss/dismiss.html'),
        outlet: DemoAlertDismissComponent
      },
      {
        title: 'Dynamic html',
        anchor: 'dynamic-html',
        description: `<p>Sometimes you will need to show dynamically generated html in alerts, here
          is how you can make it. And don't forget to sanitize your html.</p>`,
        component: require('!!raw-loader!./demos/dynamic-html/dynamic-html.ts'),
        html: require('!!raw-loader!./demos/dynamic-html/dynamic-html.html'),
        outlet: DemoAlertDynamicHtmlComponent
      },
      {
        title: 'Dynamic content',
        anchor: 'dynamic-content',
        description: `<p>Alerts fully support bindings.</p>`,
        component: require('!!raw-loader!./demos/dynamic-content/dynamic-content.ts'),
        html: require('!!raw-loader!./demos/dynamic-content/dynamic-content.html'),
        outlet: DemoAlertDynamicContentComponent
      },
      {
        title: 'Dismiss on timeout',
        anchor: 'dismiss-on-timeout',
        description: `<p>You can simply set timeout in milliseconds to <code>dismissOnTimeout</code>
          property to create self closable alerts.</p>`,
        component: require('!!raw-loader!./demos/dismiss-on-timeout/dismiss-on-timeout.ts'),
        html: require('!!raw-loader!./demos/dismiss-on-timeout/dismiss-on-timeout.html'),
        outlet: DemoAlertTimeoutComponent
      },
      {
        title: 'Global styling',
        anchor: 'global-styling',
        description: `<p>You can add additional types of alerts globally.</p>`,
        component: require('!!raw-loader!./demos/styling-global/styling-global.ts'),
        html: require('!!raw-loader!./demos/styling-global/styling-global.html'),
        outlet: DemoAlertStylingGlobalComponent
      },
      {
        title: 'Component level styling',
        anchor: 'local-styling',
        description: `<p>You can add additional types of alerts directly to containing component</p>`,
        component: require('!!raw-loader!./demos/styling-local/styling-local.ts'),
        html: require('!!raw-loader!./demos/styling-local/styling-local.html'),
        outlet: DemoAlertStylingLocalComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'configuration',
        description: `<p>It is possible to override default alert config partially or completely.</p>`,
        component: require('!!raw-loader!./demos/config/config.ts'),
        html: require('!!raw-loader!./demos/config/config.html'),
        outlet: DemoAlertConfigComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'AlertComponent',
        anchor: 'alert-component',
        outlet: NgApiDocComponent
      },
      {
        title: 'AlertConfig',
        anchor: 'alert-config',
        outlet: NgApiDocConfigComponent
      }
    ]
  }
];
