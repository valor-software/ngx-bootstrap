import { DemoAccordionBasicComponent } from './demos/basic/basic';
import { DemoAccordionDisabledComponent } from './demos/disabled/disabled';
import { DemoAccordionDynamicComponent } from './demos/dymanic/dynamic';
import { DemoAccordionOneAtATimeComponent } from './demos/one-at-a-time/one-at-a-time';
import { DemoAccordionStylingComponent } from './demos/styling/styling';
import { DemoAccordionConfigComponent } from './demos/config/config';
import { ContentSection } from '../../models/content-section.model';

import { DemoTopSectionComponent } from '../../common/demo-component/demo-top-section/index';
import { ExamplesComponent } from '../../common/demo-component/demo-examples-section/index';
import { ApiSectionsComponent } from '../../common/demo-component/demo-api-section/index';


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
        title: 'Simple accordion',
        anchor: 'simple-accordion',
        description: `<p>Click headers to expand/collapse content that is broken into logical sections, much
        like tabs.</p>`,
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        outlet: DemoAccordionBasicComponent
      }/*,
      {
        title: 'Disabled',
        anchor: 'disabled',
        name: 'disabled',
        outlet: DemoAccordionDisabledComponent
      },
      {
        title: 'Dynamic accordion',
        anchor: 'dynamic-accordion',
        name: 'dynamic',
        outlet: DemoAccordionDynamicComponent
      },
      {
        title: 'Open only one at a time',
        anchor: 'one-time',
        name: 'oneAtATime',
        outlet: DemoAccordionOneAtATimeComponent
      },
      {
        title: 'Styling',
        anchor: 'styling',
        name: 'styling',
        outlet: DemoAccordionStylingComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'config',
        name: 'config',
        outlet: DemoAccordionConfigComponent
      }*/
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'AccordionPanelComponent',
        anchor: 'AccordionPanelComponent'
      },
      {
        title: 'AccordionConfig',
        anchor: 'AccordionConfig',
        component: 'config'
      }
    ]
  }
];
