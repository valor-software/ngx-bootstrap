import { DemoAccordionBasicComponent } from './demos/basic/basic';
import { DemoAccordionDisabledComponent } from './demos/disabled/disabled';
import { DemoAccordionDynamicComponent } from './demos/dymanic/dynamic';
import { DemoAccordionOneAtATimeComponent } from './demos/one-at-a-time/one-at-a-time';
import { DemoAccordionStylingComponent } from './demos/styling/styling';
import { DemoAccordionConfigComponent } from './demos/config/config';

import { UsageComponent } from '../../common/content-sections/usage/usage.component';

import { ContentSection } from '../../models/content-section.model';

export const demoComponentContent: ContentSection[] = [
  {
    name: 'Usage',
    outlet: UsageComponent,
    content: {
      doc: require('html-loader!markdown-loader!./docs/usage.md')
    }
  }/*,
  {
    name: 'Examples',
    outlet: 'DemoComponentExamples',
    content: [
      {
        title: 'Simple accordion',
        anchor: 'simple-accordion',
        name: 'basic',
        description: `<p>Click headers to expand/collapse content that is broken into logical sections, much
        like tabs.</p>`,
        outlet: DemoAccordionBasicComponent
      },
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
      }
    ]
  },
  {
    name: 'API Reference',
    outlet: 'DemoComponentAp',
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
  }*/
];
