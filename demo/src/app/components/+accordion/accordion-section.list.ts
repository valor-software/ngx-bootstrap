import { DemoAccordionAnimatedComponent } from './demos/animated/animated';
import { DemoAccordionBasicComponent } from './demos/basic/basic';
import { DemoAccordionConfigComponent } from './demos/config/config';
import { DemoAccordionCustomHTMLComponent } from './demos/custom-html/custom-html';
import { DemoAccordionDisabledComponent } from './demos/disabled/disabled';
import { DemoAccordionDynamicComponent } from './demos/dymanic/dynamic';
import { DemoAccordionManualToggleComponent } from './demos/manual-toggle/manual-toggle';
import { DemoAccordionOneAtATimeComponent } from './demos/one-at-a-time/one-at-a-time';
import { DemoAccordionOpenEventComponent } from './demos/open-event/open-event';
import { DemoAccordionStylingComponent } from './demos/styling/styling';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import {
  NgApiDocComponent,
  NgApiDocConfigComponent
} from '../../docs/api-docs';
import { DemoAccordionOpenedComponent } from './demos/opened/opened';
import { DemoAccordionDynamicBodyComponent } from './demos/dynamic-body/dynamic-body';

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
        anchor: 'basic-accordion',
        description: `<p>Click headers to expand/collapse content that is broken into logical sections, much
          like tabs.</p>`,
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        outlet: DemoAccordionBasicComponent
      },
      {
        title: 'With animation',
        anchor: 'animated-accordion',
        description: `<p>Use input property or config property <code>isAnimated</code> to enable/disable animation</p>`,
        component: require('!!raw-loader?lang=typescript!./demos/animated/animated'),
        html: require('!!raw-loader?lang=markup!./demos/animated/animated.html'),
        outlet: DemoAccordionAnimatedComponent
      },
      {
        title: 'Group opening event',
        anchor: 'open-event',
        description: `<p>Accordion with <code>isOpenChange</code> event listener.</p>`,
        component: require('!!raw-loader?lang=typescript!./demos/open-event/open-event'),
        html: require('!!raw-loader?lang=markup!./demos/open-event/open-event.html'),
        outlet: DemoAccordionOpenEventComponent
      },
      {
        title: 'Custom HTML',
        anchor: 'custom-html',
        component: require('!!raw-loader?lang=typescript!./demos/custom-html/custom-html'),
        html: require('!!raw-loader?lang=markup!./demos/custom-html/custom-html.html'),
        outlet: DemoAccordionCustomHTMLComponent
      },
      {
        title: 'Disabled',
        anchor: 'disabled',
        component: require('!!raw-loader?lang=typescript!./demos/disabled/disabled'),
        html: require('!!raw-loader?lang=markup!./demos/disabled/disabled.html'),
        outlet: DemoAccordionDisabledComponent
      },
      {
        title: 'Initially opened',
        anchor: 'opened',
        component: require('!!raw-loader?lang=typescript!./demos/opened/opened'),
        html: require('!!raw-loader?lang=markup!./demos/opened/opened.html'),
        outlet: DemoAccordionOpenedComponent
      },
      {
        title: 'Dynamic accordion',
        anchor: 'dynamic-accordion',
        component: require('!!raw-loader?lang=typescript!./demos/dymanic/dynamic'),
        html: require('!!raw-loader?lang=markup!./demos/dymanic/dynamic.html'),
        outlet: DemoAccordionDynamicComponent
      },
      {
        title: 'Dynamic body content',
        anchor: 'dynamic-body',
        component: require('!!raw-loader?lang=typescript!./demos/dynamic-body/dynamic-body'),
        html: require('!!raw-loader?lang=markup!./demos/dynamic-body/dynamic-body.html'),
        outlet: DemoAccordionDynamicBodyComponent
      },
      {
        title: 'Manual toggle',
        anchor: 'manual-toggle',
        component: require('!!raw-loader?lang=typescript!./demos/manual-toggle/manual-toggle'),
        html: require('!!raw-loader?lang=markup!./demos/manual-toggle/manual-toggle.html'),
        outlet: DemoAccordionManualToggleComponent
      },
      {
        title: 'Open only one at a time',
        anchor: 'one-time',
        component: require('!!raw-loader?lang=typescript!./demos/one-at-a-time/one-at-a-time'),
        html: require('!!raw-loader?lang=markup!./demos/one-at-a-time/one-at-a-time.html'),
        outlet: DemoAccordionOneAtATimeComponent
      },
      {
        title: 'Styling',
        anchor: 'styling',
        component: require('!!raw-loader?lang=typescript!./demos/styling/styling'),
        html: require('!!raw-loader?lang=markup!./demos/styling/styling.html'),
        css: require('!!raw-loader?lang=markup!./demos/styling/styling.css'),
        outlet: DemoAccordionStylingComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'config',
        component: require('!!raw-loader?lang=typescript!./demos/config/config'),
        html: require('!!raw-loader?lang=markup!./demos/config/config.html'),
        outlet: DemoAccordionConfigComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'AccordionComponent',
        anchor: 'AccordionComponent',
        outlet: NgApiDocComponent
      },
      {
        title: 'AccordionPanelComponent',
        anchor: 'AccordionPanelComponent',
        outlet: NgApiDocComponent
      },
      {
        title: 'AccordionConfig',
        anchor: 'AccordionConfig',
        outlet: NgApiDocConfigComponent
      }
    ]
  }
];
