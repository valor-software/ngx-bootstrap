import { DemoDropdownBasicComponent } from './demos/basic/basic';
import { DemoDropdownBasicLinkComponent } from './demos/basic/basic-link';
import { DemoDropdownSplitComponent } from './demos/split/split';
import { DemoDropdownTriggersManualComponent } from './demos/triggers-manual/triggers-manual';
import { DemoDropdownDisabledComponent } from './demos/disabled-menu/disabled-menu';
import { DemoDropdownAlignmentComponent } from './demos/alignment/menu-alignment';
import { DemoNestedDropdownsComponent } from './demos/nested-dropdowns/nested-dropdowns';
import { DemoDropdownContainerComponent } from './demos/container/container';
import { DemoDropdownKeyboardComponent } from './demos/keyboard/keyboard';
import { DemoDropupComponent } from './demos/dropup/dropup';
import { DemoDropdownConfigComponent } from './demos/config/config';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import { NgApiDocComponent } from '../../docs/api-docs/api-doc/api-doc.component';
import { NgApiDocConfigComponent } from '../../docs/api-docs/api-doc-config/api-doc-config.component';

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
    description: `<p>Wrap the dropdown’s toggle (your button or link) and the dropdown menu within
      <code>dropdown</code>. Dropdowns can be triggered from <code> &lt;a&gt;</code> or <code> &lt;button&gt;</code>
      elements to better fit your potential needs.</p>`,
    content: [
      {
        title: 'Single button dropdowns',
        anchor: 'single-button',
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic.ts'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        description: `<p>Any single <code>.btn</code> can be turned into a dropdown toggle with some markup changes.
          Here’s how you can put them to work with either  <code> &lt;button&gt; </code> elements:</p>`,
        outlet: DemoDropdownBasicComponent
      },
      {
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic-link.ts'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic-link.html'),
        description: `<p>And with <code> &lt;a&gt; </code> elements:</p>`,
        outlet: DemoDropdownBasicLinkComponent
      },
      {
        title: 'Split button dropdowns',
        anchor: 'split-button',
        component: require('!!raw-loader?lang=typescript!./demos/split/split.ts'),
        html: require('!!raw-loader?lang=markup!./demos/split/split.html'),
        description: `<p>Similarly, create split button dropdowns with virtually the same markup as single
          button dropdowns, but with the addition of <code>.dropdown-toggle-split</code> for proper spacing
          around the dropdown caret.</p>`,
        outlet: DemoDropdownSplitComponent
      },
      {
        title: 'Manual triggers',
        anchor: 'triggers-manual',
        component: require('!!raw-loader?lang=typescript!./demos/triggers-manual/triggers-manual.ts'),
        html: require('!!raw-loader?lang=markup!./demos/triggers-manual/triggers-manual.html'),
        outlet: DemoDropdownTriggersManualComponent
      },
      {
        title: 'Disabled menu',
        anchor: 'disabled-menu',
        component: require('!!raw-loader?lang=typescript!./demos/disabled-menu/disabled-menu.ts'),
        html: require('!!raw-loader?lang=markup!./demos/disabled-menu/disabled-menu.html'),
        outlet: DemoDropdownDisabledComponent
      },
      {
        title: 'Menu alignment',
        anchor: 'menu-alignment',
        component: require('!!raw-loader?lang=typescript!./demos/alignment/menu-alignment.ts'),
        html: require('!!raw-loader?lang=markup!./demos/alignment/menu-alignment.html'),
        description: `<p>By default, a dropdown menu is automatically positioned 100% from the top and along
          the left side of its parent. Add class <code>.dropdown-menu-right</code> to a <code>dropdownMenu</code>
          to right align the dropdown menu.</p>`,
        outlet: DemoDropdownAlignmentComponent
      },
      {
        title: 'Nested dropdowns (experimental)',
        anchor: 'nested-dropdowns',
        component: require('!!raw-loader?lang=typescript!./demos/nested-dropdowns/nested-dropdowns.ts'),
        html: require('!!raw-loader?lang=markup!./demos/nested-dropdowns/nested-dropdowns.html'),
        outlet: DemoNestedDropdownsComponent
      },
      {
        title: 'Append to body',
        anchor: 'container-body',
        component: require('!!raw-loader?lang=typescript!./demos/container/container.ts'),
        html: require('!!raw-loader?lang=markup!./demos/container/container.html'),
        outlet: DemoDropdownContainerComponent
      },
      /* not availavle in bs-dropdown version
      {
        title: 'Single button with keyboard nav',
        anchor: 'dropdown-keyboard',
        component: require('!!raw-loader?lang=typescript!./demos/keyboard/keyboard.ts'),
        html: require('!!raw-loader?lang=markup!./demos/keyboard/keyboard.html'),
        outlet: DemoDropdownKeyboardComponent
      },*/
      {
        title: 'Dropup variation',
        anchor: 'dropup',
        component: require('!!raw-loader?lang=typescript!./demos/dropup/dropup.ts'),
        html: require('!!raw-loader?lang=markup!./demos/dropup/dropup.html'),
        description: `<p>Trigger dropdown menus above elements by adding <code>.dropup</code> to the
          parent element.</p>`,
        outlet: DemoDropupComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'config-defaults',
        component: require('!!raw-loader?lang=typescript!./demos/config/config.ts'),
        html: require('!!raw-loader?lang=markup!./demos/config/config.html'),
        description: `<p>It is possible to override default dropdown config partially or completely.</p>`,
        outlet: DemoDropdownConfigComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'BsDropdownDirective',
        anchor: 'dropdown-directive',
        outlet: NgApiDocComponent
      },
      {
        title: 'BsDropdownMenuDirective',
        anchor: 'dropdown-menu-directive',
        outlet: NgApiDocComponent
      },
      {
        title: 'BsDropdownToggleDirective',
        anchor: 'dropdown-toggle-directive',
        outlet: NgApiDocComponent
      },
      {
        title: 'BsDropdownConfig',
        anchor: 'dropdown-config',
        outlet: NgApiDocConfigComponent
      }
    ]
  }
];
